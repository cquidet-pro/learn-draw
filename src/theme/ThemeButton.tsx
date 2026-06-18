import { useEffect, useState } from "react";
import { applyTheme, getTheme, type Theme } from "./theme";

/** A sun/moon toggle that switches between the light and dark themes.
 *  Gentle on little eyes in the evening. The choice is remembered. */
export function ThemeButton() {
  const [theme, setTheme] = useState<Theme>(getTheme);

  // Stay in sync if the theme is changed elsewhere (e.g. by voice command).
  useEffect(() => {
    const onChange = (e: Event) => setTheme((e as CustomEvent<Theme>).detail);
    window.addEventListener("learn-draw:themechange", onChange);
    return () => window.removeEventListener("learn-draw:themechange", onChange);
  }, []);

  const toggle = () => {
    applyTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className="facts-btn"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
