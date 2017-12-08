
var selectCategoria = document.getElementById('selectCategoria');

var index = 1;

// Add a Mapzen API key
L.Mapzen.apiKey = 'api-key';
// Add a map to the 'map' div
var map = L.Mapzen.map('map');
// Set the center of the map to be the San Francisco Bay Area at zoom level 12
map.setView([19.356467, -99.139851], 16);

for(var categoria in modelo) {
    var opcion = document.createElement('option');
    opcion.setAttribute('value', index);
    opcion.innerHTML = categoria;
    index = index + 1;

    selectCategoria.appendChild(opcion);
}

function HacerBusqueda(btn) {

    document.getElementById('lugaresContainer').innerHTML = "";

    var opcionElegida = selectCategoria.options[selectCategoria.selectedIndex];
    var indiceDelValor = Number(opcionElegida.value);
    if (indiceDelValor > 0) {
        indiceDelValor -= 1;
    }

    var lugarTexto = document.getElementById('inputLugar').value;

    var listaAMostrar = [];
    
    var indiceCategoria = 0;
    for(var categoria in modelo) {
        var opcionesDeLaCategoria = modelo[categoria];

        for(var indice = 0; indice < opcionesDeLaCategoria.length; ++indice) {
            var opcionCategoria = opcionesDeLaCategoria[indice];

            if (opcionCategoria.direccion.estado === lugarTexto || opcionCategoria.direccion.delegacion === lugarTexto) {
                if (indiceDelValor === -1 || indiceCategoria === indiceDelValor) {
                    listaAMostrar.push(opcionCategoria);
                }
            }
        }

        indiceCategoria = indiceCategoria + 1;
    }

    setTimeout(function() {
        colocarLugares(listaAMostrar);
    }, 100);
    
}

function colocarLugares(listaLugares) {
    console.log('Lista Lugares', listaLugares);
    //document.getElementById("lugaresContainer").innerHTML='<object type="text/html" data="vistas/lugar.html" ></object>';
    if (listaLugares.length <= 0) return;

    load_home(function(vistaTexto) {
        for(var i = 0; i < listaLugares.length; ++i) {
            var obj = listaLugares[i];
            var lugar = $(vistaTexto);
            console.log(lugar.find( "#lTitulo" ));
            lugar.find( "#lTitulo" ).html(obj.titulo);
            lugar.find( "#lCalle" ).html(obj.direccion.calle);
            lugar.find( "#lNumero" ).html(obj.direccion.numero);
            lugar.find( "#lColonia" ).html(obj.direccion.colonia);
            lugar.find( "#lCP" ).html(obj.direccion.cp);
            lugar.find( "#lEstado" ).html(obj.direccion.estado);
            lugar.find( "#lDelegacion" ).html(obj.direccion.delegacion);
            
            lugar.find( "#lCalif" ).html(obj.calificacion);

            var container = document.getElementById('lugaresContainer');
            lugar.addClass('lugar-active');
            $( "#lugaresContainer" ).append(lugar);

            lugar.attr( "index", i );

            L.marker([obj.localizacion.lat, obj.localizacion.long]).addTo(map);

            lugar.on( "click", function(event) {
                var index = $( this ).attr('index');
                var obj = listaLugares[parseInt(index)];

                console.log('OBJ Selected: ', obj);

                location.href = "./descripcion.html?" + obj.id;                
            });
        }

        // var map = document.getElementById('map');
        map.flyTo([19.356739, -99.139165], 12);

        $('#map').addClass('map-active');
    });

}

function load_home (callback) {
    // (e || window.event).preventDefault();
    var con = document.getElementById('content')
    ,   xhr = new XMLHttpRequest();
 
    xhr.onreadystatechange = function () { 
     if (xhr.readyState == 4 && xhr.status == 200) {
    //   con.innerHTML = xhr.responseText;
      callback(xhr.responseText);
     }
    }
 
  xhr.open("GET", "vistas/lugar.html", true);
  xhr.setRequestHeader('Content-type', 'text/html');
  xhr.send();
 }