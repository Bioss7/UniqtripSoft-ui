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
            nextEl: '.js-btn-next',
            prevEl: '.js-btn-prev'
        },
    });

    const swiperMobile = new Swiper('.js-slider-swiper-mobile', {
        slidesPerView: 3,
        slidesPerView: 'auto',
        spaceBetween: 30,
        slideToClickedSlide: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.js-btn-next-mobile',
            prevEl: '.js-btn-prev-mobile'
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                slidesPerView: 'auto',
            },
            480: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        },
    });

    const swiperProject = new Swiper('.js-slider-swiper-project', {
        slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.js-arrow-prev',
            prevEl: '.js-arrow-next'
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 2,
            }
        },
    });

    const swiperIntro = new Swiper('.js-intro-slider', {
        slidesPerView: 1,
    });

    const swipperPeople = new Swiper('.js-slider-swiper-people', {
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.js-btn-next',
            prevEl: '.js-btn-prev'
        },
    });


});

