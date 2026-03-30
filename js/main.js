/**
 * UPS Investment Thesis — Main JS
 * Handles: scroll animations, active nav, smooth scroll offset
 */

(function () {
  'use strict';

  // ── Fade-up on scroll (IntersectionObserver) ──────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }


  // ── Active nav link on scroll ─────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id], nav[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            if (href === '#' + id) {
              link.style.color = '#111111';
              link.style.fontWeight = '500';
            } else {
              link.style.color = '';
              link.style.fontWeight = '';
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(function (s) {
    sectionObserver.observe(s);
  });


  // ── Smooth scroll with nav offset ─────────────────────────────────────────
  const NAV_HEIGHT = 56;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });


  // ── Hero fade-up on load ───────────────────────────────────────────────────
  // Trigger hero elements on page load (they won't be caught by IntersectionObserver
  // since they're already in viewport)
  window.addEventListener('load', function () {
    document.querySelectorAll('#hero .fade-up').forEach(function (el) {
      el.classList.add('visible');
    });
  });

})();
