# Site static — nu e o aplicație Next.js

Acest repo servește site-ul `rtc.echipadetocilari.ro` ca **HTML static**, oglindit
1:1 din WordPress/Elementor. Nu există Next.js, React sau Tailwind în proiect.

## Cum se construiește

`npm run build` rulează `scripts/prepare-static.mjs`, care:

1. copiază `static-mirror/www.rtc.echipadetocilari.ro/` în `out/`;
2. redenumește asset-urile versionate (`file_ver=1.2.3.css` → `file.css`) — scraperul
   le salvează așa, dar HTML-ul le cere fără sufix, deci fără pasul ăsta site-ul
   rămâne nestilizat;
3. rescrie path-urile absolute în relative și scoate `?ver=` din URL-uri;
4. injectează un script de fallback pentru animațiile Elementor și videoclipurile
   de fundal.

Scriptul foloseşte doar `fs`, `path` și `url` din Node. Nu are nevoie de `npm install`.

Vercel servește `out/` ca fișiere statice (`framework: null` în `vercel.json`).

## Unde se fac modificările

**În `static-mirror/www.rtc.echipadetocilari.ro/`.** Acolo sunt paginile, imaginile,
clipurile, CSS-ul și fonturile.

HTML-ul e generat de Elementor: markup automat, clase de forma
`elementor-element-7d89ce8f`, stiluri inline și configurări în atribute
`data-settings` codate HTML. Când cauți o imagine, ține cont că multe URL-uri apar
codate ca `&#039;/wp-content/...&#039;` în galerii — o căutare simplă le ratează.

## Reguli

- **Nu rula `npm run mirror`** cât timp se fac modificări direct în cod. Re-scrapează
  WordPress-ul live și suprascrie tot `static-mirror/`.
- Nu adăuga Next.js/React înapoi fără o decizie explicită. Au existat, erau cod mort
  și au fost șterse deliberat.
- După modificări, rulează `npm run prepare:static` și `npm run verify` înainte de push.
- Push pe `main` declanșează deploy automat pe Vercel.

## De știut

Cele 7 formulare din site sunt Elementor Pro și trimit prin `admin-ajax.php` — adică
depind de WordPress. Vor trebui înlocuite cu o funcție serverless înainte ca site-ul
WordPress să fie oprit. Rezervările de teren merg prin `booksport.ro/rtc`, serviciu
extern, și nu sunt afectate.
