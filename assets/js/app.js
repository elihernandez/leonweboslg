// Variables globales
  /*var idUsuario = "5bec56dcb00dc8f";*/
  /*var suscriberPassword = "JDJhJDExJGVUQVJ3VFJrUHhiUzhnVjRCcG9UeGUualB0ZW9vdFplclFyTWUxWWg4SjVNRDN1VFRIRVFx";*/

  /*var myString = "clave";
  var myPassword = "myPassword";
  var encrypted = CryptoJS.AES.encrypt(myString, myPassword);
  encrypted.toString(CryptoJS.enc.Base64);
  document.getElementById('demo1').innerHTML = encrypted;*/

  /*require(["bcrypt"], function(util) {
  });*/

  /*$.ajax({
    url: 'https://lap55.com/json/api/cmd/logusr/test@lap55.com/'+suscriberPassword,
    data: {
      DevicePlatform: "SmartTv",
      DeviceType: "LG TV",
      DeviceUUID: "00000-000011111-11111111",
      DeviceVersion: "com.lap55.leonAP v0.1.1",
    },
    success: function(response) {
      console.log(response);
      if (response.IsSuscribed) {
        suscriberId = response.SuscriberID;
      }
    },
    error: function(response) {
      console.log(response);
    },
    complete: function() {
    }
  }); 
*/
  if(typeof(Storage) !== "undefinded") {
    /*localStorage.setItem('usuario', '5bec56dcb00dc8f');*/
    suscriberId = localStorage.getItem('suscriberId');
    /*console.log(localStorage.getItem('suscriberId'));
    console.log(suscriberId);
    console.log(localStorage.clickcount);*/
  }

  var urlGet = "http://wapi.lap55.com/api/";
  var timeoutAjax = 30;
  var minTime = 2000;
  var defaultTime = 0;
  var plusTime = 0;
  /*var fadeOutTime = defaultTime;
  var fadeInTime = defaultTime + 500;*/
  var timeDelay = 0;
  var fadeFast = "fast";
  var fadeSlow = "slow";
  var idLoaderLogo = "loader-logo";
  var idLoaderSpinner = "loader-spinner";
  var idMenuPrincipal = "menu-principal";
  var idEnVivo = "envivo";
  var idALaCarta = "alacarta";
  var idTemporadas = "temporadas";
  var idVideoALaCarta = "video-alacarta";
  var idRadio = "radio";
  var idRadioView2 = "radio-view-2"
  var idZonaKids = "zonakids";
  var idSectionMusica = "musica";
  var idErrorPage = "error-page";
  var fadeOptions = new Object;



// Get system ID information
  /*var request = webOS.service.request("luna://com.webos.service.sm", {
      method: "deviceid/getIDs",
      parameters: { 
          "idType": ["LGUDID"]        
      },
      onSuccess: function (inResponse) {
          console.log("Result: " + JSON.stringify(inResponse));
          console.log(inResponse.idList[0].idValue);
          UUID = inResponse.idList[0].idValue;
          // To-Do something
      },
      onFailure: function (inError) {
          console.log(inError);
          console.log("Failed to get system ID information");
          console.log("[" + inError.errorCode + "]: " + inError.errorText);
          // To-Do something
          return;
      }
  });*/

// Función para inciar Spatial Navigation
  function iniciarSpatialNavigation() {
    // Se inicia Spatial navigation y se declara el selector ".focusable" para los elementos con focus
      SpatialNavigation.init();
      SpatialNavigation.add({
        selector: '.focusable',
        rememberSource: true,
      });

      // Se declaran los eventos válidos para Spatial Navigation
        var validEvents = [
          'sn:willmove',
          'sn:willunfocus',
          'sn:unfocused',
          'sn:willfocus',
          'sn:focused',
          'sn:enter-down',
          'sn:enter-up',
          'sn:navigatefailed'
        ];

        var eventHandler = function(evt) {
          /*console.log(evt.type, evt.target, evt.detail);*/
        };

        validEvents.forEach(function(type) {
          window.addEventListener(type, eventHandler);
        });

      /*SpatialNavigation.makeFocusable();
      SpatialNavigation.focus();*/
  }



// Función para hacer fade in de las vistas
  function fadeIn(fadeOptions, fadeOutTime, fadeInTime) {
    $('#'+fadeOptions.fadeOutFadeIn).delay().fadeOut("fast");
    $('#'+fadeOptions.fadeInFadeIn).delay().fadeIn("fast");
    SpatialNavigation.pause();
  }

// Función para hacer fade out de las vistas
  function fadeOut(fadeOptions, fadeOutTime, fadeInTime) {
    $('#'+fadeOptions.fadeOutFadeOut).delay(fadeOutTime).fadeOut("fast");
    $('#'+fadeOptions.fadeInFadeOut).delay(fadeInTime).fadeIn("fast");
    if (fadeOptions.clearView != "") {
      document.getElementById(fadeOptions.clearView).innerHTML = "";
    }
    setTimeout(function(){
      SpatialNavigation.focus();
      SpatialNavigation.resume();
      /*console.log("Se hace foco"); */
    }, fadeInTime + 100);
  }

  function fadeOutInicial(fadeOut, fadeIn, fadeOutTime, fadeInTime, vaciarVista) {
    $('#'+fadeOut).delay(fadeOutTime).fadeOut("slow");
    $('#'+fadeIn).delay(fadeInTime).fadeIn("slow");
    setTimeout(function(){
      document.getElementById(vaciarVista).innerHTML = "";
      document.getElementById("top-menu").classList.toggle("mostrar");
      document.getElementById("app").classList.toggle("opacity");
      iniciarSpatialNavigation();
    }, 750);    
  }

// Función para imprimir la hora
  function mueveReloj(){
      momentoActual = new Date();
      hora = momentoActual.getHours();
      minuto = momentoActual.getMinutes();
      segundo = momentoActual.getSeconds();

      horaImprimible = hora + " : " + minuto ;
      /*console.log("La resolución de tu pantalla es: " + screen.width + " x " + screen.height);*/
      /*document.getElementById("reloj").innerHTML = horaImprimible;*/
  }

  setInterval("mueveReloj()", 1000);


var mouseStop = null;
var Time = 25000;

// Funciones que se ejecutan al presionar cualquier tecla
  /*$(document).on('keydown', function() {
    clearTimeout(mouseStop);
    mouseStop = setTimeout(OcultarCatalogoHeader, Time);

    if (fadeOutInfoALaCarta) {
      clearTimeout(fadeOutInfoALaCarta);
      fadeOutInfoALaCarta = setTimeout(desvanecerInfoALaCarta, timeFadeOutInfoALaCarta);
      $(".info-movie-alacarta").removeClass("desvanecer");
      $("#pruebahls_fluid_controls_progress_container").removeClass("desvanecer");
      $("#pruebahls_fluid_controls_container").removeClass("desvanecer");
    }
  });*/

// Función para ocultar el catálogo y el header
  function OcultarCatalogoHeader() {
    if ($("#catalogo").hasClass('ocultarCatalogo') && $("#header").hasClass('ocultarHeader')) {
    }else{
      document.getElementById("catalogo").classList.toggle("ocultarCatalogo");
      document.getElementById("header").classList.toggle("ocultarHeader");
    }
  }

// Función para toggle de catálogo y el header
  function ToggleCatalogoHeader() {
    document.getElementById("catalogo").classList.toggle("ocultarCatalogo");
    document.getElementById("header").classList.toggle("ocultarHeader");
    /*if ($("#catalogo").hasClass('displayCatalogo')) {
      document.getElementById("catalogo").classList.toggle("displayCatalogo");
    }else{
      setTimeout( function() {
        document.getElementById("catalogo").classList.toggle("displayCatalogo");
      }, 1000);
    }*/
  }

  function showTopMenu(){
    if ($("#top-menu").hasClass('mostrar')) {
    }else{
      document.getElementById("top-menu").classList.toggle("mostrar");
      document.getElementById("app").classList.toggle("opacity");
    }
  }

  function hideTopMenu(e){
    if (e.keyCode == 40) {
      document.getElementById("top-menu").classList.toggle("mostrar");
      document.getElementById("app").classList.toggle("opacity");
      return false;
    }
  }

// Función que se ejecuta al cargar la página
  function load(start){
    if (suscriberId) {      
      $('#app').delay().fadeIn("fast");
      fadeOptions.fadeOutFadeIn = idMenuPrincipal;
      fadeOptions.fadeInFadeIn = idLoaderLogo;
      fadeOptions.fadeOutFadeOut = idLoaderLogo;
      fadeOptions.fadeInFadeOut = idMenuPrincipal;
      fadeOptions.clearView = "";
      iniciarSpatialNavigation();
      abrirMenuPrincipal(fadeOptions); 
    }else{
      loadLogin();
    }
  }

  function errorPageBackMenu(fadeOptions){
    abrirMenuPrincipal(fadeOptions); 
  }

  function loadLogin(){
    SpatialNavigation.init();
    SpatialNavigation.add({
      selector: '.focusable',
      rememberSource: true,
    });

    var validEvents = [
      'sn:willmove',
      'sn:willunfocus',
      'sn:unfocused',
      'sn:willfocus',
      'sn:focused',
      'sn:enter-down',
      'sn:enter-up',
      'sn:navigatefailed'
    ];

    SpatialNavigation.makeFocusable();
    SpatialNavigation.focus();
    $('#login-view').delay().fadeIn("fast");
  }