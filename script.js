// ══════════════════════════════════════════════════════════════
// CHECK CALO INTERACTIVE SCRIPTS
// ══════════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", function () {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");
    const menuIcon = document.getElementById("menuIcon");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener("click", function () {
            const isActive = mobileNav.classList.toggle("active");
            if (menuIcon) {
                if (isActive) {
                    menuIcon.classList.remove("ri-menu-line");
                    menuIcon.classList.add("ri-close-line");
                } else {
                    menuIcon.classList.remove("ri-close-line");
                    menuIcon.classList.add("ri-menu-line");
                }
            }
        });

        mobileLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                mobileNav.classList.remove("active");
                if (menuIcon) {
                    menuIcon.classList.remove("ri-close-line");
                    menuIcon.classList.add("ri-menu-line");
                }
            });
        });
    }

    // 2. Swiper Carousel for App Screenshots Gallery
    if (typeof Swiper !== "undefined") {
        const swiper = new Swiper(".mySwiper", {
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 24,
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 2800,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            keyboard: {
                enabled: true,
            },
            breakpoints: {
                320: {
                    spaceBetween: 16,
                },
                768: {
                    spaceBetween: 24,
                },
                1024: {
                    spaceBetween: 32,
                },
            },
        });
    }

    // 3. Header Scroll Glass Effect
    const siteHeader = document.querySelector(".site-header");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 40) {
            siteHeader.style.background = "rgba(10, 10, 12, 0.92)";
            siteHeader.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.4)";
        } else {
            siteHeader.style.background = "rgba(18, 18, 20, 0.82)";
            siteHeader.style.boxShadow = "none";
        }
    });
});
