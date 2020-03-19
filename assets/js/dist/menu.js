// Función para abrir las secciones
  function abrirSeccion(event, seccion) {
    if (event.keyCode == 13) {
      if (seccion == 0) {
          getEnVivo();
          $("#menu").delay(100).fadeOut("slow");
          $("#loader-spinner").delay(500).fadeIn("slow");
          $("#loader-spinner").delay(500).fadeOut("slow");
          $("#envivo").delay(2000).fadeIn("slow");
          /*$("#envivo").delay(1900).fadeIn("slow");*/
      }
    }

    if (event.keyCode == 13) {
      if (seccion == 1) {
          fadeOut(idLoader, idMenuPrincipal);
          fadeIn(idLoader, idALaCarta)
          /*$("#menu").delay(100).fadeOut("slow");
          $("#loader-spinner").delay(500).fadeIn("slow");
          $("#loader-spinner").delay(500).fadeOut("slow");
          $("#alacarta").delay(2000).fadeIn("slow");*/
          /*$("#envivo").delay(1900).fadeIn("slow");*/
      }
    }
  }

  function volverMenu() {
    $("#envivo").delay(100).fadeOut("slow");
    $("#loader-logo").delay(500).fadeIn("slow");
    $("#loader-logo").delay(500).fadeOut("slow");
    $("#menu").delay(2000).fadeIn("slow");
  }