/* ==========================================================================
   portfolio.js  —  Carousel + Modal + Video playback manager
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const track    = document.querySelector('.carousel-track');
  const slides   = document.querySelectorAll('.carousel-slide');
  const prevBtn  = document.querySelector('.carousel-btn--prev');
  const nextBtn  = document.querySelector('.carousel-btn--next');
  const dotsWrap = document.querySelector('.carousel-dots');
  const counter  = document.getElementById('slideCounter');

  let current   = 0;
  let modalOpen = false;

  /* =====================================================================
     VIDEO PLAYBACK MANAGER
     Only videos that are on screen, in the active carousel slide, and not
     covered by the modal are allowed to play. Everything else is paused, so
     the browser never decodes more than a few videos at once.
     ===================================================================== */

  const videos   = Array.from(document.querySelectorAll('.carousel-slide video, .card video'));
  const onScreen = new Set();

  function shouldPlay(v) {
    if (REDUCED || modalOpen || document.hidden || !onScreen.has(v)) return false;
    const slide = v.closest('.carousel-slide');
    return slide ? slide === slides[current] : true;
  }

  function syncVideos() {
    videos.forEach(v => {
      if (shouldPlay(v)) {
        if (v.paused) v.play().catch(() => {});
      } else if (!v.paused) {
        v.pause();
      }
    });
  }

  if (videos.length) {
    videos.forEach(v => {
      v.muted       = true;
      v.loop        = true;   // keeps previews moving without re-triggering play()
      v.playsInline = true;
    });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) onScreen.add(e.target);
          else onScreen.delete(e.target);
        });
        syncVideos();
      }, { threshold: 0.25 });

      videos.forEach(v => io.observe(v));
    } else {
      videos.forEach(v => onScreen.add(v));
      syncVideos();
    }

    document.addEventListener('visibilitychange', syncVideos);
  }

  /* =====================================================================
     CAROUSEL
     ===================================================================== */

  if (track && slides.length) {

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

      syncVideos();   // play the new slide's video, pause the old one
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });
  }

  /* =====================================================================
     MODAL
     ===================================================================== */

  const overlay   = document.querySelector('.modal-overlay');
  if (!overlay) return;   // page has no modal

  const closeBtn  = overlay.querySelector('.modal__close');
  const mediaWrap = overlay.querySelector('.modal__media');
  const titleEl   = overlay.querySelector('.modal__title');
  const descEl    = overlay.querySelector('.modal__desc');
  const audioVis  = overlay.querySelector('.modal__audio-visual');

  function openModal(trigger) {
    const type  = trigger.dataset.type;
    const src   = trigger.dataset.src;
    const title = trigger.dataset.title || '';
    const desc  = trigger.dataset.desc  || '';

    mediaWrap.innerHTML = '';
    if (audioVis) {
      audioVis.innerHTML = '';
      audioVis.style.display = 'none';
    }

    if (type === 'image') {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title;
      img.decoding = 'async';
      mediaWrap.appendChild(img);

    } else if (type === 'video') {
      const vid = document.createElement('video');
      vid.src         = src;
      vid.controls    = true;
      vid.autoplay    = true;
      vid.playsInline = true;
      vid.preload     = 'auto';
      vid.style.width = '100%';
      mediaWrap.appendChild(vid);
      vid.play().catch(err => console.warn('Modal video play error:', err));

    } else if (type === 'audio') {
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
      aud.play().catch(() => {});
    }

    if (titleEl) titleEl.textContent = title;

    if (descEl) {
      if (desc && !desc.startsWith('// Replace')) {
        descEl.textContent = desc;
        descEl.classList.remove('modal__desc--placeholder');
      } else {
        descEl.textContent = '// Description coming soon…';
        descEl.classList.add('modal__desc--placeholder');
      }
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');   // main.js pauses canvas effects on this

    modalOpen = true;
    syncVideos();   // pause every background video while the modal is open
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');

    /* Release the modal's media so the browser can free memory */
    mediaWrap.querySelectorAll('video, audio').forEach(m => {
      m.pause();
      m.removeAttribute('src');
      m.load();
    });
    mediaWrap.innerHTML = '';
    if (audioVis) {
      audioVis.innerHTML = '';
      audioVis.style.display = 'none';
    }

    modalOpen = false;
    syncVideos();   // resume the visible previews
  }

  /* One delegated listener instead of one per card */
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-modal]');
    if (trigger) openModal(trigger);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

});