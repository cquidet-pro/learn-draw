---
name: run-app
description: >-
  Launch and DRIVE the running Learn 2 Draw app to see a change working — start
  the Vite dev server and remote-control headless Chrome over the DevTools
  Protocol (no Playwright/chromium-cli needed). Deep-link straight to any
  drawing, flag, painting or section, click through the steps, read the live
  hint/step text, and screenshot each. Use for `/run`, "run the app",
  "remote-control", "show me <drawing> working", or verifying a flag/drawing
  change in the real app (not just a data render).
---

# Run & drive the app

Learn 2 Draw is a pure client-side **React 18 + Vite** static app (no backend).
You drive it the way a child would: open a screen, press ▶, watch it animate.
There's **no Playwright or chromium-cli** in the repo — but Node ≥22 ships a
global `WebSocket`, so drive the system Chrome directly over the **DevTools
Protocol (CDP)**. This recipe is verified on this macOS checkout.

## 1. Start the dev server (background)

```bash
export PATH="/opt/homebrew/bin:$PATH"
(npm run dev -- --port 5181 > /tmp/vite-dev.log 2>&1 &)
sleep 4
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5181/   # expect 200
```

## 2. Deep links — navigate without clicking

`App.tsx` reads URL params **once on mount**, so you can jump straight to a
screen instead of clicking through the home grid:

- `/?d=<id>` → open a drawing's player directly. IDs are the `Animal.id`:
  flags `flag-brazil` / `flag-united-kingdom` / `flag-australia` …, drawings
  `dog` / `cat` / `dog-7` / `princess`, paintings `starry-night`, etc.
- `/?go=flags` (also `paintings`, `facts`, `contact`) → open that section.
- The **sticker shelf / home grid** have no deep link — reach them by clicking
  (see the driver's click helper), or start a drawing and press Home.

## 3. Launch Chrome with remote debugging, pointed at a deep link

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --remote-debugging-port=9222 --window-size=900,820 \
  --force-device-scale-factor=1 --hide-scrollbars \
  --user-data-dir=/tmp/chrome-remote-profile \
  "http://localhost:5181/?d=flag-brazil" > /tmp/chrome-remote.log 2>&1 &
sleep 3
```

## 4. Drive it with the CDP driver (Node global WebSocket)

Writes a screenshot per step and prints the live step indicator + hint, so you
can both *see* and *assert* what the app shows. It clicks the on-screen **Next**
button (`[aria-label="Next step"]`) — more reliable than synthesising key events.

```bash
cat > /tmp/cdp-drive.mjs << 'EOF'
import fs from 'fs';
const URLSUB = process.env.URLSUB || 'flag-brazil';   // substring identifying the page target
const STEPS = Number(process.env.STEPS || 6);          // how many "Next" clicks
const targets = await (await fetch('http://localhost:9222/json')).json();
const page = targets.find(t => t.type === 'page' && t.url.includes(URLSUB));
if (!page) { console.error('no page target for', URLSUB); process.exit(1); }
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0; const pending = new Map();
const send = (method, params={}) => new Promise(r => { const i=++id; pending.set(i,r); ws.send(JSON.stringify({id:i,method,params})); });
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } });
await new Promise(r => ws.addEventListener('open', r));
await send('Page.enable'); await send('Runtime.enable');
const wait = ms => new Promise(r => setTimeout(r, ms));
const ev = expr => send('Runtime.evaluate', { expression: expr, returnByValue: true }).then(r => r.result?.value);
const shot = async name => { const r = await send('Page.captureScreenshot', { format:'png' }); fs.writeFileSync(`/tmp/rc-${name}.png`, Buffer.from(r.data,'base64')); };

await wait(1800);  // mount + deep-link routing + first animation
console.log('heading:', await ev("document.querySelector('.player-header h1')?.textContent"));
for (let k = 1; k <= STEPS + 1; k++) {
  console.log(await ev("document.querySelector('.step-indicator')?.textContent"), '|', await ev("document.querySelector('.hint')?.textContent"));
  await shot('s' + k);
  if (k <= STEPS) { await ev("document.querySelector('[aria-label=\"Next step\"]')?.click()"); await wait(1500); }
}
ws.close(); console.log('done');
EOF
URLSUB=flag-brazil STEPS=9 node /tmp/cdp-drive.mjs
```

Then **Read the PNGs** (`/tmp/rc-s5.png` …). A blank frame means the app didn't
mount — check `/tmp/vite-dev.log`. To drive a different screen, relaunch Chrome
(step 3) at a new deep link, or use `ev("…click()…")` to click buttons
(e.g. `[aria-label="My stickers"]`, the ▶ `[aria-label="Next step"]`,
`◀` `[aria-label="Previous step"]`).

## 5. Clean up

```bash
pkill -f "vite --port 5181"; pkill -f "remote-debugging-port=9222"
```

## Notes

- Prefer this over re-deriving: it's the verified launch+drive path.
- For pure *data*/SVG checks (a flag's geometry, `expandColorSteps` output) the
  faster loop is still the esbuild-bundle + headless screenshot trick in the
  **add-drawing** skill — use this skill when you need the *real app* (routing,
  keyboard/voice, the player's step state) in the loop.
