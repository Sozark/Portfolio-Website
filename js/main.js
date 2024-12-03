document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownLinks = document.querySelector('.dropdown-links');

    menuToggle.addEventListener('click', () => {
        dropdownLinks.classList.toggle('active'); // Toggle dropdown menu
    });

    // Matrix Animation
    const canvas = document.body.appendChild(document.createElement('canvas'));
    const context = canvas.getContext('2d');
    context.globalCompositeOperation = 'lighter';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const textStrip = ['诶', '比', '西', '迪', '伊', '吉', '艾', '杰', '开', '哦', '屁', '提', '维'];
    const stripCount = 60;
    const stripX = [];
    const stripY = [];
    const dY = [];
    const stripFontSize = [];
    const theColors = ['#cefbe4', '#81ec72', '#5cd646', '#54d13c', '#4ccc32', '#43c728'];

    for (let i = 0; i < stripCount; i++) {
        stripX[i] = Math.floor(Math.random() * canvas.width); // Random starting x positions
        stripY[i] = Math.floor(Math.random() * canvas.height); // Random starting y positions
        dY[i] = Math.random() * 3 + 1; // Random speed
        stripFontSize[i] = Math.floor(Math.random() * 16) + 8; // Random font sizes
    }

    function drawStrip(x, y) {
        for (let k = 0; k <= 20; k++) {
            const randChar = textStrip[Math.floor(Math.random() * textStrip.length)];
            context.fillStyle = theColors[k % theColors.length];
            context.fillText(randChar, x, y);
            y -= stripFontSize[k];
        }
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas each frame
        context.shadowOffsetX = context.shadowOffsetY = 0;
        context.shadowBlur = 8;
        context.shadowColor = '#94f475';

        for (let j = 0; j < stripCount; j++) {
            context.font = `${stripFontSize[j]}px monospace`;
            context.textBaseline = 'top';
            context.textAlign = 'center';

            drawStrip(stripX[j], stripY[j]); // Draw the current strip
            stripY[j] += dY[j]; // Move the strip down

            // Reset the strip when it exits the canvas
            if (stripY[j] > canvas.height) {
                stripY[j] = -stripFontSize[j] * 20; // Restart above the canvas
                stripX[j] = Math.floor(Math.random() * canvas.width); // Randomize x position
                dY[j] = Math.random() * 3 + 1; // Randomize speed
                stripFontSize[j] = Math.floor(Math.random() * 16) + 8; // Randomize font size
            }
        }

        requestAnimationFrame(draw); // Continue the animation
    }

    draw();

    // Update canvas size on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
  
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
  
      // Simulate sending the message (you can replace this with an actual backend call)
      alert(`Thank you, ${name}! Your message has been sent.`);
      contactForm.reset();
    });
  });
  