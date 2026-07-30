/**
 * Mirror WordPress site (Elementor) into a local static copy for pixel-identical hosting.
 */
import scrape from "website-scraper";
import { existsSync, rmSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { join, extname, relative } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "static-mirror");
const ORIGIN = "https://www.rtc.echipadetocilari.ro";

const PAGES = [
  `${ORIGIN}/`,
  `${ORIGIN}/programe/`,
  `${ORIGIN}/despre-noi/`,
  `${ORIGIN}/tabere/`,
  `${ORIGIN}/rezerva-teren/`,
  `${ORIGIN}/contact/`,
];

if (existsSync(OUT)) {
  rmSync(OUT, { recursive: true, force: true });
}
// website-scraper creates OUT itself — must not pre-exist

console.log("Mirroring", ORIGIN, "→", OUT);

await scrape({
  urls: PAGES,
  directory: OUT,
  recursive: false,
  maxRecursiveDepth: 0,
  requestConcurrency: 4,
  sources: [
    { selector: "img", attr: "src" },
    { selector: "img", attr: "srcset" },
    { selector: "source", attr: "src" },
    { selector: "source", attr: "srcset" },
    { selector: "link[rel='stylesheet']", attr: "href" },
    { selector: "link[rel='icon']", attr: "href" },
    { selector: "link[rel='shortcut icon']", attr: "href" },
    { selector: "link[rel='apple-touch-icon']", attr: "href" },
    { selector: "link[as='font']", attr: "href" },
    { selector: "link[as='image']", attr: "href" },
    { selector: "script", attr: "src" },
    { selector: "video", attr: "src" },
    { selector: "audio", attr: "src" },
    { selector: "embed", attr: "src" },
    { selector: "iframe", attr: "src" },
    { selector: "meta[property='og:image']", attr: "content" },
    { selector: "[style]", attr: "style" },
    { selector: "style" },
  ],
  urlFilter: (url) => {
    try {
      const u = new URL(url);
      // Keep same-origin assets + common CDNs used by WP/Elementor
      if (u.hostname.includes("rtc.echipadetocilari.ro")) return true;
      if (u.hostname.includes("fonts.googleapis.com")) return true;
      if (u.hostname.includes("fonts.gstatic.com")) return true;
      return false;
    } catch {
      return false;
    }
  },
  filenameGenerator: "bySiteStructure",
  request: {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  },
});

console.log("Scrape complete. Post-processing links…");

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

const files = walk(OUT);
const textExt = new Set([".html", ".htm", ".css", ".js", ".svg", ".xml", ".txt", ".json"]);

function rewriteContent(content, filePath) {
  let c = content;

  // Absolute WP URLs → root-relative
  c = c.replaceAll("https://www.rtc.echipadetocilari.ro", "");
  c = c.replaceAll("http://www.rtc.echipadetocilari.ro", "");
  c = c.replaceAll("https://rtc.echipadetocilari.ro", "");
  c = c.replaceAll("http://rtc.echipadetocilari.ro", "");

  // Protocol-relative
  c = c.replaceAll("//www.rtc.echipadetocilari.ro", "");

  // Fix scraped structure: website-scraper bySiteStructure puts
  // www.rtc.echipadetocilari.ro/ as a folder
  c = c.replaceAll("/www.rtc.echipadetocilari.ro/", "/");
  c = c.replaceAll("www.rtc.echipadetocilari.ro/", "/");

  // Canonical / OG should point to production domain (kept absolute for SEO)
  // Restore site domain only in meta tags we care about — leave relative for assets.

  // Remove WP admin / bloat scripts that break offline (xmlrpc, wp-emoji optional keep)
  // Keep elementor JS for menus/forms/counters.

  return c;
}

let rewritten = 0;
for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!textExt.has(ext)) continue;
  const raw = readFileSync(file, "utf8");
  const next = rewriteContent(raw, file);
  if (next !== raw) {
    writeFileSync(file, next, "utf8");
    rewritten++;
  }
}

console.log(`Rewrote ${rewritten} text files.`);
console.log("Mirror ready at", OUT);
console.log("Sample structure:");
for (const f of files.slice(0, 30)) {
  console.log(" ", relative(OUT, f));
}
console.log("Total files:", files.length);
