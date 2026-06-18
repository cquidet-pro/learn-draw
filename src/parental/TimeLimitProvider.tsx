import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { LockOverlay } from "./LockOverlay";
import { FullscreenGate } from "./FullscreenGate";
import { ExitCodePrompt } from "./ExitCodePrompt";

// Parental controls. A 4-digit PIN (set by the grown-up) gates the settings and
// unlocking. Usage is counted per day and persisted; when it reaches the daily
// limit the whole app is dimmed + made unclickable by LockOverlay. Optionally a
// "keep full screen" lock keeps the child in fullscreen — exiting it shows a
// gate that needs the PIN (or a tap to return to fullscreen).
const PIN_KEY = "learn-draw:pin";
const LIMIT_KEY = "learn-draw:limitMin";
const USAGE_KEY = "learn-draw:usage";
const FS_KEY = "learn-draw:fsLock";

// Cross-browser fullscreen helpers.
type FsDoc = Document & { webkitFullscreenElement?: Element; webkitExitFullscreen?: () => void };
type FsEl = HTMLElement & { webkitRequestFullscreen?: () => void };

function fullscreenEl(): Element | null {
  const d = document as FsDoc;
  return document.fullscreenElement ?? d.webkitFullscreenElement ?? null;
}
function fullscreenSupported(): boolean {
  const el = document.documentElement as FsEl;
  return !!(el.requestFullscreen || el.webkitRequestFullscreen);
}
function requestFullscreen(): void {
  const el = document.documentElement as FsEl;
  const fn = el.requestFullscreen ?? el.webkitRequestFullscreen;
  if (!fn) return;
  try {
    const r = fn.call(el) as unknown as Promise<void> | undefined;
    if (r && typeof r.catch === "function") r.catch(() => {});
  } catch {
    /* ignore */
  }
}
function exitFullscreen(): void {
  const d = document as FsDoc;
  const fn = document.exitFullscreen ?? d.webkitExitFullscreen;
  if (fullscreenEl() && fn) {
    try {
      fn.call(document);
    } catch {
      /* ignore */
    }
  }
}

// Keyboard Lock API (Chromium): while fullscreen, capture Escape so a single
// press no longer exits fullscreen — it's delivered to us instead. Lets us
// require a double-press before showing the exit-code prompt.
type KbNav = Navigator & { keyboard?: { lock?: (keys: string[]) => Promise<void>; unlock?: () => void } };
function lockEscape(): void {
  try {
    (navigator as KbNav).keyboard?.lock?.(["Escape"])?.catch(() => {});
  } catch {
    /* ignore */
  }
}
function unlockKeyboard(): void {
  try {
    (navigator as KbNav).keyboard?.unlock?.();
  } catch {
    /* ignore */
  }
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadUsage(): { date: string; used: number } {
  try {
    const raw = localStorage.getItem(USAGE_KEY);
    if (raw) {
      const u = JSON.parse(raw) as { date: string; used: number };
      if (u && u.date === todayStr()) return { date: u.date, used: Number(u.used) || 0 };
    }
  } catch {
    /* ignore */
  }
  return { date: todayStr(), used: 0 };
}

interface TimeLimitValue {
  hasPin: boolean;
  /** Daily limit in minutes; 0 means no limit. */
  limitMin: number;
  usedSec: number;
  remainingSec: number;
  locked: boolean;
  setPin: (pin: string) => void;
  verifyPin: (pin: string) => boolean;
  setLimit: (min: number) => void;
  /** Give back today's time so the child can keep going (used to unlock). */
  resetToday: () => void;
  /** "Keep full screen" parental lock. */
  fsLock: boolean;
  fsSupported: boolean;
  setFsLock: (on: boolean) => void;
  enterFullscreen: () => void;
}

const TimeLimitContext = createContext<TimeLimitValue | null>(null);

export function useTimeLimit(): TimeLimitValue {
  const ctx = useContext(TimeLimitContext);
  if (!ctx) throw new Error("useTimeLimit must be used within a TimeLimitProvider");
  return ctx;
}

export function TimeLimitProvider({ children }: { children: ReactNode }) {
  const [pin, setPinState] = useState<string | null>(() => localStorage.getItem(PIN_KEY));
  const [limitMin, setLimitState] = useState<number>(
    () => Number(localStorage.getItem(LIMIT_KEY)) || 0,
  );
  const [usedSec, setUsedSec] = useState<number>(() => loadUsage().used);
  const dateRef = useRef<string>(todayStr());

  // Count one second of usage while the tab is visible; reset at midnight.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      const d = todayStr();
      if (d !== dateRef.current) {
        dateRef.current = d;
        setUsedSec(0);
      } else {
        setUsedSec((s) => s + 1);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Persist usage (throttled to every 5s, plus whenever the tab is hidden).
  useEffect(() => {
    if (usedSec % 5 !== 0) return;
    try {
      localStorage.setItem(USAGE_KEY, JSON.stringify({ date: dateRef.current, used: usedSec }));
    } catch {
      /* ignore */
    }
  }, [usedSec]);

  useEffect(() => {
    const persist = () => {
      try {
        localStorage.setItem(USAGE_KEY, JSON.stringify({ date: dateRef.current, used: usedSec }));
      } catch {
        /* ignore */
      }
    };
    document.addEventListener("visibilitychange", persist);
    window.addEventListener("pagehide", persist);
    return () => {
      document.removeEventListener("visibilitychange", persist);
      window.removeEventListener("pagehide", persist);
    };
  }, [usedSec]);

  const setPin = useCallback((p: string) => {
    setPinState(p);
    try {
      localStorage.setItem(PIN_KEY, p);
    } catch {
      /* ignore */
    }
  }, []);

  const verifyPin = useCallback((p: string) => pin != null && p === pin, [pin]);

  const setLimit = useCallback((min: number) => {
    setLimitState(min);
    try {
      localStorage.setItem(LIMIT_KEY, String(min));
    } catch {
      /* ignore */
    }
  }, []);

  const resetToday = useCallback(() => setUsedSec(0), []);

  // "Keep full screen" lock.
  const fsSupported = fullscreenSupported();
  const [fsLock, setFsLockState] = useState<boolean>(() => localStorage.getItem(FS_KEY) === "1");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(() => !!fullscreenEl());
  // Shown (while staying fullscreen) when the child double-presses Escape.
  const [exitPrompt, setExitPrompt] = useState(false);
  // Brief "press Esc again" hint after a single Escape.
  const [escHint, setEscHint] = useState(false);
  const lastEscRef = useRef(0);

  // Track fullscreen; when entering with the lock on, grab the keyboard so
  // Escape stops auto-exiting (Chromium). Release + clear prompts on exit.
  useEffect(() => {
    const onChange = () => {
      const fs = !!fullscreenEl();
      setIsFullscreen(fs);
      if (fs && fsLock) lockEscape();
      if (!fs) {
        unlockKeyboard();
        setExitPrompt(false);
        setEscHint(false);
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, [fsLock]);

  // Double-press Escape (while locked + fullscreen) opens the exit-code prompt.
  // This only fires where Keyboard Lock keeps us in fullscreen; otherwise the
  // browser exits on the first Escape and the FullscreenGate handles it.
  useEffect(() => {
    if (!fsLock) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !fullscreenEl()) return;
      e.preventDefault();
      const now = Date.now();
      if (now - lastEscRef.current < 700) {
        lastEscRef.current = 0;
        setEscHint(false);
        setExitPrompt(true);
      } else {
        lastEscRef.current = now;
        setEscHint(true);
        window.setTimeout(() => setEscHint(false), 1500);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [fsLock]);

  const setFsLock = useCallback((on: boolean) => {
    setFsLockState(on);
    try {
      localStorage.setItem(FS_KEY, on ? "1" : "0");
    } catch {
      /* ignore */
    }
    // Called from a click (user gesture), so requesting fullscreen is allowed.
    if (on) {
      requestFullscreen();
    } else {
      unlockKeyboard();
      exitFullscreen();
      setExitPrompt(false);
    }
  }, []);

  const enterFullscreen = useCallback(() => requestFullscreen(), []);

  const remainingSec = limitMin > 0 ? Math.max(0, limitMin * 60 - usedSec) : Infinity;
  const locked = limitMin > 0 && usedSec >= limitMin * 60;
  // Only enforce fullscreen where the browser supports it (graceful degrade).
  const fsBlocked = fsLock && fsSupported && !isFullscreen;

  const value: TimeLimitValue = {
    hasPin: pin != null,
    limitMin,
    usedSec,
    remainingSec,
    locked,
    setPin,
    verifyPin,
    setLimit,
    resetToday,
    fsLock,
    fsSupported,
    setFsLock,
    enterFullscreen,
  };

  return (
    <TimeLimitContext.Provider value={value}>
      <div className={locked || fsBlocked || exitPrompt ? "app-dim" : undefined}>{children}</div>
      {escHint && !exitPrompt && <div className="esc-hint">Press Esc again to exit ✏️</div>}
      {locked ? (
        <LockOverlay />
      ) : fsBlocked ? (
        <FullscreenGate />
      ) : exitPrompt ? (
        <ExitCodePrompt onCancel={() => setExitPrompt(false)} />
      ) : null}
    </TimeLimitContext.Provider>
  );
}
