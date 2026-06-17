import { useCallback } from "react";
import { useVoiceControl, VoiceButton } from "../voice/VoiceProvider";
import { heardAny } from "../voice/match";

interface Props {
  onHome: () => void;
}

// Short, fun, picture-first facts about drawing.
const FACTS: { emoji: string; text: string }[] = [
  { emoji: "🦣", text: "The oldest drawings are over 40,000 years old — made in caves!" },
  { emoji: "🖐️", text: "Leonardo da Vinci could draw with one hand and write with the other at the same time!" },
  { emoji: "🧠", text: "Doodling helps your brain remember things better." },
  { emoji: "🖍️", text: "The first box of crayons was sold over 100 years ago." },
  { emoji: "🎨", text: "There's no wrong way to draw — every artist has their own style!" },
  { emoji: "✏️", text: "One pencil can draw a line about 35 miles long!" },
  { emoji: "🟣", text: "Mix red and blue and you get purple. Try it!" },
  { emoji: "🚀", text: "Astronauts have drawn pictures up in space!" },
  { emoji: "🌈", text: "A rainbow has 7 colors — use every crayon!" },
  { emoji: "🐙", text: "An octopus can change its color, like it's drawing on itself." },
];

export function FactsPage({ onHome }: Props) {
  const onCommand = useCallback(
    (transcript: string) => {
      if (heardAny(transcript, ["home", "back", "menu"])) onHome();
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
        <h1>💡 Fun Drawing Facts</h1>
      </header>

      <div className="control-bar">
        <VoiceButton />
      </div>

      <div className="facts-grid">
        {FACTS.map((f, i) => (
          <div className="fact-card" key={i}>
            <div className="fact-emoji" aria-hidden="true">
              {f.emoji}
            </div>
            <p className="fact-text">{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
