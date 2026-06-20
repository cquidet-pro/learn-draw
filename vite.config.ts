import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

// After the build, list everything worth precaching and bake it (plus a version
// hash derived from the content-hashed filenames) into dist/sw.js, so the app
// works fully offline on the next visit. Kept dependency-free on purpose.
function precacheSW(): Plugin {
  let outDir = "dist";
  const EXT = new Set([
    ".js", ".css", ".html", ".jpg", ".jpeg", ".png", ".svg",
    ".webmanifest", ".woff", ".woff2",
  ]);
  // Not needed offline — skip to keep the precache lean.
  const SKIP = new Set(["og-image.png", "robots.txt", "sitemap.xml", "sw.js"]);

  return {
    name: "precache-sw",
    apply: "build",
    configResolved(c) {
      outDir = c.build.outDir;
    },
    closeBundle() {
      const root = path.resolve(outDir);
      const swPath = path.join(root, "sw.js");
      if (!fs.existsSync(swPath)) return;

      const files: string[] = [];
      const walk = (dir: string, rel = "") => {
        for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
          const r = rel ? `${rel}/${e.name}` : e.name;
          if (e.isDirectory()) walk(path.join(dir, e.name), r);
          else if (
            !SKIP.has(r) &&
            !r.endsWith(".map") &&
            EXT.has(path.extname(e.name).toLowerCase())
          ) {
            files.push(r);
          }
        }
      };
      walk(root);
      files.sort();

      // Version hash from the filenames (each already carries a content hash).
      let h = 0;
      const joined = files.join("|");
      for (let i = 0; i < joined.length; i++) {
        h = (Math.imul(h, 31) + joined.charCodeAt(i)) >>> 0;
      }
      const version = h.toString(16);
      const list = files.map((f) => `"./${f}"`).join(",");

      let sw = fs.readFileSync(swPath, "utf8");
      sw = sw
        .replace('const VERSION = "dev";', `const VERSION = "${version}";`)
        .replace("const PRECACHE = [];", `const PRECACHE = [${list}];`);
      fs.writeFileSync(swPath, sw);
      // eslint-disable-next-line no-console
      console.log(`[precache-sw] ${files.length} files cached, version ${version}`);
    },
  };
}

// base must match the GitHub Pages repo path so assets resolve correctly:
// https://cquidet-pro.github.io/learn-draw/
export default defineConfig({
  plugins: [react(), precacheSW()],
  base: "/learn-draw/",
});
