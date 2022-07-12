import Swiper from 'swiper';

const sliderSwiper = '.js-slider-swiper';
const sliderSwiperMobile = '.js-slider-swiper-mobile';
const sliderSwiperProject = '.js-slider-swiper-project';
const sliderSwiperIntro = '.js-intro-slider';
const sliderSwiperPeople = '.js-slider-swiper-people';

document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper(sliderSwiper, {
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

    const swiperMobile = new Swiper(sliderSwiperMobile, {
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

    const swiperProject = new Swiper(sliderSwiperProject, {
        slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.js-arrow-next',
            prevEl: '.js-arrow-prev'
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

    const swiperIntro = new Swiper(sliderSwiperIntro, {
        slidesPerView: 1,
    });

    const swipperPeople = new Swiper(sliderSwiperPeople, {
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

