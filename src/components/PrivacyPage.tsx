import { useCallback } from "react";
import { useVoiceControl, VoiceButton } from "../voice/VoiceProvider";
import { heardAny } from "../voice/match";

interface Props {
  onHome: () => void;
}

// Friendly, plain-language privacy points (kid- and grown-up-readable).
const POINTS: { emoji: string; text: string }[] = [
  { emoji: "🍪", text: "No cookies here — only the kind you eat are yummy! We don't use any." },
  { emoji: "💾", text: "Your drawings and stars stay right here in your own device — they never go anywhere else." },
  { emoji: "🙈", text: "We don't watch you. No ads, no trackers, no accounts, nothing collected." },
  { emoji: "🔒", text: "The grown-up code, timer and full-screen settings live only on this device." },
  { emoji: "🎤", text: "If you turn on \"Talk to me\", your browser listens to help — turn it off any time!" },
  { emoji: "💛", text: "We made this just for fun, to help you become a happy little artist." },
];

export function PrivacyPage({ onHome }: Props) {
  const onCommand = useCallback(
    (transcript: string): boolean => {
      if (heardAny(transcript, ["home", "back", "menu"])) {
        onHome();
        return true;
      }
      return false;
    },
    [onHome],
  );
  useVoiceControl(onCommand);

  return (
    <div className="facts-page">
      <header className="player-header">
        <button className="home-btn" onClick={onHome} aria-label="Back to home">
          🏠 Home
        </button>
        <h1>🔒 Your Privacy</h1>
      </header>

      <p className="subtitle">Safe, simple, and just for fun! 🌈</p>

      <div className="control-bar">
        <VoiceButton />
      </div>

      <div className="facts-grid">
        {POINTS.map((p, i) => (
          <div className="fact-card" key={i}>
            <div className="fact-emoji" aria-hidden="true">
              {p.emoji}
            </div>
            <p className="fact-text">{p.text}</p>
          </div>
        ))}
      </div>

      <div className="info-note">
        <p>
          <b>For grown-ups:</b> Kidoo is a static website with no backend,
          no cookies, no analytics and no third-party trackers. Progress and the
          parental controls (PIN, daily time limit, full-screen lock) are stored
          only in this browser's local storage and are never transmitted. The
          optional voice control uses the browser's built-in Web Speech API, which
          may send audio to the browser vendor for recognition while it's on. The
          site is hosted on GitHub Pages, which processes visitors' IP addresses in
          standard server logs as the host.
        </p>
      </div>
    </div>
  );
}
