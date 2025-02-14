// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Select all bubbles
const box = document.querySelectorAll('.box');

// Debugging: Check if bubbles are selected
console.log('Bubbles selected:', box);

// Loop through each bubble and create an animation
box.forEach((box, index) => {
    gsap.fromTo(
        box,
        {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Initial dim state
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
        },
        {
            backgroundColor: 'rgb(43, 42, 42)', // Bright state
            boxShadow: '0 0 20px rgb(19, 173, 225)',
            scrollTrigger: {
                trigger: box, // Trigger when the bubble enters the viewport
                start: 'top 5%', // Start animation when the top of the bubble is 80% into the viewport
                end: 'top -35%', // End animation when the top of the bubble is 20% into the viewport
                scrub: true, // Smoothly animate as you scroll
                // markers: true, // Enable markers for debugging (shows trigger positions)
                onEnter: () => console.log(`Bubble ${index + 1} entered`), // Debugging
                onLeave: () => console.log(`Bubble ${index + 1} left`), // Debugging
                onEnterBack: () => console.log(`Bubble ${index + 1} entered back`), // Debugging
                onLeaveBack: () => console.log(`Bubble ${index + 1} left back`), // Debugging
            },
        }
    );
});