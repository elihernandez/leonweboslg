  var suscriberId = "";
  var UUID = "";

  // INIT
 /* var myString = "clave";
  var words = CryptoJS.enc.Base64.parse("clave");
  var base64 = CryptoJS.enc.Base64.stringify(words);
  console.log(words); */

  // PROCESS
  // var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
  // var decrypted = CryptoJS.AES.decrypt(encrypted, myPassword);

  /*console.log(myString);*/
  /*console.log(encrypted);*/
  /*console.log(decrypted);
  console.log(decrypted.toString(CryptoJS.enc.Utf8));*/ 

  function showLoginForm(e) {
    if (e.keyCode == 13) {
      $("#login-view .info").addClass("fadeOut");
      $("#login-view .form-login").addClass("fadeIn");
      $(".form-login #username").focus();
    } 
  }

  function showRegisterInfo(e) {
    if (e.keyCode == 13) {
      $("#login-view .info").addClass("fadeOut");
      $("#login-view .register-info").addClass("fadeIn");
      /*$(".form-login #username").focus();*/
    } 
  }

  $(".undo-button").on('sn:enter-down', function(){
    $("#login-view .info").removeClass("fadeOut");
    $("#login-view .form-login").removeClass("fadeIn");
  })

  $(".register-info .undo-button").on('sn:enter-down', function(){
    $("#login-view .info").removeClass("fadeOut");
    $("#login-view .register-info").removeClass("fadeIn");
  })

  $(".login").on('sn:enter-down', function(){
    var username = document.getElementById('username').value;
    /*var password = document.getElementById('password').value;*/
    var password = "clave";
    suscriberPassword = "";
    var salt = gensalt(8);
    function result(newhash){
      suscriberPassword = btoa(newhash);
      console.log(suscriberPassword);      
    }
    hashpw(password, salt, result, function() {
    });

    setTimeout(function(){
      $.ajax({
        /*url: 'https://lap55.com/json/api/cmd/logusr/test@lap55.com/JDJhJDExJGVUQVJ3VFJrUHhiUzhnVjRCcG9UeGUualB0ZW9vdFplclFyTWUxWWg4SjVNRDN1VFRIRVFx',*/
        url: 'https://lap55.com/json/api/cmd/logusr/'+username+'/'+suscriberPassword,
        // data: "DevicePlatform=SmartTv&DeviceType=LG TV&DeviceUUID=00000-000011111-11111111&DeviceVersion=com.lap55.leonAP v0.1.1",
        data: {
          DevicePlatform: "SmartTv",
          DeviceType: "LG TV",
          DeviceUUID: "00000-000011111-11111111",
          DeviceVersion: "com.lap55.leonAP v0.1.1",
        },
        async: false,
        crossDomain: true,
        success: function(response) {
          console.log(response);
          if (response.IsSuscribed) {
            suscriberId = response.SuscriberID;

            localStorage.setItem('suscriberId', suscriberId);
            suscriberId = localStorage.getItem('suscriberId');
            localStorage.clickcount = 1;

            $('#login-view').delay().fadeOut("fast");
            $('#app').delay().fadeIn("fast");
            fadeOptions.fadeOutFadeIn = idMenuPrincipal;
            fadeOptions.fadeInFadeIn = idLoaderLogo;
            fadeOptions.fadeOutFadeOut = idLoaderLogo;
            fadeOptions.fadeInFadeOut = idMenuPrincipal;
            fadeOptions.clearView = "";
            iniciarSpatialNavigation();
            abrirMenuPrincipal(fadeOptions); 
          }
        },
        error: function(response) {
          console.log(response);
        },
        complete: function() {
        }
      }); 

    }, 7000);

    console.log(username);
    console.log(password);

  });