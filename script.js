const CONFIG = {
  herName: "Baby Girl",

  screen1Headline: "Happy Girlfriend's Day, {herName}!",
  screen1Subtext: "I made a little something just for you, baby girl...",

  screen2Title: "Where it all became real",
  screen2Main:
    "Every day with you feels like a gift. But nothing compares to the day we finally met.",
  screen2Memory:
    "GGN ki hawa mein pehli baar mile — club ki raat, Galleria market ki walk, movie aur tumhare saath woh saara time... sab kuch magical tha. Woh din ab bhi mere dil ka sabse khoobsurat chapter hai.",
  screen2Relive:
    "Har din tumhara saath, tumhara pyaar — baar baar jeena chahta hoon, poori zindagi ke liye.",
  screen2Footnote: "Still think about that day more than you know.",

  screen3Question: "Aren't you the luckiest person alive to have me?",
  screen3HintLocked: "Go on… try No 💋",
  screen3HintUnlocked: "Okay fine… Yes is waiting 🌹",
  screen3DodgeMessages: [
    "Deny it all you want!",
    "That button knows the truth",
    "Luck doesn't run away like this",
    "Yes is RIGHT there...",
    "You know I'm right 😌",
    "Wrong answer, bestie",
  ],
  screen3YesReply: "And honestly? I'm the luckiest too — to have you.",

  screen4Headline: "A few reasons you're my favorite person",
  reasons: [
    "Teri smile se bure din bhi theek ho jaate hain — sach mein",
    "Normal si baatein bhi tumhare saath special lagti hain",
    "Itni gussel ho, itni shaki ho — aur phir bhi mujhe choose karti ho, kaise?",
    "Jab milte hain na, bas ek dusre mein kho jaate hain — time hi nahi pata chalta",
    "Bas kyunki tum ho — aur iss se zyada kya chahiye?",
  ],
  reasonMotifs: ["♥", "🌹", "💋", "♥", "🌹"],

  screen5Headline: "I love you, {herName}",
  loveNote:
    "Thank you for being you, baby girl. Happy Girlfriend's Day — today and every day after. You're my person.",
  screen5Closing: "Now come here — hugs, cuddles, and kisses 🤍",

  musicSrc: "soft-song.mp3",

  // WhatsApp: India (+91) + 7776075075
  whatsappNumber: "917776075075",
  hugMessage:
    "Sending you a big hug from your Girlfriend's Day surprise 🤍 Come here for hugs, cuddles, and kisses!",
};

const MOTIFS = ["♥", "🌹", "💋", "♥", "🌹", "💋"];
const BURST_MOTIFS = ["♥", "💋", "🌹", "♥", "💋", "🌹", "♥", "💋", "🌹", "♥"];

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const isMobile = () => window.matchMedia("(max-width: 640px)").matches;

let currentScreen = 1;
let dodgeIndex = 0;
let dodgeCount = 0;
let yesScale = 1;
let screen3Answered = false;
let confettiStarted = false;
let typewriterTimers = [];
let envelopeOpened = false;
let musicWantedOn = true;
let musicStarted = false;
let revealedCount = 0;

function fill(template) {
  return template.replace(/\{herName\}/g, CONFIG.herName);
}

function clearTypewriters() {
  typewriterTimers.forEach(clearTimeout);
  typewriterTimers = [];
}

function typewriter(el, text, speed = 42) {
  if (!el) return Promise.resolve();
  clearTypewriters();

  if (prefersReducedMotion) {
    el.textContent = text;
    return Promise.resolve();
  }

  el.textContent = "";
  const cursor = document.createElement("span");
  cursor.className = "tw-cursor";
  cursor.setAttribute("aria-hidden", "true");
  el.appendChild(cursor);

  return new Promise((resolve) => {
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        cursor.insertAdjacentText("beforebegin", text[i]);
        i++;
        typewriterTimers.push(setTimeout(tick, speed));
      } else {
        cursor.remove();
        resolve();
      }
    };
    tick();
  });
}

function initContent() {
  document.title = fill(CONFIG.screen1Headline);
  document.getElementById("screen1-subtext").textContent =
    CONFIG.screen1Subtext;
  document.getElementById("screen2-title").textContent = CONFIG.screen2Title;
  document.getElementById("screen2-main").textContent = CONFIG.screen2Main;
  document.getElementById("screen2-memory").textContent = CONFIG.screen2Memory;
  document.getElementById("screen2-relive").textContent = CONFIG.screen2Relive;
  document.getElementById("screen2-footnote").textContent =
    CONFIG.screen2Footnote;
  document.getElementById("screen3-question").textContent =
    CONFIG.screen3Question;
  document.getElementById("no-hint").textContent = CONFIG.screen3HintLocked;
  document.getElementById("yes-reply").textContent = CONFIG.screen3YesReply;
  document.getElementById("screen4-headline").textContent =
    CONFIG.screen4Headline;
  document.getElementById("screen5-lovenote").textContent = CONFIG.loveNote;
  document.getElementById("screen5-closing").textContent =
    CONFIG.screen5Closing;
}

function spawnParticle(container, temporary = false) {
  const roll = Math.random();
  const particle = document.createElement("span");
  particle.className = "heart-particle";

  if (roll < 0.2) {
    particle.classList.add("is-petal");
  } else {
    particle.textContent = MOTIFS[Math.floor(Math.random() * MOTIFS.length)];
  }

  particle.style.left = `${Math.random() * 100}%`;
  particle.style.animationDuration = `${8 + Math.random() * 8}s`;
  particle.style.animationDelay = temporary ? "0s" : `${Math.random() * 8}s`;
  particle.style.fontSize = `${0.75 + Math.random() * 0.85}rem`;
  container.appendChild(particle);

  if (temporary) {
    setTimeout(() => particle.remove(), (8 + Math.random() * 4) * 1000);
  }
}

function initHearts() {
  if (prefersReducedMotion) return;
  const container = document.querySelector(".hearts-bg");
  const count = isMobile() ? 6 : 12;
  for (let i = 0; i < count; i++) spawnParticle(container, false);
}

function spikeAmbientParticles(extra = 6) {
  if (prefersReducedMotion) return;
  const container = document.querySelector(".hearts-bg");
  for (let i = 0; i < extra; i++) spawnParticle(container, true);
}

function updateProgress(screen) {
  document.querySelectorAll(".dot").forEach((dot) => {
    const n = Number(dot.dataset.dot);
    dot.classList.toggle("active", n === screen);
    dot.classList.toggle("done", n < screen);
  });

  const backBtn = document.getElementById("back-btn");
  if (screen > 1 && screen < 5) backBtn.classList.remove("hidden");
  else backBtn.classList.add("hidden");
}

function runScreen1Typewriter() {
  typewriter(
    document.getElementById("screen1-headline"),
    fill(CONFIG.screen1Headline),
    38
  );
}

function onScreenEnter(target) {
  if (target === 1 && envelopeOpened) {
    runScreen1Typewriter();
  }

  if (target === 3) resetNoButton();
  if (target === 4) setupTapReasons();

  if (target === 5) {
    const headline = document.getElementById("screen5-headline");
    headline.textContent = "";
    typewriter(headline, fill(CONFIG.screen5Headline), 55).then(() => {
      if (!confettiStarted) {
        confettiStarted = true;
        launchConfetti();
        spikeAmbientParticles(isMobile() ? 5 : 8);
      }
    });
  }
}

function goToScreen(target) {
  if (target === currentScreen) return;

  const current = document.getElementById(`screen-${currentScreen}`);
  const next = document.getElementById(`screen-${target}`);
  const outMs = prefersReducedMotion ? 0 : 480;

  current.classList.add("leaving");
  current.classList.remove("active");

  setTimeout(() => {
    current.classList.remove("leaving");
    next.classList.add("active");
    currentScreen = target;
    updateProgress(target);
    window.scrollTo({ top: 0, behavior: "auto" });
    onScreenEnter(target);
  }, outMs);
}

/* —— Screen 4: tap-to-reveal —— */
function setupTapReasons() {
  const blooms = document.getElementById("reason-blooms");
  const list = document.getElementById("reasons-list");
  const continueBtn = document.getElementById("screen4-continue");
  const cue = document.getElementById("reasons-cue");

  blooms.innerHTML = "";
  list.innerHTML = "";
  continueBtn.classList.add("hidden");
  cue.textContent = "Tap a bloom to reveal a reason";
  cue.classList.remove("is-done", "hidden");
  revealedCount = 0;

  CONFIG.reasons.forEach((reason, i) => {
    const motif = CONFIG.reasonMotifs[i % CONFIG.reasonMotifs.length] || "♥";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "bloom-btn";
    btn.textContent = motif;
    btn.setAttribute("aria-label", `Reveal reason ${i + 1}`);
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      btn.disabled = true;
      btn.classList.add("is-used");

      const li = document.createElement("li");
      li.textContent = reason;
      li.dataset.motif = motif;
      list.appendChild(li);
      requestAnimationFrame(() => li.classList.add("visible"));

      revealedCount++;
      if (revealedCount >= CONFIG.reasons.length) {
        cue.textContent = "That’s all of them…";
        cue.classList.add("is-done");
        setTimeout(() => {
          continueBtn.classList.remove("hidden");
          // Keep CTA in view on mobile — don't make her hunt below the fold
          continueBtn.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "nearest",
          });
        }, prefersReducedMotion ? 0 : 350);
      } else {
        // Keep latest reason readable without burying the blooms
        li.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "nearest",
        });
      }
    });
    blooms.appendChild(btn);
  });
}

function initGlitter() {
  if (prefersReducedMotion) return;

  const container = document.querySelector(".glitter-bg");
  if (!container) return;

  const count = isMobile() ? 36 : 56;
  const kinds = ["", "is-gold", "is-pink", "is-diamond"];

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    dot.className = `glitter-dot${kind ? ` ${kind}` : ""}`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.animationDuration = `${1.4 + Math.random() * 2.8}s`;
    dot.style.animationDelay = `${Math.random() * 4}s`;
    const size = 2 + Math.random() * 4;
    if (!kind.includes("diamond")) {
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
    }
    container.appendChild(dot);
  }
}

const SPRINKLE_COLORS = [
  "#ff8ec5",
  "#ffd76a",
  "#ffc0d4",
  "#ffffff",
  "#ff9ec8",
  "#ffe08a",
  "#ffb6d9",
];

function initSprinkles() {
  if (prefersReducedMotion) return;

  const container = document.querySelector(".sprinkles-bg");
  if (container) {
    const count = isMobile() ? 36 : 52;
    for (let i = 0; i < count; i++) {
      const bit = document.createElement("span");
      const round = Math.random() > 0.7;
      const color =
        SPRINKLE_COLORS[Math.floor(Math.random() * SPRINKLE_COLORS.length)];
      bit.className = `sprinkle${round ? " is-round" : ""}`;
      bit.style.left = `${Math.random() * 100}%`;
      bit.style.setProperty("--sprinkle", color);
      bit.style.animationDuration = `${7 + Math.random() * 9}s`;
      bit.style.animationDelay = `${Math.random() * 8}s`;
      if (!round) {
        bit.style.width = `${3.5 + Math.random() * 2.5}px`;
        bit.style.height = `${1.2 + Math.random() * 0.6}px`;
      }
      container.appendChild(bit);
    }
  }

  // Tiny shiny sprinkles on every letter card
  document.querySelectorAll(".letter-card").forEach((card) => {
    const n = isMobile() ? 18 : 26;
    for (let i = 0; i < n; i++) {
      const bit = document.createElement("span");
      const round = Math.random() > 0.6;
      const rot = Math.floor(Math.random() * 360);
      const color =
        SPRINKLE_COLORS[Math.floor(Math.random() * SPRINKLE_COLORS.length)];
      bit.className = `card-sprinkle${round ? " is-round" : ""}`;
      bit.setAttribute("aria-hidden", "true");
      bit.style.left = `${4 + Math.random() * 92}%`;
      bit.style.top = `${4 + Math.random() * 92}%`;
      bit.style.setProperty("--sprinkle", color);
      bit.style.setProperty("--rot", `${rot}deg`);
      bit.style.animationDuration = `${1.4 + Math.random() * 2}s`;
      bit.style.animationDelay = `${Math.random() * 2.5}s`;
      if (!round) {
        bit.style.width = `${3 + Math.random() * 2}px`;
        bit.style.height = `${1.2 + Math.random() * 0.5}px`;
      }
      card.appendChild(bit);
    }
  });
}

function lockYes() {
  const btnYes = document.getElementById("btn-yes");
  const hint = document.getElementById("no-hint");
  btnYes.classList.add("is-locked");
  btnYes.disabled = true;
  btnYes.setAttribute("aria-disabled", "true");
  hint.textContent = CONFIG.screen3HintLocked;
  hint.classList.remove("is-unlocked", "hidden");
}

function unlockYes() {
  const btnYes = document.getElementById("btn-yes");
  const hint = document.getElementById("no-hint");
  btnYes.classList.remove("is-locked");
  btnYes.disabled = false;
  btnYes.setAttribute("aria-disabled", "false");
  hint.textContent = CONFIG.screen3HintUnlocked;
  hint.classList.add("is-unlocked");
}

function resetNoButton() {
  const btnNo = document.getElementById("btn-no");
  const btnYes = document.getElementById("btn-yes");
  const area = document.getElementById("button-area");
  const card = document.getElementById("screen3-card");

  btnNo.style.position = "";
  btnNo.style.left = "";
  btnNo.style.top = "";
  btnNo.classList.remove("trail", "hidden");
  btnYes.style.transform = "scale(1)";
  btnYes.style.setProperty("--yes-scale", "1");
  btnYes.classList.remove("bounce", "hidden");
  yesScale = 1;
  dodgeIndex = 0;
  dodgeCount = 0;
  screen3Answered = false;

  document.getElementById("dodge-message").textContent = "";
  document.getElementById("dodge-message").classList.remove("shake");
  document.getElementById("yes-reply").classList.add("hidden");
  document.getElementById("button-area").classList.remove("hidden");
  card.classList.remove("flash-rose");

  lockYes();
  area.style.minHeight = isMobile() ? "160px" : "140px";
}

function dodgeNo(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (screen3Answered || currentScreen !== 3) return;

  const btnNo = document.getElementById("btn-no");
  const btnYes = document.getElementById("btn-yes");
  const msgEl = document.getElementById("dodge-message");
  const area = document.getElementById("button-area");

  const areaRect = area.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();
  const padding = 8;
  const maxLeft = Math.max(areaRect.width - btnRect.width - padding, padding);
  const maxTop = Math.max(areaRect.height - btnRect.height - padding, padding);

  btnNo.style.position = "absolute";

  let left = padding + Math.random() * maxLeft;
  let top = padding + Math.random() * maxTop;

  const yesRect = btnYes.getBoundingClientRect();
  const yesLocalLeft = yesRect.left - areaRect.left;
  const yesLocalTop = yesRect.top - areaRect.top;
  if (
    Math.abs(left - yesLocalLeft) < yesRect.width &&
    Math.abs(top - yesLocalTop) < yesRect.height
  ) {
    left = left < maxLeft / 2 ? maxLeft * 0.75 : padding;
    top = top < maxTop / 2 ? maxTop * 0.75 : padding;
  }

  btnNo.style.left = `${left}px`;
  btnNo.style.top = `${top}px`;

  if (!prefersReducedMotion) {
    btnNo.classList.add("trail");
    setTimeout(() => btnNo.classList.remove("trail"), 200);
  }

  msgEl.textContent =
    CONFIG.screen3DodgeMessages[
      dodgeIndex % CONFIG.screen3DodgeMessages.length
    ];
  dodgeIndex++;
  dodgeCount++;

  msgEl.classList.remove("shake");
  void msgEl.offsetWidth;
  msgEl.classList.add("shake");

  yesScale = Math.min(yesScale + 0.08, 1.4);
  btnYes.style.setProperty("--yes-scale", String(yesScale));
  btnYes.style.transform = `scale(${yesScale})`;

  if (!prefersReducedMotion) {
    btnYes.classList.remove("bounce");
    void btnYes.offsetWidth;
    btnYes.classList.add("bounce");
    setTimeout(() => btnYes.classList.remove("bounce"), 450);
  }

  if (dodgeCount === 1) unlockYes();
}

function motifBurst(x, y) {
  if (prefersReducedMotion) return;
  BURST_MOTIFS.forEach((motif, i) => {
    const el = document.createElement("span");
    el.className = "motif-burst";
    el.textContent = motif;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    const angle = (i / BURST_MOTIFS.length) * Math.PI * 2;
    const dist = 45 + Math.random() * 40;
    el.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
    el.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 850);
  });
}

function onYesClick() {
  if (screen3Answered || dodgeCount < 1) return;
  screen3Answered = true;

  const btnNo = document.getElementById("btn-no");
  const btnYes = document.getElementById("btn-yes");
  const reply = document.getElementById("yes-reply");
  const card = document.getElementById("screen3-card");
  const hint = document.getElementById("no-hint");

  btnNo.classList.add("hidden");
  btnYes.classList.add("hidden");
  hint.classList.add("hidden");
  document.getElementById("dodge-message").textContent = "";
  document.getElementById("button-area").classList.add("hidden");
  reply.classList.remove("hidden");
  card.classList.add("flash-rose");

  const rect = btnYes.getBoundingClientRect();
  motifBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

  setTimeout(() => goToScreen(4), prefersReducedMotion ? 2800 : 4800);
}

function drawHeart(ctx, x, y, size, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 16, size / 16);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 4);
  ctx.bezierCurveTo(0, 0, -6, 0, -6, 4);
  ctx.bezierCurveTo(-6, 8, 0, 12, 0, 14);
  ctx.bezierCurveTo(0, 12, 6, 8, 6, 4);
  ctx.bezierCurveTo(6, 0, 0, 0, 0, 4);
  ctx.fill();
  ctx.restore();
}

function launchConfetti() {
  if (prefersReducedMotion) return;

  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#d46a8a", "#e891a8", "#f4b8c8", "#b84d6e", "#fff5f8", "#d4a05a"];
  const cx = canvas.width / 2;
  const cy = canvas.height * 0.35;
  const emojiPieces = ["♥", "💋", "🌹"];

  const pieces = Array.from({ length: 160 }, (_, i) => {
    const burst = i < 50;
    const angle = Math.random() * Math.PI * 2;
    const speed = burst ? 3 + Math.random() * 6 : 0;
    const kindRoll = Math.random();
    let kind = "rect";
    if (kindRoll > 0.55) kind = "heart";
    else if (kindRoll > 0.35) kind = "emoji";

    return {
      x: burst ? cx : Math.random() * canvas.width,
      y: burst ? cy : Math.random() * canvas.height - canvas.height,
      w: 5 + Math.random() * 7,
      h: 4 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: burst ? Math.cos(angle) * speed : (Math.random() - 0.5) * 3,
      vy: burst ? Math.sin(angle) * speed : 2 + Math.random() * 4,
      rot: Math.random() * 360,
      vr: (Math.random() - 0.5) * 10,
      kind,
      emoji: emojiPieces[Math.floor(Math.random() * emojiPieces.length)],
      size: 10 + Math.random() * 10,
    };
  });

  let frame = 0;
  const maxFrames = 280;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04;
      p.rot += p.vr;
      if (p.y > canvas.height + 20) {
        p.y = -12;
        p.x = Math.random() * canvas.width;
        p.vy = 2 + Math.random() * 3;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      if (p.kind === "heart") drawHeart(ctx, 0, 0, p.size, p.color);
      else if (p.kind === "emoji") {
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.emoji, 0, 0);
      } else {
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
    });
    frame++;
    if (frame < maxFrames) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  draw();
}

/* —— Music: on by default, mute toggles off —— */
function updateMusicUI() {
  const toggle = document.getElementById("music-toggle");
  const icon = document.getElementById("music-icon");
  const muted = !musicWantedOn;
  toggle.classList.toggle("is-muted", muted);
  toggle.setAttribute("aria-label", muted ? "Unmute music" : "Mute music");
  icon.textContent = muted ? "♩" : "♪";
}

function tryPlayMusic() {
  const audio = document.getElementById("bg-music");
  if (!musicWantedOn || !audio) return;

  if (CONFIG.musicSrc && audio.getAttribute("src") !== CONFIG.musicSrc) {
    audio.src = CONFIG.musicSrc;
  }

  audio.volume = 0.45;
  const play = audio.play();
  if (play && typeof play.then === "function") {
    play
      .then(() => {
        musicStarted = true;
      })
      .catch(() => {
        musicStarted = false;
      });
  }
}

function initMusic() {
  const audio = document.getElementById("bg-music");
  const toggle = document.getElementById("music-toggle");
  if (CONFIG.musicSrc) audio.src = CONFIG.musicSrc;

  const saved = sessionStorage.getItem("gf-music-muted");
  if (saved === "1") musicWantedOn = false;

  updateMusicUI();
  // Do not autoplay on load — start when she taps the seal

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    musicWantedOn = !musicWantedOn;
    sessionStorage.setItem("gf-music-muted", musicWantedOn ? "0" : "1");
    updateMusicUI();
    if (musicWantedOn) tryPlayMusic();
    else audio.pause();
  });
}

/* —— Loader + envelope —— */
function initLoader() {
  const loader = document.getElementById("loader");
  const delay = prefersReducedMotion ? 0 : 1300;
  setTimeout(() => {
    loader.classList.add("is-done");
  }, delay);
}

function initEnvelope() {
  const envelope = document.getElementById("envelope");
  const wrap = document.getElementById("envelope-wrap");
  const card = document.getElementById("screen1-card");

  envelope.addEventListener("click", () => {
    if (envelopeOpened) return;
    envelopeOpened = true;
    envelope.classList.add("is-open");

    // Start her song on first seal tap (user gesture unlocks audio)
    musicWantedOn = true;
    sessionStorage.setItem("gf-music-muted", "0");
    updateMusicUI();
    tryPlayMusic();

    if (prefersReducedMotion) {
      wrap.classList.add("is-hidden");
      card.classList.remove("hidden");
      runScreen1Typewriter();
      return;
    }

    // Flap opens → envelope fades → letter rises
    setTimeout(() => {
      wrap.classList.add("is-exiting");
      card.classList.remove("hidden");
      card.classList.add("letter-reveal");
      setTimeout(() => runScreen1Typewriter(), 280);
    }, 780);

    setTimeout(() => {
      wrap.classList.add("is-hidden");
      wrap.classList.remove("is-exiting");
    }, 1550);
  });
}

function openWhatsAppHug() {
  const phone = String(CONFIG.whatsappNumber || "").replace(/\D/g, "");
  const text = encodeURIComponent(CONFIG.hugMessage || "Sending you a hug 🤍");
  const url = `https://wa.me/${phone}?text=${text}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function initHug() {
  const btn = document.getElementById("hug-btn");
  const bloom = document.getElementById("hug-bloom");

  btn.addEventListener("click", () => {
    bloom.innerHTML = '<span class="hug-heart">♥</span>';
    bloom.classList.remove("hidden");
    bloom.classList.add("is-on");
    spikeAmbientParticles(8);

    setTimeout(() => {
      bloom.classList.remove("is-on");
      bloom.classList.add("hidden");
      bloom.innerHTML = "";
      openWhatsAppHug();
    }, prefersReducedMotion ? 200 : 700);
  });
}

function initNavigation() {
  document.querySelectorAll("[data-next]").forEach((btn) => {
    btn.addEventListener("click", () => {
      goToScreen(Number(btn.dataset.next));
    });
  });

  document.getElementById("back-btn").addEventListener("click", () => {
    if (currentScreen > 1) goToScreen(currentScreen - 1);
  });
}

function initScreen3() {
  document.getElementById("btn-no").addEventListener("click", dodgeNo);
  document.getElementById("btn-yes").addEventListener("click", onYesClick);
}

window.addEventListener("resize", () => {
  const canvas = document.getElementById("confetti-canvas");
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

initContent();
initHearts();
initGlitter();
initSprinkles();
initNavigation();
initScreen3();
initLoader();
initEnvelope();
initMusic();
initHug();
updateProgress(1);
