import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useSpeechRecognition } from "./useSpeechRecognition";

interface VoiceContextValue {
  supported: boolean;
  listening: boolean;
  lastHeard: string | null;
  error: string | null;
  toggle: () => void;
  /** Register the current screen's command handler. Returns an unregister fn.
   *  The handler returns `true` when it acted on a command. */
  register: (handler: (transcript: string) => boolean) => () => void;
}

const VoiceContext = createContext<VoiceContextValue | null>(null);

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
  // We act on interim (live) results for speed, but a command must fire only
  // once per spoken phrase. After one fires we "disarm" and ignore the rest of
  // that utterance — including its later final transcript — re-arming only once
  // the utterance has finalized.
  const armedRef = useRef(true);

  const onResult = useCallback((transcript: string, isFinal: boolean) => {
    const text = transcript.trim();
    if (text) setLastHeard(text);

    if (!armedRef.current) {
      // Waiting out the handled utterance; re-arm when it finalizes.
      if (isFinal) armedRef.current = true;
      return;
    }
    if (!text) return;

    const handled = handlerRef.current?.(text.toLowerCase());
    // If we acted on an interim guess, mute the rest of this utterance.
    if (handled && !isFinal) armedRef.current = false;
  }, []);

  const { supported, listening, error, start, stop } =
    useSpeechRecognition(onResult);

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

  return (
    <VoiceContext.Provider
      value={{ supported, listening, lastHeard, error, toggle, register }}
    >
      {children}
      {error && <div className="voice-toast voice-toast-error">{error}</div>}
    </VoiceContext.Provider>
  );
}

/** The mic on/off toggle. While listening, a little legend bubble appears
 *  right next to it showing what you can say. Place it anywhere in the layout. */
export function VoiceButton() {
  const { supported, listening, lastHeard, toggle } = useVoice();

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
