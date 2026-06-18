import { useCallback } from "react";
import { useVoiceControl, VoiceButton } from "../voice/VoiceProvider";
import { heardAny } from "../voice/match";

interface Props {
  onHome: () => void;
}

// Friendly, plain-language "house rules" (kid- and grown-up-readable).
const POINTS: { emoji: string; text: string }[] = [
  { emoji: "🎉", text: "Learn to Draw is free to use and just for fun — draw as much as you like!" },
  { emoji: "🖍️", text: "Everything you make here is yours. Be proud and keep creating!" },
  { emoji: "🤝", text: "Please be kind and use the app the nice way it was meant to be used." },
  { emoji: "🎨", text: "The drawings and pictures in the app belong to us — enjoy them, but please don't copy them to sell." },
  { emoji: "🌈", text: "We try to keep everything working and safe, but it's a playful app — have fun and don't worry!" },
];

export function TermsPage({ onHome }: Props) {
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
        <h1>📜 Friendly Rules</h1>
      </header>

      <p className="subtitle">A few happy house rules 🌟</p>

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
          <b>For grown-ups:</b> Learn to Draw is provided free of charge, "as is",
          for personal, non-commercial use, without warranty of any kind. All
          source code and original artwork are the property of the author and may
          not be reproduced, redistributed or used commercially without written
          permission. The bundled painting images are public-domain reproductions.
          By using the site you accept that it is a playful educational tool and
          that the author is not liable for any loss arising from its use.
        </p>
      </div>
    </div>
  );
}
