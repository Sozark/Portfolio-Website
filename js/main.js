/* ==========================================================================
   main.js  —  Global scripts
   ========================================================================== */

const page = document.body.dataset.page;
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {

  /* ===== TYPEWRITER EFFECT ===== */
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    const text = typeEl.textContent.trim();
    typeEl.textContent = '';
    typeEl.classList.add('blinking');
    let i = 0;
    function type() {
      if (i < text.length) {
        typeEl.textContent += text.charAt(i++);
        setTimeout(type, 80);
      }
    }
    type();
  }

  /* ===== HAMBURGER MENU ===== */
  const menuToggle = document.querySelector('.menu-toggle');
  const dropdown   = document.querySelector('.dropdown-links');
  if (menuToggle && dropdown) {
    menuToggle.addEventListener('click', () => {
      dropdown.classList.toggle('active');
    });
  }

  /* ===== CANVAS EFFECTS ===== */
  if (page === 'choice') startSnowfall();
  if (page === 'welcome' || page === 'portfolio') startMatrixRain();

  /* ===== CHOICE PAGE PILLS (single handler — was registered twice) ===== */
  if (page === 'choice') {
    const redPill  = document.getElementById('redPill');
    const bluePill = document.getElementById('bluePill');
    const flash    = document.getElementById('flashOverlay');

    function pillClick(destination) {
      if (flash) {
        flash.style.transition = 'opacity 0.05s ease';
        flash.style.opacity    = '1';
      }
      setTimeout(() => { window.location.href = destination; }, 200);
    }

    if (redPill)  redPill.addEventListener('click',  () => pillClick('portfolio.html'));
    if (bluePill) bluePill.addEventListener('click', () => pillClick('wrongChoice.html'));
  }
});

/* ==========================================================================
   SHARED CANVAS HELPERS
   ========================================================================== */

function createBackgroundCanvas(opacity = 1) {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    position: 'fixed', top: '0', left: '0',
    width: '100%', height: '100%',
    zIndex: '-1', pointerEvents: 'none',
    opacity: String(opacity)
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const fit = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  fit();

  /* Debounced: resizing fires dozens of events per second */
  let timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(fit, 150);
  });

  return { canvas, ctx };
}

/* Runs `step(dt)` at a capped frame rate. dt is a 60fps-relative multiplier, so
   motion speed looks identical regardless of the cap. Skips work entirely while
   the tab is hidden or a modal is open. */
function startLoop(step, fps = 30) {
  if (REDUCED_MOTION) { step(1); return; }   // one static frame, no animation

  const frameMs = 1000 / fps;
  let last = performance.now();

  function frame(now) {
    requestAnimationFrame(frame);
    const elapsed = now - last;
    if (elapsed < frameMs) return;
    last = now;
    if (document.hidden || document.body.classList.contains('modal-open')) return;
    step(Math.min(elapsed, 100) / 16.667);
  }
  requestAnimationFrame(frame);
}

/* ===== MATRIX RAIN ===== */
function startMatrixRain() {
  const { canvas, ctx } = createBackgroundCanvas(0.4);

  const chars  = ['诶','比','西','迪','伊','吉','艾','杰','开','哦','屁','提','维','N','O','A','H','J','O','N','E','S'];
  const colors = ['#7dd4a8', '#5aad82', '#3d8a60', '#2e6e4c'];
  const drops  = 18;
  const x = [], y = [], speed = [], fonts = [];

  for (let i = 0; i < drops; i++) {
    x[i]     = Math.random() * canvas.width;
    y[i]     = Math.random() * canvas.height;
    speed[i] = Math.random() * 0.9 + 0.5;
    fonts[i] = `${Math.floor(Math.random() * 12 + 8)}px monospace`;   // built once, not per frame
  }

  startLoop(dt => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < drops; i++) {
      ctx.font      = fonts[i];
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillText(chars[(Math.random() * chars.length) | 0], x[i], y[i]);
      y[i] += speed[i] * dt;
      if (y[i] > canvas.height) {
        y[i] = 0;
        x[i] = Math.random() * canvas.width;   // also recovers drops stranded by a resize
      }
    }
  });
}

/* ===== SNOWFALL ===== */
function startSnowfall() {
  const { canvas, ctx } = createBackgroundCanvas(1);

  const chars = ['❄','*','•','·'];
  const drops = 100;
  const x = [], y = [], speed = [], fonts = [];

  for (let i = 0; i < drops; i++) {
    x[i]     = Math.random() * canvas.width;
    y[i]     = Math.random() * canvas.height;
    speed[i] = Math.random() * 1 + 0.5;
    fonts[i] = `${Math.floor(Math.random() * 20 + 10)}px monospace`;
  }

  startLoop(dt => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#cefbe4';
    for (let i = 0; i < drops; i++) {
      ctx.font = fonts[i];
      ctx.fillText(chars[(Math.random() * chars.length) | 0], x[i], y[i]);
      y[i] += speed[i] * dt;
      if (y[i] > canvas.height) {
        y[i] = 0;
        x[i] = Math.random() * canvas.width;
      }
    }
  });
}