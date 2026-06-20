import { useCallback, useEffect, useRef, useState } from "react";

// The Web Speech API isn't in TypeScript's DOM lib, so we declare the minimal
// shape we use. Names are prefixed to avoid clashing with any future lib types.
interface SpeechRecAlternative {
  transcript: string;
}
interface SpeechRecResult extends ArrayLike<SpeechRecAlternative> {
  isFinal: boolean;
}
interface SpeechRecEvent {
  results: ArrayLike<SpeechRecResult>;
}
interface SpeechRecErrorEvent {
  error: string;
}
interface SpeechRec {
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: SpeechRecEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: SpeechRecErrorEvent) => void) | null;
}
type SpeechRecCtor = new () => SpeechRec;

function getCtor(): SpeechRecCtor | null {
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecCtor;
    webkitSpeechRecognition?: SpeechRecCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/**
 * Wraps the browser's continuous speech recognition. Calls `onResult` with the
 * live transcript as the user speaks (interim results) so commands fire as soon
 * as the word is recognized, rather than waiting for an end-of-speech pause.
 * `isFinal` marks the recognizer's finalized transcript for that utterance.
 * Returns controls + state for a mic toggle.
 *
 * Recognition is restarted automatically on `onend` (browsers stop after a
 * pause), so it keeps listening until the user turns it off.
 */
export function useSpeechRecognition(
  onResult: (transcript: string, isFinal: boolean, resultIndex: number) => void,
) {
  // Keep the latest callback without re-creating the recognition instance.
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;

  const [supported] = useState(() => getCtor() !== null);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recRef = useRef<SpeechRec | null>(null);
  const wantRef = useRef(false); // desired state, drives auto-restart

  const stop = useCallback(() => {
    wantRef.current = false;
    recRef.current?.stop();
    setListening(false);
  }, []);

  const start = useCallback(() => {
    const Ctor = getCtor();
    if (!Ctor) return;
    setError(null);

    let rec = recRef.current;
    if (!rec) {
      rec = new Ctor();
      rec.continuous = true;
      // Interim results let us react the moment a word is recognized instead of
      // waiting for the browser to detect end-of-speech (which felt slow).
      rec.interimResults = true;
      // We only ever read the top hypothesis ([0]); asking for a single
      // alternative avoids the engine computing/ranking extras, shaving latency.
      rec.maxAlternatives = 1;
      rec.lang = "en-US";
      rec.onresult = (e) => {
        const idx = e.results.length - 1;
        const last = e.results[idx];
        if (last && last[0]) {
          onResultRef.current(last[0].transcript, last.isFinal, idx);
        }
      };
      rec.onerror = (e) => {
        if (e.error === "not-allowed" || e.error === "service-not-allowed") {
          setError("Microphone is blocked. Allow mic access to use voice.");
          wantRef.current = false;
          setListening(false);
        }
        // "no-speech"/"aborted" are transient — onend restarts us.
      };
      rec.onend = () => {
        if (!wantRef.current) {
          setListening(false);
          return;
        }
        // Browsers stop after a pause; restart at once to keep listening. If the
        // immediate restart races (throws), retry shortly so we don't get stuck
        // silently unresponsive.
        try {
          rec!.start();
        } catch {
          setTimeout(() => {
            if (wantRef.current) {
              try {
                rec!.start();
              } catch {
                /* will try again on the next onend */
              }
            }
          }, 200);
        }
      };
      recRef.current = rec;
    }

    wantRef.current = true;
    try {
      rec.start();
      setListening(true);
    } catch {
      /* already running */
    }
  }, []);

  // Stop listening when the app unmounts.
  useEffect(() => {
    return () => {
      wantRef.current = false;
      recRef.current?.abort();
    };
  }, []);

  return { supported, listening, error, start, stop };
}
