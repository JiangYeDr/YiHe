(function () {
  'use strict';

  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const overlay = document.getElementById('overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const contactForm = document.getElementById('contactForm');

  // Mobile menu toggle
  function toggleMenu(open) {
    const isOpen = open ?? !sidebar.classList.contains('open');
    sidebar.classList.toggle('open', isOpen);
    menuToggle.classList.toggle('active', isOpen);
    overlay.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  menuToggle.addEventListener('click', () => toggleMenu());
  overlay.addEventListener('click', () => toggleMenu(false));

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) toggleMenu(false);
    });
  });

  // Active nav on scroll
  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // Scroll fade-in animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll(
    '.service-card, .advantage-item, .info-card, .visual-card, .detail-list, .advantages-panel'
  ).forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Contact form — opens mailto with prefilled content
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const company = document.getElementById('company').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : '',
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n');

    const mailto = `mailto:don.edivod8@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });

  // Close mobile menu on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) toggleMenu(false);
  });
})();
