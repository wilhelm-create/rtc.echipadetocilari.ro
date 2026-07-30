# Clubul de Tenis RTC

Copie **identică** (static HTML/CSS/JS) a site-ului WordPress/Elementor `rtc.echipadetocilari.ro`.

## De ce static?

Site-ul live a fost oglindit 1:1 (HTML Elementor + CSS + imagini + fonturi + JS).
Nu e un redesign — e aceeași structură, aceleași stiluri, aceleași asset-uri.

## Stack

- HTML static (export din WordPress + Elementor)
- Deploy: Vercel + GitHub
- Agenție: [Echipa de Tocilari](https://www.echipadetocilari.ro)

## Pagini

- `/` — Acasă
- `/programe/`
- `/rezerva-teren/`
- `/despre-noi/`
- `/tabere/`
- `/contact/`

## Local

```bash
npm run prepare:static   # generează folderul out/
npm run dev:static       # serve out pe :3000
```

Re-mirror din WordPress (dacă live-ul se schimbă):

```bash
npm run mirror
npm run prepare:static
```

## Build (Vercel)

```bash
npm run build   # = prepare-static → out/
```
