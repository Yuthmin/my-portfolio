// ===========================
// NAVIGATION SCROLL EFFECT
// ===========================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(4.5px, 4.5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = nav.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
        // Close mobile menu if open
        mobileMenu.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    }
  });
});

// ===========================
// SCROLL REVEAL
// ===========================
const revealElements = document.querySelectorAll(
  '.hero-text, .hero-image-wrap, .about-grid, .skill-card, .project-card, .blog-card, .blog-cta-card, .contact-left, .contact-right, .about-body, .about-label'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Stagger children in skills grid
document.querySelectorAll('.skill-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

// ===========================
// CONTACT FORM HANDLER
// ===========================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) return;

  const submitBtn = contactForm.querySelector('.form-submit');
  const originalHTML = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span>Sending…</span>';
  submitBtn.disabled = true;

  // Simulate async send (replace with actual email integration if needed)
  setTimeout(() => {
    submitBtn.innerHTML = originalHTML;
    submitBtn.disabled = false;
    contactForm.reset();
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

// ===========================
// ACTIVE NAV LINK HIGHLIGHT
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav);
highlightNav();

// ===========================
// HERO PARALLAX
// ===========================
const heroBgText = document.querySelector('.hero-bg-text');

window.addEventListener('scroll', () => {
  if (heroBgText) {
    const scrolled = window.scrollY;
    heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
    heroBgText.style.opacity = Math.max(0, 0.05 - scrolled * 0.0001);
  }
});
