---
name: Creative Animations Boost
overview: Romantic-playful Girlfriend's Day page — roses, kisses, hearts PLUS gimmicky page effects (staggers, shimmer, No-first dodge, big finale). Mobile-first Screen 3. Plan lives in-repo as creative_animations.plan.md.
todos:
  - id: save-plan-local
    content: Write creative_animations.plan.md into the project root
    status: completed
  - id: romantic-motifs
    content: Mix floating roses/kisses/hearts particles; kiss/heart bursts; romantic confetti shapes
    status: pending
  - id: screen3-mobile-no-first
    content: "Screen 3: tap-only No dodge; lock Yes until at least one No tap; hint copy; no hover dependency"
    status: pending
  - id: global-motion
    content: Add stagger entrances, richer screen transitions, card shimmer, button press, progress-dot pop in styles.css
    status: pending
  - id: typewriter
    content: Add typewriter/letter-reveal helper for Screen 1 and Screen 5 headlines in script.js
    status: pending
  - id: screen-polish
    content: Wire Screen 2–4 stagger/shake/bounce; upgrade Screen 5 confetti + ambient hearts/roses
    status: pending
  - id: a11y-mobile
    content: Honor prefers-reduced-motion; cap particles on small screens; quick mobile pass
    status: pending
isProject: false
---

# Creative Animations Boost

## Constraint
Keep everything in [index.html](index.html), [styles.css](styles.css), [script.js](script.js) — no libraries/CDN. Preserve `prefers-reduced-motion` and the mobile layout work already done. Plan file: [`creative_animations.plan.md`](creative_animations.plan.md) in the project root (not `~/.cursor/plans/`).

## Creative direction (chosen)
**Both layers at once:**

1. **Romantic playful** — affection motifs: hearts, roses (emoji/CSS petals), kisses (💋), soft blush tones — feels flirty and loving, not cold UI polish
2. **Gimmicky page effects** — keep the fun “website toy” energy: typewriter, card shimmer, stagger reveals, dodging No, shake/bounce, big confetti finale

Tone: boyfriend surprise that is sweet *and* cheeky — roses/kisses in the atmosphere, gimmicks in the interactions.

## What exists today
- Floating hearts only, fade transitions, Yes pulse, reason stagger, Yes heart-burst, canvas confetti
- Screen 3 dodges on `mouseenter` + `touchstart` — on mobile there is no cursor; she can tap Yes first and miss the playful No

## Enhancements by screen

```mermaid
flowchart LR
  S1[Screen1_typewriter_sparkle] --> S2[Screen2_stagger_quotes]
  S2 --> S3[Screen3_NoFirst_then_Yes]
  S3 --> S4[Screen4_reason_slide]
  S4 --> S5[Screen5_roses_kisses_finale]
```

### Global — romantic motifs + gimmicks
- **Particle mix** in `.hearts-bg`: float ♥ / 🌹 / 💋 (and soft petal-like pink circles via CSS spans) — random mix, not hearts-only
- **Active-screen stagger** (gimmick): children fade/scale in with delays
- **Richer transitions** (gimmick): leave `scale(0.97)` + fade; enter `translateY(20px)` → 0
- **Card shimmer** (gimmick): soft rose-gold `::after` sweep
- **Button press** + **progress-dot pop** (gimmick)
- **Mobile budget**: fewer particles on small screens (e.g. 6 vs 12); still mix motifs

### Screen 1 — Opening
- Typewriter headline (gimmick); CTA fades in after
- Soft sparkles + 1–2 floating rose/kiss near the card (romantic)

### Screen 2 — Memory
- Quote stagger (gimmick)
- Light “breath” on Hindlish lines; optional tiny heart pulse beside the memory line (romantic)

### Screen 3 — Playful (mobile-first, No first) — gimmick core + romantic juice

**Problem:** Phones have no hover. She must discover the dodge by tapping No before Yes unlocks.

**Behavior:**
1. Enter: **Yes locked** until `dodgeCount >= 1`; hint *“Go on… try No”* / *“Be honest — tap No”*
2. **No = tap/click only** (drop hover-as-primary); teleport + sassy messages
3. Each No: dodge, grow Yes, rotate messages
4. After first No: unlock Yes; hint → *“Okay fine… Yes is waiting”*
5. More No taps still allowed; Yes → advance
6. **Juice (both):** message shake / Yes bounce / No trail (gimmick); on Yes — burst of hearts + kisses (💋) + tiny roses instead of hearts-only; gold/rose card flash

```mermaid
flowchart TD
  enter[Enter_Screen3] --> locked[Yes_locked_hint_try_No]
  locked --> tapNo[Tap_No]
  tapNo --> dodge[No_teleports_message]
  dodge --> unlock[Unlock_Yes]
  unlock --> moreNo[Optional_more_No_taps]
  moreNo --> dodge
  unlock --> tapYes[Tap_Yes]
  tapYes --> burst[Hearts_kisses_roses_burst]
  burst --> next[Advance_to_Screen4]
```

### Screen 4 — Reasons
- Slide-in stagger (gimmick); rose/heart `::before` (romantic) instead of heart-only
- Continue button scale-in

### Screen 5 — Finale
- Typewriter / fade-up headline (gimmick)
- Love note + closing stagger
- **Confetti upgrade:** rectangles + ♥ + 💋 + 🌹 (or drawn petal/heart shapes) — longer ~4–5s, center burst then fall (romantic + gimmick)
- Ambient particle intensity spike (extra roses/kisses/hearts)

## Reduced motion
No typewriter (full text), no shimmer/shake/bounce, instant staggers, minimal/no confetti — **No-first unlock still applies**; static motif characters OK in copy if already shown.

## Files to touch
- [styles.css](styles.css) — motion keyframes; locked Yes; hint; rose-gold shimmer; particle variants
- [script.js](script.js) — motif particle spawn, No-first gate, tap dodge, typewriter, romantic confetti/bursts
- [index.html](index.html) — `#no-hint` on Screen 3
- [creative_animations.plan.md](creative_animations.plan.md) — this plan, in-repo

## Out of scope
- Sound, video, photo galleries, new screens, external animation libraries
