document.addEventListener("DOMContentLoaded", function() {
    if(document.querySelector('.js-map')) {
        let center = [43.403638574554535,39.96349549999997];

        function init() {
            let map = new ymaps.Map('js-map', {
                center: center, 
                zoom: 12
            });

            let placemark = new ymaps.Placemark([43.41229707455201,39.965957], {}, {
                iconLayout: 'default#image',
                iconImageHref: '/assets/images/map-point.svg',
                iconImageSize: [20, 24],
                iconImageOffset: [-10, -12]
            });

            map.geoObjects.add(placemark);
        }

        ymaps.ready(init);
    }
});