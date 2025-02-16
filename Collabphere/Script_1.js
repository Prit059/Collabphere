document.addEventListener("DOMContentLoaded", function () {
    let joinBtn = document.querySelector(".join-btn");

    // Join Button Animation
    joinBtn.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.1) rotate(5deg)"; // Scale and rotate
        this.style.boxShadow = "0 0 25px rgba(255, 165, 0, 1)";
        this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease"; // Smooth transition
    });

    joinBtn.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1) rotate(0deg)"; // Reset scale and rotation
        this.style.boxShadow = "0 0 15px rgba(255, 0, 255, 0.5)";
    });

    let clubs = document.querySelectorAll(".club");

    clubs.forEach((club) => {
        // Club Hover Effects
        club.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.05) rotate(2deg)"; // Scale and rotate
            this.style.boxShadow = "0 0 15px cyan";
            this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease"; // Smooth transition
        });

        club.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1) rotate(0deg)"; // Reset scale and rotation
            this.style.boxShadow = "none";
        });

        // Add a color change effect on hover
        club.addEventListener("mouseenter", function () {
            this.style.backgroundColor = "rgba(0, 255, 255, 0.6)"; // Change background color on hover
        });

        club.addEventListener("mouseleave", function () {
            this.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Reset background color
        });
    });
});
