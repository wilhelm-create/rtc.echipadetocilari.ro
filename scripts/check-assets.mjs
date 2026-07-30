import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { join, dirname, relative } from "path";

function walk(d, a = []) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) walk(p, a);
    else a.push(p);
  }
  return a;
}

const root = "out";
const css = walk(root).filter((f) => f.endsWith(".css"));
const bad = [];
for (const f of css) {
  const t = readFileSync(f, "utf8");
  const re = /url\((['"]?)([^'")]+)\1\)/gi;
  let m;
  while ((m = re.exec(t))) {
    let u = m[2].trim();
    if (
      u.startsWith("data:") ||
      u.startsWith("http") ||
      u.startsWith("//") ||
      u.startsWith("#")
    )
      continue;
    u = u.split("?")[0].split("#")[0];
    const abs = join(dirname(f), u);
    if (!existsSync(abs)) bad.push({ css: relative(root, f), url: u });
  }
}
console.log("broken css urls:", bad.length);
for (const b of bad.slice(0, 40)) console.log(b.css, "->", b.url);

// HTML asset check
const html = walk(root).filter((f) => f.endsWith(".html"));
let brokenHtml = 0;
for (const f of html) {
  const t = readFileSync(f, "utf8");
  const re = /\b(?:href|src)=(["'])([^"']+)\1/gi;
  let m;
  while ((m = re.exec(t))) {
    let u = m[2];
    if (
      !u ||
      u.startsWith("#") ||
      u.startsWith("mailto:") ||
      u.startsWith("tel:") ||
      u.startsWith("http") ||
      u.startsWith("//") ||
      u.startsWith("data:") ||
      u.startsWith("javascript:")
    )
      continue;
    u = u.split("?")[0].split("#")[0];
    const abs = u.startsWith("/")
      ? join(root, u.slice(1))
      : join(dirname(f), u);
    if (!existsSync(abs)) {
      brokenHtml++;
      if (brokenHtml <= 30) console.log("broken html", relative(root, f), "->", u);
    }
  }
}
console.log("broken html assets:", brokenHtml);
