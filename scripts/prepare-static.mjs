/**
 * Flatten WP mirror + fix links so the static site is pixel-identical offline.
 * Output: ./out (Vercel static output directory)
 */
import {
  existsSync,
  rmSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  statSync,
  cpSync,
  copyFileSync,
} from "fs";
import { join, dirname, extname, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const MIRROR = join(ROOT, "static-mirror", "www.rtc.echipadetocilari.ro");
const OUT = join(ROOT, "out");

if (!existsSync(MIRROR)) {
  console.error("Missing mirror. Run: node scripts/mirror-wp.mjs");
  process.exit(1);
}

if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

console.log("Copying mirror → out …");
cpSync(MIRROR, OUT, { recursive: true });

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

const textExt = new Set([".html", ".htm", ".css", ".js", ".svg", ".xml", ".json", ".txt"]);

function fixHtml(content, filePath) {
  let c = content;

  // website-scraper encodes `=` as %3D in links but saves files with literal `=`
  c = c.replaceAll("%3D", "=");
  c = c.replaceAll("%3d", "=");

  // Broken scraper artifacts: asset treated as page → .../file.jpg/index.html
  c = c.replace(/(\.(?:jpg|jpeg|png|webp|gif|svg|css|js|woff2?|ttf|eot))\/index\.html/gi, "$1");

  // Absolute leftovers
  c = c.replaceAll("https://www.rtc.echipadetocilari.ro", "");
  c = c.replaceAll("http://www.rtc.echipadetocilari.ro", "");
  c = c.replaceAll("https://rtc.echipadetocilari.ro", "");
  c = c.replaceAll("//www.rtc.echipadetocilari.ro", "");

  // Make root-relative asset paths so /programe/ and / work the same
  // Convert href/src starting with wp- or relative ../wp- to /wp-
  c = c.replace(
    /(href|src|content)=(["'])(?:\.\/)?(?:\.\.\/)*(wp-(?:content|includes)\/[^"']+)\2/gi,
    "$1=$2/$3$2",
  );
  c = c.replace(
    /(href|src)=(["'])(?:\.\/)?(?:\.\.\/)*(wp-content\/[^"']+)\2/gi,
    "$1=$2/$3$2",
  );

  // srcset entries: "path 800w, path 300w"
  c = c.replace(/srcset=(["'])([^"']+)\1/gi, (_, q, srcset) => {
    const fixed = srcset
      .split(",")
      .map((part) => {
        let p = part.trim();
        // skip empty / broken
        if (!p || p.includes("/index.html")) {
          // try strip /index.html
          p = p.replace(/\/index\.html(\s|$)/, "$1");
        }
        p = p.replaceAll("%3D", "=").replaceAll("%3d", "=");
        // make root relative
        p = p.replace(/^(?:\.\.\/)+/, "");
        p = p.replace(/^\.\//, "");
        if (/^(wp-(?:content|includes)\/)/i.test(p)) {
          p = "/" + p;
        } else if (/^[^/\s][^:]*\.(?:jpg|jpeg|png|webp|gif|svg|css|js)/i.test(p)) {
          // relative asset without leading slash
          if (!p.startsWith("/") && !p.startsWith("http")) {
            // leave size descriptor; path may already be root
          }
        }
        // path with optional descriptor
        const m = p.match(/^(\S+)(\s+\d+[wx])?$/i);
        if (m) {
          let path = m[1].replaceAll("%3D", "=");
          path = path.replace(/^(?:\.\.\/)+/, "");
          if (/^wp-(content|includes)\//i.test(path)) path = "/" + path;
          return path + (m[2] || "");
        }
        return p;
      })
      .filter((p) => p && !p.includes("undefined"))
      .join(", ");
    return `srcset=${q}${fixed}${q}`;
  });

  // Fix css url() that got %3D
  // (handled in CSS pass)

  // Canonical / OG: point to production domain for SEO when live
  const prod = "https://rtc.echipadetocilari.ro";
  c = c.replace(
    /<link rel="canonical" href="\/"/g,
    `<link rel="canonical" href="${prod}/"`,
  );
  c = c.replace(
    /<link rel="canonical" href="(\/[^"]*)"/g,
    `<link rel="canonical" href="${prod}$1"`,
  );

  // Remove WordPress admin bar leftovers if any
  c = c.replace(/<script[^>]*>[\s\S]*?wp\.apiFetch[\s\S]*?<\/script>/gi, "");

  // Ensure base for edge cases — root relative only, no <base> needed

  // Fix navigation: ensure trailing slashes match our static folders
  // Already /programe/ etc.

  // Contact form: Elementor forms need admin-ajax — convert to mailto fallback note
  // Keep as-is; form may no-op without WP backend. User asked identical look.

  // Remove references to missing remote that break console
  c = c.replace(
    /https?:\/\/www\.google\.com\/recaptcha[^"'\s]*/g,
    "#",
  );

  return c;
}

function fixCss(content) {
  let c = content;
  c = c.replaceAll("%3D", "=");
  c = c.replaceAll("%3d", "=");
  // absolute domain in css
  c = c.replaceAll("https://www.rtc.echipadetocilari.ro", "");
  c = c.replaceAll("http://www.rtc.echipadetocilari.ro", "");
  return c;
}

let nHtml = 0;
let nCss = 0;
for (const file of walk(OUT)) {
  const ext = extname(file).toLowerCase();
  if (!textExt.has(ext)) continue;
  const raw = readFileSync(file, "utf8");
  let next = raw;
  if (ext === ".html" || ext === ".htm") {
    next = fixHtml(raw, file);
    nHtml++;
  } else if (ext === ".css") {
    next = fixCss(raw);
    nCss++;
  } else {
    next = raw.replaceAll("%3D", "=").replaceAll("https://www.rtc.echipadetocilari.ro", "");
  }
  if (next !== raw) writeFileSync(file, next, "utf8");
}

// Copy root helpers
const llms = join(ROOT, "public", "llms.txt");
if (existsSync(llms)) copyFileSync(llms, join(OUT, "llms.txt"));

// robots.txt
writeFileSync(
  join(OUT, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: https://rtc.echipadetocilari.ro/sitemap.xml\n`,
  "utf8",
);

// simple sitemap
writeFileSync(
  join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://rtc.echipadetocilari.ro/</loc><priority>1.0</priority></url>
  <url><loc>https://rtc.echipadetocilari.ro/programe/</loc><priority>0.8</priority></url>
  <url><loc>https://rtc.echipadetocilari.ro/rezerva-teren/</loc><priority>0.8</priority></url>
  <url><loc>https://rtc.echipadetocilari.ro/despre-noi/</loc><priority>0.8</priority></url>
  <url><loc>https://rtc.echipadetocilari.ro/tabere/</loc><priority>0.8</priority></url>
  <url><loc>https://rtc.echipadetocilari.ro/contact/</loc><priority>0.8</priority></url>
</urlset>
`,
  "utf8",
);

// vercel.json-style: ensure trailing slash pages exist
const pages = ["programe", "despre-noi", "tabere", "rezerva-teren", "contact"];
for (const p of pages) {
  const idx = join(OUT, p, "index.html");
  if (!existsSync(idx)) {
    console.warn("Missing page:", p);
  }
}

console.log(`Prepared static site in out/ (html fixes: ${nHtml}, css: ${nCss})`);
console.log("Files:", walk(OUT).length);
