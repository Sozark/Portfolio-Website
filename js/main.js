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
        typeEl.classList.add('blinking'); // blinking cursor
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
  if (page === 'portfolio' || page === 'music') startMatrixRain();

  /* ===== CHOICE PAGE PILLS ===== */
  if (page === 'choice') {
    const redPill = document.getElementById('redPill');
    const bluePill = document.getElementById('bluePill');
    if (redPill) redPill.addEventListener('click', () => window.location.href='portfolio.html');
    if (bluePill) bluePill.addEventListener('click', () => window.location.href='wrongChoice.html');
  }
});

/* ===== MATRIX RAIN ===== */
function startMatrixRain() {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = ['诶','比','西','迪','伊','吉','艾','杰','开','哦','屁','提','维','N','O','A','H','J','O','N','E','S'];
  const drops = 50;
  const x = [], y = [], speed = [], size = [];
  const colors = ['#cefbe4','#81ec72','#5cd646','#54d13c'];

  for (let i = 0; i < drops; i++) {
    x[i] = Math.random() * canvas.width;
    y[i] = Math.random() * canvas.height;
    speed[i] = Math.random() * 1 + 1;
    size[i] = Math.random() * 16 + 8;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#94f475';
    
    for (let i = 0; i < drops; i++) {
      ctx.font = `${size[i]}px monospace`;
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x[i], y[i]);
      y[i] += speed[i];
      if (y[i] > canvas.height) y[i] = 0;
    }
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/* ===== SNOWFALL ===== */
function startSnowfall() {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = ['❄','*','•','·'];
  const drops = 100;
  const x = [], y = [], speed = [], size = [];

  for (let i = 0; i < drops; i++) {
    x[i] = Math.random() * canvas.width;
    y[i] = Math.random() * canvas.height;
    speed[i] = Math.random() * 1 + 0.5;
    size[i] = Math.random() * 20 + 10;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < drops; i++) {
      ctx.font = `${size[i]}px monospace`;
      ctx.fillStyle = '#cefbe4';
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x[i], y[i]);
      y[i] += speed[i];
      if (y[i] > canvas.height) y[i] = 0;
    }
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

   /* CHOICE PAGE */

/* ===== PILL NAVIGATION (choice page only) ===== */
if (page === 'choice') {
  const redPill  = document.getElementById('redPill');
  const bluePill = document.getElementById('bluePill');
  const flash    = document.getElementById('flashOverlay');

  /* Pill logic */
  function pillClick(destination) {
    // Instant white flash, then navigate
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
