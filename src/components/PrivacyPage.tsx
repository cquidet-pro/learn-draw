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
  { emoji: "🙈", text: "No ads, no accounts, and no trackers following you around — we only count how many people visit, with no names and no cookies." },
  { emoji: "💌", text: "If a grown-up sends us feedback, only what they type in the form is emailed to us — nothing else." },
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
          <b>For grown-ups:</b> Learn to Draw is a static website with no backend,
          no cookies, and no advertising or cross-site trackers. Progress and the
          parental controls (PIN, daily time limit, full-screen lock) are stored
          only in this browser's local storage and are never transmitted. We use
          Cloudflare Web Analytics — a privacy-friendly, cookieless service that
          counts page views in aggregate and does not collect personal data or
          build visitor profiles. If you use the feedback form, the name, email
          and message you enter are sent to us by email via Web3Forms (a form
          delivery service) only when you submit it. The optional voice control
          uses the browser's built-in Web Speech API, which may send audio to the
          browser vendor for recognition while it's on. The site is hosted on
          GitHub Pages, which processes visitors' IP addresses in standard server
          logs as the host.
        </p>
      </div>
    </div>
  );
}
