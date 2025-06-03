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
