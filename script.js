/**
 * ==============================================================================
 * ASHWIN'S PERSONAL SITE // SCRIPT
 * Minimal, clean interactivity: Subtle background canvas, clipboard, form handling
 * ==============================================================================
 */

// Toast notification helper
function showToast(message) {
  const deck = document.getElementById('toast-deck');
  if (!deck) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  deck.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// Gentle Ambient Canvas (Subtle twinkling stars)
class SubtleStarfield {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.count = window.innerWidth < 768 ? 45 : 85;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createStars();
    this.draw();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createStars() {
    this.stars = [];
    for (let i = 0; i < this.count; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        r: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        twinkle: (Math.random() * 0.01 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        vy: (Math.random() * 0.15 + 0.05) * -1
      });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      s.y += s.vy;
      if (s.y < 0) s.y = this.canvas.height;

      s.alpha += s.twinkle;
      if (s.alpha > 0.85 || s.alpha < 0.15) {
        s.twinkle = -s.twinkle;
      }

      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(165, 180, 252, ${s.alpha})`;
      this.ctx.fill();
    }

    requestAnimationFrame(() => this.draw());
  }
}

// DOM Setup
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize subtle canvas
  new SubtleStarfield('ambient-canvas');

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  }

  // 3. Copy Email to Clipboard
  const copyBtn = document.getElementById('copy-email-btn');
  const emailLink = document.getElementById('email-link');

  if (copyBtn && emailLink) {
    copyBtn.addEventListener('click', () => {
      const email = emailLink.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  }

  // 4. Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your message has been sent.');
      contactForm.reset();
    });
  }
});
