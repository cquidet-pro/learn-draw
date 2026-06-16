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
  /** Register the current screen's command handler. Returns an unregister fn. */
  register: (handler: (transcript: string) => void) => () => void;
}

const VoiceContext = createContext<VoiceContextValue | null>(null);

/**
 * Screens call this to receive voice commands while mounted. `onCommand` gets
 * the lowercased transcript. Pass a STABLE callback (useCallback) so it isn't
 * re-registered every render.
 */
export function useVoiceControl(onCommand: (transcript: string) => void) {
  const ctx = useContext(VoiceContext);
  useEffect(() => {
    if (!ctx) return;
    return ctx.register(onCommand);
  }, [ctx, onCommand]);
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

  const register = useCallback((handler: (t: string) => void) => {
    handlerRef.current = handler;
    return () => {
      if (handlerRef.current === handler) handlerRef.current = null;
    };
  }, []);

  return (
    <VoiceContext.Provider value={{ supported, register }}>
      {children}
      <VoicePanel
        supported={supported}
        listening={listening}
        error={error}
        lastHeard={lastHeard}
        onToggle={listening ? stop : start}
      />
    </VoiceContext.Provider>
  );
}

interface PanelProps {
  supported: boolean;
  listening: boolean;
  error: string | null;
  lastHeard: string | null;
  onToggle: () => void;
}

function VoicePanel({
  supported,
  listening,
  error,
  lastHeard,
  onToggle,
}: PanelProps) {
  if (!supported) {
    return (
      <div className="voice-panel">
        <span className="voice-note">🎤 Voice isn't supported in this browser</span>
      </div>
    );
  }

  return (
    <div className="voice-panel">
      {listening && (
        <div className="voice-info">
          <span className="voice-legend">
            Say a name (<b>dog</b>, <b>sun</b>, <b>car</b>…) · <b>next</b> ·{" "}
            <b>back</b> · <b>home</b>
          </span>
          {lastHeard && (
            <span className="voice-heard">🗣️ "{lastHeard}"</span>
          )}
        </div>
      )}
      {error && <span className="voice-error">{error}</span>}
      <button
        className={listening ? "voice-btn on" : "voice-btn"}
        onClick={onToggle}
        aria-label={listening ? "Turn off voice control" : "Turn on voice control"}
        aria-pressed={listening}
      >
        {listening ? "🎤" : "🎙️"}
        <span className="voice-btn-label">
          {listening ? "Listening…" : "Talk to me"}
        </span>
      </button>
    </div>
  );
}
