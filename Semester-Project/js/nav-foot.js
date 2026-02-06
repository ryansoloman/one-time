
$(document).ready(function () {
    // 1. DYNAMIC ISLAND SCROLL LOGIC
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 60) {
            $('#islandContainer').addClass('scrolled');
        } else {
            $('#islandContainer').removeClass('scrolled');
        }
    });

    // 2. REVEAL ANIMATIONS
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('reveal');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));

    // 3. SMOOTH SCROLLING
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 100
        }, 800);
    });
});
