# Girlfriend's Day Surprise 💕

A sweet 5-screen surprise for your girlfriend — deployable on GitHub Pages for free.

## What's inside

1. **Opening** — Happy Girlfriend's Day, baby girl!
2. **First meet memory** — Your GGN story in Hindlish
3. **Playful question** — Dodging "No" button + growing "Yes"
4. **Reasons you love her** — Staggered Hindlish reasons
5. **Finale** — Confetti, love note, hugs & kisses

## Customize

Open `script.js` and edit the `CONFIG` object at the top:

```js
const CONFIG = {
  herName: "Baby Girl",  // pet name shown on the site
  // ... all messages are here
};
```

No coding needed — just change the text strings.

## Deploy to GitHub Pages

1. Create a new **public** repo on GitHub (e.g. `happy-gf-day`)
2. Upload these files to the **root** of the repo:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
3. Go to **Settings → Pages**
4. Under **Source**, select `main` branch and `/ (root)` folder
5. Click **Save**
6. Wait ~1 minute — your site will be live at:
   ```
   https://<your-username>.github.io/happy-gf-day/
   ```
7. Send her the link!

## Preview locally

Open `index.html` in your browser, or run:

```bash
cd girlfriend-day
python3 -m http.server 8080
```

Then visit `http://localhost:8080`

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure (5 screens) |
| `styles.css` | Romantic styling & animations |
| `script.js` | Navigation, dodging No button, confetti |
| `README.md` | This file |

No build step, no dependencies — just upload and go.
