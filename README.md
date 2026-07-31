# Girlfriend's Day Surprise

A personal 5-screen letter for your girlfriend — parchment stationery vibe, wax-seal open, playful No button, tap-to-reveal reasons, and a finale hug. Vanilla HTML/CSS/JS. Free on GitHub Pages.

## Journey

1. **Loader + envelope** — tap the wax seal to open the letter  
2. **First meet memory** — your GGN story in Hindlish  
3. **Playful question** — she must tap **No** first; Yes unlocks after  
4. **Reasons** — tap each bloom to reveal a line  
5. **Finale** — confetti, love note, **Send a hug**, screenshot hint  

Music starts **on**; tap **♪** (top right) to mute.

## Customize

Edit the `CONFIG` object at the top of `script.js` (name, messages, reasons).

## Music

Put your song as `soft-song.mp3` next to `index.html`. It starts when she taps the wax seal. Tap **♪** to mute.

Or change the filename in `CONFIG.musicSrc` in `script.js`.

## Deploy to GitHub Pages

1. Create a public repo and upload:
   - `index.html`, `styles.css`, `script.js`, `README.md`
   - `soft-song.mp3`
2. **Settings → Pages** → branch `main`, folder `/ (root)`
3. Send her: `https://<you>.github.io/<repo>/`

## Preview locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`

## Files

| File | Purpose |
|------|---------|
| `index.html` | Screens, envelope, loader |
| `styles.css` | Stationery theme + motion |
| `script.js` | Navigation, No-first play, music, confetti |
| `soft-song.mp3` | Song (plays on seal tap) |
