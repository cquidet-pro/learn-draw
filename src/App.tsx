import { useCallback, useState } from "react";
import type { Animal } from "./data/animals";
import { HomePage } from "./components/HomePage";
import { DrawingPlayer } from "./components/DrawingPlayer";
import { VoiceProvider } from "./voice/VoiceProvider";

const STORAGE_KEY = "learn-draw:completed";

function loadCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export function App() {
  const [selected, setSelected] = useState<Animal | null>(null);
  // Animals the child has finished — shown with a green check on the home page.
  const [completed, setCompleted] = useState<Set<string>>(loadCompleted);

  const markCompleted = useCallback((id: string) => {
    setCompleted((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev).add(id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        /* ignore storage errors (e.g. private mode) */
      }
      return next;
    });
  }, []);

  return (
    <VoiceProvider>
      {selected ? (
        <DrawingPlayer
          key={selected.id}
          animal={selected}
          onHome={() => setSelected(null)}
          onComplete={() => markCompleted(selected.id)}
        />
      ) : (
        <HomePage onPick={setSelected} completed={completed} />
      )}
    </VoiceProvider>
  );
}
