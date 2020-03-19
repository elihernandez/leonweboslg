// Variables globales de la sección Zona Kids
  var dataItemEnVivo = new Object();

// Función para abrir A la carta
  function abrirEnVivo(fadeOptions) {
    $.ajax({
      url: 'http://wapi.lap55.com/api/cmdata/leon/livetvplus/'+suscriberId,
      beforeSend: function () {
        document.getElementsByName('contCategoria').value = 0;
        document.getElementsByName('contCatalogo').value = 0;
        SpatialNavigation.pause();
        fadeIn(fadeOptions, 0, 0);
      },
      success: function(respuesta) {
      	respuesta.forEach( function(categoria, indice) {
            dataItemEnVivo['categoria'] = categoria;
            console.log(dataItemEnVivo);
            var append = "";
            append = append + '<div class="container scrollDown" id="categoria' + (indice + 1)  + '">';
            append = append + '<div class="header row middle-xs between-xs" id="header-'+ categoria.category +'">' +
                '<div class="col-xs item categoria">' +
                '<h2 class="texto-categoria">'+ categoria.category +'</h2>' +
                '</div>' +
                '<div class="col-xs row end-xs item contador">' +
                '<h2 class="posicion-contador" id="posicion-contador-'+ categoria.category +'">1</h2><h2 class="texto-contador">de</h2><h2 class="total-contador">'+ categoria.cmData.length +'</h2>' +
                '</div>' +
                '</div>';
            append = append + '<div class="lista" id="lista' + (indice + 1) + '">';
            append = append + '<input class="contCategoria" name="contCategoria" id="contCategoria' + (indice + 1) + '" value="0" style="display: none">';
            categoria.cmData.forEach( function(canal, indice) {
              dataItemEnVivo['item'] = canal;
              dataItemEnVivo['item']['indexItem'] = indice + 1;
              dataItemEnVivo['item']['indexFirstItem'] = 1;
              dataItemEnVivo['item']['indexLastItem'] = categoria.cmData.length;
              var data = escape(JSON.stringify(dataItemEnVivo));
              console.log(dataItemEnVivo);
              if (dataItemEnVivo.item.indexItem == dataItemEnVivo.item.indexFirstItem){
                append = append + "<div class='item envivo-item' id='ev-item" + categoria.category + (indice + 1) + "' tabindex='-1' data-sn-left='ev-item" + categoria.category + (dataItemEnVivo.indexItem) + "'  onfocus='itemFocusEnVivo("+ '"' + data + '"' + ")' onkeydown='keyPressedEnVivo(event, "+ '"' + data + '"' + ")'>";
              }else if (dataItemEnVivo.item.indexItem == dataItemEnVivo.item.indexLastItem) {
                append = append + "<div class='item envivo-item' id='ev-item" + categoria.category + (indice + 1) + "' tabindex='-1' data-sn-right='ev-item" + categoria.category + (dataItemEnVivo.indexItem) + "' onfocus='itemFocusEnVivo("+ '"' + data + '"' + ")' onkeydown='keyPressedEnVivo(event, "+ '"' + data + '"' + ")'>";
              }else{
                append = append + "<div class='item envivo-item' id='ev-item" + categoria.category + (indice + 1) + "' tabindex='-1'                                                                                onfocus='itemFocusEnVivo("+ '"' + data + '"' + ")' onkeydown='keyPressedEnVivo(event, "+ '"' + data + '"' + ")'>";
              }
              append = append + '<img src="' + canal.Poster +'"></img>' +
                  '<h3>' + canal.Name +'</h3>' +
                  '<h4>' + canal.Description +'</h4>' +
                  '</div>';              
            });
            append = append + '</div>';
            append = append + '</div>';
            /*document.getElementById('catalogo-envivo').innerHTML += append;*/
      	});
      },
      error: function() {
        console.log("No se ha podido obtener la información");
      },
      complete: function(respuesta) {
        SpatialNavigation.add({
          selector: '.envivo-item',
        });
        fadeOut(fadeOptions, 250, 500);
        /*SpatialNavigation.add({
          selector: '.focusable',
        });*/
      }
    });
  }

// Se obtienen el catálogo de "En Vivo"  
/*  function abrirEnVivo() {
      var request = new XMLHttpRequest();

      request.open('GET', 'http://wapi.lap55.com/api/cmdata/leon/livetvplus/5bec56dcb00dc8f');
      request.onload = function() {          
        if (request.status >= 200 && request.status < 400) {
          var data = JSON.parse(this.response);
          data.forEach( function(categoria, indice) {
            console.log(categoria.cmData.length);
              var append = "";
              append = append + '<div class="container scrollDown" id="categoria' + (indice + 1)  + '">';
              append = append + '<div class="header row middle-xs between-xs" id="header-'+ categoria.category +'">' +
                '<div class="col-xs item categoria">' +
                '<h2 class="texto-categoria">'+ categoria.category +'</h2>' +
                '</div>' +
                '<div class="col-xs row end-xs item contador">' +
                '<h2 class="posicion-contador" id="posicion-contador-'+ categoria.category +'">1</h2><h2 class="texto-contador">de</h2><h2 class="total-contador">'+ categoria.cmData.length +'</h2>' +
                '</div>' +
                '</div>';
              append = append + '<div class="lista" id="lista' + (indice + 1) + '">';
              append = append + '<input class="contCategoria" name="contCategoria" id="contCategoria' + (indice + 1) + '" value="0" style="display: none">';
              categoria.cmData.forEach( function(canal, indice) {
                  var str = canal.Description; 
                  var res = str.replace("\r\n", "<br>");
                  console.log(res);
                  append = append + '<div class="item focusable scrollRight" id="scrollLeftRight' + categoria.category + (indice + 1) + '" tabindex="-1" onfocus="itemFocus(' + "'header-" + categoria.category +  "'" +','+ "'" + canal.Poster +  "'" +','+ "'" + canal.Name +  "'" +','+ "'" + canal.Name +  "'" +')" onkeypress="return verCanal(event,'+ "'" + canal.Url +  "'" +')" onkeydown="return mover(event,'+ "'" + (indice + 1) +  "'" +',' + "'posicion-contador-" + categoria.category +  "'" +',' + categoria.cmData.length +')">' + 
                    '<img src="' + canal.Poster +'"></img>' +
                    '<h3>' + canal.Name +'</h3>' +
                    '<h4>' + canal.Description +'</h4>' +
                    '</div>';              
              });
              append = append + '</div>';
              append = append + '</div>';
              document.getElementById('catalogo').innerHTML += append;
          });
        }
      }

      request.send();
  }*/

// Se inician en 0 los contadores del carousel
  	document.title = 'León Ap. 5:5';
	document.getElementsByName('contCategoria').value = 0;
	document.getElementsByName('contCatalogo').value = 0;

/*setTimeout( function() { 

	$('.scrollRight').on('sn:willmove', function () {
		var containerParent = '#'.concat($(this).parent().attr('id'));
		var catalogoParent = '#'.concat($(this).parent().parent().parent().attr('id'));
		console.log(containerParent);
		console.log(catalogoParent);

		if (document.getElementById('moverArriba').value == 1) {
			$(catalogoParent).children('.contCatalogo').each(function () {
				var num = 0;
				var contNumberCatalogo = parseFloat(document.getElementById($(this).attr('id')).value);
				if (contNumberCatalogo != 0) {
					num = contNumberCatalogo + 100;
					document.getElementById($(this).attr('id')).value = num;
					$(catalogoParent).children('.scrollDown').each(function () {
						var item = document.getElementById($(this).attr('id'));
						var translateY = "translateY(".concat(num).concat('%)');
						item.style.WebkitTransform = translateY;
					});	
					console.log(contNumberCatalogo);
				}
			});
		}

		if (document.getElementById('moverAbajo').value == 1) {
			$(catalogoParent).children('.contCatalogo').each(function () {
				var num = 0;
				var items = 0;
				var contNumberCatalogo = parseFloat(document.getElementById($(this).attr('id')).value);
				console.log(contNumberCatalogo);
				$(catalogoParent).children('.scrollDown').each(function () {
					items = items + 1;
				});
				items = (items * -100) + 100;
				console.log(items);
				if (contNumberCatalogo != items) {
					num = contNumberCatalogo - 100;
					document.getElementById($(this).attr('id')).value = num;
					$(catalogoParent).children('.scrollDown').each(function () {
						var item = document.getElementById($(this).attr('id'));
						console.log(item);
						var translateY = "translateY(".concat(num).concat('%)');
						item.style.WebkitTransform = translateY;
					});	
				}
			});
		}

		if (document.getElementById('moverDerecha').value == 1) {
			$(containerParent).children('.contCategoria').each(function () {
				var num = 0;
				var contNumberContainer = parseFloat(document.getElementById($(this).attr('id')).value);
				num = contNumberContainer - 100;	
				document.getElementById($(this).attr('id')).value = num;
				$(containerParent).children('.scrollRight').each(function () {
					var item = document.getElementById($(this).attr('id'));
					var translateX = "translateX(".concat(num).concat('%)');
					item.style.WebkitTransform = translateX;
				});
			});
		}

		if (document.getElementById('moverIzquierda').value == 1) {
			$(containerParent).children('.contCategoria').each(function () {
				var num = 0;
				var contNumberContainer = parseFloat(document.getElementById($(this).attr('id')).value);
				if (contNumberContainer != 0) {
					num = contNumberContainer + 100;	
					document.getElementById($(this).attr('id')).value = num;
					$(containerParent).children('.scrollRight').each(function () {
						var item = document.getElementById($(this).attr('id'));
						var translateX = "translateX(".concat(num).concat('%)');
						item.style.WebkitTransform = translateX;
					});
				}
			});
		}

	})

}, 3000);*/

function verCanal(e, url) {
    if (e.keyCode == 13) {
    	if ($("#catalogo").hasClass('ocultarCatalogo') && $("#header").hasClass('ocultarHeader')) {
    		/*document.getElementById("catalogo").classList.toggle("ocultarCatalogo");
      		document.getElementById("header").classList.toggle("ocultarHeader");*/
    	}else{
	        if(Hls.isSupported())
			  {
			      var video = document.getElementById('myVideo');
			      var hls = new Hls();
			      hls.loadSource(url);
			      hls.attachMedia(video);
			      hls.on(Hls.Events.MANIFEST_PARSED,function()
			      {
			          video.play();
			      });
			  }
			  else if (video.canPlayType('application/vnd.apple.mpegurl'))
			  {
			      video.src = 'playlist.m3u8';
			      video.addEventListener('canplay',function()
			      {
			          video.play();
			      });
			  }
	        return false;
    	}
    }
}

function mover(e, posicion, id, total) {
	var numPos = parseInt(posicion);
	console.log(total);

    if (e.keyCode == 39) {    	
    	if (numPos != total) {
    		document.getElementById(id).innerHTML = numPos + 1;
    	}
    }

    if (e.keyCode == 37) {
    	if (numPos != 1) {
    		document.getElementById(id).innerHTML = numPos - 1;
    	}
    }
}

function itemFocus(idHeader, poster, nombre, descripcion) {
	/*var infoCanal = JSON.parse(canal);*/

	console.log(poster);

	/*append = '<div class="col-xs-3 item"><img src="' + poster +'"></img></div>' +
             '<div class="col-xs row middle-xs center-xs item"><div class="col-xs informacion-canal"><h3>' + nombre +'</h3>' +
             '<h4>' + descripcion +'</h4></div></div>';*/

   	/*document.getElementById('infoCanal').innerHTML += append;*/
	/*console.log(nombre.replace(/\n/, "\\n");
	console.log(descripcion);*/

	document.getElementById("posterCanal").src = poster;
	document.getElementById("nombreCanal").innerHTML = nombre;
	/*document.getElementById("infoCanal").innerHTML = descripcion;*/
	
	var header = '#'.concat(idHeader);
	/*$("#header-Canales TV").css({"background-color": "rgba(0, 139, 274, 0.9)", "opacity": "0.9"});*/
}

function itemFocusEnVivo(){

}

function keyPressedEnVivo(){

}