/**
 * Flatten WP mirror + fix scraper versioned asset names so the static site
 * loads CSS/JS/fonts identically to WordPress.
 *
 * website-scraper saves `file.css?ver=1.2.3` as `file_ver=1.2.3.css`, but HTML
 * still references `file.css?ver=1.2.3` → 404 → unstyled site.
 *
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
  renameSync,
  unlinkSync,
} from "fs";
import { join, dirname, extname, basename, relative } from "path";
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

// Match website-scraper version suffix: name_ver=1.2.3.css or name.min_ver=3.31.2.js
const VER_FILE_RE = /^(.*)_ver=(.+?)(\.[^.]+)$/i;

/**
 * Rename file_ver=X.ext → file.ext (overwrite if clean name already exists)
 */
function unversionFilenames() {
  let renamed = 0;
  // deepest paths first so we don't trip over renames mid-walk
  const files = walk(OUT).sort((a, b) => b.length - a.length);

  for (const file of files) {
    const name = basename(file);
    const m = name.match(VER_FILE_RE);
    if (!m) continue;

    const cleanName = m[1] + m[3]; // base + extension
    const dest = join(dirname(file), cleanName);

    if (existsSync(dest) && dest !== file) {
      // Prefer the versioned scrape (complete), drop empty/partial clean name
      unlinkSync(dest);
    }
    renameSync(file, dest);
    renamed++;
  }
  return renamed;
}

const textExt = new Set([
  ".html",
  ".htm",
  ".css",
  ".js",
  ".svg",
  ".xml",
  ".json",
  ".txt",
]);

/**
 * Convert any scraped versioned path or WP querystring path to clean path.
 *  - foo.css?ver=1.2.3 → foo.css
 *  - foo_ver=1.2.3.css → foo.css
 *  - foo.min.js?ver=3 → foo.min.js
 */
function cleanAssetPath(path) {
  if (!path || path.startsWith("data:") || path.startsWith("blob:")) return path;

  let p = path;
  let query = "";
  let hash = "";

  // Split off the fragment first, then the query. Both must be REMOVED from p —
  // re-appending a fragment that is still part of p duplicates the whole path.
  // A "#" preceded by "&" is NOT a fragment: WP/Elementor encode query
  // separators as the entity &#038;, and cutting there swallows the rest of the
  // query string (that is how the map iframe lost &output=embed).
  const h = p.search(/(?<!&)#/);
  if (h !== -1) {
    hash = p.slice(h);
    p = p.slice(0, h);
  }
  const q = p.indexOf("?");
  if (q !== -1) {
    query = p.slice(q);
    p = p.slice(0, q);
  }

  // Decode scraper encoding
  p = p.replaceAll("%3D", "=").replaceAll("%3d", "=");

  // file_ver=1.2.3.css → file.css
  p = p.replace(/_ver=[^/?#]+(?=\.[a-z0-9]+$)/gi, "");

  // Keep only non-ver query params if any (rare). Drop ver/v/version.
  // Done by hand instead of URLSearchParams: that re-encodes the rest of the
  // query (%20 → +) and does not treat the entity &#038; as a separator.
  if (query) {
    const tokens = query.slice(1).split(/(&(?:#0?38;)?)/);
    const parts = [];
    for (let i = 0; i < tokens.length; i += 2) {
      parts.push({ value: tokens[i], sep: tokens[i + 1] || "" });
    }
    const kept = parts.filter(
      (part) => part.value && !/^(?:ver|v|version)=/i.test(part.value),
    );
    query = kept.length
      ? "?" +
        kept
          .map(
            (part, i) => part.value + (i < kept.length - 1 ? part.sep || "&" : ""),
          )
          .join("")
      : "";
  }

  return p + query + hash;
}

function fixHtml(content) {
  let c = content;

  c = c.replaceAll("%3D", "=");
  c = c.replaceAll("%3d", "=");

  // Broken scraper artifacts: asset treated as page → .../file.jpg/index.html
  c = c.replace(
    /(\.(?:jpg|jpeg|png|webp|gif|svg|css|js|woff2?|ttf|eot|ico))\/index\.html/gi,
    "$1",
  );

  // Absolute leftovers (plain + JSON-escaped https:\/\/…)
  c = c.replaceAll("https://www.rtc.echipadetocilari.ro", "");
  c = c.replaceAll("http://www.rtc.echipadetocilari.ro", "");
  c = c.replaceAll("https://rtc.echipadetocilari.ro", "");
  c = c.replaceAll("http://rtc.echipadetocilari.ro", "");
  c = c.replaceAll("//www.rtc.echipadetocilari.ro", "");
  c = c.replaceAll("https:\\/\\/www.rtc.echipadetocilari.ro", "");
  c = c.replaceAll("http:\\/\\/www.rtc.echipadetocilari.ro", "");
  c = c.replaceAll("https:\\/\\/rtc.echipadetocilari.ro", "");
  c = c.replaceAll("http:\\/\\/rtc.echipadetocilari.ro", "");

  // href / src / action / data-src / content (meta images)
  c = c.replace(
    /\b(href|src|action|data-src|data-lazy-src|content)=(["'])([^"']+)\2/gi,
    (full, attr, q, val) => {
      // skip pure anchors, mailto, tel, external http(s) that aren't our domain
      if (
        val.startsWith("#") ||
        val.startsWith("mailto:") ||
        val.startsWith("tel:") ||
        val.startsWith("javascript:") ||
        val.startsWith("data:") ||
        // Our own domain is stripped above, so anything still absolute points
        // at a third party (maps.google.com, tiktok, booksport) — leave it be.
        /^https?:\/\//i.test(val) ||
        val.startsWith("//")
      ) {
        return full;
      }
      let next = cleanAssetPath(val);
      // root-relative wp assets
      next = next.replace(/^(?:\.\.\/)+/, "");
      next = next.replace(/^\.\//, "");
      if (/^wp-(?:content|includes)\//i.test(next)) next = "/" + next;
      return `${attr}=${q}${next}${q}`;
    },
  );

  // srcset
  c = c.replace(/srcset=(["'])([^"']+)\1/gi, (_, q, srcset) => {
    const fixed = srcset
      .split(",")
      .map((part) => {
        const trimmed = part.trim();
        if (!trimmed) return "";
        const m = trimmed.match(/^(\S+)(\s+\d+[wx])?$/i);
        if (!m) return trimmed;
        let path = cleanAssetPath(m[1]);
        path = path.replace(/^(?:\.\.\/)+/, "");
        if (/^wp-(content|includes)\//i.test(path)) path = "/" + path;
        return path + (m[2] || "");
      })
      .filter(Boolean)
      .join(", ");
    return `srcset=${q}${fixed}${q}`;
  });

  // Inline style url(...)
  // Elementor writes gallery backgrounds into HTML attributes with the quotes
  // entity-encoded: url(&#039;…&#039;). Treat those as delimiters too, otherwise
  // the # inside &#039; reads as a URL fragment.
  c = c.replace(/url\((&#0?39;|&quot;|['"]?)([^)]*?)\1\)/gi, (full, q, u) => {
    if (!u || u.startsWith("data:")) return full;
    const cleaned = cleanAssetPath(u.trim());
    return `url(${q}${cleaned}${q})`;
  });

  // Canonical / OG: production domain
  const prod = "https://rtc.echipadetocilari.ro";
  c = c.replace(
    /<link rel="canonical" href="\/"/g,
    `<link rel="canonical" href="${prod}/"`,
  );
  c = c.replace(
    /<link rel="canonical" href="(\/[^"]*)"/g,
    `<link rel="canonical" href="${prod}$1"`,
  );

  // recaptcha won't work offline
  c = c.replace(/https?:\/\/www\.google\.com\/recaptcha[^"'\s]*/g, "#");

  // Empty logo home link → /
  c = c.replace(/<a href="">/g, '<a href="/">');

  // Hero / section background video: Elementor ships an empty <video> and sets
  // src via JS from data-settings.background_video_link. Inject src so the
  // video plays even if a handler chunk is late or missing.
  c = injectBackgroundVideoSrc(c);

  // Lightweight fallback for Elementor scroll animations + lazyload + video
  if (c.includes("</body>") && !c.includes("rtc-static-enhance")) {
    c = c.replace("</body>", `${ENHANCE_SCRIPT}\n</body>`);
  }

  return c;
}

/**
 * Find sections with background_video_link and fill empty hosted video tags.
 */
function injectBackgroundVideoSrc(html) {
  // Match section (or container) that has video settings, then its empty video tag
  return html.replace(
    /(<[^>]+data-settings="[^"]*background_video_link[^"]*"[^>]*>)([\s\S]*?)(<video\b[^>]*class="[^"]*elementor-background-video-hosted[^"]*"[^>]*)(><\/video>)/gi,
    (full, open, mid, videoOpen, videoClose) => {
      // Already has src=
      if (/\ssrc\s*=/i.test(videoOpen)) return full;

      const settingsRaw = (open.match(/data-settings="([^"]*)"/i) || [])[1];
      if (!settingsRaw) return full;
      let link = "";
      try {
        const decoded = settingsRaw
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, "&")
          .replace(/&#039;/g, "'")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">");
        const settings = JSON.parse(decoded);
        link = settings.background_video_link || settings.background_video_fallback || "";
      } catch {
        const m = settingsRaw.match(/background_video_link&quot;:&quot;([^&]+)/);
        if (m) link = m[1].replace(/\\u002F/g, "/").replace(/\\\//g, "/");
      }
      if (!link) return full;
      // JSON may still have \/
      link = link.replace(/\\\//g, "/");
      if (link.startsWith("http")) {
        try {
          const u = new URL(link);
          link = u.pathname;
        } catch {
          /* keep */
        }
      }
      if (!link.startsWith("/") && !link.startsWith("http")) link = "/" + link;

      const withSrc = `${videoOpen} src="${link}"${videoClose}`;
      return open + mid + withSrc;
    },
  );
}

const ENHANCE_SCRIPT = `<script id="rtc-static-enhance">
(function () {
  function decodeSettings(el) {
    var raw = el.getAttribute("data-settings");
    if (!raw) return null;
    try {
      return JSON.parse(raw.replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
    } catch (e) {
      return null;
    }
  }

  function ensureBackgroundVideos() {
    document.querySelectorAll(".elementor-background-video-hosted").forEach(function (video) {
      if (!video.getAttribute("src")) {
        var host = video.closest("[data-settings*='background_video']") || video.closest("section, .e-con");
        var s = host && decodeSettings(host);
        var link = s && (s.background_video_link || s.background_video_fallback);
        if (link) {
          link = String(link).replace(/\\\\\\//g, "/");
          if (link.indexOf("http") === 0) {
            try { link = new URL(link).pathname; } catch (e) {}
          }
          video.setAttribute("src", link);
        }
      }
      video.muted = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("autoplay", "");
      video.setAttribute("loop", "");
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    });
  }

  function revealAnimations() {
    var nodes = document.querySelectorAll(".elementor-invisible");
    if (!nodes.length) return;
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (el) {
        el.classList.remove("elementor-invisible");
        el.classList.add("animated");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var s = decodeSettings(el) || {};
          var name = s._animation || s.animation || "fadeIn";
          var delay = parseInt(s._animation_delay || s.animation_delay || 0, 10) || 0;
          setTimeout(function () {
            el.classList.remove("elementor-invisible");
            el.classList.add("animated", name);
          }, delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    nodes.forEach(function (el) { io.observe(el); });
  }

  function markLazyContainers() {
    document.querySelectorAll(".e-con.e-parent:not(.e-lazyloaded)").forEach(function (el) {
      el.classList.add("e-lazyloaded");
    });
  }

  function run() {
    ensureBackgroundVideos();
    markLazyContainers();
    // Let Elementor init first; if elements stay invisible, our IO still fires
    setTimeout(revealAnimations, 400);
    setTimeout(ensureBackgroundVideos, 800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
</script>`;

function fixCss(content) {
  let c = content;
  c = c.replaceAll("%3D", "=");
  c = c.replaceAll("%3d", "=");
  c = c.replaceAll("https://www.rtc.echipadetocilari.ro", "");
  c = c.replaceAll("http://www.rtc.echipadetocilari.ro", "");
  c = c.replaceAll("https://rtc.echipadetocilari.ro", "");

  // url(path?ver=…) or url(path_ver=…)
  // Elementor writes gallery backgrounds into HTML attributes with the quotes
  // entity-encoded: url(&#039;…&#039;). Treat those as delimiters too, otherwise
  // the # inside &#039; reads as a URL fragment.
  c = c.replace(/url\((&#0?39;|&quot;|['"]?)([^)]*?)\1\)/gi, (full, q, u) => {
    if (!u || u.startsWith("data:")) return full;
    const cleaned = cleanAssetPath(u.trim());
    return `url(${q}${cleaned}${q})`;
  });

  // bare versioned filenames that may appear outside url()
  c = c.replace(/([a-z0-9._-]+)_ver=[^)\s'",]+\.(css|js|woff2?|ttf|eot|svg)/gi, "$1.$2");

  return c;
}

function fixJs(content) {
  let c = content;
  c = c.replaceAll("%3D", "=");
  c = c.replaceAll("https://www.rtc.echipadetocilari.ro", "");
  c = c.replaceAll("https://rtc.echipadetocilari.ro", "");
  c = c.replaceAll("https:\\/\\/www.rtc.echipadetocilari.ro", "");
  c = c.replaceAll("https:\\/\\/rtc.echipadetocilari.ro", "");
  // common WP script path with ?ver=
  c = c.replace(
    /(\/(?:wp-content|wp-includes)\/[^"'?\s]+)\?ver=[^"'&\s]+/gi,
    "$1",
  );
  c = c.replace(/([a-z0-9._/-]+)_ver=[^"'?\s]+\.(js|css)/gi, "$1.$2");
  return c;
}

// 1) Unversion filenames on disk
const nRenamed = unversionFilenames();
console.log(`Renamed ${nRenamed} versioned asset files`);

// 2) Rewrite text content
let nHtml = 0;
let nCss = 0;
let nJs = 0;
for (const file of walk(OUT)) {
  const ext = extname(file).toLowerCase();
  if (!textExt.has(ext)) continue;
  const raw = readFileSync(file, "utf8");
  let next = raw;
  if (ext === ".html" || ext === ".htm") {
    next = fixHtml(raw);
    nHtml++;
  } else if (ext === ".css") {
    next = fixCss(raw);
    nCss++;
  } else if (ext === ".js") {
    next = fixJs(raw);
    nJs++;
  } else {
    next = raw
      .replaceAll("%3D", "=")
      .replaceAll("https://www.rtc.echipadetocilari.ro", "");
  }
  if (next !== raw) writeFileSync(file, next, "utf8");
}

// 3) Root helpers
const llms = join(ROOT, "public", "llms.txt");
if (existsSync(llms)) copyFileSync(llms, join(OUT, "llms.txt"));

writeFileSync(
  join(OUT, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: https://rtc.echipadetocilari.ro/sitemap.xml\n`,
  "utf8",
);

writeFileSync(
  join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://rtc.echipadetocilari.ro/</loc><priority>1.0</priority></url>
  <url><loc>https://rtc.echipadetocilari.ro/programe/</loc><priority>0.8</priority></url>
  <url><loc>https://rtc.echipadetocilari.ro/rezultate/</loc><priority>0.8</priority></url>
  <url><loc>https://rtc.echipadetocilari.ro/rezerva-teren/</loc><priority>0.8</priority></url>
  <url><loc>https://rtc.echipadetocilari.ro/despre-noi/</loc><priority>0.8</priority></url>
  <url><loc>https://rtc.echipadetocilari.ro/tabere/</loc><priority>0.8</priority></url>
  <url><loc>https://rtc.echipadetocilari.ro/contact/</loc><priority>0.8</priority></url>
</urlset>
`,
  "utf8",
);

// 4) Sanity checks
const pages = ["programe", "rezultate", "despre-noi", "tabere", "rezerva-teren", "contact"];
for (const p of pages) {
  const idx = join(OUT, p, "index.html");
  if (!existsSync(idx)) console.warn("Missing page:", p);
}

const critical = [
  "wp-content/themes/hello-elementor/assets/css/reset.css",
  "wp-content/themes/hello-elementor/assets/css/theme.css",
  "wp-content/plugins/elementor/assets/css/frontend.min.css",
  "wp-content/uploads/elementor/css/post-19.css",
  "wp-content/uploads/elementor/css/post-25.css",
  "wp-content/uploads/elementor/css/post-40.css",
  "wp-content/uploads/elementor/css/post-140.css",
  "wp-content/uploads/elementor/google-fonts/css/inter.css",
  "wp-content/uploads/elementor/google-fonts/css/plusjakartasans.css",
  "wp-includes/js/jquery/jquery.min.js",
  "wp-content/uploads/2025/07/logo_club_tenis_rtc.webp",
];
let missing = 0;
for (const rel of critical) {
  if (!existsSync(join(OUT, rel))) {
    console.error("MISSING critical asset:", rel);
    missing++;
  }
}

// Verify homepage CSS links resolve
const home = readFileSync(join(OUT, "index.html"), "utf8");
const cssHrefs = [...home.matchAll(/href=['"]([^'"]+\.css[^'"]*)['"]/gi)].map(
  (m) => m[1],
);
let brokenCss = 0;
for (const href of cssHrefs) {
  if (href.startsWith("http") || href.startsWith("//")) continue;
  const path = href.split("?")[0].replace(/^\//, "");
  if (!existsSync(join(OUT, path))) {
    console.error("Broken CSS link:", href);
    brokenCss++;
  }
}

const leftoverVer = walk(OUT).filter((f) => basename(f).includes("_ver="));
if (leftoverVer.length) {
  console.warn(
    "Leftover _ver= files:",
    leftoverVer.slice(0, 10).map((f) => relative(OUT, f)),
  );
}

console.log(
  `Prepared out/ — renamed: ${nRenamed}, html: ${nHtml}, css: ${nCss}, js: ${nJs}, files: ${walk(OUT).length}`,
);
console.log(
  `Checks — missing critical: ${missing}, broken css links: ${brokenCss}, leftover ver files: ${leftoverVer.length}`,
);

if (missing > 0 || brokenCss > 0) {
  process.exitCode = 1;
}
