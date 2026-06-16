import { useEffect } from "react";

interface KeyboardActions {
  onNext: () => void;
  onPrev: () => void;
  onHome?: () => void;
}

/**
 * Global keyboard control for the drawing player:
 *   Space            -> next step
 *   ArrowLeft / Backspace -> previous step
 *   Escape           -> home (optional)
 * preventDefault stops Space/Backspace from scrolling or navigating back.
 */
export function useKeyboard({ onNext, onPrev, onHome }: KeyboardActions) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      switch (e.key) {
        case " ":
        case "Spacebar": // older browsers
        case "ArrowRight":
          e.preventDefault();
          onNext();
          break;
        case "ArrowLeft":
        case "Backspace":
          e.preventDefault();
          onPrev();
          break;
        case "Escape":
          if (onHome) {
            e.preventDefault();
            onHome();
          }
          break;
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNext, onPrev, onHome]);
}
