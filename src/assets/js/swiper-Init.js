console.log("Swiper slider");

document.addEventListener('DOMContentLoaded', function() {

    const swiper = new Swiper('.js-slider-swiper', {
        slidesPerView: 1,
        centeredSlides: true
    });

    new Swiper('.js-final-design-slider', {
        slidesPerView: 1,
    });

    let introSlider = new Swiper('.js-intro-slider', {
    });


});

