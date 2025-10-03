
// ======================================================
// Accordion behavior (mobile-friendly, single-open, anchored)
// ======================================================
(function () {
  function $(sel, root=document) { return root.querySelector(sel); }
  function $all(sel, root=document) { return Array.from(root.querySelectorAll(sel)); }

  const NAVBAR = $('.navbar');
  const HEADER_OFFSET = NAVBAR ? NAVBAR.offsetHeight + 10 : 80;

  // Collect flips and their panels
  const flips = $all('.flip');
  const panels = $all('.panel');

  // Initialize: close all
  panels.forEach(p => p.style.display = 'none');
  flips.forEach(f => {
    f.classList.remove('active');
    f.setAttribute('role', 'button');
    f.setAttribute('tabindex', '0');
    f.setAttribute('aria-expanded', 'false');
  });

  function closeOthers(exceptPanel) {
    panels.forEach(p => {
      if (p !== exceptPanel) {
        if (p.style.display !== 'none') {
          p.style.display = 'none';
        }
        const btn = p.previousElementSibling;
        if (btn && btn.classList.contains('flip')) {
          btn.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  function togglePanel(flipEl) {
    const panel = flipEl.nextElementSibling;
    if (!panel || !panel.classList.contains('panel')) return;

    const willOpen = panel.style.display === 'none';
    // Always close others first (force single open)
    closeOthers(panel);

    if (willOpen) {
      panel.style.display = 'block';
      flipEl.classList.add('active');
      flipEl.setAttribute('aria-expanded', 'true');
      // Scroll to header (avoid jumping to bottom)
      const y = flipEl.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
      window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
    } else {
      panel.style.display = 'none';
      flipEl.classList.remove('active');
      flipEl.setAttribute('aria-expanded', 'false');
    }
  }

  // Click handler (delegated) to prevent default anchor behavior
  document.addEventListener('click', function (ev) {
    const flip = ev.target.closest('.flip');
    if (!flip) return;
    ev.preventDefault();
    togglePanel(flip);
  }, { passive: false });

  // Keyboard accessibility: Enter or Space
  document.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    const flip = ev.target.closest && ev.target.closest('.flip');
    if (!flip) return;
    ev.preventDefault();
    togglePanel(flip);
  });
})();
