document.addEventListener("DOMContentLoaded", function() {
    const popup = document.querySelector(".popup-content");
    const buttons = document.querySelectorAll(".btn-expand");
    const popupOverlay = document.querySelector(".popup-overlay");
    const popups = document.querySelectorAll(".popup-content");

    let activePopup = null;
    popupTimer = setTimeout(() => {
        popup.classList.remove("active");
        popupOverlay.classList.remove("show");
        activePopup = null;
    }, 500);
    // Show popup when hovering over a button
    buttons.forEach(button => {
        button.addEventListener("mouseenter", function () {
            const targetId = this.getAttribute("href").substring(1); // Get section ID
            const popup = document.getElementById("popup-" + targetId);

            if (popup) {
                // Hide previous popup if switching
                if (activePopup && activePopup !== popup) {
                    activePopup.classList.remove("active");
                }

                // Show new popup
                popup.classList.add("active");
                popupOverlay.classList.add("show");
                activePopup = popup;
            }
        });
    });

    // Close popup when cursor leaves the actual popup box, not the overlay
    popups.forEach(popup => {
        popup.addEventListener("mouseleave", function () {
            popup.classList.remove("active");
            popupOverlay.classList.remove("show");
            activePopup = null;
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('nav ul li a, .btn-expand').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Reveal sections on scroll
    const sections = document.querySelectorAll(".section");

    function revealSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections(); // Initial check
});
let popupTimer;
popups.forEach(popup => {
    popup.addEventListener("mouseleave", function () {
        popupTimer = setTimeout(() => {
            popup.classList.remove("active");
            popupOverlay.classList.remove("show");
            activePopup = null;
        }, 300); // Delayed closing
    });

    popup.addEventListener("mouseenter", function () {
        clearTimeout(popupTimer); // Prevent premature closing
    });
});
if (!("scrollBehavior" in document.documentElement.style)) {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/smoothscroll-polyfill/0.4.4/smoothscroll.min.js";
    document.head.appendChild(script);
}

