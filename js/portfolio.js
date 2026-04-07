/* ==========================================================================
   portfolio.js  —  Carousel + Modal interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* =====================================================================
     CAROUSEL
     ===================================================================== */

  const track     = document.querySelector('.carousel-track');
  const slides    = document.querySelectorAll('.carousel-slide');
  const prevBtn   = document.querySelector('.carousel-btn--prev');
  const nextBtn   = document.querySelector('.carousel-btn--next');
  const dotsWrap  = document.querySelector('.carousel-dots');
  const counter   = document.getElementById('slideCounter');

  let current = 0;

  if (track && slides.length) {

    /* Build dots */
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll('.carousel-dot');

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach(d => d.classList.remove('active'));
      dots[current].classList.add('active');
      if (counter) {
        const total = String(slides.length).padStart(2, '0');
        counter.textContent = `${String(current + 1).padStart(2, '0')} / ${total}`;
      }
    }

    prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

    /* Swipe support */
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    });
  }

  /* =====================================================================
     MODAL
     ===================================================================== */

  const overlay    = document.querySelector('.modal-overlay');
  const modal      = document.querySelector('.modal');
  const closeBtn   = document.querySelector('.modal__close');
  const mediaWrap  = document.querySelector('.modal__media');
  const titleEl    = document.querySelector('.modal__title');
  const descEl     = document.querySelector('.modal__desc');
  const audioVis   = document.querySelector('.modal__audio-visual');

  if (!overlay) return; // page has no modal

  function openModal(trigger) {
    const type  = trigger.dataset.type;
    const src   = trigger.dataset.src;
    const title = trigger.dataset.title  || '';
    const desc  = trigger.dataset.desc   || '';

    /* Clear previous content */
    mediaWrap.innerHTML = '';
    if (audioVis) {
      audioVis.innerHTML = '';
      audioVis.style.display = 'none';
    }

    /* Build media element */
    if (type === 'image') {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title;
      mediaWrap.appendChild(img);

    } else if (type === 'video') {
      const vid = document.createElement('video');
      vid.src        = src;
      vid.controls   = true;
      vid.autoplay   = true;
      vid.style.width = '100%';
      mediaWrap.appendChild(vid);

    } else if (type === 'audio') {
      /* Animated bars visual */
      if (audioVis) {
        audioVis.style.display = 'flex';
        for (let i = 0; i < 12; i++) {
          const bar = document.createElement('div');
          bar.classList.add('audio-bar');
          bar.style.animationDelay = `${(i * 0.07).toFixed(2)}s`;
          audioVis.appendChild(bar);
        }
      }
      const aud = document.createElement('audio');
      aud.src      = src;
      aud.controls = true;
      aud.autoplay = true;
      mediaWrap.appendChild(aud);
    }

    /* Populate text */
    titleEl.textContent = title;

    if (desc && !desc.startsWith('// Replace')) {
      descEl.textContent = desc;
      descEl.classList.remove('modal__desc--placeholder');
    } else {
      descEl.textContent = '// Description coming soon…';
      descEl.classList.add('modal__desc--placeholder');
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';

    /* Stop any playing media */
    mediaWrap.querySelectorAll('video, audio').forEach(m => {
      m.pause();
      m.src = '';
    });
    mediaWrap.innerHTML = '';
    if (audioVis) {
      audioVis.innerHTML = '';
      audioVis.style.display = 'none';
    }
  }

  /* Attach click to every [data-modal] trigger */
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => openModal(trigger));
  });

  /* Close button */
  closeBtn  && closeBtn.addEventListener('click', closeModal);

  /* Click outside modal box */
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  /* ESC key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

});
