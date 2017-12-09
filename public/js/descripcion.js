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

if (lugarElegido !== null) {
    $('#titulo').html(lugarElegido.titulo);
    $('#calificacion').html(lugarElegido.direccion.calle);
}

