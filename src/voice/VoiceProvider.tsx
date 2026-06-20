import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useSpeechRecognition } from "./useSpeechRecognition";

interface VoiceContextValue {
  supported: boolean;
  listening: boolean;
  error: string | null;
  toggle: () => void;
  /** Register the current screen's command handler. Returns an unregister fn.
   *  The handler returns `true` when it acted on a command. */
  register: (handler: (transcript: string) => boolean) => () => void;
}

const VoiceContext = createContext<VoiceContextValue | null>(null);
// The live transcript lives in its own context so updating it (many times per
// second while listening) only re-renders the little display bubble — not every
// screen that registers a command handler via `useVoice`.
const VoiceHeardContext = createContext<string | null>(null);

function useVoice(): VoiceContextValue {
  const ctx = useContext(VoiceContext);
  if (!ctx) throw new Error("useVoice must be used within a VoiceProvider");
  return ctx;
}

/**
 * Screens call this to receive voice commands while mounted. `onCommand` gets
 * the lowercased transcript. Pass a STABLE callback (useCallback) so it isn't
 * re-registered every render.
 */
export function useVoiceControl(onCommand: (transcript: string) => boolean) {
  const { register } = useVoice();
  useEffect(() => register(onCommand), [register, onCommand]);
}

export function VoiceProvider({ children }: { children: ReactNode }) {
  const handlerRef = useRef<((t: string) => boolean) | null>(null);
  const [lastHeard, setLastHeard] = useState<string | null>(null);

  // We act on interim (live) results for speed. A single recognition "result"
  // grows word-by-word as you keep talking (e.g. "next" → "next back"), so to
  // support several commands in one breath we only ever look at the *new* words
  // since we last acted, and remember how far we've processed. This avoids both
  // re-firing the same word and dropping a quick "next next back back".
  const resultIdxRef = useRef(-1); // which recognition result we're tracking
  const processedRef = useRef(0); // how many words of it we've already handled
  const prevFinalRef = useRef(true); // did the previous result end an utterance?

  const onResult = useCallback(
    (transcript: string, isFinal: boolean, resultIndex: number) => {
      const text = transcript.trim();
      const words = text.toLowerCase().split(/\s+/).filter(Boolean);

      // Start fresh on a new utterance: either a new recognition result, or the
      // previous one finalized. Checking the final flag too means a word is
      // never dropped when the recognizer silently restarts (its result index
      // resets to 0, which would otherwise look like the same ongoing phrase).
      if (resultIndex !== resultIdxRef.current || prevFinalRef.current) {
        processedRef.current = 0;
      }
      resultIdxRef.current = resultIndex;
      prevFinalRef.current = isFinal;

      // The recognizer sometimes revises a phrase shorter; don't skip words.
      if (words.length < processedRef.current) processedRef.current = words.length;

      // Only consider words we haven't acted on yet, so several commands in one
      // breath ("next next back back") each fire, in order.
      if (words.length > processedRef.current) {
        const fresh = words.slice(processedRef.current).join(" ");
        const handled = handlerRef.current?.(fresh) ?? false;
        // Consume the new words once handled (so we don't repeat them), or once
        // the utterance is final (so leftover chatter doesn't linger).
        if (handled || isFinal) processedRef.current = words.length;
      }

      // Update the on-screen "heard" bubble last, so command dispatch above is
      // never delayed by React work — and this only re-renders the bubble.
      if (text) setLastHeard(text);
    },
    [],
  );

  const { supported, listening, error, start, stop } =
    useSpeechRecognition(onResult);

  // Begin each listening session from a clean slate.
  useEffect(() => {
    if (listening) {
      resultIdxRef.current = -1;
      processedRef.current = 0;
      prevFinalRef.current = true;
    }
  }, [listening]);

  const toggle = useCallback(() => {
    if (listening) stop();
    else start();
  }, [listening, start, stop]);

  const register = useCallback((handler: (t: string) => boolean) => {
    handlerRef.current = handler;
    return () => {
      if (handlerRef.current === handler) handlerRef.current = null;
    };
  }, []);

  // Stable identity except when these actually change (rarely), so screens that
  // consume it via `useVoiceControl` don't re-render as the transcript streams.
  const value = useMemo(
    () => ({ supported, listening, error, toggle, register }),
    [supported, listening, error, toggle, register],
  );

  return (
    <VoiceContext.Provider value={value}>
      <VoiceHeardContext.Provider value={lastHeard}>
        {children}
        {error && <div className="voice-toast voice-toast-error">{error}</div>}
      </VoiceHeardContext.Provider>
    </VoiceContext.Provider>
  );
}

/** The mic on/off toggle. While listening, a little legend bubble appears
 *  right next to it showing what you can say. Place it anywhere in the layout. */
export function VoiceButton() {
  const { supported, listening, toggle } = useVoice();
  const lastHeard = useContext(VoiceHeardContext);

  if (!supported) {
    return (
      <span className="voice-note">🎤 Voice isn't supported in this browser</span>
    );
  }

  return (
    <span className="voice-control">
      <button
        className={listening ? "voice-btn on" : "voice-btn"}
        onClick={toggle}
        aria-label={listening ? "Turn off voice control" : "Turn on voice control"}
        aria-pressed={listening}
      >
        {listening ? "🎤" : "🎙️"}
        <span className="voice-btn-label">
          {listening ? "Listening…" : "Talk to me"}
        </span>
      </button>
      {listening && (
        <span className="voice-legend-pop">
          <span className="voice-legend">
            Say a name · <b>next</b> · <b>back</b> · <b>up</b> · <b>down</b>
          </span>
          {lastHeard && <span className="voice-heard">🗣️ "{lastHeard}"</span>}
        </span>
      )}
    </span>
  );
}
