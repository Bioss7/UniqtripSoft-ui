// Карта получение координат 
// https://yandex.ru/map-constructor/location-tool/?from=club
console.warn("Initialization Yandex Map API");

let center = [43.403638574554535,39.96349549999997];

if(document.querySelector('.js-map')) {
    function init() {
        let map = new ymaps.Map('js-map', {
            center: center, 
            zoom: 16
        });

        let placemark = new ymaps.Placemark(center, {
            balloonContentHeader: 'Хедер балуна',
            balloonContentBody: 'Боди балуна',
            balloonContentFooter: 'Подвал',
        }, {
            iconLayout: 'default#image',
            iconImageHref: '/assets/images/map-point.svg',
            iconImageSize: [20, 20],
            iconImageOffset: [0, 0]
        }); 
        
        let placemark1 = new ymaps.Placemark(center, {
            balloonContent: `
                <div class="balloon">
                    <div class="balloon__address">г. Париж</div>
                    <div class="balloon__contacts">
                        <a href="tel:+7999999999">+7999999999</a>
                    </div>
                </div>
            `
        }, {
            iconLayout: 'default#image',
            iconImageHref: '/assets/images/map-point.svg',
            iconImageSize: [20, 20],
            iconImageOffset: [0, 0]
        }); 

        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'А эта — новогодняя',
            iconContent: '12'
        }, {
            
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/assets/images/map-point.svg',
            iconImageSize: [20, 24],
            iconImageOffset: [-24, -24],
            iconContentOffset: [15, 15],
            iconContentLayout: MyIconContentLayout
        });

        map.geoObjects.add(placemark1)
        .add(myPlacemarkWithContent);;

        placemark1.balloon.open();
    }

    ymaps.ready(init);
}