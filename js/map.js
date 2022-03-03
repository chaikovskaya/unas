
function initMap() {
    $('.js-map').each(function () {
        var element = $(this),
            elementItem = element.find('.js-map-item'),
            centerCoord = element.data('objectcoord') || [59.93914514163674,30.33349282507063],
            idMap = element.data('map-id') || '',
            iconUrl = element.data('map-icon') || '',
            iconSize =  element.data('icon-size') || [0,0],
            iconOffset =  element.data('icon-offset') || [0,0],
            zoom =  element.data('map-zoom') || 10;

        var myMap = new ymaps.Map(idMap, {
            center: centerCoord,
            zoom: zoom,
            controls: ['zoomControl', 'fullscreenControl'],
        }, {
                autoFitToViewport: 'always'
            }),
        objectManager = new ymaps.ObjectManager(),
        masObjects =[];

        myMap.behaviors.disable('scrollZoom');
        myMap.geoObjects.add(objectManager);

        elementItem.each(function () {
            var objectId = $(this).data('objectid'),
                objectCoord = $(this).data('objectcoord'),
                objectText =  $(this).find('.js-map-item-value').html(),
                objectHref =  '';

            var elementsObjects =
                {
                    "type": "Feature",
                    "id": objectId,
                    "options": {
                        iconLayout: 'default#image',
                        iconImageHref: iconUrl,
                        iconImageSize: iconSize,
                        iconImageOffset: iconOffset,
                    },
                    "geometry":{
                        "type": "Point",
                        "coordinates": objectCoord
                    },
                    "properties":{
                        "balloonContentBody": '<div class="map-popup">' +
                            '<div class="map-popup-body">' +
                            objectText +
                            '</div>' +
                            '</div>',
                    }
                };

            masObjects.push(elementsObjects);
        });

        objectManager.add({
                "type": "FeatureCollection",
                "features": masObjects
        });

        objectManager.objects.events.add('click', function (e) {
            var objectId=e.get('objectId');
            viewObject(objectId);
        });

        [].forEach.call(document.querySelectorAll('[data-objectId]'), function(el) {
            el.addEventListener('click', function() {
                var objectId=el.getAttribute("data-objectId");
                viewObject(objectId);
            });
        });

        function viewObject(objectId){
            $('.js-map-item').removeClass('active');

            document.querySelector('[data-objectId="'+objectId+'"]').classList.add('active');

            objectManager.objects.each(function (item) {
                    objectManager.objects.setObjectOptions(item.id, {
                    preset: 'islands#darkGreenIcon'
                });
            });
            objectManager.objects.setObjectOptions(objectId, {
                preset: 'islands#darkGreenIcon'
            });
        }

        if (masObjects.length > 1) {
            myMap.setBounds(objectManager.getBounds());
        }
    });
}
