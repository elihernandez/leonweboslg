// Variables A la Carta
  var myFluidPlayer = "";
  var sourceVideo = document.getElementById('source-video');
  var video = document.getElementById('pruebahls');
  var durationVideo = 0;
  var fadeOutInfoALaCarta = null;
  var timeFadeOutInfoALaCarta = 10000;
  var controlsVideoVisibility = true;
  var lastElementFocused = "";
  var movie = new Object;
  var data = "";
  var dataItemAlaCarta = new Object();

// Función para abrir A la carta
  function abrirALaCarta(fadeOptions) {
    $.ajax({
      url: urlGet+'cmdata/leon/entplus/'+suscriberId,
      beforeSend: function () {
        document.getElementsByName('contCategoria').value = 0;
        document.getElementsByName('contCatalogo').value = 0;
        SpatialNavigation.pause();
        fadeIn(fadeOptions, 0, 0);
      },
      success: function(response) {
        var append = "";
        append = append + '<input type="number" class="contCatalogo" name="contCatalogo" id="contCatalogoALaCarta" value="0" style="display: none">';
        document.getElementById('catalogo-alacarta').innerHTML += append;
        response.forEach( function(categoria, indice) {
          dataItemAlaCarta['idCatalogo'] = "catalogo-alacarta";
          dataItemAlaCarta['categorie'] = categoria;
          movie.categoria = categoria.category;
          movie.seccionId = categoria.seccionId;
          var infoCategoria = categoria;
          var append = "";
          var idCatalogo = "#catalogo-alacarta";
          var posterType = categoria.poster_type;
          var seccionId = categoria.seccion_id;
          var categoriaTitle = categoria.category;
          if (indice == 0) {
            var posterTypeNextCategoria = response[indice].poster_type;
          } else if (indice == response.length) {
            var posterTypeNextCategoria = response[indice].poster_type;
          }else{
            var posterTypeNextCategoria = response[indice-1].poster_type;
          }
          if (posterType == 0) {
            append = append + '<div class="container scrollDown" id="alc-categoria' + (indice + 1)  + '">';
          }else{
            append = append + '<div class="container landscape scrollDown" id="alc-categoria' + (indice + 1)  + '">';
          }
          append = append + '<div class="header row middle-xs between-xs" id="alc-header-'+ categoria.category +'">' +
            '<div class="col-xs item categoria">' +
            '<h2 class="texto-categoria">'+ categoria.category +'</h2>' +
            '</div>' +
            '<div class="col-xs row end-xs item contador">' +
            '<h2 class="posicion-contador" id="alc-posicion-contador-'+ categoria.category +'">1</h2><h2 class="texto-contador">de</h2><h2 class="total-contador">'+ categoria.cmData.length +'</h2>' +
            '</div>' +
            '</div>';
            indiceLista = indice + 1;
            if (posterType == 0) {
              append = append + '<div class="lista" id="alc-lista' + indiceLista + '">';
            }else{
              append = append + '<div class="lista-landscape" id="alc-lista' + indiceLista + '">';
            }
            var indexCategoria = indice + 1;
            var indexFirstCategoria = 1;
            var indexLastCategoria = response.length;
          append = append + '<input class="contCategoria" name="contCategoria" id="alc-contCategoria' + (indice + 1) + '" value="0" style="display: none">';
          categoria.cmData.forEach( function(canal, indice) {
              var contentTypeOrder = canal.ContentType_order;
              var indexItem = indice + 1;
              var indexFirstItem = 1;
              var indexLastItem = categoria.cmData.length;
              var titleCategoria = canal.Title;
              var registro = canal.Registro;
              var poster = canal.HDPosterUrl;
              var posterMovie = canal.Poster;
              var descriptionMovie = escape(canal.Description);
              var rating = canal.Rating;
              var starRating = canal.StarRating;
              data = canal;
              if (indexItem == indexFirstItem) {
                append = append + '<a class="item focusable scrollRight" id="alc-scrollLeftRight' + categoria.category + (indice + 1) + '" tabindex="-1"  data-sn-left="alc-scrollLeftRight' + categoria.category + (indice + 1) + '"  onfocus="itemFocus('+ posterMovie +',' + "'header-" + categoria.category +  "'" +','+ "'" + canal.Poster +  "'" +','+ "'" + categoria.category +  "'" +','+ "'" + escape(canal.Title) +  "'" +','+ "'" + descriptionMovie +  "'" +','+ "'" + (indice + 1) +  "'" +',' + "'alc-posicion-contador-" + categoria.category +  "'" +',' + "'alc-lista" + (indiceLista) +  "'" +','+ "'" + escape(canal.hdBackgroundImageUrl) + "'" +','+ "'" + escape(canal.Categories) + "'" +','+ "'" + escape(canal.Director) + "'" +','+ "'" + escape(canal.Artist) + "'" +','+ "'" + escape(canal.ReleaseDate) + "'" +','+ "'" + escape(canal.Length) + "'" +','+ "'" + escape(poster) + "'" +','+ "'" + escape(posterType) + "'" +','+ "'" + starRating + "'" +','+ "'" + rating + "'" +')" onkeydown="keyPressed(event,'+ "'" + data + "'" +','+ posterType +','+ posterTypeNextCategoria +','+(indice + 1)+','+ indexLastItem +','+ indexCategoria +','+ indexLastCategoria +',' + "'alc-lista" + (indiceLista) +  "'" +','+ "'#catalogo-alacarta'" +','+ seccionId +','+ contentTypeOrder +','+ "'" + categoriaTitle + "'" +','+ "'" + escape(titleCategoria) + "'" +','+ "'" + registro + "'" +')">';               
              }else if (indexItem == indexLastItem) {
                append = append + '<a class="item focusable scrollRight" id="alc-scrollLeftRight' + categoria.category + (indice + 1) + '" tabindex="-1"  data-sn-right="alc-scrollLeftRight' + categoria.category + (indice + 1) + '" onfocus="itemFocus('+ posterMovie +',' + "'header-" + categoria.category +  "'" +','+ "'" + canal.Poster +  "'" +','+ "'" + categoria.category +  "'" +','+ "'" + escape(canal.Title) +  "'" +','+ "'" + descriptionMovie +  "'" +','+ "'" + (indice + 1) +  "'" +',' + "'alc-posicion-contador-" + categoria.category +  "'" +',' + "'alc-lista" + (indiceLista) +  "'" +','+ "'" + escape(canal.hdBackgroundImageUrl) + "'" +','+ "'" + escape(canal.Categories) + "'" +','+ "'" + escape(canal.Director) + "'" +','+ "'" + escape(canal.Artist) + "'" +','+ "'" + escape(canal.ReleaseDate) + "'" +','+ "'" + escape(canal.Length) + "'" +','+ "'" + escape(poster) + "'" +','+ "'" + escape(posterType) + "'" +','+ "'" + starRating + "'" +','+ "'" + rating + "'" +')" onkeydown="keyPressed(event,'+ "'" + data + "'" +','+ posterType +','+ posterTypeNextCategoria +','+(indice + 1)+','+ indexLastItem +','+ indexCategoria +','+ indexLastCategoria +',' + "'alc-lista" + (indiceLista) +  "'" +','+ "'#catalogo-alacarta'" +','+ seccionId +','+ contentTypeOrder +','+ "'" + categoriaTitle + "'" +','+ "'" + escape(titleCategoria) + "'" +','+ "'" + registro + "'" +')">';               
              }else{
                append = append + '<a class="item focusable scrollRight" id="alc-scrollLeftRight' + categoria.category + (indice + 1) + '" tabindex="-1"                                                                              onfocus="itemFocus('+ posterMovie +',' + "'header-" + categoria.category +  "'" +','+ "'" + posterMovie +  "'" +','+ "'" + categoria.category +  "'" +','+ "'" + escape(canal.Title) +  "'" +','+ "'" + descriptionMovie +  "'" +','+ "'" + (indice + 1) +  "'" +',' + "'alc-posicion-contador-" + categoria.category +  "'" +',' + "'alc-lista" + (indiceLista) +  "'" +','+ "'" + escape(canal.hdBackgroundImageUrl) + "'" +','+ "'" + escape(canal.Categories) + "'" +','+ "'" + escape(canal.Director) + "'" +','+ "'" + escape(canal.Artist) + "'" +','+ "'" + escape(canal.ReleaseDate) + "'" +','+ "'" + escape(canal.Length) + "'" +','+ "'" + escape(poster) + "'" +','+ "'" + escape(posterType) + "'" +','+ "'" + starRating + "'" +','+ "'" + rating + "'" +')" onkeydown="keyPressed(event,'+ "'" + data + "'" +','+ posterType +','+ posterTypeNextCategoria +','+(indice + 1)+','+ indexLastItem +','+ indexCategoria +','+ indexLastCategoria +',' + "'alc-lista" + (indiceLista) +  "'" +','+ "'#catalogo-alacarta'" +','+ seccionId +','+ contentTypeOrder +','+ "'" +categoriaTitle + "'" +','+ "'" + escape(titleCategoria) + "'" +','+ "'" + registro + "'" +')">';               
              }
              append = append + '<img src="' + canal.HDPosterUrl +'"></img>'+
              /*append = append + '<span class="icon-playmovie"><i class="fa fa-play"></i></span>' +*/
                '</a>';
          });
          append = append + '</div>';
          append = append + '</div>';
          document.getElementById('catalogo-alacarta').innerHTML += append;
        });     
        /*var player = videojs('my_video_1');
        player.play();*/
      },
      error: function() {
        console.log("No se ha podido obtener la información");
      },
      complete: function(response) {
        if (response.status == 200) {
          document.getElementById('barra-lateral').innerHTML = "";
          document.getElementById('contenido-temporadas').innerHTML = "";
          fadeOut(fadeOptions, 250, 500);
        }
      }
    });
  }

  $(".undo-button").on('sn:enter-down', function(){
    $("#login-view .info").removeClass("fadeOut");
    $("#login-view .form-login").removeClass("fadeIn");
  })

function itemFocus(canal, idHeader, poster, categoria, titulo, descripcion, indice, idContador, idLista, background, categories, director, artist, releaseDate, length, poster, posterType, starRating, rating) {
  $('#'+idContador).html(indice);
  $('#alacarta .background-movie').attr("src", unescape(background));
  $('#alacarta .rating-movie').html(starRating);
  $('#alacarta .clasification-movie').attr("src", clasificationMovie(rating));
  $('#alacarta .duration-movie').html(unescapeText(length));
  $('#alacarta .date-movie').html(unescapeText(releaseDate));
  $('#alacarta .title-movie').html(unescapeText(titulo));
  $('#alacarta .categories-movie').html(unescapeText(categories));
  $('#alacarta .actors-movie').html(unescapeText(artist));
  $('#alacarta .director-movie').html(unescapeText(director));
  $('#alacarta .description-movie').html(unescapeText(descripcion));

  document.getElementById('title-movie-alacarta').innerHTML = unescapeText(titulo);

  if (unescapeText(posterType) == 0) {
    document.getElementById('poster-movie-alacarta').src = unescapeText(poster);
    $("#poster-movie-alacarta").removeClass("landscape");
    $(".rectangle-movie").removeClass("landscape");
    $("#poster-movie-alacarta").addClass("portrait");
    $(".rectangle-movie").addClass("portrait");
  }else{
    document.getElementById('poster-movie-alacarta').src = unescapeText(poster);
    $("#poster-movie-alacarta").removeClass("portrait");
    $(".rectangle-movie").removeClass("portrait");
    $("#poster-movie-alacarta").addClass("landscape");
    $(".rectangle-movie").addClass("landscape");
  }
}

function unescapeText(text){
  if (text != "") {
    return unescape(text);
  }else{
    return "No hay descripcion";
  }
}

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

function moverArriba(data, posterType, posterTypeNextCategoria, indiceItem, indexLastItem, indexCategoria, indexLastCategoria, idListaParent, catalogoParent){
  $(catalogoParent).children('.contCatalogo').each(function () {
    var num = 0;
    var contNumberCatalogo = parseFloat(document.getElementById($(this).attr('id')).value);
    if (contNumberCatalogo != 0) {
      console.log(posterTypeNextCategoria);
      if (posterTypeNextCategoria == 0) {
        num = contNumberCatalogo + 423;
      }else{
        num = contNumberCatalogo + 303;
      }
      document.getElementById($(this).attr('id')).value = num;
      $(catalogoParent).children('.scrollDown').each(function () {
        var item = document.getElementById($(this).attr('id'));
        var translateY = "translateY(".concat(num).concat('px)');
        item.style.WebkitTransform = translateY;
      }); 
      console.log(contNumberCatalogo);
    }
  });
}

function moverAbajo(data, posterType, posterTypeNextCategoria, indiceItem, indexLastItem, indexCategoria, indexLastCategoria, idListaParent, catalogoParent){
  $(catalogoParent).children('.contCatalogo').each(function () {
    var num = 0;
    var items = 0;
    var contNumberCatalogo = parseFloat(document.getElementById($(this).attr('id')).value);
    $(catalogoParent).children('.scrollDown').each(function () {
      items = items + 1;
    });
    items = (items * -100) + 100;
    if (contNumberCatalogo != items) {
      if (posterType == 0) {
        num = contNumberCatalogo - 423;
      }else{
        num = contNumberCatalogo - 303;
      }
      document.getElementById($(this).attr('id')).value = num;
      $(catalogoParent).children('.scrollDown').each(function () {
        var item = document.getElementById($(this).attr('id'));
        var translateY = "translateY(".concat(num).concat('px)');
        item.style.WebkitTransform = translateY;
      }); 
    }
  });
}

function moverDerecha(data, posterType, posterTypeNextCategoria, indiceItem, indexLastItem, indexCategoria, indexLastCategoria, idListaParent){
/*console.log(data);
  var slider = $("#alc-lista1");
  slider.animate({
    marginLeft:'-'+240+'px'
  }, 300, function(){
    $('#alc-lista1 a:first').insertAfter('#alc-lista1 a:last');
    slider.css('margin-left', '+'+0+'px');
  });*/
  /*$(containerParent).css("margin-left", "-240px");
  setTimeout(function(){
    $(containerParent).css("transition", "");
    console.log($(containerParent+" a:nth-child(2)").attr('id'));
    var firstChild = $(containerParent+" a:nth-child(2)").attr('id');
    console.log($(containerParent+" a:last-child").attr('id'));
    var lastChild = $(containerParent+" a:last-child").attr('id');
    $( "#"+lastChild ).after($("#"+firstChild) );
    $(containerParent).css("margin-left", "-0px");
  },225)*/
  var containerParent = '#'.concat(idListaParent);
  console.log(containerParent);
  if (indiceItem + 1 <= indexLastItem) {
    $(containerParent).children('.contCategoria').each(function () {
      if (posterType == 0) {
        var num = (indiceItem * -240);
      }else{
        var num = (indiceItem * -360);
      }
      console.log(num);
      document.getElementById($(this).attr('id')).value = num;
      $(containerParent).children('.scrollRight').each(function () {
        var item = document.getElementById($(this).attr('id'));
        var translateX = "translateX(".concat(num).concat('px)');
        item.style.WebkitTransform = translateX;
      });
    });
  }
     /* setTimeout(function(){
        console.log($(containerParent+" a:nth-child(2)").attr('id'));
        var firstChild = $(containerParent+" a:nth-child(2)").attr('id');
        console.log($(containerParent+" a:last-child").attr('id'));
        var lastChild = $(containerParent+" a:last-child").attr('id');
        $( "#"+lastChild ).after($("#"+firstChild) );
      },2000)*/
/*  setTimeout(function(){
    $('#alc-lista1 a:first').insertAfter('#alc-lista1 a:last');
  }, 100)*/
}

function moverIzquierda(data, posterType, posterTypeNextCategoria, indiceItem, indexLastItem, indexCategoria, indexLastCategoria, idListaParent){
 /*var slider = $("#alc-lista1");*/
  /*slider.animate({
    marginLeft:'+'+240+'px'
  }, 10, function(){
    $('#alc-lista1 a:last').insertAfter('#alc-lista1 a:first');
    slider.css('margin-left', '+'+0+'px');
  });*/
  console.log(indexLastItem);
  var containerParent = '#'.concat(idListaParent);
  if (indiceItem - 1 >= 1) {
    $(containerParent).children('.contCategoria').each(function () {
      if (posterType == 0) {
        var num = ((indiceItem - 2) * -240);
      }else{
        var num = ((indiceItem - 2) * -360);
      }
      console.log(num);
      $(containerParent).children('.scrollRight').each(function () {
        var item = document.getElementById($(this).attr('id'));
        var translateX = "translateX(".concat(num).concat('px)');
        item.style.WebkitTransform = translateX;
      });
      console.log($(containerParent+" a:last-child").attr('id'));
      var lastChild = $(containerParent+" a:last-child").attr('id');
      /*$( "#alc-scrollLeftRightEstrenos1" ).before($("#"+lastChild) );*/
    });
  }
}

function mostrarTemporadas(fadeOutFadeIn, fadeInFadeIn, fadeOutFadeOut, fadeInFadeOut, vaciarVista, contentTypeOrder, categoria, titleCategoria) {
  SpatialNavigation.pause()
    $.ajax({
      url: 'http://wapi.lap55.com/api/season/leon/'+contentTypeOrder,
      dataType: 'json',
      beforeSend: function () {
        /*fadeOut(idALaCarta, idLoaderSpinner);*/
        fadeIn(fadeOutFadeIn, fadeInFadeIn, 0, 0);
        var append = "";
        append = append + '<div class="logo row middle-xs">' +
        '<img class="col-xs-12" src="assets/images/logos/Leon Icono (BT).png">' +
        '</div>' +
        '<div class="info">' +
        '<div class="titulos row top-xs">' +
        '<h3 id="titulos-categoria-temporadas" class="titulo"></h3>' +
        '<h2 id="titulos-titulo-temporadas" class="subtitulo"></h2>' +
        '</div>' +
        '</div>';
        document.getElementById('header-temporadas').innerHTML += append;
        document.getElementById('titulos-categoria-temporadas').innerHTML = "| "+categoria;
        document.getElementById('titulos-titulo-temporadas').innerHTML = unescape(titleCategoria);
      },
      success: function(respuesta) {
        respuesta.forEach( function(temporada, indice){
          var append = "";
          if (indice == 0) {
            var primeraTemporada = temporada.TitleSeason;
            console.log(primeraTemporada);
            $.ajax({
              url: 'http://wapi.lap55.com/api/episode/leon/'+contentTypeOrder+'/temp/'+primeraTemporada+'/'+idUsuario,
              dataType: 'json',
              success: function(respuesta) {
                respuesta.forEach( function(capitulo, indice) {
                  var append = "";
                  append = append + '<div class="focusable item" tabindex="-1">';
                    append = append + '<img class="" src="'+ capitulo.HDPosterUrl +'">';
                    append = append + '<h2 class="titulo">'+ capitulo.Title +'</h2>';
                    if (capitulo.Description == "") {
                      append = append + '<h3 class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>';
                    }else{
                      append = append + '<h3 class="description">'+ capitulo.Description +'</h3>';
                    }
                  append = append + '</div>';
                  document.getElementById('contenido-temporadas').innerHTML += append;
                });
              },
              error: function() {
                console.log("No se ha podido obtener la información");
              }
            });
          }
          if (indice == 0) {
            append = append + '<div class="focusable item active" tabindex="-1" onkeydown="mostrarCapitulos(event,'+ contentTypeOrder +','+ "'" + temporada.TitleSeason + "'" +')">';
          }else{
            append = append + '<div class="focusable item" tabindex="-1" onkeydown="mostrarCapitulos(event,'+ contentTypeOrder +','+ "'" + temporada.TitleSeason + "'" +')">';
          }
            append = append + '<h2 class="titulo-temporada">'+ temporada.Title +'</h2>';
          append = append + '</div>';
          document.getElementById('barra-lateral').innerHTML += append;
        });
      },
      error: function() {
        console.log("No se ha podido obtener la información");
      },
      complete: function() {
        fadeOut(fadeOutFadeOut, fadeInFadeOut, 0, defaultTime + 500, "");
        SpatialNavigation.focus('.focusable');
        SpatialNavigation.resume();
        /*setTimeout(function(){
          SpatialNavigation.resume();
          SpatialNavigation.focus();
          fadeIn(idLoaderSpinner, idTemporadas);
        }, 500);*/
      }
    });
}

function mostrarCapitulos(e, contentTypeOrder, temporadaTitle) {
  if (e.keyCode == 13) {
    $.ajax({
      url: 'http://wapi.lap55.com/api/episode/leon/'+contentTypeOrder+'/temp/'+temporadaTitle+'/'+idUsuario,
      dataType: 'json',
      beforeSend: function(respuesta) {
        document.getElementById("contenido-temporadas").classList.toggle("oscurecer");
        $("#spinner-temporadas").delay().fadeIn("slow");
      },
      success: function(respuesta) {
        document.getElementById('contenido-temporadas').innerHTML = "";
        respuesta.forEach( function(capitulo, indice) {
          var append = "";
          append = append + '<div class="focusable item" tabindex="-1">';
            append = append + '<img class="" src="'+ capitulo.HDPosterUrl +'">';
            append = append + '<h2 class="titulo">'+ capitulo.Title +'</h2>';
            if (capitulo.Description == "") {
              append = append + '<h3 class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>';
            }else{
              append = append + '<h3 class="description">'+ capitulo.Description +'</h3>';
            }
          append = append + '</div>';
          document.getElementById('contenido-temporadas').innerHTML += append;
        });
        document.getElementById("contenido-temporadas").classList.toggle("oscurecer");
        $("#spinner-temporadas").delay().fadeOut("slow");
      },
      complete: function() {
      },
      error: function() {
        console.log("No se ha podido obtener la información");
      }
    });
  } else if (e.keyCode == 461 || e.keyCode == 8) {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
    abrirALaCarta(idTemporadas, idLoaderSpinner, idLoaderSpinner, idALaCarta, idTemporadas);
  }
}

function volverALaCarta() {
  SpatialNavigation.pause();
  $.ajax({
    url: 'http://wapi.lap55.com/api/cmdata/leon/entplus/5bec56dcb00dc8f',
    dataType: 'json',
    beforeSend: function () {
      fadeOut(idTemporadas, idLoaderSpinner);
      document.getElementsByName('contCategoria').value = 0;
      document.getElementsByName('contCatalogo').value = 0;
      document.getElementById('barra-lateral').innerHTML = "";
      document.getElementById('contenido-temporadas').innerHTML = "";
    },
    success: function(respuesta) {
      respuesta.forEach( function(categoria, indice) {
        var infoCategoria = categoria;
        funcionNumero(infoCategoria);
        var data = 10;
        var append = "";
        var idCatalogo = "#catalogo-alacarta";
        var posterType = categoria.poster_type;
        var seccionId = categoria.seccion_id;
        var categoriaTitle = categoria.category;
        if (indice == 0) {
          var posterTypeNextCategoria = respuesta[indice].poster_type;
        } else if (indice == respuesta.length) {
          var posterTypeNextCategoria = respuesta[indice].poster_type;
        }else{
          var posterTypeNextCategoria = respuesta[indice-1].poster_type;
        }
        if (posterType == 0) {
          append = append + '<div class="container scrollDown" id="alc-categoria' + (indice + 1)  + '">';
        }else{
          append = append + '<div class="container landscape scrollDown" id="alc-categoria' + (indice + 1)  + '">';
        }
        append = append + '<div class="header row middle-xs between-xs" id="alc-header-'+ categoria.category +'">' +
          '<div class="col-xs item categoria">' +
          '<h2 class="texto-categoria">'+ categoria.category +'</h2>' +
          '</div>' +
          '<div class="col-xs row end-xs item contador">' +
          '<h2 class="posicion-contador" id="alc-posicion-contador-'+ categoria.category +'">1</h2><h2 class="texto-contador">de</h2><h2 class="total-contador">'+ categoria.cmData.length +'</h2>' +
          '</div>' +
          '</div>';
          indiceLista = indice + 1;
          if (posterType == 0) {
            append = append + '<div class="lista" id="alc-lista' + indiceLista + '">';
          }else{
            append = append + '<div class="lista-landscape" id="alc-lista' + indiceLista + '">';
          }
          var indexCategoria = indice + 1;
          var indexFirstCategoria = 1;
          var indexLastCategoria = respuesta.length;
        append = append + '<input class="contCategoria" name="contCategoria" id="alc-contCategoria' + (indice + 1) + '" value="0" style="display: none">';
        categoria.cmData.forEach( function(canal, indice) {
            var contentTypeOrder = canal.ContentType_order;
            var indexItem = indice + 1;
            var indexFirstItem = 1;
            var indexLastItem = categoria.cmData.length;
            var titleCategoria = canal.Title;
            var registro = canal.Registro;
            console.log(registro);
            if (indexItem == indexFirstItem) {
              append = append + '<div class="item focusable scrollRight" id="alc-scrollLeftRight' + categoria.category + (indice + 1) + '" tabindex="-1" data-sn-left="alc-scrollLeftRight' + categoria.category + (indexItem) + '" onfocus="itemFocus('+ canal.Poster +',' + "'header-" + categoria.category +  "'" +','+ "'" + canal.Poster +  "'" +','+ "'" + categoria.category +  "'" +','+ "'" + canal.Title +  "'" +','+ "'" + canal.Description +  "'" +','+ "'" + (indice + 1) +  "'" +',' + "'alc-posicion-contador-" + categoria.category +  "'" +',' + "'alc-lista" + (indiceLista) +  "'" +','+ "'" + canal.hdBackgroundImageUrl + "'" +','+ "'" + canal.Categories + "'" +','+ "'" + canal.Director + "'" +','+ "'" + canal.Artist + "'" +','+ "'" + canal.ReleaseDate + "'" +','+ "'" + canal.Length + "'" +')" onkeydown="keyPressed(event,'+ data +','+ posterType +','+ posterTypeNextCategoria +','+(indice + 1)+','+ indexLastItem +','+ indexCategoria +','+ indexLastCategoria +',' + "'alc-lista" + (indiceLista) +  "'" +','+ "'#catalogo-alacarta'" +','+ seccionId +','+ contentTypeOrder +','+ "'" + categoriaTitle + "'" +','+ "'" + titleCategoria + "'" +','+ "'" + registro + "'" +')">';               
            }else if (indexItem == indexLastItem) {
              append = append + '<div class="item focusable scrollRight" id="alc-scrollLeftRight' + categoria.category + (indice + 1) + '" tabindex="-1" data-sn-right="alc-scrollLeftRight' + categoria.category + (indexItem) + '"  onfocus="itemFocus('+ canal.Poster +',' + "'header-" + categoria.category +  "'" +','+ "'" + canal.Poster +  "'" +','+ "'" + categoria.category +  "'" +','+ "'" + canal.Title +  "'" +','+ "'" + canal.Description +  "'" +','+ "'" + (indice + 1) +  "'" +',' + "'alc-posicion-contador-" + categoria.category +  "'" +',' + "'alc-lista" + (indiceLista) +  "'" +','+ "'" + canal.hdBackgroundImageUrl + "'" +','+ "'" + canal.Categories + "'" +','+ "'" + canal.Director + "'" +','+ "'" + canal.Artist + "'" +','+ "'" + canal.ReleaseDate + "'" +','+ "'" + canal.Length + "'" +')" onkeydown="keyPressed(event,'+ data +','+ posterType +','+ posterTypeNextCategoria +','+(indice + 1)+','+ indexLastItem +','+ indexCategoria +','+ indexLastCategoria +',' + "'alc-lista" + (indiceLista) +  "'" +','+ "'#catalogo-alacarta'" +','+ seccionId +','+ contentTypeOrder +','+ "'" + categoriaTitle + "'" +','+ "'" + titleCategoria + "'" +','+ "'" + registro + "'" +')">';               
            }else{
              append = append + '<div class="item focusable scrollRight" id="alc-scrollLeftRight' + categoria.category + (indice + 1) + '" tabindex="-1" onfocus="itemFocus('+ canal.Poster +',' + "'header-" + categoria.category +  "'" +','+ "'" + canal.Poster +  "'" +','+ "'" + categoria.category +  "'" +','+ "'" + canal.Title +  "'" +','+ "'" + canal.Description +  "'" +','+ "'" + (indice + 1) +  "'" +',' + "'alc-posicion-contador-" + categoria.category +  "'" +',' + "'alc-lista" + (indiceLista) +  "'" +','+ "'" + canal.hdBackgroundImageUrl + "'" +','+ "'" + canal.Categories + "'" +','+ "'" + canal.Director + "'" +','+ "'" + canal.Artist + "'" +','+ "'" + canal.ReleaseDate + "'" +','+ "'" + canal.Length + "'" +')" onkeydown="keyPressed(event,'+ data +','+ posterType +','+ posterTypeNextCategoria +','+(indice + 1)+','+ indexLastItem +','+ indexCategoria +','+ indexLastCategoria +',' + "'alc-lista" + (indiceLista) +  "'" +','+ "'#catalogo-alacarta'" +','+ seccionId +','+ contentTypeOrder +','+ "'" +categoriaTitle + "'" +','+ "'" +titleCategoria+ "'" +','+ "'" + registro + "'" +')">';               
            }
            append = append + '<img src="' + canal.HDPosterUrl +'"></img>' +
              '</div>';
        });
        append = append + '</div>';
        append = append + '</div>';
        document.getElementById('catalogo-alacarta').innerHTML += append;
      });     
      /*var player = videojs('my_video_1');
      player.play();*/
    },
    error: function(respuesta) {
      console.log(respuesta);
      console.log("No se ha podido obtener la información");
    },
    complete: function(respuesta) {
      console.log(respuesta);
      setTimeout(function(){
        SpatialNavigation.resume();
        SpatialNavigation.focus();
        fadeIn(idLoaderSpinner, idALaCarta);
      }, 500);
    }
  });    
}

function keyPressed(e, data, posterType, posterTypeNextCategoria, indiceItem, indexLastItem, indexCategoria, indexLastCategoria, idListaParent, idCatalogoParent, seccionId, contentTypeOrder, categoria, titleCategoria, registro) {
  if (e.keyCode == 38) {
    moverArriba(data, posterType, posterTypeNextCategoria, indiceItem, indexLastItem, indexCategoria, indexLastCategoria, idListaParent, idCatalogoParent);
    return false;
  }else if (e.keyCode == 40) {
    moverAbajo(data, posterType, posterTypeNextCategoria, indiceItem, indexLastItem, indexCategoria, indexLastCategoria, idListaParent, idCatalogoParent);
    return false;
  }else if (e.keyCode == 39) {
    moverDerecha(data, posterType, posterTypeNextCategoria, indiceItem, indexLastItem, indexCategoria, indexLastCategoria, idListaParent);
    return false;
  }else if (e.keyCode == 37) {
    moverIzquierda(data, posterType, posterTypeNextCategoria, indiceItem, indexLastItem, indexCategoria, indexLastCategoria, idListaParent);
    return false;
  }else if (e.keyCode == 13) {
    if (seccionId == 0) {
      fadeOptions.fadeOutFadeIn = idALaCarta;
      fadeOptions.fadeInFadeIn = idLoaderSpinner;
      fadeOptions.fadeOutFadeOut = idLoaderSpinner;
      fadeOptions.fadeInFadeOut = idVideoALaCarta;
      fadeOptions.clearView = "catalogo-alacarta";
      iniciarVideo(fadeOptions, registro);
    }else if (seccionId == 1) {
      mostrarTemporadas(idALaCarta, idLoaderSpinner, idLoaderSpinner, idTemporadas, "", contentTypeOrder, categoria, titleCategoria);
    }
  } else if (e.keyCode == 461 || e.keyCode == 8) {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
    fadeOptions.fadeOutFadeIn = idALaCarta;
    fadeOptions.fadeInFadeIn = idLoaderSpinner;
    fadeOptions.fadeOutFadeOut = idLoaderSpinner;
    fadeOptions.fadeInFadeOut = idMenuPrincipal;
    fadeOptions.clearView = "catalogo-alacarta";
    abrirMenuPrincipal(fadeOptions);
  }
}

// Funciones del player de video
  function iniciarVideo(fadeOptions, registro){
    $.ajax({
      url: 'http://wapi.lap55.com/api/cmd/gCmLink/'+registro+'/'+suscriberId,
      beforeSend: function () {
       fadeIn(fadeOptions, 0, 0);
      },
      success: function(response) {
        sourceVideo.src = response.Url;
        /*       controlsVideoVisibility = true; 
        fadeOutInfoALaCarta = null;
        clearTimeout(fadeOutInfoALaCarta);
        $(".info-movie-alacarta").removeClass("desvanecer");
        $(".fluid_controls_progress_container").removeClass("desvanecer");
        $(".fluid_controls_container").removeClass("desvanecer");*/
        /*showInfoALaCarta();*/   
      },
      error: function() {
        console.log("No se ha podido obtener la información");
      },
      complete: function() {    
        myFluidPlayer = fluidPlayer(
          'pruebahls',
          {
            layoutControls: {
              keyboardControl: false,
              fillToContainer: false,
              autoPlay: true,
              allowTheatre: false,
            }
          }
        );

        SpatialNavigation.add({
          selector: '.control-video.playpause',
        });

        SpatialNavigation.add({
          selector: '.control-video',
        });

        $("#pruebahls_vast_control_currentpos").addClass("control-video currentpos");
        $("#pruebahls_vast_control_currentpos").attr("tabindex","-1");
        $("#pruebahls_vast_control_currentpos").attr("onkeydown","stepBackwardForward(event)");
        $("#pruebahls_vast_control_currentpos").attr("data-sn-left", "#pruebahls_vast_control_currentpos");
        $("#pruebahls_vast_control_currentpos").attr("data-sn-right","#pruebahls_vast_control_currentpos");
        fadeOut(fadeOptions, 0, 0);
      }
    });
  }


  function keyPressedVideo(){
  }
 
  video.addEventListener("timeupdate",function(ev){
    /*console.log(video.currentTime);   */
    var d = new Date(video.currentTime * 1000); 
    // Ajuste de las 23 horas
    var hora = (d.getHours() == 0) ? 23:d.getHours() - 18;
    var hora = (hora < 10) ? "0" + hora:hora;
    var minuto = (d.getMinutes()<10) ? "0" + d.getMinutes():d.getMinutes();
    var segundo = (d.getSeconds()<10) ? "0" + d.getSeconds():d.getSeconds();

    if (hora < 1) {
      document.getElementById('initialTime').innerHTML =  minuto + ":" + segundo;
    }else{
      document.getElementById('initialTime').innerHTML =  hora + ":" + minuto + ":" + segundo;
    }

    durationVideo = video.duration;
    var hours = Math.floor( durationVideo / 3600 );  
    var minutes = Math.floor( (durationVideo % 3600) / 60 );
    var seconds = Math.floor(durationVideo % 60);
     
    //Anteponiendo un 0 a los minutos si son menos de 10 
    minutes = minutes < 10 ? '0' + minutes : minutes;
     
    //Anteponiendo un 0 a los segundos si son menos de 10 
    seconds = seconds < 10 ? '0' + seconds : seconds;
     
    if (hours < 1) {
      var result = minutes + ":" + seconds;  // 2:41:30
      document.getElementById('finalTime').innerHTML = result;
    }else{
      var result = hours + ":" + minutes + ":" + seconds;  // 2:41:30
      document.getElementById('finalTime').innerHTML = result;
    }
    /*SpatialNavigation.resume();*/
 /*   clearTimeout(fadeOutInfoALaCarta);*/
    if (!fadeOutInfoALaCarta) {
      console.log("no esta inicado fadeOutInfoALaCarta");
      fadeOutInfoALaCarta = setTimeout(hideInfoALaCarta, timeFadeOutInfoALaCarta);
    }else{
      console.log("esta inicado fadeOutInfoALaCarta");
    }
  }, true);
  
  var playing = 0;

  function stepBackward(e){
    if (controlsVideoVisibility) {
      if (e.keyCode == 461 || e.keyCode == 8) {
        stopVideo();
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
          history.go(1);
        };
      }

      if (e.keyCode == 13 && controlsVideoVisibility) {
        showInfoALaCarta();
        myFluidPlayer.skipTo(video.currentTime - 30);
      }
    }else{
      showInfoALaCarta();
    }
  }

  function playPause(e){
    if (controlsVideoVisibility) {
      if (e.keyCode == 461 || e.keyCode == 8) {
        stopVideo();
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
          history.go(1);
        };
      }

      if (e.keyCode == 13) {
        if (playing == 0) {
          showInfoALaCarta();
          myFluidPlayer.play();
          playing = 1;
          $( "#icon-playpause" ).removeClass( "fa fa-play" );
          $( "#icon-playpause" ).addClass( "fa fa-pause" );
        }else{
          showInfoALaCarta();
          myFluidPlayer.pause();
          playing = 0;
          $( "#icon-playpause" ).removeClass( "fa fa-pause" );
          $( "#icon-playpause" ).addClass( "fa fa-play" );
        }
      }
    }else{
      showInfoALaCarta();
    }
  }

  function stepForward(e){
    if (controlsVideoVisibility) {
      if (e.keyCode == 461 || e.keyCode == 8) {
        stopVideo();
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
          history.go(1);
        };
      }

      if (e.keyCode == 13 && controlsVideoVisibility) {
        showInfoALaCarta();
        myFluidPlayer.skipTo(video.currentTime + 30);
      }
    }else{
      showInfoALaCarta();
    }
  }

  function stepBackwardForward(e){
    switch (e.keyCode) {
      case 461:
        if (controlsVideoVisibility) {
          stopVideo();
          history.pushState(null, null, location.href);
          window.onpopstate = function () {
            history.go(1);
          };
        }else{
          showInfoALaCarta();
        }
      break;
      case 8:
        if (controlsVideoVisibility) {
          stopVideo();
          history.pushState(null, null, location.href);
          window.onpopstate = function () {
            history.go(1);
          };
        }else{
          showInfoALaCarta();
        }
      break;
      case 39:
        if (controlsVideoVisibility) {
          showInfoALaCarta();
          myFluidPlayer.skipTo(video.currentTime + 300);
        }else{
          showInfoALaCarta();
        }
        break;
      case 37:
        if (controlsVideoVisibility) {
          showInfoALaCarta();
          myFluidPlayer.skipTo(video.currentTime - 300);
        }else{
          showInfoALaCarta();
        }
        break;
      default:
        console.log("");
        break;
    }    
  }

  $(".control-video").on('sn:willmove', function(){
    showInfoALaCarta();
  })

  function hideInfoALaCarta(){
    $(".info-movie-alacarta").addClass("desvanecer");
    $("#pruebahls_fluid_controls_progress_container").addClass("desvanecer");
    $("#pruebahls_fluid_controls_container").addClass("desvanecer");
    /*$(".info-movie-alacarta").addClass("desvanecer");
    $(".fluid_controls_progress_container").addClass("desvanecer");
    $(".fluid_controls_container").addClass("desvanecer");*/
    controlsVideoVisibility = false;
  }

  function showInfoALaCarta(){
    $(".info-movie-alacarta").removeClass("desvanecer");
    $("#pruebahls_fluid_controls_progress_container").removeClass("desvanecer");
    $("#pruebahls_fluid_controls_container").removeClass("desvanecer");
    /*$(".info-movie-alacarta").removeClass("desvanecer");
    $(".fluid_controls_progress_container").removeClass("desvanecer");
    $("#pruebahls_fluid_controls_container").removeClass("desvanecer");*/
    /*$(".fluid_controls_container").removeClass("fade out");*/
    controlsVideoVisibility = true;
    clearTimeout(fadeOutInfoALaCarta);
    fadeOutInfoALaCarta = setTimeout(hideInfoALaCarta, timeFadeOutInfoALaCarta);
  }

  function stopVideo(){
    myFluidPlayer.pause();
    controlsVideoVisibility = false;
    clearTimeout(fadeOutInfoALaCarta);
    fadeOutInfoALaCarta = "";
    /*clearTimeout(fadeOutInfoALaCarta);
    hideInfoALaCarta();*/
    fadeOptions.fadeOutFadeIn = idVideoALaCarta;
    fadeOptions.fadeInFadeIn = idLoaderSpinner;
    fadeOptions.fadeOutFadeOut = idLoaderSpinner;
    fadeOptions.fadeInFadeOut = idALaCarta;
    fadeOptions.clearView = "";
    abrirALaCarta(fadeOptions);
  }

  $(document).on('keydown', function(){
    if (!controlsVideoVisibility) {
      /*SpatialNavigation.resume();*/
    }else{
      /*clearTimeout(fadeOutInfoALaCarta);
      fadeOutInfoALaCarta = setTimeout(desvanecerInfoALaCarta, timeFadeOutInfoALaCarta);
      console.log("Movimiento con control video");
      $(".info-movie-alacarta").removeClass("desvanecer");
      $("#pruebahls_fluid_controls_progress_container").removeClass("desvanecer");
      $("#pruebahls_fluid_controls_container").removeClass("desvanecer");
      controlsVideoVisibility = true;*/
    }
  })
