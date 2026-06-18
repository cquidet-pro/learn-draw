import { useCallback } from "react";
import { useVoiceControl, VoiceButton } from "../voice/VoiceProvider";
import { heardAny } from "../voice/match";

interface Props {
  onHome: () => void;
}

const NOTES: { emoji: string; text: string }[] = [
  { emoji: "👋", text: "Hello there, and thank you for visiting!" },
  { emoji: "🎨", text: "We hope you had heaps of fun drawing today." },
  { emoji: "💌", text: "This little app was made with love for young artists everywhere." },
  { emoji: "🌟", text: "Keep being creative — there's no wrong way to draw!" },
];

export function ContactPage({ onHome }: Props) {
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
        <h1>👋 Say Hello!</h1>
      </header>

      <p className="subtitle">A little note from us to you 💛</p>

      <div className="control-bar">
        <VoiceButton />
      </div>

      <div className="facts-grid">
        {NOTES.map((n, i) => (
          <div className="fact-card" key={i}>
            <div className="fact-emoji" aria-hidden="true">
              {n.emoji}
            </div>
            <p className="fact-text">{n.text}</p>
          </div>
        ))}
      </div>

      <p className="made-with-love">Made with ❤️ for happy little artists 🖍️</p>
    </div>
  );
}
