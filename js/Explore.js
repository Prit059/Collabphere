// Function to check screen width
function isMobile() {
  return window.innerWidth <= 575; // Adjust this value based on your breakpoint
}

// Function to initialize GSAP animations
function initAnimations() {
  if (isMobile()) {
      // Mobile animations
      gsap.to(".page2 h1", {
        Transform: "translateX(-94%)",
          scrollTrigger: {
              trigger: ".page2",
              scroller: "body",
              start: "top 0%",
              end: "top -100%",
              scrub: 2,
              pin: true,
          },
          textShadow: "red 4px 0 14px",
      });

      gsap.to(".page2 img", {
          scale: 6, // Smaller scale for mobile
          opacity: 0,
          scrollTrigger: {
              scrub: 2,
          },
      });
  } else {
      // Desktop animations
      gsap.to(".page2 h1", {
        Transform: "translateX(-90%)",
        scrollTrigger: {
          trigger: ".page2",
          scroller: "body",
          // markers: true,
          start: "top 0%",
          end: "top -100%", 
          scrub: 2,
          pin: true,
        },
        textShadow: "red 4px 0 14px",
      });

      gsap.to(".page2 img", {
        scale: 12,
        opacity: 0,
        Transform: "translate(100%)",
        scrollTrigger: { 
          scrub: 2,
          },
      });
  }
}

// Initialize animations on page load
initAnimations();

// Reinitialize animations on window resize
window.addEventListener("resize", initAnimations);