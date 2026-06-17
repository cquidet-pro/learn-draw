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
  /** Register the current screen's command handler. Returns an unregister fn. */
  register: (handler: (transcript: string) => void) => () => void;
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
export function useVoiceControl(onCommand: (transcript: string) => void) {
  const { register } = useVoice();
  useEffect(() => register(onCommand), [register, onCommand]);
}

export function VoiceProvider({ children }: { children: ReactNode }) {
  const handlerRef = useRef<((t: string) => void) | null>(null);
  const [lastHeard, setLastHeard] = useState<string | null>(null);

  const onResult = useCallback((transcript: string) => {
    const text = transcript.trim();
    setLastHeard(text);
    handlerRef.current?.(text.toLowerCase());
  }, []);

  const { supported, listening, error, start, stop } =
    useSpeechRecognition(onResult);

  const toggle = useCallback(() => {
    if (listening) stop();
    else start();
  }, [listening, start, stop]);

  const register = useCallback((handler: (t: string) => void) => {
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
      {listening && (
        <div className="voice-toast">
          <span className="voice-legend">
            Say a name · <b>next</b> · <b>back</b> · <b>up</b> · <b>down</b>
          </span>
          {lastHeard && <span className="voice-heard">🗣️ "{lastHeard}"</span>}
        </div>
      )}
      {error && <div className="voice-toast voice-toast-error">{error}</div>}
    </VoiceContext.Provider>
  );
}

/** The mic on/off toggle. Place it wherever you want in the layout. */
export function VoiceButton() {
  const { supported, listening, toggle } = useVoice();

  if (!supported) {
    return (
      <span className="voice-note">🎤 Voice isn't supported in this browser</span>
    );
  }

  return (
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
  );
}
