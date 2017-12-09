var currentLocation = window.location;
var locationList = currentLocation.search.split('?');
if (locationList.length > 1) {
    var id = locationList[1];
}

var lugarElegido = null;

for(var categoria in modelo) {
    var opcionesDeLaCategoria = modelo[categoria];

    for(var indice = 0; indice < opcionesDeLaCategoria.length; ++indice) {
        var opcionCategoria = opcionesDeLaCategoria[indice];

        if(opcionCategoria.id === id) {
            lugarElegido = opcionCategoria;
        }
    }
}

// Add a Mapzen API key
L.Mapzen.apiKey = 'mapzen-qb9q8hQ';
var map = L.Mapzen.map('map');
map.setView([19.356467, -99.139851], 12);

if (lugarElegido !== null) {
    $('#titulo').html(lugarElegido.titulo);
    $('#calificacion').html(lugarElegido.direccion.calle);

    map.flyTo([lugarElegido.localizacion.lat, lugarElegido.localizacion.long], 16);
    L.marker([lugarElegido.localizacion.lat, lugarElegido.localizacion.long]).addTo(map);
}

