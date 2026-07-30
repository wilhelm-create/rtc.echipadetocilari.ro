import { existsSync, readFileSync } from "fs";

const t = readFileSync("out/index.html", "utf8");
const i = t.indexOf('"urls"');
console.log("urls config:", t.slice(i, i + 400));

const abs = (t.match(/https?:\\?\/\\?\/(?:www\.)?rtc\.echipadetocilari\.ro/g) || []).length;
console.log("remaining absolute domain refs:", abs);

const css = [...t.matchAll(/href=['"]([^'"]+\.css[^'"]*)['"]/gi)].map((m) => m[1]);
let missing = 0;
for (const h of css) {
  if (h.startsWith("http")) continue;
  const p = "out/" + h.split("?")[0].replace(/^\//, "");
  if (!existsSync(p)) {
    console.log("missing css", h);
    missing++;
  }
}
console.log("css links:", css.length, "missing:", missing);

const critical = [
  "out/wp-content/plugins/elementor/assets/js/shared-frontend-handlers.4c8abccc3e268b0767b2.bundle.min.js",
  "out/wp-content/plugins/elementor/assets/js/counter.12335f45aaa79d244f24.bundle.min.js",
  "out/wp-content/plugins/elementor-pro/assets/js/nav-menu.a23fbd67486c5bedf26c.bundle.min.js",
];
for (const c of critical) {
  console.log(existsSync(c) ? "OK" : "MISSING", c);
}
