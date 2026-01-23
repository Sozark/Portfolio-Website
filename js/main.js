document.addEventListener('DOMContentLoaded', () => {

  /************* MATRIX CANVAS *************/
  const canvas = document.body.appendChild(document.createElement('canvas'));
  const ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = 'lighter';

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = ['诶','比','西','迪','伊','吉','艾','杰','开','哦','屁','提','维','N','O','A','H', 'J', 'O', 'N', 'E', 'S'];
  const drops = 50; // This Controls how dense the rain is 
  const x = [];
  const y = [];
  const speed = [];
  const size = [];
  const colors = ['#cefbe4','#81ec72','#5cd646','#54d13c'];

  for (let i = 0; i < drops; i++) {
    x[i] = Math.random() * canvas.width;
    y[i] = Math.random() * canvas.height;
    speed[i] = Math.random() * 3 + 1;
    size[i] = Math.random() * 16 + 8;
  }

  function drawMatrix() {
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
    requestAnimationFrame(drawMatrix);
  }

  drawMatrix();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  /************* PILL CHOICE LOGIC *************/
  const redPill = document.getElementById('redPill');
  const bluePill = document.getElementById('bluePill');

  if (redPill) {
    redPill.addEventListener('click', () => {
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = 'portfolio.html';
      }, 500);
    });
  }

  if (bluePill) {
    bluePill.addEventListener('click', () => {
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = 'wrong-choice.html';
      }, 500);
    });
  }

});