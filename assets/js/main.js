document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       HERO SLIDER
    ========================================================= */

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let current = 0;
    let sliderInterval;

    function showSlide(index) {

        if (!slides.length) return;

        // Keep index within range
        if (index >= slides.length) {
            index = 0;
        }

        if (index < 0) {
            index = slides.length - 1;
        }

        current = index;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === current);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === current);
        });
    }


    function nextSlide() {
        showSlide(current + 1);
    }


    function prevSlide() {
        showSlide(current - 1);
    }


    // Next button
    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            nextSlide();
            restartSlider();
        });
    }


    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            prevSlide();
            restartSlider();
        });
    }


    // Dots
    dots.forEach((dot, index) => {

        dot.style.cursor = "pointer";

        dot.addEventListener("click", function () {
            showSlide(index);
            restartSlider();
        });

    });


    // Auto slider
    function startSlider() {

        if (slides.length <= 1) return;

        sliderInterval = setInterval(function () {
            nextSlide();
        }, 5000);

    }


    function restartSlider() {

        clearInterval(sliderInterval);

        startSlider();

    }


    // Start slider
    showSlide(0);
    startSlider();


    /* =========================================================
       TOUCH SWIPE
    ========================================================= */

    const heroSlider = document.querySelector(".hero-slider");

    let touchStartX = 0;
    let touchEndX = 0;

    if (heroSlider) {

        heroSlider.addEventListener("touchstart", function (e) {

            touchStartX = e.touches[0].clientX;

        }, { passive: true });


        heroSlider.addEventListener("touchend", function (e) {

            touchEndX = e.changedTouches[0].clientX;

            const difference = touchStartX - touchEndX;

            // Minimum swipe distance
            if (Math.abs(difference) > 50) {

                if (difference > 0) {

                    // Swipe left
                    nextSlide();

                } else {

                    // Swipe right
                    prevSlide();

                }

                restartSlider();

            }

        }, { passive: true });

    }


    /* =========================================================
       HAMBURGER MENU
    ========================================================= */

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {

        hamburger.addEventListener("click", function () {

            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");

            // Prevent background scrolling when menu is open
            document.body.classList.toggle(
                "menu-open",
                navMenu.classList.contains("active")
            );

        });


        // Close menu when clicking normal navigation links
        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                const dropdown = link.closest(".dropdown");

                // Don't close the menu when clicking
                // the dropdown parent link
                if (
                    dropdown &&
                    link === dropdown.querySelector(":scope > a")
                ) {
                    return;
                }

                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("menu-open");

            });

        });

    }


    /* =========================================================
       MOBILE DROPDOWNS
    ========================================================= */

    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(function (dropdown) {

        const parentLink = dropdown.querySelector(":scope > a");

        if (!parentLink) return;

        parentLink.addEventListener("click", function (e) {

            if (window.innerWidth <= 768) {

                e.preventDefault();

                // Close other dropdowns
                dropdowns.forEach(function (otherDropdown) {

                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove("active");
                    }

                });

                // Toggle current dropdown
                dropdown.classList.toggle("active");

            }

        });

    });


    /* =========================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ========================================================= */

    document.addEventListener("click", function (e) {

        if (window.innerWidth > 768) return;

        if (!navMenu || !hamburger) return;

        const clickedInsideNav = navMenu.contains(e.target);
        const clickedHamburger = hamburger.contains(e.target);

        if (!clickedInsideNav && !clickedHamburger) {

            hamburger.classList.remove("active");
            navMenu.classList.remove("active");

            document.body.classList.remove("menu-open");

            dropdowns.forEach(function (dropdown) {
                dropdown.classList.remove("active");
            });

        }

    });


    /* =========================================================
       HEADER SCROLL EFFECT
    ========================================================= */

    const header = document.querySelector("header");

    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 60
        );

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =========================================================
       WHY CHOOSE US - REVEAL
    ========================================================= */

    const cards = document.querySelectorAll(".why-card");

    if ("IntersectionObserver" in window) {

        const cardObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        // Only animate once
                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.2
            }
        );


        cards.forEach(function (card) {

            cardObserver.observe(card);

        });

    } else {

        // Fallback for older browsers
        cards.forEach(function (card) {
            card.classList.add("show");
        });

    }


    /* =========================================================
       GENERAL REVEAL ANIMATION
    ========================================================= */

    const reveals = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -80px 0px"
            }
        );


        reveals.forEach(function (item) {

            revealObserver.observe(item);

        });

    } else {

        reveals.forEach(function (item) {
            item.classList.add("active");
        });

    }


    /* =========================================================
       RESIZE RESET
    ========================================================= */

    window.addEventListener("resize", function () {

        // When switching from mobile to desktop,
        // clear mobile menu states
        if (window.innerWidth > 768) {

            hamburger?.classList.remove("active");
            navMenu?.classList.remove("active");

            document.body.classList.remove("menu-open");

            dropdowns.forEach(function (dropdown) {
                dropdown.classList.remove("active");
            });

        }

    });

});

