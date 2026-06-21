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
  onstart: (() => void) | null;
  onaudiostart: (() => void) | null;
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
  const runningRef = useRef(false); // is the engine actually capturing now?
  const startingRef = useRef(false); // a start() is pending its onstart
  const watchdogRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start the engine if we want it on and it isn't already running/starting.
  // Browsers throw if start() is called while active, so we guard and swallow.
  const safeStart = useCallback(() => {
    const rec = recRef.current;
    if (!rec || !wantRef.current || runningRef.current || startingRef.current) {
      return;
    }
    startingRef.current = true;
    try {
      rec.start();
    } catch {
      // Already running, or a stale instance — clear the guard so the watchdog
      // can try again on its next tick.
      startingRef.current = false;
    }
  }, []);

  const stop = useCallback(() => {
    wantRef.current = false;
    if (watchdogRef.current !== null) {
      clearInterval(watchdogRef.current);
      watchdogRef.current = null;
    }
    recRef.current?.abort();
    runningRef.current = false;
    startingRef.current = false;
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
      rec.onstart = () => {
        runningRef.current = true;
        startingRef.current = false;
        setListening(true);
      };
      rec.onaudiostart = () => {
        runningRef.current = true;
        startingRef.current = false;
      };
      rec.onresult = (e) => {
        const idx = e.results.length - 1;
        const last = e.results[idx];
        if (last && last[0]) {
          onResultRef.current(last[0].transcript, last.isFinal, idx);
        }
      };
      rec.onerror = (e) => {
        startingRef.current = false;
        if (e.error === "not-allowed" || e.error === "service-not-allowed") {
          setError("Microphone is blocked. Allow mic access to use voice.");
          wantRef.current = false;
          setListening(false);
        }
        // "no-speech"/"aborted"/"network" are transient — onend restarts us.
      };
      rec.onend = () => {
        runningRef.current = false;
        startingRef.current = false;
        if (!wantRef.current) {
          setListening(false);
          return;
        }
        // Browsers stop after a pause (or sometimes after each phrase); restart
        // immediately to minimize the "deaf" gap where speech would be missed.
        safeStart();
      };
      recRef.current = rec;
    }

    wantRef.current = true;
    setListening(true);
    safeStart();

    // Watchdog: some browsers stop recognition without ever firing `onend`
    // (a silent death), which would leave the mic looking on but deaf. Poll
    // and revive it whenever we want it on but it isn't running.
    if (watchdogRef.current === null) {
      watchdogRef.current = setInterval(() => {
        if (wantRef.current && !runningRef.current) safeStart();
      }, 1500);
    }
  }, [safeStart]);

  // Stop listening when the app unmounts.
  useEffect(() => {
    return () => {
      wantRef.current = false;
      if (watchdogRef.current !== null) clearInterval(watchdogRef.current);
      recRef.current?.abort();
    };
  }, []);

  return { supported, listening, error, start, stop };
}
