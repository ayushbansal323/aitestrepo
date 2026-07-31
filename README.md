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

The page ships with a **free track** at `soft-song.m4a` next to `index.html` (SoundHelix — free generated music). Music starts on; tap **♪** to mute.

**Cannot** bundle viral commercial songs (e.g. “Oye Hoye / Vaah Vaah kya scene hai, teri walk” edits) — those are copyrighted. Don’t download them into this repo.

To use your own legally obtained file:
1. Replace `soft-song.m4a` in the same folder as `index.html` (or drop an `.mp3` and point `CONFIG.musicSrc` at it), or
2. Change `CONFIG.musicSrc` in `script.js`

Browsers may block autoplay until the first tap (opening the seal counts).

## Deploy to GitHub Pages

1. Create a public repo and upload:
   - `index.html`, `styles.css`, `script.js`, `README.md`
   - `soft-song.m4a` (optional but recommended)
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
| `soft-song.m4a` | Background music (same folder as index) |
