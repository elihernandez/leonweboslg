// Función para abrir Radio
  function abrirRadio(fadeOptions) {
    $.ajax({
      url: 'http://wapi.lap55.com/api/cdata/leon/radio/'+suscriberId,
      beforeSend: function () {
        /*document.getElementsByName('contCategoria').value = 0;
        document.getElementById('contCatalogoRadio').value = 0;*/
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
          selector: '.radio-item',
        });
        fadeOut(fadeOptions, 250, 500);
      }
    });
  }

// Función para abrir Detalle de Radio
  function abrirRadio2(fadeOptions) {
    $.ajax({
      url: 'http://wapi.lap55.com/api/cdata/leon/radio/'+suscriberId,
      beforeSend: function () {
        /*document.getElementsByName('contCategoria').value = 0;
        document.getElementById('contCatalogoRadio').value = 0;*/
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
          selector: '.radio-item',
        });
        fadeOut(fadeOptions, 250, 500);
      }
    });
  }  

  $("#radio .view-1").keydown(function(event){
    if (event.which == 13) {
      fadeOptions.fadeOutFadeIn = idRadio;
      fadeOptions.fadeInFadeIn = idLoaderSpinner;
      fadeOptions.fadeOutFadeOut = idLoaderSpinner;
      fadeOptions.fadeInFadeOut = idRadioView2;
      fadeOptions.clearView = "";
      abrirRadio2(fadeOptions);
    }else if (event.which == 461 || event.which == 8) {
      history.pushState(null, null, location.href);
      window.onpopstate = function () {
        history.go(1);
      };
      fadeOptions.fadeOutFadeIn = idRadio;
      fadeOptions.fadeInFadeIn = idLoaderSpinner;
      fadeOptions.fadeOutFadeOut = idLoaderSpinner;
      fadeOptions.fadeInFadeOut = idMenuPrincipal;
      fadeOptions.clearView = "";
      abrirMenuPrincipal(fadeOptions);
    }
  });

  function keyPressedRadio(e, idListParent, indexItem, indexLastItem, catalogoParent){
    if (e.keyCode == 38) {
      moveUpRadio(idListParent, indexItem, indexLastItem, catalogoParent);
    }else if (e.keyCode == 40) {
      moveDownRadio(idListParent, indexItem, indexLastItem, catalogoParent);
    }else if (e.keyCode == 39) {
      moveRightRadio(idListParent, indexItem, indexLastItem);
    }else if (e.keyCode == 37) {
      moveLeftRadio(idListParent, indexItem, indexLastItem);
    }else if (e.keyCode == 13) {
      console.log("Enter");
    } else if (e.keyCode == 461 || e.keyCode == 8) {
      console.log("Back");
    }
  }

  function moveUpRadio(idListParent, indexItem, indexLastItem, catalogoParent){
    $(catalogoParent).children('.contCatalogo').each(function () {
      var num = 0;
      var contNumberCatalogo = parseFloat(document.getElementById($(this).attr('id')).value);
      if (contNumberCatalogo != 0) {
        num = contNumberCatalogo + 320;
        document.getElementById($(this).attr('id')).value = num;
        $(catalogoParent).children('.container-radio').each(function () {
          var item = document.getElementById($(this).attr('id'));
          var translateY = "translateY(".concat(num).concat('px)');
          item.style.WebkitTransform = translateY;
        }); 
        console.log(contNumberCatalogo);
      }
    });
  }

  function moveDownRadio(idListParent, indexItem, indexLastItem, catalogoParent){
    $(catalogoParent).children('.contCatalogo').each(function () {
      var num = 0;
      var items = 0;
      var contNumberCatalogo = parseFloat(document.getElementById($(this).attr('id')).value);
      console.log(contNumberCatalogo);
      $(catalogoParent).children('.container-radio').each(function () {
        items = items + 1;
      });
      console.log(items);
      items = (items * -100) + 100;
      if (contNumberCatalogo != items) {
        num = contNumberCatalogo - 320;
        document.getElementById($(this).attr('id')).value = num;
        $(catalogoParent).children('.container-radio').each(function () {
          var item = document.getElementById($(this).attr('id'));
          var translateY = "translateY(".concat(num).concat('px)');
          item.style.WebkitTransform = translateY;
        }); 
      }
    });
  }

  function moveRightRadio(idListParent, indexItem, indexLastItem){
    var containerParent = '#'.concat(idListParent);
    console.log(containerParent);
    if (indexItem + 1 <= indexLastItem) {
      $(containerParent).children('.contCategoria').each(function () {
        var num = (indexItem * -260);
        document.getElementById($(this).attr('id')).value = num;
        $(containerParent).children('.radio-item').each(function () {
          var item = document.getElementById($(this).attr('id'));
          var translateX = "translateX(".concat(num).concat('px)');
          item.style.WebkitTransform = translateX;
        });
      });
    }
  }

  function moveLeftRadio(idListParent, indexItem, indexLastItem){
    var containerParent = '#'.concat(idListParent);
    console.log(containerParent);
    if (indexItem - 1 >= 1) {
      $(containerParent).children('.contCategoria').each(function () {
        var num = ((indexItem - 2) * -260);
        document.getElementById($(this).attr('id')).value = num;
        $(containerParent).children('.radio-item').each(function () {
          var item = document.getElementById($(this).attr('id'));
          var translateX = "translateX(".concat(num).concat('px)');
          item.style.WebkitTransform = translateX;
        });
      });
    }
  }