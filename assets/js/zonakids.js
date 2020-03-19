// Variables globales de la sección Zona Kids
  var dataItemZonaKids = new Object();

// Función para abrir Radio
  function abrirZonaKids(fadeOptions) {
    $.ajax({
      url: 'http://wapi.lap55.com/api/cdata/leon/kids/'+suscriberId,
      beforeSend: function () {
        document.getElementsByName('contCategoria').value = 0;
        document.getElementById('contCatalogoRadio').value = 0;
        SpatialNavigation.pause();
        fadeIn(fadeOptions, 0, 0);
      },
      success: function(respuesta) {
        var append = "";
        append = append + '<input type="number" class="contCatalogo" name="contCatalogo" id="contCatalogoZonaKids" value="0" style="display: none">';
        document.getElementById('catalogo-zonakids').innerHTML += append;
        respuesta.forEach( function(categoria, indice) {
          dataItemZonaKids['idCatalogo'] = "catalogo-zonakids";
          dataItemZonaKids['categoria'] = categoria;

          if (indice == 0) {
            dataItemZonaKids.posterTypeNextCategoria = respuesta[indice].poster_type;
          } else if (indice == respuesta.length) {
            dataItemZonaKids.posterTypeNextCategoria = respuesta[indice].poster_type;
          }else{
            dataItemZonaKids.posterTypeNextCategoria = respuesta[indice-1].poster_type;
          }

          if (dataItemZonaKids.categoria.poster_type == 0) {
            append = append + '<div class="container scrollDown" id="zk-categoria' + (indice + 1)  + '">';
          }else{
            append = append + '<div class="container landscape scrollDown" id="zk-categoria' + (indice + 1)  + '">';
          }

          append = append + '<div class="header row middle-xs between-xs" id="zk-header-'+ categoria.category +'">' +
            '<div class="col-xs item categoria">' +
            '<h2 class="texto-categoria">'+ categoria.category +'</h2>' +
            '</div>' +
            '<div class="col-xs row end-xs item contador">' +
            '<h2 class="posicion-contador" id="zk-posicion-contador-'+ categoria.category +'">1</h2><h2 class="texto-contador">de</h2><h2 class="total-contador">'+ categoria.cmData.length +'</h2>' +
            '</div>' +
            '</div>';
            indiceLista = indice + 1;

            if (dataItemZonaKids.categoria.poster_type == 0) {
              append = append + '<div class="lista" id="zk-lista' + indiceLista + '">';
            }else{
              append = append + '<div class="lista-landscape" id="zk-lista' + indiceLista + '">';
            }

            dataItemZonaKids.idContadorCategoria = "zk-posicion-contador-" + categoria.category;
            dataItemZonaKids.indexCategoria = indice + 1;
            dataItemZonaKids.indexFirstCategoria = 1;
            dataItemZonaKids.indexLastCategoria = respuesta.length;
          append = append + '<input class="contCategoria" name="contCategoria" id="zk-contCategoria' + (indice + 1) + '" value="0" style="display: none">';
          categoria.cmData.forEach( function(canal, indice) {
              dataItemZonaKids['item'] = canal;
              dataItemZonaKids['item']['indexItem'] = indice + 1;
              dataItemZonaKids['item']['indexFirstItem'] = 1;
              dataItemZonaKids['item']['indexLastItem'] = categoria.cmData.length;
              dataItemZonaKids['item']['idListParent'] = "zk-lista" + indiceLista;
              var data = escape(JSON.stringify(dataItemZonaKids));
              if (dataItemZonaKids.item.indexItem == dataItemZonaKids.item.indexFirstItem) {
                append = append + "<a class='item zonakids-item' id='zk-scrollLeftRight" + categoria.category + (indice + 1) + "' tabindex='-1' data-sn-left='zk-scrollLeftRight" + categoria.category + (dataItemZonaKids.indexItem) + "'  onfocus='itemFocusZonaKids("+ '"' + data + '"' + ")' onkeydown='keyPressedZonaKids(event, "+ '"' + data + '"' + ")'>";
              }else if (dataItemZonaKids.item.indexItem == dataItemZonaKids.item.indexLastItem) {
                append = append + "<a class='item zonakids-item' id='zk-scrollLeftRight" + categoria.category + (indice + 1) + "' tabindex='-1' data-sn-right='zk-scrollLeftRight" + categoria.category + (dataItemZonaKids.indexItem) + "' onfocus='itemFocusZonaKids("+ '"' + data + '"' + ")' onkeydown='keyPressedZonaKids(event, "+ '"' + data + '"' + ")'>";
              }else{
                append = append + "<a class='item zonakids-item' id='zk-scrollLeftRight" + categoria.category + (indice + 1) + "' tabindex='-1'                                                                                             onfocus='itemFocusZonaKids("+ '"' + data + '"' + ")' onkeydown='keyPressedZonaKids(event, "+ '"' + data + '"' + ")'>";
              }
              append = append + '<img src="' + canal.HDPosterUrl +'"></img>'+
                '</a>';
          });
          append = append + '</div>';
          append = append + '</div>';
          document.getElementById('catalogo-zonakids').innerHTML += append;
        }); 
      },
      error: function() {
        console.log("No se ha podido obtener la información");
      },
      complete: function() {
        SpatialNavigation.add({
          selector: '.zonakids-item',
        });
        fadeOut(fadeOptions, 250, 500);
      }
    });
  }

// Cuando el item recibe el foco
  function itemFocusZonaKids(infoData) {
    var data = JSON.parse(unescape(infoData));
    console.log(data);
    document.getElementById(data.idContadorCategoria).innerHTML = data.item.indexItem;
    $("#zonakids .title-categoria").html("Zona Kids - " + data.categoria.category);
    $("#zonakids .subtitulo").html(data.item.Title);
    /*document.getElementById('titulos-description').innerHTML = imprimirDato(descripcion);*/
    $("#zonakids .rating-movie").html(data.item.StarRating);
    $("#zonakids .clasification-movie").html(clasificationMovie(data.item.Rating));
    $("#zonakids .categories").html(data.item.Categories);
    $("#zonakids .duration").html(data.item.Length);
    $("#zonakids .date-movie").html(data.item.ReleaseDate);
    $("#zonakids .director").html("Director: " + data.item.Director);
    $("#zonakids .actors").html("Actores: " + data.item.Artist);
    
    /*document.getElementById('title-movie-alacarta').innerHTML = imprimirDato(titulo);*/
    if (data.categoria.poster_type == 0) {
      /*document.getElementById('poster-movie-alacarta').src = unescape(poster);*/
      /*$("#poster-movie-alacarta").removeClass("landscape");*/
      $(".rectangle-movie-zonakids").removeClass("landscape");
      /*$("#poster-movie-alacarta").addClass("portrait");*/
      $(".rectangle-movie-zonakids").addClass("portrait");
    }else{
      /*document.getElementById('poster-movie-alacarta').src = unescape(poster);*/
      /*$("#poster-movie-alacarta").removeClass("portrait");*/
      $(".rectangle-movie-zonakids").removeClass("portrait");
      /*$("#poster-movie-alacarta").addClass("landscape");*/
      $(".rectangle-movie-zonakids").addClass("landscape");
    }
  }

// Busca la imágen de clasificación G, PG, PG13, R
  function clasificationMovie(rating){
    if (rating == "PG-13     ") {
      return "assets/images/logos/PG13.png";
    } else if (rating == "PG        ") {
      return "assets/images/logos/PG.png";
    } else if (rating == "G         "){
      return "assets/images/logos/G.png";
    } else if (rating == "R         ") {
      return "assets/images/logos/R.png";
    }
  }

// Cuando se presiona una tecla sobre el item
  function keyPressedZonaKids(e, infoData){
    var data = JSON.parse(unescape(infoData));
    if (e.keyCode == 38) {
      moveUpZonaKids(data);
    }else if (e.keyCode == 40) {
      moveDownZonaKids(data);
    }else if (e.keyCode == 39) {
      moveRightZonaKids(data);
    }else if (e.keyCode == 37) {
      moveLeftZonaKids(data);
    }else if (e.keyCode == 13) {
      fadeOptions.fadeOutFadeIn = idZonaKids;
      fadeOptions.fadeInFadeIn = idLoaderSpinner;
      fadeOptions.fadeOutFadeOut = idLoaderSpinner;
      fadeOptions.fadeInFadeOut = idVideoALaCarta;
      fadeOptions.clearView = "catalogo-zonakids";
      iniciarVideo(fadeOptions, data.item.Registro);
    } else if (e.keyCode == 461 || e.keyCode == 8) {
      history.pushState(null, null, location.href);
      window.onpopstate = function () {
        history.go(1);
      };
      fadeOptions.fadeOutFadeIn = idZonaKids;
      fadeOptions.fadeInFadeIn = idLoaderSpinner;
      fadeOptions.fadeOutFadeOut = idLoaderSpinner;
      fadeOptions.fadeInFadeOut = idMenuPrincipal;
      fadeOptions.clearView = "catalogo-zonakids";
      abrirMenuPrincipal(fadeOptions);
    }
  }

// Cuando se presiona la tecla de "Arriba"
  function moveUpZonaKids(data){
    $(data.idCatalogo).children('.contCatalogo').each(function () {
      var num = 0;
      var contNumberCatalogo = parseFloat(document.getElementById($(this).attr('id')).value);
      if (contNumberCatalogo != 0) {
        num = contNumberCatalogo + 320;
        document.getElementById($(this).attr('id')).value = num;
        $(data.idCatalogo).children('.container-radio').each(function () {
          var item = document.getElementById($(this).attr('id'));
          var translateY = "translateY(".concat(num).concat('px)');
          item.style.WebkitTransform = translateY;
        }); 
      }
    });
  }

// Cuando se presiona la tecla de "Abajo"
  function moveDownZonaKids(data){
    $(data.idCatalogo).children('.contCatalogo').each(function () {
      var num = 0;
      var items = 0;
      var contNumberCatalogo = parseFloat(document.getElementById($(this).attr('id')).value);
      $(data.idCatalogo).children('.container-radio').each(function () {
        items = items + 1;
      });
      items = (items * -100) + 100;
      if (contNumberCatalogo != items) {
        num = contNumberCatalogo - 320;
        document.getElementById($(this).attr('id')).value = num;
        $(data.idCatalogo).children('.container-radio').each(function () {
          var item = document.getElementById($(this).attr('id'));
          var translateY = "translateY(".concat(num).concat('px)');
          item.style.WebkitTransform = translateY;
        }); 
      }
    });
  }

// Cuando se presiona la tecla de "Derecha"
  function moveRightZonaKids(data){
    var containerParent = '#'.concat(data.item.idListParent);
    if (data.item.indexItem + 1 <= data.item. indexLastItem) {
      $(containerParent).children('.contCategoria').each(function () {
        if (data.categoria.posterType == 0) {
          var num = (data.item.indexItem * -240);
        }else{
          var num = (data.item.indexItem * -360);
        }
        document.getElementById($(this).attr('id')).value = num;
        $(containerParent).children('.zonakids-item').each(function () {
          var item = document.getElementById($(this).attr('id'));
          var translateX = "translateX(".concat(num).concat('px)');
          item.style.WebkitTransform = translateX;
        });
      });
    }
  }

// Cuando se presiona la tecla de "Izquierda"
  function moveLeftZonaKids(data){
    var containerParent = '#'.concat(data.item.idListParent);
    if (data.item.indexItem - 1 >= 1) {
      $(containerParent).children('.contCategoria').each(function () {
        if (data.categoria.posterType == 0) {
          var num = ((data.item.indexItem - 2) * -240);
        }else{
          var num = ((data.item.indexItem - 2) * -360);
        }
        $(containerParent).children('.zonakids-item').each(function () {
          var item = document.getElementById($(this).attr('id'));
          var translateX = "translateX(".concat(num).concat('px)');
          item.style.WebkitTransform = translateX;
        });
      });
    }
  }