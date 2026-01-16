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
        stripX[i] = Math.floor(Math.random() * canvas.width);
        stripY[i] = Math.floor(Math.random() * canvas.height);
        dY[i] = Math.random() * 3 + 1;
        stripFontSize[i] = Math.floor(Math.random() * 16) + 8;
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
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.shadowOffsetX = context.shadowOffsetY = 0;
        context.shadowBlur = 8;
        context.shadowColor = '#94f475';

        for (let j = 0; j < stripCount; j++) {
            context.font = `${stripFontSize[j]}px monospace`;
            context.textBaseline = 'top';
            context.textAlign = 'center';
            drawStrip(stripX[j], stripY[j]);
            stripY[j] += dY[j];

            if (stripY[j] > canvas.height) {
                stripY[j] = -stripFontSize[j] * 20;
                stripX[j] = Math.floor(Math.random() * canvas.width);
                dY[j] = Math.random() * 3 + 1;
                stripFontSize[j] = Math.floor(Math.random() * 16) + 8;
            }
        }
        requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Contact Form - ONLY runs if the form exists on the page
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            alert(`Thank you, ${name}! Your message has been sent.`);
            contactForm.reset();
        });
    }
});
  