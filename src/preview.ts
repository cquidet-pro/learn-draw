// Feature-preview gating.
//
// The World Cup section (the ⚽ flags collection) and its football-cup stickers
// are still in progress, so they are HIDDEN on the public site. They reveal only
// via a private link that carries the `worldcup` flag, e.g.
//
//     https://learn2drawkids.com/?worldcup=1
//
// Visiting that link remembers the choice on the device (localStorage), so the
// preview survives reloads and in-app navigation. Append `?worldcup=0` to hide it
// again. Everything runs client-side; in any non-browser context (the build-time
// SEO pre-render) the flag reads false, so the feature stays hidden by default.

const KEY = "wc-preview";

function readUrlFlag(): "on" | "off" | null {
  try {
    const params = new URLSearchParams(window.location.search);
    let v = params.get("worldcup");
    if (v === null && window.location.hash) {
      const h = window.location.hash.replace(/^#/, "");
      const hp = new URLSearchParams(h.includes("=") ? h : `${h}=1`);
      if (hp.has("worldcup")) v = hp.get("worldcup");
    }
    if (v === null) return null;
    return v === "0" || v === "false" ? "off" : "on";
  } catch {
    return null;
  }
}

let cached: boolean | null = null;

/** Whether the World Cup preview is unlocked on this device/session. */
export function worldCupVisible(): boolean {
  if (cached !== null) return cached;
  let on = false;
  try {
    const url = readUrlFlag();
    if (url === "on") {
      on = true;
      localStorage.setItem(KEY, "1");
    } else if (url === "off") {
      on = false;
      localStorage.setItem(KEY, "0");
    } else {
      on = localStorage.getItem(KEY) === "1";
    }
  } catch {
    on = false;
  }
  cached = on;
  return on;
}
