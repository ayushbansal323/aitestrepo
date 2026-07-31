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

  screen5Headline: "I love you, {herName}",
  loveNote:
    "Thank you for being you, baby girl. Happy Girlfriend's Day — today and every day after. You're my person.",
  screen5Closing: "Now come here — hugs, cuddles, and kisses 🤍",
};

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

let currentScreen = 1;
let dodgeIndex = 0;
let yesScale = 1;
let screen3Answered = false;
let confettiStarted = false;

function fill(template) {
  return template.replace(/\{herName\}/g, CONFIG.herName);
}

function initContent() {
  document.title = fill(CONFIG.screen1Headline);
  document.getElementById("screen1-headline").textContent = fill(
    CONFIG.screen1Headline
  );
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
  document.getElementById("yes-reply").textContent = CONFIG.screen3YesReply;
  document.getElementById("screen4-headline").textContent =
    CONFIG.screen4Headline;
  document.getElementById("screen5-headline").textContent = fill(
    CONFIG.screen5Headline
  );
  document.getElementById("screen5-lovenote").textContent = CONFIG.loveNote;
  document.getElementById("screen5-closing").textContent =
    CONFIG.screen5Closing;
}

function initHearts() {
  const container = document.querySelector(".hearts-bg");
  const count = prefersReducedMotion ? 0 : 12;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "heart-particle";
    heart.textContent = "♥";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${8 + Math.random() * 8}s`;
    heart.style.animationDelay = `${Math.random() * 8}s`;
    heart.style.fontSize = `${0.7 + Math.random() * 0.8}rem`;
    container.appendChild(heart);
  }
}

function updateProgress(screen) {
  document.querySelectorAll(".dot").forEach((dot) => {
    dot.classList.toggle(
      "active",
      Number(dot.dataset.dot) === screen
    );
  });

  const backBtn = document.getElementById("back-btn");
  if (screen > 1 && screen < 5) {
    backBtn.classList.remove("hidden");
  } else {
    backBtn.classList.add("hidden");
  }
}

function goToScreen(target) {
  if (target === currentScreen) return;

  const current = document.getElementById(`screen-${currentScreen}`);
  const next = document.getElementById(`screen-${target}`);

  current.classList.add("leaving");
  current.classList.remove("active");

  setTimeout(() => {
    current.classList.remove("leaving");
    next.classList.add("active");
    currentScreen = target;
    updateProgress(target);

    if (target === 4) animateReasons();
    if (target === 3) resetNoButton();
    if (target === 5 && !confettiStarted) {
      confettiStarted = true;
      launchConfetti();
    }
  }, prefersReducedMotion ? 0 : 400);
}

function animateReasons() {
  const list = document.getElementById("reasons-list");
  const continueBtn = document.getElementById("screen4-continue");

  list.innerHTML = "";
  continueBtn.classList.add("hidden");

  CONFIG.reasons.forEach((reason, i) => {
    const li = document.createElement("li");
    li.textContent = reason;
    list.appendChild(li);

    const delay = prefersReducedMotion ? 0 : (i + 1) * 600;
    setTimeout(() => {
      li.classList.add("visible");
      if (i === CONFIG.reasons.length - 1) {
        setTimeout(
          () => continueBtn.classList.remove("hidden"),
          prefersReducedMotion ? 0 : 400
        );
      }
    }, delay);
  });
}

function resetNoButton() {
  const btnNo = document.getElementById("btn-no");
  const btnYes = document.getElementById("btn-yes");
  const area = document.getElementById("button-area");

  btnNo.style.position = "";
  btnNo.style.left = "";
  btnNo.style.top = "";
  btnYes.style.transform = "scale(1)";
  yesScale = 1;
  dodgeIndex = 0;
  document.getElementById("dodge-message").textContent = "";
  document.getElementById("yes-reply").classList.add("hidden");
  btnNo.classList.remove("hidden");
  btnYes.classList.remove("hidden");
  screen3Answered = false;

  area.style.minHeight = "120px";
}

function dodgeNo() {
  if (screen3Answered || currentScreen !== 3) return;

  const btnNo = document.getElementById("btn-no");
  const btnYes = document.getElementById("btn-yes");
  const msgEl = document.getElementById("dodge-message");
  const area = document.getElementById("button-area");

  const areaRect = area.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();
  const padding = 8;
  const maxLeft = areaRect.width - btnRect.width - padding;
  const maxTop = areaRect.height - btnRect.height - padding;

  btnNo.style.position = "absolute";

  if (prefersReducedMotion) {
    btnNo.style.left = `${maxLeft / 2}px`;
    btnNo.style.top = `${maxTop / 2}px`;
  } else {
    btnNo.style.left = `${padding + Math.random() * Math.max(maxLeft, padding)}px`;
    btnNo.style.top = `${padding + Math.random() * Math.max(maxTop, padding)}px`;
  }

  msgEl.textContent =
    CONFIG.screen3DodgeMessages[
      dodgeIndex % CONFIG.screen3DodgeMessages.length
    ];
  dodgeIndex++;

  yesScale = Math.min(yesScale + 0.08, 1.4);
  btnYes.style.transform = `scale(${yesScale})`;
}

function heartBurst(x, y) {
  if (prefersReducedMotion) return;

  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("span");
    heart.className = "heart-burst";
    heart.textContent = "♥";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    const angle = (i / 8) * Math.PI * 2;
    const dist = 40 + Math.random() * 30;
    heart.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
    heart.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 800);
  }
}

function onYesClick(e) {
  if (screen3Answered) return;
  screen3Answered = true;

  const btnNo = document.getElementById("btn-no");
  const btnYes = document.getElementById("btn-yes");
  const reply = document.getElementById("yes-reply");

  btnNo.classList.add("hidden");
  btnYes.classList.add("hidden");
  document.getElementById("dodge-message").textContent = "";

  reply.classList.remove("hidden");

  const rect = btnYes.getBoundingClientRect();
  heartBurst(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2
  );

  setTimeout(() => goToScreen(4), prefersReducedMotion ? 500 : 2000);
}

function launchConfetti() {
  if (prefersReducedMotion) return;

  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#e8a0b8", "#d4789a", "#c9a227", "#f3e8ff", "#fff5f7"];
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    w: 6 + Math.random() * 6,
    h: 4 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 3,
    vy: 2 + Math.random() * 4,
    rot: Math.random() * 360,
    vr: (Math.random() - 0.5) * 8,
  }));

  let frame = 0;
  const maxFrames = 180;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < maxFrames) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  draw();
}

function initNavigation() {
  document.querySelectorAll("[data-next]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = Number(btn.dataset.next);
      if (target === 3) resetNoButton();
      goToScreen(target);
    });
  });

  document.getElementById("back-btn").addEventListener("click", () => {
    if (currentScreen > 1) {
      if (currentScreen === 4) resetNoButton();
      goToScreen(currentScreen - 1);
    }
  });
}

function initScreen3() {
  const btnNo = document.getElementById("btn-no");
  const btnYes = document.getElementById("btn-yes");

  btnNo.addEventListener("mouseenter", dodgeNo);
  btnNo.addEventListener("touchstart", (e) => {
    e.preventDefault();
    dodgeNo();
  }, { passive: false });

  btnYes.addEventListener("click", onYesClick);
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
initNavigation();
initScreen3();
updateProgress(1);
