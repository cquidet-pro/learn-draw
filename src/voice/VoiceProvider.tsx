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
import { CommandDeduper } from "./dedupe";

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
  const prevTextRef = useRef(""); // the previous transcript (lowercased)
  // Suppresses the same command repeated within a short sliding window, so a
  // quick "next next" only fires once. See dedupe.ts to tune the window.
  const deduperRef = useRef(new CommandDeduper());

  const onResult = useCallback(
    (transcript: string, isFinal: boolean, resultIndex: number) => {
      const text = transcript.trim();
      const lower = text.toLowerCase();
      const words = lower.split(/\s+/).filter(Boolean);

      // Decide whether this is the SAME interim utterance still growing, or a
      // fresh one we should process from scratch. A fresh utterance is: a new
      // recognition result, the previous one finalized, OR a transcript that no
      // longer extends what we already consumed (the engine often restarts and
      // reuses index 0 with a brand-new phrase — e.g. you say "flags", then
      // "home"; without this check "home" lands at the same index mid-stream and
      // gets silently dropped, so saying "home" did nothing).
      const continues =
        resultIndex === resultIdxRef.current &&
        !prevFinalRef.current &&
        lower.startsWith(prevTextRef.current);
      if (!continues) processedRef.current = 0;
      resultIdxRef.current = resultIndex;
      prevFinalRef.current = isFinal;
      prevTextRef.current = lower;

      // The recognizer sometimes revises a phrase shorter; don't skip words.
      if (words.length < processedRef.current) processedRef.current = words.length;

      // Only consider words we haven't acted on yet, so several *different*
      // commands in one breath ("next back") each fire, in order.
      if (words.length > processedRef.current) {
        const fresh = words.slice(processedRef.current).join(" ");
        let handled: boolean;
        if (deduperRef.current.isDuplicate(fresh)) {
          // Same command again within the sliding window — swallow the repeat,
          // but still consume the words so they aren't reconsidered.
          handled = true;
        } else {
          handled = handlerRef.current?.(fresh) ?? false;
          // Remember handled commands so an immediate repeat is de-duped.
          if (handled) deduperRef.current.mark(fresh);
        }
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
      prevTextRef.current = "";
      deduperRef.current.reset();
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
 *  right next to it showing what you can say. Place it anywhere in the layout.
 *  Pass `hint` to override the list of words for the current screen (e.g. the
 *  drawing page only supports next/back/home). */
export function VoiceButton({ hint }: { hint?: ReactNode } = {}) {
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
            {hint ?? (
              <>
                Say a name · <b>next</b> · <b>back</b> · <b>up</b> · <b>down</b>
              </>
            )}
          </span>
          {lastHeard && <span className="voice-heard">🗣️ "{lastHeard}"</span>}
        </span>
      )}
    </span>
  );
}
