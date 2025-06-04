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
      entry.target.classList.add("visible", "fade-in-up");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and elements that should animate
document
  .querySelectorAll(
    "section, .feature-card, .advanced-card, .step, .use-case-card, .team-card, .section-title, .section-description, .hero-content h1, .hero-desc, .hero-cta, .newsletter-desc, .newsletter-form"
  )
  .forEach((element) => {
    element.classList.add("fade-in-up"); // Add initial class
    observer.observe(element);
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

  // Theme selector dropdown toggle
  const themeIcon = document.querySelector(".theme-icon");
  const themeDropdown = document.querySelector(".theme-dropdown");

  if (themeIcon && themeDropdown) {
    themeIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the click from closing the dropdown immediately
      themeDropdown.classList.toggle("visible");
    });

    // Close the dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!themeDropdown.contains(e.target) && e.target !== themeIcon) {
        themeDropdown.classList.remove("visible");
      }
    });

    // Apply theme logic here later
    themeDropdown.addEventListener("click", (e) => {
      const themeItem = e.target.closest("li[data-theme]");
      if (themeItem) {
        const themeName = themeItem.dataset.theme;
        applyTheme(themeName); // Call the function to apply the theme
        themeDropdown.classList.remove("visible"); // Close dropdown after selection
      }
    });
  }

  // Handle clicks on profile buttons to open LinkedIn links
  document.querySelectorAll(".profile-button").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const linkedinUrl = this.dataset.linkedinUrl;
      if (linkedinUrl && linkedinUrl !== "#") {
        window.open(linkedinUrl, "_blank");
      } else if (linkedinUrl === "#") {
        console.log("LinkedIn URL not set for this profile.");
        // Optionally show a message to the user or handle placeholder links
      }
    });
  });

  // --- Example Projects Carousel ---
  const carousel = document.querySelector(".projects-carousel");
  const paginationContainer = document.querySelector(".carousel-pagination");
  const cards = carousel.querySelectorAll(".project-card");

  if (!carousel || !paginationContainer || cards.length === 0) {
    return; // Exit if elements are not found
  }

  // Create pagination dots
  cards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("pagination-dot");
    if (index === 0) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      carousel.scrollTo({
        left: cards[index].offsetLeft,
        behavior: "smooth",
      });
    });
    paginationContainer.appendChild(dot);
  });

  const paginationDots =
    paginationContainer.querySelectorAll(".pagination-dot");

  // Update active dot on scroll
  carousel.addEventListener("scroll", () => {
    let activeIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(carousel.scrollLeft - card.offsetLeft);
      if (distance < minDistance) {
        minDistance = distance;
        activeIndex = index;
      }
    });

    paginationDots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  });
});

// Handle click for the single profile button
document.addEventListener("click", function (event) {
  const profileButton = event.target.closest(".profile-button");
  if (profileButton) {
    const linkedinUrl = profileButton.getAttribute("data-linkedin-url");
    if (linkedinUrl) {
      window.open(linkedinUrl, "_blank");
    }
  }
});

// Function to apply themes
function applyTheme(themeName) {
  const root = document.documentElement;
  let themePrefix = "";

  if (themeName !== "auto") {
    themePrefix = themeName + "-";
  }

  // Define a map of standard variables to theme-specific variables
  const themeVariables = [
    "primary-color",
    "secondary-color",
    "accent-color",
    "accent-light",
    "text-color",
    "light-text",
    "background",
    "light-background",
    "box-background",
    "border-color",
    "shadow",
    "hero-background",
  ];

  themeVariables.forEach((variable) => {
    const cssVar = `--theme-${variable}`;
    const themeVar = `--${themePrefix}${variable}`;
    const value = getComputedStyle(root).getPropertyValue(themeVar).trim();

    if (value) {
      root.style.setProperty(cssVar, value);
    } else if (themeName !== "auto") {
      // Fallback to default variables if theme-specific variable is not found for a non-auto theme
      const defaultVar = `--${variable}`;
      const defaultValue = getComputedStyle(root)
        .getPropertyValue(defaultVar)
        .trim();
      root.style.setProperty(cssVar, defaultValue);
    } else {
      // For 'auto' theme or if no specific theme value is found, revert to original default
      root.style.removeProperty(cssVar); // Remove the --theme- variable to use the original one
    }
  });

  // Save selected theme to localStorage
  localStorage.setItem("selectedTheme", themeName);
}

// Apply saved theme on page load
const savedTheme = localStorage.getItem("selectedTheme");
// Check if savedTheme exists and is not null/undefined
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  // Apply default theme (or auto) if no theme is saved
  applyTheme("auto");
}
