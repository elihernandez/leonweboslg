// Función para abrir Radio
  function abrirMusica(fadeOptions) {
    $.ajax({
      url: 'http://wapi.lap55.com/api/cdata/leon/kids/'+suscriberId,
      beforeSend: function () {
        SpatialNavigation.pause();
        fadeIn(fadeOptions, 0, 0);
      },
      success: function(respuesta) {
       
      },
      error: function() {
        console.log("No se ha podido obtener la información");
      },
      complete: function() {
        SpatialNavigation.add({
          selector: '.focusable',
        });
        fadeOut(fadeOptions, 250, 500);
      }
    });
  }

  $(".section-music").keydown(function(event){
    if (event.which == 13) {
      console.log("Enter en section-music");
    }
  });


/*function keyPressedArtist(e, data, posterType, posterTypeNextCategoria, indiceItem, indexLastItem, indexCategoria, indexLastCategoria, idListaParent, idCatalogoParent, seccionId, contentTypeOrder, categoria, titleCategoria, registro) {
  if (e.keyCode == 38) {
    
  }else if (e.keyCode == 40) {
    
  }else if (e.keyCode == 39) {
    
  }else if (e.keyCode == 37) {
    
  }else if (e.keyCode == 13) {
    console.log("Enter");
  } else if (e.keyCode == 461 || e.keyCode == 8) {
    
  }
} */