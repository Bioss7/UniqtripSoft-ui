// Карта получение координат 
// https://yandex.ru/map-constructor/location-tool/?from=club
if(document.querySelector('.js-map')) {
    console.warn("Initialization Yandex Map API");

    let center = [43.403638574554535,39.96349549999997];


    function init() {
        let map = new ymaps.Map('js-map', {
            center: center, 
            zoom: 12
        });

        let placemark = new ymaps.Placemark([43.403638574554535,39.96349549999997], {}, {
            iconLayout: 'default#image',
            iconImageHref: '/assets/images/map-point.svg',
            iconImageSize: [20, 24],
            iconImageOffset: [-10, -12]
        });

        let placemark1 = new ymaps.Placemark([43.41229707455201,39.965957], {}, {
            iconLayout: 'default#image',
            iconImageHref: '/assets/images/map-point.svg',
            iconImageSize: [20, 24],
            iconImageOffset: [-10, -12]
        });

        map.geoObjects.add(placemark).add(placemark1);
    }

    ymaps.ready(init);
}