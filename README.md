# Affiliate Web

Statisk affiliate-bridge på Vercel + admin som committar produktfiler till repo.

## Kör igång
1) Forka/klona till GitHub som `affiliate-web`.
2) Skapa `.env.local` (se .env.example) och fyll:
   - ADMIN_PASSWORD
   - AMAZON_TAG
   - GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH
   - GITHUB_TOKEN (classic PAT med `repo`-scope)
3) `npm i`
4) `npm run dev`
5) Öppna `http://localhost:3000/admin`:
   - Logga in med `ADMIN_PASSWORD`
   - Klistra in titel, bild-URL, Amazon-länk, beskrivning
   - Spara → API committar `data/products/<slug>.json`
6) Koppla repo till Vercel (import project). Varje commit → auto deploy.

## Viktigt
- Lägg till din domän (`*.vercel.app`) i Amazon Associates under "Websites and Mobile Apps".
- Disclosure måste finnas (finns i layout & produktsidor).
- Amazon-tag läggs automatiskt om saknas.
