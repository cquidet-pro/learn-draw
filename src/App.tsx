import { useCallback, useState } from "react";
import type { Animal, Level } from "./data/animals";
import { drawingsForLevel } from "./data/animals";
import { masterpieces, isMasterpiece } from "./data/masterpieces";
import { HomePage } from "./components/HomePage";
import { DrawingPlayer } from "./components/DrawingPlayer";
import { FactsPage } from "./components/FactsPage";
import { PaintingsPage } from "./components/PaintingsPage";
import { VoiceProvider } from "./voice/VoiceProvider";

const COMPLETED_KEY = "learn-draw:completed";
const LEVEL_KEY = "learn-draw:level";

function loadCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function loadLevel(): Level {
  const n = Number(localStorage.getItem(LEVEL_KEY));
  return n === 7 || n === 10 ? n : 5;
}

export function App() {
  const [selected, setSelected] = useState<Animal | null>(null);
  const [showFacts, setShowFacts] = useState(false);
  // Keeping this true while a painting is selected means "Home"/"Pick another"
  // return to the paintings gallery rather than the main home screen.
  const [showPaintings, setShowPaintings] = useState(false);
  // Animals the child has finished — shown with a green check on the home page.
  const [completed, setCompleted] = useState<Set<string>>(loadCompleted);
  const [level, setLevelState] = useState<Level>(loadLevel);

  const markCompleted = useCallback((id: string) => {
    setCompleted((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev).add(id);
      try {
        localStorage.setItem(COMPLETED_KEY, JSON.stringify([...next]));
      } catch {
        /* ignore storage errors (e.g. private mode) */
      }
      return next;
    });
  }, []);

  const setLevel = useCallback((lvl: Level) => {
    setLevelState(lvl);
    try {
      localStorage.setItem(LEVEL_KEY, String(lvl));
    } catch {
      /* ignore storage errors */
    }
  }, []);

  let screen;
  if (selected) {
    // Auto-advance stays within the collection the drawing came from.
    const inPaintings = isMasterpiece(selected.id);
    const pool = inPaintings ? masterpieces : drawingsForLevel(level);
    screen = (
      <DrawingPlayer
        key={selected.id}
        animal={selected}
        pool={pool}
        completed={completed}
        // Leaving a painting returns to the paintings gallery (so "pick another"
        // stays among paintings), so label the back button for that, not "Home".
        onHome={() => setSelected(null)}
        homeLabel={inPaintings ? "🖼️ Paintings" : "🏠 Home"}
        homeAria={inPaintings ? "Back to paintings" : "Back to home"}
        onComplete={() => markCompleted(selected.id)}
        onGoTo={setSelected}
      />
    );
  } else if (showPaintings) {
    screen = (
      <PaintingsPage
        onPick={setSelected}
        onHome={() => setShowPaintings(false)}
        completed={completed}
      />
    );
  } else if (showFacts) {
    screen = <FactsPage onHome={() => setShowFacts(false)} />;
  } else {
    screen = (
      <HomePage
        onPick={setSelected}
        completed={completed}
        level={level}
        onLevelChange={setLevel}
        onOpenFacts={() => setShowFacts(true)}
        onOpenPaintings={() => setShowPaintings(true)}
      />
    );
  }

  return <VoiceProvider>{screen}</VoiceProvider>;
}
