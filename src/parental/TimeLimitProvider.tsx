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

// Parental daily time limit. A 4-digit PIN (set by the grown-up) gates the
// settings and unlocking. Usage is counted per day and persisted; when it
// reaches the limit the whole app is dimmed + made unclickable by LockOverlay.
const PIN_KEY = "learn-draw:pin";
const LIMIT_KEY = "learn-draw:limitMin";
const USAGE_KEY = "learn-draw:usage";

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

  const remainingSec = limitMin > 0 ? Math.max(0, limitMin * 60 - usedSec) : Infinity;
  const locked = limitMin > 0 && usedSec >= limitMin * 60;

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
  };

  return (
    <TimeLimitContext.Provider value={value}>
      <div className={locked ? "app-dim" : undefined}>{children}</div>
      {locked && <LockOverlay />}
    </TimeLimitContext.Provider>
  );
}
