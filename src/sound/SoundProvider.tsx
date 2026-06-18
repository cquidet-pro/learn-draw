import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

const SOUND_KEY = "learn-draw:sound";

/** The little happy sounds we play. */
export type SoundName = "step" | "finish" | "celebrate";

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within a SoundProvider");
  return ctx;
}

function loadEnabled(): boolean {
  try {
    const v = localStorage.getItem(SOUND_KEY);
    return v === null ? true : v === "1"; // sounds on by default
  } catch {
    return true;
  }
}

// Each sound is a tiny sequence of notes (cheerful major-scale tones).
// t = start offset (s), f = frequency (Hz), d = duration (s), g = peak gain.
type Note = { t: number; f: number; d: number; g?: number };
const SOUNDS: Record<SoundName, Note[]> = {
  // Soft two-note blip when moving to the next step.
  step: [
    { t: 0, f: 660, d: 0.12 },
    { t: 0.07, f: 880, d: 0.16 },
  ],
  // Bright rising chime when the picture is finished.
  finish: [
    { t: 0, f: 523, d: 0.16 },
    { t: 0.11, f: 659, d: 0.16 },
    { t: 0.22, f: 784, d: 0.24 },
  ],
  // A little fanfare with a sparkle on top for the celebration.
  celebrate: [
    { t: 0, f: 523, d: 0.18 },
    { t: 0.12, f: 659, d: 0.18 },
    { t: 0.24, f: 784, d: 0.18 },
    { t: 0.36, f: 1047, d: 0.3 },
    { t: 0.52, f: 1319, d: 0.4, g: 0.12 },
  ],
};

// One gentle bell-ish note via an oscillator with a quick attack/decay envelope.
function blip(ctx: AudioContext, start: number, freq: number, dur: number, gain = 0.18) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "triangle"; // soft, rounded tone — kind on little ears
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(loadEnabled);
  const ctxRef = useRef<AudioContext | null>(null);
  // Read latest `enabled` from event handlers without re-creating `play`.
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  // Lazily create (and resume) the AudioContext. Browsers require this to
  // happen in response to a user gesture — which every caller is (a tap, key
  // press, or voice command), so the first sound unlocks audio.
  const getCtx = useCallback((): AudioContext | null => {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    if (!ctxRef.current) ctxRef.current = new AC();
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const playNotes = useCallback(
    (notes: Note[]) => {
      const ctx = getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      for (const n of notes) blip(ctx, now + n.t, n.f, n.d, n.g);
    },
    [getCtx],
  );

  const play = useCallback(
    (name: SoundName) => {
      if (!enabledRef.current) return;
      playNotes(SOUNDS[name]);
    },
    [playNotes],
  );

  const toggle = useCallback(() => {
    setEnabled((on) => {
      const next = !on;
      try {
        localStorage.setItem(SOUND_KEY, next ? "1" : "0");
      } catch {
        /* ignore storage errors (e.g. private mode) */
      }
      // Give a happy confirmation chirp when switching sounds on.
      if (next) playNotes(SOUNDS.step);
      return next;
    });
  }, [playNotes]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, play }}>
      {children}
    </SoundContext.Provider>
  );
}

/** Hook for screens that want to play a sound (e.g. the drawing player). */
export function usePlaySound(): (name: SoundName) => void {
  return useSound().play;
}

/** The 🔊/🔇 on-off toggle. Place it anywhere in the layout. */
export function SoundButton() {
  const { enabled, toggle } = useSound();
  return (
    <button
      className={enabled ? "sound-btn on" : "sound-btn"}
      onClick={toggle}
      aria-label={enabled ? "Turn off sounds" : "Turn on sounds"}
      aria-pressed={enabled}
    >
      {enabled ? "🔊" : "🔇"}
      <span className="sound-btn-label">{enabled ? "Sounds on" : "Sounds off"}</span>
    </button>
  );
}
