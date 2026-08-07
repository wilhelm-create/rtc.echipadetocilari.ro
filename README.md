# Clubul de Tenis RTC

Site-ul `rtc.echipadetocilari.ro`, migrat din WordPress/Elementor în cod.

## Stare curentă

Site static (HTML/CSS/JS), oglindit 1:1 din WordPress. Nu e un redesign — aceeași
structură, aceleași stiluri, aceleași asset-uri.

Migrarea e în curs: WordPress-ul e încă sursa conținutului, dar scopul e ca acest
repo să devină singura sursă, iar site-ul WordPress să fie oprit.

## Deploy

Vercel, conectat la acest repo. **Orice push pe `main` declanșează un deploy.**

- Producție: https://rtc-tenis-copie.vercel.app
- Panou: https://vercel.com/kazicianus-projects/rtc-tenis-copie

Build-ul NU folosește Next.js, deși `next` și `react` apar în `package.json`.
`npm run build` rulează `scripts/prepare-static.mjs`, care copiază
`static-mirror/www.rtc.echipadetocilari.ro/` în `out/` și curăță path-urile
asset-urilor (scoate `?ver=` / `_ver=`, face URL-urile relative). Vercel servește
`out/` ca fișiere statice.

## Unde se fac modificările

În `static-mirror/www.rtc.echipadetocilari.ro/`. Acolo stau paginile, imaginile
și clipurile.

Folderul `src/` (App Router, componente React) e cod mort dintr-un redesign
abandonat — nu ajunge niciodată în build. La fel și `public/images/`.

> `npm run mirror` re-scrapează WordPress-ul live și **suprascrie** tot ce e în
> `static-mirror/`. Cât timp faci modificări direct în cod, nu-l rula — îți pierzi
> munca.

## Local

```bash
node scripts/prepare-static.mjs   # genereaza out/
npx serve out -p 3000             # serveste pe :3000
```

## Pagini

`/` · `/programe/` · `/rezerva-teren/` · `/despre-noi/` · `/tabere/` · `/contact/`

## De rezolvat înainte de oprirea WordPress-ului

- **Formularele** (7 bucăți, Elementor Pro) trimit prin `admin-ajax.php`. Cad
  odată cu WordPress-ul. Trebuie înlocuite cu o funcție serverless pe Vercel.
- **DNS** — domeniul indică încă spre WordPress, nu spre Vercel.
- **Backup complet** al WordPress-ului înainte de ștergere.

Rezervările de teren merg prin [booksport.ro/rtc](https://www.booksport.ro/rtc),
serviciu extern — nu sunt afectate.

## Origine

Repo independent, pornit din `wilhelm-create/rtc.echipadetocilari.ro`.
Agenție: [Echipa de Tocilari](https://www.echipadetocilari.ro)
