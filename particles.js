// --- Animated Coding Particles in Hero ---

// This file will contain the configuration and initialization for the animated particles background.
// The particles will be coding-related icons, subtle, and animated gently.

document.addEventListener("DOMContentLoaded", function () {
  // Function to resize the particles container to match the hero section height
  function resizeHeroParticles() {
    var hero = document.querySelector(".hero");
    var particles = document.getElementById("hero-particles");
    if (hero && particles) {
      particles.style.height = hero.offsetHeight + "px";
    }
  }

  // Initial resize and add event listener for future resizes
  resizeHeroParticles();
  window.addEventListener("resize", resizeHeroParticles);

  // Load tsParticles configuration once the DOM is ready and tsParticles is available
  if (window.tsParticles && document.getElementById("hero-particles")) {
    tsParticles.load("hero-particles", {
      fullScreen: { enable: false }, // Not full screen, confined to #hero-particles
      background: { color: "transparent" }, // Particles container background is transparent to show the hero gradient
      particles: {
        number: { value: 10, density: { enable: true, area: 1200 } }, // Fewer, more scattered particles
        move: {
          enable: true,
          speed: 0.4, // Slow, subtle movement
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
        opacity: { value: 0.1, random: { enable: true, minimumValue: 0.05 } }, // Very low opacity range for subtlety
        size: { value: 20, random: { enable: true, minimumValue: 10 } }, // Small size range
        shape: {
          type: ["image"],
          image: [
            {
              src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4bb.svg",
              width: 32,
              height: 32,
            }, // laptop
            {
              src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5a5.svg",
              width: 32,
              height: 32,
            }, // desktop
            {
              src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c8.svg",
              width: 32,
              height: 32,
            }, // chart
            {
              src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2699.svg",
              width: 32,
              height: 32,
            }, // gear
            {
              src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2601.svg",
              width: 32,
              height: 32,
            }, // cloud
            {
              src: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4bb.svg",
              width: 32,
              height: 32,
            }, // laptop (repeat for variety)
          ],
        },
        color: { value: "#2563eb" }, // Blue color for particles
      },
      links: { enable: false }, // No connecting lines (scattered effect)
      interactivity: { enable: false }, // No interactive effects on hover/click
      detectRetina: true,
    });
  }
});
