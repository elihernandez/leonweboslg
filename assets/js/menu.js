// Función para mostrar el menú principal
  function abrirMenuPrincipal(fadeOptions) {
    $.ajax({
      url: 'http://wapi.lap55.com/api/sl/leon/home_spotlight',
      beforeSend: function () {
        fadeIn(fadeOptions, 0, 0);
      },
      success: function(response) {
        var append = "";
        append = append + 
        '<div id="spotlight">' +
          '<div id="myCarousel" class="carousel slide carousel-fade" data-ride="carousel">' +
            // Indicadores
            '<ol class="carousel-indicators">';
        response.forEach( function(evento, indice) {
          if(indice == 0){
            append = append +
              '<li data-target="#myCarousel" data-slide-to="'+ indice +'" class="active" style="margin: 5px;"></li>';
          }else{
            append = append +
              '<li data-target="#myCarousel" data-slide-to="'+ indice +'" style="margin: 5px;"></li>';
          }
        });
        append = append +
            '</ol>';
        // Carousel de imágenes
        append = append + 
            '<div class="carousel-inner" role="listbox">';
        response.forEach( function(evento, indice) {
          if(indice == 0){
            append = append +
              '<div class="item active">' +
                '<img src="'+ evento.ImgLandscape +'">' +
                '<div class="carousel-caption">' +
                '</div>' +
              '</div>';
          }else{
            append = append +
              '<div class="item">' +
                '<img src="'+ evento.ImgLandscape +'">' +
                '<div class="carousel-caption">' +
                '</div>' +
              '</div>';
          }
        });
        append = append +
            '</div>';
        // Controles de Previo y Siguiente
        append = append +
            '<a class="left carousel-control" data-sn-left="#buttonPrev" href="#myCarousel" role="button" data-slide="prev" id="buttonPrev">' +
                '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' +
                '<span class="sr-only">Previous</span>' +
            '</a>' +
            '<a class="right carousel-control" data-sn-right="#buttonNext" href="#myCarousel" role="button" data-slide="next" id="buttonNext">' +
                '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
                '<span class="sr-only">Next</span>' +
            '</a>';
        append = append +
          '</div>';
        append = append +
          '<a href="#" id="text-spotlight">' +
            '<h3 class="text-spotlight">Ver más</h3>' +
          '</a>';
        append = append +
        '</div>';
        append = append +
        '<div id="secciones">' +
          '<div id="lista" class="lista">' ;
          // Botónes de menú       
            $.ajax({
              url: 'http://wapi.lap55.com/api/cs/leon_home_bm',
              success: function (response) {
                var appendLista = "";
                response.forEach( function(seccion, indice) {
                  if (indice > 2) {
                    appendLista = appendLista +
                      '<div class="item section-menu" onkeypress="return abrirSeccion(event,'+ "'" + (indice) + "'" +')" tabindex="-1">' +
                        '<img src="'+ seccion.PosterCardUrlLandscape +'" class="card-img-top">' +
                        '<h3 class="text-section">'+ seccion.titulo +'</h3>' +
                      '</div>';
                  }else{
                    appendLista = appendLista +
                    '<div class="item section-menu" onkeypress="return abrirSeccion(event,'+ "'" + (indice) + "'" +')" tabindex="-1">' +
                      '<img src="'+ seccion.PosterCardUrlLandscape +'" class="card-img-top">' +
                      '<h3 class="text-section">'+ seccion.titulo +'</h3>' +
                    '</div>';
                  }
                });
                document.getElementById('lista').innerHTML += appendLista;
              }
            });
        append = append +
          '</div>' +
        '</div>';        
        document.getElementById(idMenuPrincipal).innerHTML += append;     
        /*console.log("Se imprimio la información");*/
        SpatialNavigation.add({
          selector: '.section-menu',
        });
        SpatialNavigation.add({
          selector: '.carousel-control',
        });
        fadeOut(fadeOptions, 250, 500);
        $('.carousel').carousel();
      },
      error: function(error) {
        console.log(error);
        SpatialNavigation.add({
          selector: '.button-back-menu',
        });
        fadeOptions.fadeOutFadeIn = idMenuPrincipal;
        fadeOptions.fadeInFadeIn = idLoaderLogo;
        fadeOptions.fadeOutFadeOut = idLoaderLogo;
        fadeOptions.fadeInFadeOut = idErrorPage;
        fadeOptions.clearView = "";
        fadeOut(fadeOptions, 250, 500);
      },
      complete: function() {
      }
    });
  }

// Función para abrir las secciones
  function abrirSeccion(event, seccion) {
    if (event.keyCode == 13) {
      switch (seccion) {
        case '0':
          fadeOptions.fadeOutFadeIn = idMenuPrincipal;
          fadeOptions.fadeInFadeIn = idLoaderSpinner;
          fadeOptions.fadeOutFadeOut = idLoaderSpinner;
          fadeOptions.fadeInFadeOut = idEnVivo;
          fadeOptions.clearView = idMenuPrincipal;
          abrirEnVivo(fadeOptions);
          break;
        case '1':
          fadeOptions.fadeOutFadeIn = idMenuPrincipal;
          fadeOptions.fadeInFadeIn = idLoaderSpinner;
          fadeOptions.fadeOutFadeOut = idLoaderSpinner;
          fadeOptions.fadeInFadeOut = idALaCarta;
          fadeOptions.clearView = idMenuPrincipal;
          abrirALaCarta(fadeOptions);
          break;
        case '2':
          fadeOptions.fadeOutFadeIn = idMenuPrincipal;
          fadeOptions.fadeInFadeIn = idLoaderSpinner;
          fadeOptions.fadeOutFadeOut = idLoaderSpinner;
          fadeOptions.fadeInFadeOut = idRadio;
          fadeOptions.clearView = idMenuPrincipal;
          abrirRadio(fadeOptions);
          break;
        case '3':
          fadeOptions.fadeOutFadeIn = idMenuPrincipal;
          fadeOptions.fadeInFadeIn = idLoaderSpinner;
          fadeOptions.fadeOutFadeOut = idLoaderSpinner;
          fadeOptions.fadeInFadeOut = idSectionMusica;
          fadeOptions.clearView = idMenuPrincipal;
          abrirMusica(fadeOptions);
          break;
        case '4':
          fadeOptions.fadeOutFadeIn = idMenuPrincipal;
          fadeOptions.fadeInFadeIn = idLoaderSpinner;
          fadeOptions.fadeOutFadeOut = idLoaderSpinner;
          fadeOptions.fadeInFadeOut = idZonaKids;
          fadeOptions.clearView = idMenuPrincipal;
          abrirZonaKids(fadeOptions);
          break;
        case '5':
          localStorage.clear();
          $('#app').delay().fadeOut("fast");
          loadLogin();
          break;
        default:
          console.log("");
          break;
      }
    }
  }

/*  function abrirEnVivo() {
     document.getElementById("top-menu").classList.toggle("ocultar");
     document.getElementById("app").classList.toggle("opacity");
  }*/

/*  function volverMenu() {
    $("#envivo").delay(100).fadeOut("slow");
    $("#loader-logo").delay(500).fadeIn("slow");
    $("#loader-logo").delay(500).fadeOut("slow");
    $("#menu").delay(2000).fadeIn("slow");
  }*/