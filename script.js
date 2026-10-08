// Swiper Initialization for App Screenshots Carousel
var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 24,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 2600,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    keyboard: true,
    loop: true
});

// Mobile Nav Toggle
var menuBtn = document.getElementById("menuToggle");
var menuIcon = document.getElementById("menuIcon");
var subnav = document.getElementById("subnav");
var mobileItems = document.querySelectorAll(".mobile-item");

if (menuBtn && subnav) {
    menuBtn.addEventListener("click", function() {
        var isOpen = subnav.classList.toggle("active");
        if (menuIcon) {
            menuIcon.className = isOpen ? "ri-close-line" : "ri-menu-line";
        }
    });

    mobileItems.forEach(function(item) {
        item.addEventListener("click", function() {
            subnav.classList.remove("active");
            if (menuIcon) {
                menuIcon.className = "ri-menu-line";
            }
        });
    });
}
