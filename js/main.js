document.addEventListener('DOMContentLoaded', () => {

  /************* MATRIX CANVAS *************/

  // Seperates the falling code for before and after you enter the matrix. 
  const page = document.body.dataset.page || 'portfolio';
  // Create a canvas and add it to the page
  const canvas = document.body.appendChild(document.createElement('canvas'));

  // Get the 2D drawing context (our paintbrush)
  const ctx = canvas.getContext('2d');

  // Makes overlapping colors glow brighter
  ctx.globalCompositeOperation = 'lighter';

  // Set canvas to full screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Characters used in the Matrix rain
  const chars = ['诶','比','西','迪','伊','吉','艾','杰','开','哦','屁','提','维','N','O','A','H','J','O','N','E','S'];

  // Number of rain columns
  const drops = 50;

  // Arrays to store properties for each column
  const x = [];
  const y = [];
  const speed = [];
  const size = [];

  // Matrix green color palette
  const colors = ['#cefbe4','#81ec72','#5cd646','#54d13c'];

  // Initialize each rain column
  for (let i = 0; i < drops; i++) {
    x[i] = Math.random() * canvas.width;   // Random horizontal position
    y[i] = Math.random() * canvas.height;  // Random vertical position
    speed[i] = Math.random() * 1 + 1;      // Fall speed
    size[i] = Math.random() * 16 + 8;      // Font size
  }

  // Animation loop
  function drawMatrix() {

    // Clear the previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Glow effect
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#94f475';

    // Draw each falling character
    for (let i = 0; i < drops; i++) {
      ctx.font = `${size[i]}px monospace`;
      ctx.fillStyle = colors[i % colors.length];

      // Draw a random character
      ctx.fillText(
        chars[Math.floor(Math.random() * chars.length)],
        x[i],
        y[i]
      );

      // Move character downward
      y[i] += speed[i];

      // Reset to top when it goes off-screen
      if (y[i] > canvas.height) y[i] = 0;
    }

    // Keep animation running
    requestAnimationFrame(drawMatrix);
  }

  // Start the animation
  drawMatrix();

  // Resize canvas when window changes size
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
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
