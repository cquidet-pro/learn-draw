import { useCallback, useEffect, useRef, useState } from "react";
import type { Animal, Level } from "./data/animals";
import { drawingsForLevel, drawingLevel, getAnimal } from "./data/animals";
import { masterpieces, isMasterpiece } from "./data/masterpieces";
import { isFriendOnly, earnedFriendPool, friendPool } from "./data/friends";
import { flags, isFlag } from "./data/flags";
import { HomePage } from "./components/HomePage";
import { OfflineGuard } from "./components/OfflineGuard";
import { DrawingPlayer } from "./components/DrawingPlayer";
import { FactsPage } from "./components/FactsPage";
import { PaintingsPage } from "./components/PaintingsPage";
import { FlagsPage } from "./components/FlagsPage";
import { PrivacyPage } from "./components/PrivacyPage";
import { ContactPage } from "./components/ContactPage";
import { TermsPage } from "./components/TermsPage";
import { TrophyPage } from "./components/TrophyPage";
import { VoiceProvider } from "./voice/VoiceProvider";
import { SoundProvider } from "./sound/SoundProvider";
import { TimeLimitProvider } from "./parental/TimeLimitProvider";

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

// Each in-app screen is a route on a navigation stack. The browser Back button
// pops the stack (returning to the previous screen) instead of leaving the
// site — important for young children, who could otherwise navigate away with
// a single tap. "home" is always the bottom of the stack.
type Route =
  | { kind: "home" }
  | { kind: "paintings" }
  | { kind: "flags" }
  | { kind: "facts" }
  | { kind: "privacy" }
  | { kind: "contact" }
  | { kind: "terms" }
  | { kind: "trophies" }
  | { kind: "drawing"; animal: Animal };

export function App() {
  // Animals the child has finished — shown with a green check on the home page.
  const [completed, setCompleted] = useState<Set<string>>(loadCompleted);
  const [level, setLevelState] = useState<Level>(loadLevel);

  const [stack, setStack] = useState<Route[]>([{ kind: "home" }]);
  const current = stack[stack.length - 1];
  const previous = stack[stack.length - 2];

  // Mirror the stack depth in the browser's history so the Back/Forward
  // buttons (and Android's hardware back) move through our screens.
  const depthRef = useRef(0);

  useEffect(() => {
    // Establish a base history entry for the home screen.
    window.history.replaceState({ depth: 0 }, "");
    const onPop = (e: PopStateEvent) => {
      const depth =
        e.state && typeof e.state.depth === "number" ? e.state.depth : 0;
      depthRef.current = depth;
      // Truncate the stack to match where history landed.
      setStack((prev) => prev.slice(0, depth + 1));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Navigate forward into a new screen (adds a history entry).
  const push = useCallback((route: Route) => {
    depthRef.current += 1;
    window.history.pushState({ depth: depthRef.current }, "");
    setStack((prev) => [...prev, route]);
  }, []);

  // Swap the current screen without growing history (used for auto-advance,
  // so Back returns to where the child started, not through every drawing).
  const replace = useCallback((route: Route) => {
    setStack((prev) => [...prev.slice(0, -1), route]);
  }, []);

  // Go back one screen. Drives the browser so Back button and our own
  // Home/Back buttons share a single code path.
  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  const markCompleted = useCallback((id: string) => {
    // Reward-only "friend" drawings and flags are just for fun — they don't
    // count toward level progress or the reward milestones.
    if (isFriendOnly(id) || isFlag(id)) return;
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

  const resetCompleted = useCallback(() => {
    setCompleted(new Set());
    try {
      localStorage.removeItem(COMPLETED_KEY);
    } catch {
      /* ignore storage errors */
    }
  }, []);

  const setLevel = useCallback((lvl: Level) => {
    setLevelState(lvl);
    try {
      localStorage.setItem(LEVEL_KEY, String(lvl));
    } catch {
      /* ignore storage errors */
    }
  }, []);

  // Deep link: the per-drawing SEO landing pages (/draw/<id>/) link into the app
  // as /?d=<id> to open that drawing directly. Handle it once on mount.
  const deepLinkedRef = useRef(false);
  useEffect(() => {
    if (deepLinkedRef.current) return;
    deepLinkedRef.current = true;
    const id = new URLSearchParams(window.location.search).get("d");
    if (!id) return;
    const animal =
      getAnimal(id) ??
      friendPool.find((f) => f.id === id) ??
      masterpieces.find((m) => m.id === id) ??
      flags.find((f) => f.id === id);
    if (!animal) return;
    // Match the level so auto-advance stays within the right pool.
    if (getAnimal(id)) setLevel(drawingLevel(animal));
    push({ kind: "drawing", animal });
  }, [push, setLevel]);

  let screen;
  if (current.kind === "drawing") {
    const animal = current.animal;
    // The Back button returns to whichever screen we came from, so label it
    // to match (the paintings/flags gallery, the sticker shelf, or home).
    const cameFromPaintings = previous?.kind === "paintings";
    const cameFromFlags = previous?.kind === "flags";
    const cameFromTrophies = previous?.kind === "trophies";
    // Auto-advance stays within the collection the drawing came from. Drawing
    // from the sticker shelf (or a friend-only sticker) cycles among the
    // stickers the child has actually EARNED — never one still locked.
    const inStickers = cameFromTrophies || isFriendOnly(animal.id);
    const pool = inStickers
      ? earnedFriendPool(completed.size)
      : isMasterpiece(animal.id)
        ? masterpieces
        : isFlag(animal.id)
          ? flags
          : drawingsForLevel(drawingLevel(animal));
    const homeLabel = cameFromPaintings
      ? "🖼️ Paintings"
      : cameFromFlags
        ? "🏳️ Flags"
        : cameFromTrophies
          ? "🏆 Stickers"
          : "🏠 Home";
    const homeAria = cameFromPaintings
      ? "Back to paintings"
      : cameFromFlags
        ? "Back to flags"
        : cameFromTrophies
          ? "Back to my stickers"
          : "Back to home";
    screen = (
      <DrawingPlayer
        key={animal.id}
        animal={animal}
        pool={pool}
        completed={completed}
        onHome={goBack}
        homeLabel={homeLabel}
        homeAria={homeAria}
        stickerMode={inStickers}
        onComplete={() => markCompleted(animal.id)}
        onGoTo={(next) => replace({ kind: "drawing", animal: next })}
      />
    );
  } else if (current.kind === "paintings") {
    screen = (
      <PaintingsPage
        onPick={(animal) => push({ kind: "drawing", animal })}
        onHome={goBack}
        completed={completed}
      />
    );
  } else if (current.kind === "flags") {
    screen = (
      <FlagsPage
        onPick={(animal) => push({ kind: "drawing", animal })}
        onHome={goBack}
        completed={completed}
      />
    );
  } else if (current.kind === "facts") {
    screen = <FactsPage onHome={goBack} />;
  } else if (current.kind === "privacy") {
    screen = <PrivacyPage onHome={goBack} />;
  } else if (current.kind === "contact") {
    screen = <ContactPage onHome={goBack} />;
  } else if (current.kind === "terms") {
    screen = <TermsPage onHome={goBack} />;
  } else if (current.kind === "trophies") {
    screen = (
      <TrophyPage
        onHome={goBack}
        completed={completed}
        onReset={resetCompleted}
        onPick={(animal) => push({ kind: "drawing", animal })}
      />
    );
  } else {
    screen = (
      <HomePage
        onPick={(animal) => push({ kind: "drawing", animal })}
        completed={completed}
        level={level}
        onLevelChange={setLevel}
        onOpenFacts={() => push({ kind: "facts" })}
        onOpenPaintings={() => push({ kind: "paintings" })}
        onOpenFlags={() => push({ kind: "flags" })}
        onOpenTrophies={() => push({ kind: "trophies" })}
        onOpenPrivacy={() => push({ kind: "privacy" })}
        onOpenContact={() => push({ kind: "contact" })}
        onOpenTerms={() => push({ kind: "terms" })}
      />
    );
  }

  return (
    <TimeLimitProvider>
      <SoundProvider>
        <VoiceProvider>
          {screen}
          <OfflineGuard />
        </VoiceProvider>
      </SoundProvider>
    </TimeLimitProvider>
  );
}
