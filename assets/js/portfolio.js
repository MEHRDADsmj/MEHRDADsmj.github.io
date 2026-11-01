export function init() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  document.documentElement.classList.add('motion-ready');

  const hero = document.querySelector('[data-section="hero"]');
  if (hero) {
    requestAnimationFrame(() => hero.classList.add('is-visible'));
  }

  const caseStudy = document.querySelector('#case-study');
  if (caseStudy && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18 },
    );
    io.observe(caseStudy);
  } else if (caseStudy) {
    caseStudy.classList.add('is-visible');
  }

  const btn = document.querySelector('.btn');
  if (btn) {
    btn.addEventListener('pointerenter', () => btn.classList.add('is-hot'));
    btn.addEventListener('pointerleave', () => btn.classList.remove('is-hot'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
