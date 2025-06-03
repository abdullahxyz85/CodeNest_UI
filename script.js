// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar scroll effect
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !navbar.classList.contains("scroll-down")) {
    // Scroll Down
    navbar.classList.remove("scroll-up");
    navbar.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    navbar.classList.contains("scroll-down")
  ) {
    // Scroll Up
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");
  }
  lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Add hover effect to pricing cards
document.querySelectorAll(".pricing-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// Mobile menu toggle (you can add this if you want to implement a mobile menu)
const createMobileMenu = () => {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelector(".nav-links");

  // Create mobile menu button
  const mobileMenuBtn = document.createElement("button");
  mobileMenuBtn.classList.add("mobile-menu-btn");
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

  // Add button to navbar
  navbar.querySelector(".container").appendChild(mobileMenuBtn);

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenuBtn.classList.toggle("active");
  });
};

// Initialize mobile menu if screen width is small
if (window.innerWidth <= 768) {
  createMobileMenu();
}

// Add CSS for mobile menu
const style = document.createElement("style");
style.textContent = `
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-color);
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: var(--background);
            padding: 1rem;
            flex-direction: column;
            align-items: center;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }
        
        .nav-links.active {
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// --- Animated Hero Background (Particles/Lines) ---
const canvas = document.getElementById("hero-bg");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let width, height, particles;
  const PARTICLE_COUNT = 32;
  const LINE_DIST = 140;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.querySelector(".hero").offsetHeight;
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: random(0, width),
        y: random(0, height),
        vx: random(-0.5, 0.5),
        vy: random(-0.5, 0.5),
        r: random(2, 4),
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    // Draw lines
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINE_DIST) {
          ctx.strokeStyle = "rgba(37,99,235,0.13)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    // Draw particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      ctx.beginPath();
      ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(37,99,235,0.18)";
      ctx.fill();
    }
  }

  function update() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles[i].x += particles[i].vx;
      particles[i].y += particles[i].vy;
      if (particles[i].x < 0 || particles[i].x > width) particles[i].vx *= -1;
      if (particles[i].y < 0 || particles[i].y > height) particles[i].vy *= -1;
    }
  }

  function animate() {
    draw();
    update();
    requestAnimationFrame(animate);
  }

  function initParticles() {
    resize();
    createParticles();
    animate();
  }

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
  setTimeout(initParticles, 100); // Wait for hero to size
}

// --- Scroll to Top Button ---
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- Accessibility: Focus States for Buttons ---
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("focus", () => {
    el.style.outline = "2px solid var(--accent-color)";
    el.style.outlineOffset = "2px";
  });
  el.addEventListener("blur", () => {
    el.style.outline = "";
    el.style.outlineOffset = "";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var homeLink = document.querySelector(".home-link");
  if (homeLink) {
    homeLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
