// Eventos que se ejecutan cada vez que se presiona cualquier tecla
window.addEventListener("keydown", function(inEvent){	
	/*1*/

  // Funciones para Smart TV solamente (Cualquier tecla)
    if(window.event) {
        keycode = inEvent.keyCode;
    } else if(e.which) {
        keycode = inEvent.which;
    }
    switch (keycode) {
        case 461: doBack(); break;
    }

    function doBack() {
      if ($("#catalogo").hasClass('ocultarCatalogo') && $("#header").hasClass('ocultarHeader')) {
        /*webOS.platformBack();*/
        volverMenu();
      }else{
        document.getElementById("catalogo").classList.toggle("ocultarCatalogo");
        document.getElementById("header").classList.toggle("ocultarHeader");
      }
    }

  // Al presionar la tecla "BACK" solamente para Web
    if (inEvent.keyCode == 461 || inEvent.keyCode == 8) {
      if ($("#catalogo").hasClass('ocultarCatalogo') && $("#header").hasClass('ocultarHeader')) {
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
            history.go(1);
        };
        volverMenu();

      }else{
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
            history.go(1);
        };
        document.getElementById("catalogo").classList.toggle("ocultarCatalogo");
        document.getElementById("header").classList.toggle("ocultarHeader");
      }
    }

  // Al presionar la tecla "ENTER"
    if (inEvent.keyCode == 13) {
      if ($("#catalogo").hasClass('ocultarCatalogo') && $("#header").hasClass('ocultarHeader')) {
        if($("#catalogo").hasClass('ocultarInfo')){
          setTimeout( function() {
            document.getElementById("infoCanal").classList.toggle("ocultarInfo");
          }, 4000);
        }else{
          document.getElementById("infoCanal").classList.toggle("ocultarInfo");
        }
      }else{
      }
    }

  // Al presionar la tecla "ARRIBA"
  	if (inEvent.keyCode == 38) {
      if ($("#catalogo").hasClass('ocultarCatalogo') && $("#header").hasClass('ocultarHeader')) {
        /*document.getElementById("catalogo").classList.toggle("displayCatalogo");
        setTimeout( function() {*/
          document.getElementById("catalogo").classList.toggle("ocultarCatalogo");
          document.getElementById("header").classList.toggle("ocultarHeader");
        /*}, 100);*/
      }else{
    		document.getElementById('moverArriba').value = 1;
    		document.getElementById('moverAbajo').value = 0;
    		document.getElementById('moverDerecha').value = 0;
    		document.getElementById('moverIzquierda').value = 0;
      }
  	}

  // Al presionar la tecla "ABAJO"
  	if (inEvent.keyCode == 40) {
      if ($("#catalogo").hasClass('ocultarCatalogo') && $("#header").hasClass('ocultarHeader')) {

      }else{
    		document.getElementById('moverArriba').value = 0;
    		document.getElementById('moverAbajo').value = 1;
    		document.getElementById('moverDerecha').value = 0;
    		document.getElementById('moverIzquierda').value = 0;
      }
  	}

  // Al presionar la tecla "DERECHA"
  	if (inEvent.keyCode == 39) {
      if ($("#catalogo").hasClass('ocultarCatalogo') && $("#header").hasClass('ocultarHeader')) {
      
      }else{
    		document.getElementById('moverArriba').value = 0;
    		document.getElementById('moverAbajo').value = 0;
    		document.getElementById('moverDerecha').value = 1;
    		document.getElementById('moverIzquierda').value = 0;
      }
  	}

  // Al presionar la tecla "IZQUIERDA"
  	if (inEvent.keyCode == 37) {
      if ($("#catalogo").hasClass('ocultarCatalogo') && $("#header").hasClass('ocultarHeader')) {

      }else{
    		document.getElementById('moverArriba').value = 0;
    		document.getElementById('moverAbajo').value = 0;
    		document.getElementById('moverDerecha').value = 0;
    		document.getElementById('moverIzquierda').value = 1;
      }
  	}
});