console.warn("Initialization Swiper sliders");

document.addEventListener('DOMContentLoaded', function() {

    const swiper = new Swiper('.js-slider-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        slideToClickedSlide: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
    });

    // new Swiper('.js-final-design-slider', {
    //     slidesPerView: 1,
    // });

    let introSlider = new Swiper('.js-intro-slider', {
        slidesPerView: 1,
    });


});

