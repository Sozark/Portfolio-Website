/* ==========================================================================
   contact.js  —  Contact form handler
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form    = document.getElementById('contactForm');
  const confirm = document.getElementById('confirmMsg');

  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    /* Show confirmation message */
    if (confirm) {
      confirm.classList.add('visible');
    }

    /* Reset form after short delay */
    setTimeout(() => {
      form.reset();
    }, 800);
  });
});