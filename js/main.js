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
