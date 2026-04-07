/* ==========================================================================
   wrongChoice.js  —  Office cubicle page logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Taskbar clock ---- */
  function updateClock() {
    const now  = new Date();
    const h    = now.getHours() % 12 || 12;
    const m    = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() < 12 ? 'AM' : 'PM';
    document.getElementById('taskbarClock').textContent = `${h}:${m} ${ampm}`;
  }

  updateClock();
  setInterval(updateClock, 30000);

  /* ---- Build keyboard keys ---- */
  const keyboard = document.getElementById('keyboard');
  if (keyboard) {
    for (let i = 0; i < 48; i++) {
      const key = document.createElement('div');
      key.classList.add('key');
      keyboard.appendChild(key);
    }
  }

  /* ---- Progress bar label stages ---- */
  const label  = document.getElementById('progressLabel');
  const stages = [
    [0,     'Initializing... 0%'],
    [800,   'Loading TPS templates... 12%'],
    [2500,  'Synergizing assets... 23%'],
    [5000,  'Compiling Q3 pivot tables... 47%'],
    [8000,  'Optimizing workflow... 47%'],
    [10000, 'Still working on it... 47%'],
    [12000, 'Please do not restart... 68%'],
  ];

  if (label) {
    stages.forEach(([delay, text]) => {
      setTimeout(() => { label.textContent = text; }, delay + 1500);
    });
  }

  /* ---- Close button hides the window ---- */
  const winClose = document.getElementById('winClose');
  const mainWindow = document.getElementById('mainWindow');
  if (winClose && mainWindow) {
    winClose.addEventListener('click', () => {
      mainWindow.style.display = 'none';
    });
  }

  /* ---- Navigate back to choice page with fade ---- */
  function goBack() {
    const overlay = document.getElementById('flashOverlay');
    overlay.classList.add('active');
    setTimeout(() => {
      window.location.href = 'choice.html';
    }, 500);
  }

  const wakeUpBtn  = document.getElementById('wakeUpBtn');
  const redPillBtn = document.getElementById('redPillBtn');

  if (wakeUpBtn)  wakeUpBtn.addEventListener('click',  goBack);
  if (redPillBtn) redPillBtn.addEventListener('click', goBack);

});