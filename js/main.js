// ---- "Collected so far" counter ----
// Set to the number of kilograms collected (e.g. 250) to show the counter
// band between the Story and What-we-do sections. Leave as null to hide it.
const KG_COLLECTED = null;

if (typeof KG_COLLECTED === 'number') {
  const band = document.createElement('section');
  band.className = 'tally';
  band.setAttribute('aria-label', 'Paper collected so far');
  band.innerHTML =
    '<div class="wrap">' +
    '<p class="tally-num"><span class="tally-count">0</span>&nbsp;kg</p>' +
    '<p class="tally-label">of surplus paper collected so far</p>' +
    '</div>';
  document.getElementById('story').insertAdjacentElement('afterend', band);

  const numEl = band.querySelector('.tally-count');
  const target = Math.round(KG_COLLECTED);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    numEl.textContent = target.toLocaleString('en-ZA');
  } else {
    const tallyIo = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      tallyIo.disconnect();
      const start = performance.now();
      const duration = 1400;
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        numEl.textContent = Math.round(eased * target).toLocaleString('en-ZA');
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    tallyIo.observe(band);
  }
}

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Photo slots: show the image only once it actually loads, otherwise
// the styled "Photo coming soon" placeholder stays visible.
document.querySelectorAll('.photo-slot img').forEach(img => {
  const show = () => img.closest('.photo-slot').classList.add('has-photo');
  if (img.complete && img.naturalWidth > 0) {
    show();
  } else {
    img.addEventListener('load', show);
  }
});
