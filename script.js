// Data Services
const servicesData = [
  { icon: "fas fa-code", title: "Web Development", desc: "Modern responsive websites with cutting-edge technology" },
  { icon: "fas fa-mobile-alt", title: "Mobile First", desc: "Mobile-optimized designs that work seamlessly on all devices" },
  { icon: "fas fa-paint-brush", title: "UI/UX Design", desc: "Beautiful interfaces with exceptional user experience" },
  { icon: "fas fa-chart-line", title: "SEO Optimized", desc: "Rank higher with search engine optimized code" }
];

// Portfolio Data
const portfolioData = [
  { title: "EcoShop Platform", category: "web", icon: "fas fa-shopping-cart", desc: "E-commerce solution with modern UI" },
  { title: "Fintech App", category: "mobile", icon: "fas fa-chart-line", desc: "Mobile banking application" },
  { title: "Travel Dashboard", category: "ui", icon: "fas fa-plane", desc: "Travel booking interface design" },
  { title: "Portfolio 2025", category: "web", icon: "fas fa-briefcase", desc: "Creative portfolio website" },
  { title: "Health Tracker", category: "mobile", icon: "fas fa-heartbeat", desc: "Fitness tracking mobile app" },
  { title: "Brand Identity", category: "ui", icon: "fas fa-palette", desc: "Complete brand redesign" }
];

// Testimonials Data
const testimonialsData = [
  { name: "Michael Chen", role: "CEO, TechStart", text: "Amazing work! The attention to detail is incredible. Highly recommended!", icon: "fas fa-user-circle" },
  { name: "Sarah Johnson", role: "Product Manager", text: "Professional, creative, and delivered ahead of schedule. Will work again!", icon: "fas fa-user-circle" },
  { name: "David Kumar", role: "Startup Founder", text: "Transformed our digital presence completely. Best decision we made!", icon: "fas fa-user-circle" }
];

// Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 500);
  }, 1000);
});

// Render Services
function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  grid.innerHTML = servicesData.map(service => `
    <div class="service-card">
      <div class="service-icon"><i class="${service.icon}"></i></div>
      <h3>${service.title}</h3>
      <p style="color: #a0a0a0">${service.desc}</p>
    </div>
  `).join('');
}

// Render Portfolio with Filter
let currentFilter = 'all';

function renderPortfolio() {
  const grid = document.getElementById('workGrid');
  if (!grid) return;
  const filtered = currentFilter === 'all' ? portfolioData : portfolioData.filter(p => p.category === currentFilter);
  grid.innerHTML = filtered.map(item => `
    <div class="work-item" data-category="${item.category}">
      <div class="work-image"><i class="${item.icon}"></i></div>
      <div class="work-info">
        <span class="work-category">${item.category.toUpperCase()}</span>
        <h3>${item.title}</h3>
        <p style="color: #a0a0a0; font-size: 0.9rem">${item.desc}</p>
      </div>
    </div>
  `).join('');
}

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderPortfolio();
  });
});

// Testimonial Slider
let currentTestimonial = 0;

function renderTestimonials() {
  const container = document.getElementById('testimonialSlider');
  if (!container) return;
  container.innerHTML = `
    <div class="testimonial-track" id="testimonialTrack">
      ${testimonialsData.map((t, idx) => `
        <div class="testimonial-card">
          <div class="testimonial-avatar"><i class="${t.icon}"></i></div>
          <p style="font-size: 1.1rem; margin-bottom: 1rem">"${t.text}"</p>
          <h4>${t.name}</h4>
          <p style="color: #6366f1">${t.role}</p>
        </div>
      `).join('')}
    </div>
  `;
  
  const track = document.getElementById('testimonialTrack');
  if (track) {
    track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
  }
  
  // Dots
  const dotsContainer = document.getElementById('sliderDots');
  if (dotsContainer) {
    dotsContainer.innerHTML = testimonialsData.map((_, idx) => 
      `<div class="dot ${idx === currentTestimonial ? 'active' : ''}" data-index="${idx}"></div>`
    ).join('');
    
    document.querySelectorAll('.dot').forEach(dot => {
      dot.addEventListener('click', () => {
        currentTestimonial = parseInt(dot.dataset.index);
        renderTestimonials();
      });
    });
  }
}

// Slider controls
function initSliderControls() {
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonialsData.length) % testimonialsData.length;
      renderTestimonials();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
      renderTestimonials();
    });
  }
}

// Animated Stats Counter
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const target = parseInt(stat.dataset.target);
    let current = 0;
    const increment = target / 50;
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        stat.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target;
      }
    };
    updateCounter();
  });
}

// Contact Form
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const msg = document.getElementById('contactMsg')?.value.trim();
    const feedback = document.getElementById('contactFeedback');
    
    if (!name || !email || !msg) {
      if (feedback) {
        feedback.innerHTML = '⚠️ Please fill all fields';
        feedback.style.color = '#ef4444';
      }
      return;
    }
    if (!email.includes('@')) {
      if (feedback) {
        feedback.innerHTML = '⚠️ Enter valid email';
        feedback.style.color = '#ef4444';
      }
      return;
    }
    
    if (feedback) {
      feedback.innerHTML = '✅ Message sent! (Testing Mode)';
      feedback.style.color = '#10b981';
    }
    form.reset();
    setTimeout(() => {
      if (feedback) feedback.innerHTML = '';
    }, 3000);
  });
}

// Navigation & Smooth Scroll
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        navMenu?.classList.remove('active');
      }
    });
  });
}

// Back to Top
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Button actions
function initButtons() {
  const exploreBtn = document.getElementById('exploreBtn');
  const resumeBtn = document.getElementById('resumeBtn');
  
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      const workSection = document.getElementById('work');
      workSection?.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      alert('📄 Demo: Download CV feature (Testing Mode)');
    });
  }
}

// Intersection Observer for stats
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) observer.observe(statsSection);

// Active nav link on scroll
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Initialize all
function init() {
  renderServices();
  renderPortfolio();
  renderTestimonials();
  initSliderControls();
  initContactForm();
  initNavigation();
  initBackToTop();
  initButtons();
  updateActiveNav();
}

document.addEventListener('DOMContentLoaded', init);