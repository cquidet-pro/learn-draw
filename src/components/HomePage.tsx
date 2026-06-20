import { useCallback, useState } from "react";
import { drawingsForLevel } from "../data/animals";
import type { Animal, Level } from "../data/animals";
import { downloadColoringPdf } from "../lib/coloringPdf";
import { AnimalCard } from "./AnimalCard";
import { Brand } from "./Brand";
import { LevelSelector } from "./LevelSelector";
import { useVoiceControl, VoiceButton } from "../voice/VoiceProvider";
import { SoundButton } from "../sound/SoundProvider";
import { ThemeButton } from "../theme/ThemeButton";
import { applyTheme } from "../theme/theme";
import { heardAny } from "../voice/match";
import { TimeLimitSettings } from "../parental/TimeLimitSettings";
import { useTimeLimit } from "../parental/TimeLimitProvider";

/** Smoothly scroll the page up (-1) or down (+1) by most of a screenful. */
function scrollPage(dir: 1 | -1) {
  window.scrollBy({ top: dir * Math.round(window.innerHeight * 0.7), behavior: "smooth" });
}

// Spoken words (beyond each drawing's own name) that select it.
const ALIASES: Record<string, string[]> = {
  dog: ["dog", "puppy", "doggy", "doggie"],
  cat: ["cat", "kitty", "kitten"],
  hedgehog: ["hedgehog", "hedge hog", "porcupine"],
  fish: ["fish", "fishy"],
  dinosaur: ["dinosaur", "dino", "rex", "t rex"],
  butterfly: ["butterfly", "butter fly"],
  flower: ["flower", "flowers"],
  tree: ["tree"],
  sun: ["sun", "sunshine"],
  rainbow: ["rainbow"],
  cloud: ["cloud", "rain", "rain cloud", "clouds"],
  star: ["star"],
  heart: ["heart", "love"],
  house: ["house", "home house"],
  car: ["car", "truck", "vehicle"],
  family: ["family", "people"],
  princess: ["princess"],
};

interface Props {
  onPick: (animal: Animal) => void;
  /** Ids of animals already finished — shown with a green check. */
  completed: Set<string>;
  level: Level;
  onLevelChange: (level: Level) => void;
  onOpenFacts: () => void;
  onOpenPaintings: () => void;
  onOpenTrophies: () => void;
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
  onOpenTerms: () => void;
}

export function HomePage({
  onPick,
  completed,
  level,
  onLevelChange,
  onOpenFacts,
  onOpenPaintings,
  onOpenTrophies,
  onOpenPrivacy,
  onOpenContact,
  onOpenTerms,
}: Props) {
  const visible = drawingsForLevel(level);
  const [printing, setPrinting] = useState(false);
  const [showTimeLimit, setShowTimeLimit] = useState(false);
  // "Fewer distractions": hide the footer and the Print-to-color button.
  const { fewScreen } = useTimeLimit();

  const handlePrint = useCallback(async () => {
    if (printing || visible.length === 0) return;
    setPrinting(true);
    try {
      await downloadColoringPdf(visible, level);
    } finally {
      setPrinting(false);
    }
  }, [printing, visible, level]);

  const onCommand = useCallback(
    (transcript: string): boolean => {
      if (heardAny(transcript, ["up"])) {
        scrollPage(-1);
        return true;
      }
      if (heardAny(transcript, ["down"])) {
        scrollPage(1);
        return true;
      }
      if (heardAny(transcript, ["facts", "fun facts"])) {
        onOpenFacts();
        return true;
      }
      if (heardAny(transcript, ["paintings", "painting", "art", "famous"])) {
        onOpenPaintings();
        return true;
      }
      if (heardAny(transcript, ["stickers", "sticker", "trophies", "trophy", "badges"])) {
        onOpenTrophies();
        return true;
      }
      if (heardAny(transcript, ["print", "coloring", "color me"])) {
        handlePrint();
        return true;
      }
      if (heardAny(transcript, ["privacy"])) {
        onOpenPrivacy();
        return true;
      }
      if (heardAny(transcript, ["contact", "hello", "say hello"])) {
        onOpenContact();
        return true;
      }
      if (heardAny(transcript, ["terms", "rules"])) {
        onOpenTerms();
        return true;
      }
      if (heardAny(transcript, ["dark", "dark mode", "night", "night mode"])) {
        applyTheme("dark");
        return true;
      }
      if (heardAny(transcript, ["light", "light mode", "day", "day mode"])) {
        applyTheme("light");
        return true;
      }
      for (const animal of visible) {
        const words = ALIASES[animal.id] ?? [animal.name.toLowerCase()];
        if (heardAny(transcript, words)) {
          onPick(animal);
          return true;
        }
      }
      return false;
    },
    [
      onPick,
      onOpenFacts,
      onOpenPaintings,
      onOpenTrophies,
      onOpenPrivacy,
      onOpenContact,
      onOpenTerms,
      visible,
      handlePrint,
    ],
  );
  useVoiceControl(onCommand);

  return (
    <div className="home">
      <Brand />
      <p className="subtitle">Pick something to draw 👇</p>

      {/* Difficulty levels, with Famous Paintings sitting right after Harder
          as a fourth "collection" to draw. */}
      <div className="level-row">
        <LevelSelector level={level} onChange={onLevelChange} />
        <button
          className="level-btn paintings-pick"
          onClick={onOpenPaintings}
          aria-label="Famous paintings"
        >
          <span className="level-icon" aria-hidden="true">
            🖼️
          </span>
          <span className="level-label">Paintings</span>
        </button>
      </div>

      {/* Visual divider between the "what to draw" picker above and the tool
          buttons below. */}
      <div className="section-divider" role="separator" aria-hidden="true" />

      <div className="control-bar">
        {/* Settings: voice, sound, theme and the grown-up time limit. */}
        <div className="control-group" role="group" aria-label="Settings">
          <span className="control-group-label">⚙️ Settings</span>
          <div className="control-group-btns">
            <VoiceButton />
            <SoundButton />
            <ThemeButton />
            <button
              className="facts-btn grownup-btn"
              onClick={() => setShowTimeLimit(true)}
              aria-label="For grown-ups — daily time limit and screen lock"
            >
              <span className="grownup-icon" aria-hidden="true">
                🧑‍🦰
              </span>{" "}
              For grown-ups
            </button>
          </div>
        </div>

        <div className="control-group-sep" aria-hidden="true" />

        {/* Explore: stickers, facts and printable coloring pages. */}
        <div className="control-group" role="group" aria-label="Explore">
          <span className="control-group-label">✨ Explore</span>
          <div className="control-group-btns">
            <button className="facts-btn" onClick={onOpenTrophies}>
              🏆 My Stickers
            </button>
            <button className="facts-btn" onClick={onOpenFacts}>
              💡 Fun Facts
            </button>
            {!fewScreen && (
              <button
                className="facts-btn"
                onClick={handlePrint}
                disabled={printing || visible.length === 0}
              >
                {printing ? "⏳ Making PDF…" : "🖨️ Print to color"}
              </button>
            )}
          </div>
        </div>
      </div>

      {showTimeLimit && <TimeLimitSettings onClose={() => setShowTimeLimit(false)} />}

      {/* Up/down scroll controls on the left, centred at the drawing level. */}
      <div className="side-scroll">
        <button
          className="scroll-btn"
          onClick={() => scrollPage(-1)}
          aria-label="Scroll up"
        >
          ▲
        </button>
        <button
          className="scroll-btn"
          onClick={() => scrollPage(1)}
          aria-label="Scroll down"
        >
          ▼
        </button>
      </div>

      {visible.length === 0 ? (
        <p className="empty-state">
          More drawings for this level are coming soon! 🎨✨
          <br />
          Try the 🌱 Easy level for now.
        </p>
      ) : (
        <div className="card-grid">
          {visible.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              done={completed.has(animal.id)}
              onClick={() => onPick(animal)}
            />
          ))}
        </div>
      )}

      {!fewScreen && (
      <footer className="home-footer">
        {/* App store badges — not clickable yet; the apps aren't published. */}
        <div className="store-badges" aria-label="Mobile apps coming soon">
          <span
            className="store-badge"
            role="img"
            aria-label="Apple App Store — coming soon"
          >
            <span className="store-badge-icon" aria-hidden="true">
              🍎
            </span>
            <span className="store-badge-text">
              <small>Coming soon</small>
              <strong>App Store</strong>
            </span>
          </span>
          <span
            className="store-badge"
            role="img"
            aria-label="Google Play — coming soon"
          >
            <span className="store-badge-icon" aria-hidden="true">
              ▶️
            </span>
            <span className="store-badge-text">
              <small>Coming soon</small>
              <strong>Google Play</strong>
            </span>
          </span>
        </div>

        <button className="footer-link" onClick={onOpenPrivacy}>
          🔒 Privacy
        </button>
        <span className="footer-dot" aria-hidden="true">
          ·
        </span>
        <button className="footer-link" onClick={onOpenContact}>
          👋 Say hello
        </button>
        <span className="footer-dot" aria-hidden="true">
          ·
        </span>
        <button className="footer-link" onClick={onOpenTerms}>
          📜 Rules
        </button>

        {/* Optional support button (for grown-ups) — opens Stripe's hosted
            checkout in a new tab. No keys or backend involved. */}
        <div className="coffee-row">
          <a
            className="coffee-btn"
            href="https://buy.stripe.com/5kQ7sE4pQdjc2JGfrG8Zq00"
            target="_blank"
            rel="noopener noreferrer"
          >
            ☕ Buy me a coffee
          </a>
        </div>
        <p className="footer-love">
          <strong className="footer-brand">Learn to Draw</strong> — made with ❤️ for
          little artists, and built with them 🖍️
        </p>
      </footer>
      )}
    </div>
  );
}
