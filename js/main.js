document.addEventListener('DOMContentLoaded', () => {

    /************* Hamburger Menu *************/
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownLinks = document.querySelector('.dropdown-links');

    if (menuToggle && dropdownLinks) {
        menuToggle.addEventListener('click', () => {
            dropdownLinks.classList.toggle('active'); // Toggle menu
        });
    }

    /************* Matrix Canvas Animation *************/
    const canvas = document.body.appendChild(document.createElement('canvas'));
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'lighter';

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const textStrip = ['诶','比','西','迪','伊','吉','艾','杰','开','哦','屁','提','维','N','O','A','H','J','O','N','E','S'];
    const stripCount = 60;
    const stripX = [];
    const stripY = [];
    const dY = [];
    const stripFontSize = [];
    const theColors = ['#cefbe4','#81ec72','#5cd646','#54d13c','#4ccc32','#43c728'];

    // Initialize strip positions, speed, font size
    for (let i = 0; i < stripCount; i++) {
        stripX[i] = Math.floor(Math.random() * canvas.width);
        stripY[i] = Math.floor(Math.random() * canvas.height);
        dY[i] = Math.random() * 3 + 1;
        stripFontSize[i] = Math.floor(Math.random() * 16) + 8;
    }

    function drawStrip(x, y) {
        for (let k = 0; k <= 20; k++) {
            const randChar = textStrip[Math.floor(Math.random() * textStrip.length)];
            ctx.fillStyle = theColors[k % theColors.length];
            ctx.fillText(randChar, x, y);
            y -= stripFontSize[k];
        }
    }

    function drawMatrix() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#94f475';

        for (let j = 0; j < stripCount; j++) {
            ctx.font = `${stripFontSize[j]}px monospace`;
            ctx.textBaseline = 'top';
            ctx.textAlign = 'center';

            drawStrip(stripX[j], stripY[j]);
            stripY[j] += dY[j];

            if (stripY[j] > canvas.height) {
                stripY[j] = -stripFontSize[j] * 20;
                stripX[j] = Math.floor(Math.random() * canvas.width);
                dY[j] = Math.random() * 3 + 1;
                stripFontSize[j] = Math.floor(Math.random() * 16) + 8;
            }
        }

        requestAnimationFrame(drawMatrix);
    }

    drawMatrix();

    // Resize canvas dynamically
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    /************* Contact Form Logic *************/
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Thank you, ${name}! Your message has been sent.`);
            contactForm.reset();
        });
    }

    /************* Red / Blue Pill Navigation *************/
    const redPill = document.getElementById('redPill');
    const bluePill = document.getElementById('bluePill');

    if (redPill && bluePill) {
        // Red pill -> Portfolio
        redPill.addEventListener('click', () => {
            document.body.style.transition = 'opacity 0.5s';
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = 'portfolio.html';
            }, 500);
        });

        // Blue pill -> Wrong choice
        bluePill.addEventListener('click', () => {
            document.body.style.transition = 'opacity 0.5s';
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = 'wrong-choice.html';
            }, 500);
        });
    }

});
