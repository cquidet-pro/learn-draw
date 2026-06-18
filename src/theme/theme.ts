export type Theme = "light" | "dark";

const KEY = "learn-draw:theme";

/** Current theme, read from the <html data-theme> attribute set on first load
 *  (see the inline script in index.html, which avoids a flash of the wrong
 *  theme). */
export function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

/** Apply a theme everywhere: the root attribute (drives the CSS), the saved
 *  preference, and the browser/PWA status-bar colour. */
export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* ignore storage errors (e.g. private mode) */
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#181824" : "#ffd166");
  // Let any on-screen toggle update its label (e.g. when changed by voice).
  window.dispatchEvent(new CustomEvent<Theme>("learn-draw:themechange", { detail: theme }));
}
