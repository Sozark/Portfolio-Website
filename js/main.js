const page = document.body.dataset.page;

document.addEventListener('DOMContentLoaded', () => {

  /* ===== TYPEWRITER EFFECT ===== */
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    const text = typeEl.textContent.trim();
    typeEl.textContent = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        typeEl.textContent += text.charAt(i++);
        typeEl.classList.add('blinking');
        setTimeout(type, 80);
      }
    }
    type();
  }

  /* ===== HAMBURGER MENU ===== */
  const menuToggle = document.querySelector('.menu-toggle');
  const dropdown = document.querySelector('.dropdown-links');
  if (menuToggle && dropdown) {
    menuToggle.addEventListener('click', () => {
      dropdown.classList.toggle('active');
    });
  }

  /* ===== CANVAS EFFECTS ===== */
  if (page === 'choice') startSnowfall();
  if (page === 'welcome' || page === 'portfolio') startMatrixRain();

  /* ===== CHOICE PAGE PILLS ===== */
  if (page === 'choice') {
    const redPill = document.getElementById('redPill');
    const bluePill = document.getElementById('bluePill');
    if (redPill) redPill.addEventListener('click', () => window.location.href = 'portfolio.html');
    if (bluePill) bluePill.addEventListener('click', () => window.location.href = 'wrongChoice.html');
  }
});

/* ===== MATRIX RAIN ===== */
function startMatrixRain() {
  const canvas = document.createElement('canvas');

  canvas.style.position      = 'fixed';
  canvas.style.top           = '0';
  canvas.style.left          = '0';
  canvas.style.width         = '100%';
  canvas.style.height        = '100%';
  canvas.style.zIndex        = '-1';
  canvas.style.pointerEvents = 'none';
  canvas.style.opacity       = '0.45';  /* reduced overall opacity */

  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars  = ['诶','比','西','迪','伊','吉','艾','杰','开','哦','屁','提','维','N','O','A','H','J','O','N','E','S'];
  const drops  = 37;           /* fewer drops: was 50 */
  const x = [], y = [], speed = [], size = [];
  const colors = ['#7dd4a8','#5aad82','#3d8a60','#2e6e4c'];  /* darker, muted greens */

  for (let i = 0; i < drops; i++) {
    x[i]     = Math.random() * canvas.width;
    y[i]     = Math.random() * canvas.height;
    speed[i] = Math.random() * 0.5 + 0.3;  /* slower: was 1-2 */
    size[i]  = Math.random() * 12 + 8;      /* slightly smaller */
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur  = 3;            /* softer glow: was 8 */
    ctx.shadowColor = '#3d8a60';    /* darker shadow */

    for (let i = 0; i < drops; i++) {
      ctx.font      = `${size[i]}px monospace`;
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x[i], y[i]);
      y[i] += speed[i];
      if (y[i] > canvas.height) y[i] = 0;
    }
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/* ===== SNOWFALL ===== */
function startSnowfall() {
  const canvas = document.createElement('canvas');

  /* ── FIX: pin canvas behind all content ── */
  canvas.style.position      = 'fixed';
  canvas.style.top           = '0';
  canvas.style.left          = '0';
  canvas.style.width         = '100%';
  canvas.style.height        = '100%';
  canvas.style.zIndex        = '-1';
  canvas.style.pointerEvents = 'none';

  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars  = ['❄','*','•','·'];
  const drops  = 100;
  const x = [], y = [], speed = [], size = [];

  for (let i = 0; i < drops; i++) {
    x[i]     = Math.random() * canvas.width;
    y[i]     = Math.random() * canvas.height;
    speed[i] = Math.random() * 1 + 0.5;
    size[i]  = Math.random() * 20 + 10;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < drops; i++) {
      ctx.font      = `${size[i]}px monospace`;
      ctx.fillStyle = '#cefbe4';
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x[i], y[i]);
      y[i] += speed[i];
      if (y[i] > canvas.height) y[i] = 0;
    }
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/* ===== PILL NAVIGATION (choice page only) ===== */
if (page === 'choice') {
  const redPill  = document.getElementById('redPill');
  const bluePill = document.getElementById('bluePill');
  const flash    = document.getElementById('flashOverlay');

  function pillClick(destination) {
    flash.style.opacity    = '1';
    flash.style.transition = 'opacity 0.05s ease';
    setTimeout(() => {
      flash.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        window.location.href = destination;
      }, 150);
    }, 60);
  }

  if (redPill)  redPill.addEventListener('click',  () => pillClick('portfolio.html'));
  if (bluePill) bluePill.addEventListener('click', () => pillClick('wrongChoice.html'));
}