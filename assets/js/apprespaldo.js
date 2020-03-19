window.addEventListener('load', function() {
  	
});


function load(start){
	$('#app').hide();
	$("#loader").delay(2000).fadeOut("slow");
	$("#app").delay(2500).fadeIn("slow");

	/*document.getElementsByClassName('contContainer').value = 0;*/
	document.getElementsByName('contContainer').value = 0;
	document.getElementsByClassName('contCatalogo').value = 0;
	SpatialNavigation.init();
  	SpatialNavigation.add({
    	selector: '.focusable'
  	});
  	 // All valid events.
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
      console.log(evt.type, evt.target, evt.detail);
    };

    validEvents.forEach(function(type) {
      window.addEventListener(type, eventHandler);
    });

  	SpatialNavigation.makeFocusable();
  	SpatialNavigation.focus();


  	// var request = new XMLHttpRequest();

  	// request.open('GET', 'http://wapi.lap55.com/api/cs/leon_home_spotlight');
  	// request.onload = function() {
  	// 	console.log(this.response);
  	// 	var data = JSON.parse(this.response);

  	// 	if (request.status >= 200 && request.status < 400) {
  	// 		document.getElementById('demo').src = data[0].poster_card_url;
  	// 	}
  	// }

  	// request.send();

  	axios.get('http://wapi.lap55.com/api/cs/leon_home_spotlight')
	  .then(function (response) {
	    // handle success
	    /*document.getElementById('demo').src = response.data[0].poster_card_url;*/
	  })
	  .catch(function (error) {
	    // handle error
	    console.log(error);
	  })
	  .finally(function () {
	    // always executed
	  });


	if(Hls.isSupported())
    {
        var video = document.getElementById('myVideo');
        var hls = new Hls();
        hls.loadSource('http://livestreamcdn.net:1935/AlientoSD/AlientoSD/chunklist_w374514821.m3u8');
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
    
}
setInterval("mueveReloj()", 1000);


function mueveReloj(){
    momentoActual = new Date();
    hora = momentoActual.getHours();
    minuto = momentoActual.getMinutes();
    segundo = momentoActual.getSeconds();

    horaImprimible = hora + " : " + minuto ;
    /*console.log("La resolución de tu pantalla es: " + screen.width + " x " + screen.height);*/
    /*document.getElementById("reloj").innerHTML = horaImprimible;*/
}


	$.getScript('https://luke-chang.github.io/js-spatial-navigation/spatial_navigation.js', function() {
    	$('.focusable')
    		.SpatialNavigation()
      		.focus(function() { $(this).css('outline', ''); })
      		.blur(function() { $(this).css('outline', ''); })
      		.first()
      		.focus();
  	});


/*function focusIcon1(){
	console.log("Pasar foco a icono 2");
	$("#icon-2").focus();
}

function focusIcon2(){
	console.log("Pasar foco a icono 1");
	$("#icon-1").focus();
}*/


document.addEventListener("keydown", function(inEvent){
	
	console.log(inEvent.keyCode);
	if (inEvent.keyCode == 38) {
		document.getElementById('moverArriba').value = 1;
		document.getElementById('moverAbajo').value = 0;
		document.getElementById('moverDerecha').value = 0;
		document.getElementById('moverIzquierda').value = 0;
	}

	if (inEvent.keyCode == 40) {
		document.getElementById('moverArriba').value = 0;
		document.getElementById('moverAbajo').value = 1;
		document.getElementById('moverDerecha').value = 0;
		document.getElementById('moverIzquierda').value = 0;
	}

	if (inEvent.keyCode == 39) {
		document.getElementById('moverArriba').value = 0;
		document.getElementById('moverAbajo').value = 0;
		document.getElementById('moverDerecha').value = 1;
		document.getElementById('moverIzquierda').value = 0;
	}

	if (inEvent.keyCode == 37) {
		document.getElementById('moverArriba').value = 0;
		document.getElementById('moverAbajo').value = 0;
		document.getElementById('moverDerecha').value = 0;
		document.getElementById('moverIzquierda').value = 1;
	}


	if (inEvent.keyCode == 39 && $("#icon3").is(":focus")){	
		document.getElementById("degree--up-0").checked = true;
	}

	if (inEvent.keyCode == 39 && $("#icon6").is(":focus")){	
		document.getElementById("degree--up-1").checked = true;
	}

	if (inEvent.keyCode == 39 && $("#icon9").is(":focus")){	
		document.getElementById("degree--up-2").checked = true;
	}

	if (inEvent.keyCode == 37 && $("#icon7").is(":focus")){	
		document.getElementById("degree--up-3").checked = true;
	}

	if (inEvent.keyCode == 37 && $("#icon4").is(":focus")){	
		document.getElementById("degree--up-4").checked = true;
	}

	if (inEvent.keyCode == 37 && $("#icon1").is(":focus")){	
		document.getElementById("degree--up-5").checked = true;
	}

	/*var message = "<h1>" + "Keycode is <lg_red>" + inEvent.keyCode + "</lg_red></h1>"+ "</br>";
	document.getElementById("results").innerHTML = message;*/

	/*if ($("#buttonPrev").is(":focus") && inEvent.keyCode == 40){	
		console.log("Se dio foco a 'Ver más'");	 
		document.getElementById("text-spotlight").focus(); 	
	}

	if ($("#buttonNext").is(":focus") && inEvent.keyCode == 40){	
		console.log("Se dio foco a 'Ver más'");	  	
		document.getElementById("text-spotlight").focus();
	}*/

	/*if(inEvent.keyCode == 13){
		document.getElementById("menu__active").checked = true;
	}*/

	/*if (inEvent.keyCode == 39 && $("#scrollRight1").is(":focus")){	
		const item1 = document.getElementById("scrollRight1");
		item1.style.webkitTransform = "translateX(-100%)";
		const item2 = document.getElementById("scrollRight2");
		item2.style.webkitTransform = "translateX(-100%)";
		const item3 = document.getElementById("scrollRight3");
		item3.style.webkitTransform = "translateX(-100%)";
		const item4 = document.getElementById("scrollRight4");
		item4.style.webkitTransform = "translateX(-100%)";
		const item5 = document.getElementById("scrollRight5");
		item5.style.webkitTransform = "translateX(-100%)";
	}

	if (inEvent.keyCode == 37 && $("#scrollRight2").is(":focus")){	
		const item1 = document.getElementById("scrollRight1");
		item1.style.webkitTransform = "translateX(0%)";
		const item2 = document.getElementById("scrollRight2");
		item2.style.webkitTransform = "translateX(0%)";
		const item3 = document.getElementById("scrollRight3");
		item3.style.webkitTransform = "translateX(0%)";
		const item4 = document.getElementById("scrollRight4");
		item4.style.webkitTransform = "translateX(0%)";
		const item5 = document.getElementById("scrollRight5");
		item5.style.webkitTransform = "translateX(0%)";
	}*/


	if (inEvent.keyCode == 40 && $("#icon1").is(":focus")){	
		document.getElementById("menu__active").checked = false;
		document.getElementById("degree--up-4").checked = true;
	}

	if (inEvent.keyCode == 40 && $("#icon2").is(":focus")){	
		document.getElementById("menu__active").checked = false;
		document.getElementById("degree--up-4").checked = true;
	}

	if (inEvent.keyCode == 40 && $("#icon3").is(":focus")){	
		document.getElementById("menu__active").checked = false;
		document.getElementById("degree--up-4").checked = true;
	}

	if (inEvent.keyCode == 40 && $("#icon4").is(":focus")){	
		document.getElementById("menu__active").checked = false;
		document.getElementById("degree--up-4").checked = true;
	}

	if (inEvent.keyCode == 40 && $("#icon5").is(":focus")){	
		document.getElementById("menu__active").checked = false;
		document.getElementById("degree--up-4").checked = true;
	}

	if (inEvent.keyCode == 40 && $("#icon6").is(":focus")){	
		document.getElementById("menu__active").checked = false;
		document.getElementById("degree--up-4").checked = true;
	}

	if (inEvent.keyCode == 40 && $("#icon7").is(":focus")){	
		document.getElementById("menu__active").checked = false;
		document.getElementById("degree--up-4").checked = true;
	}

	if (inEvent.keyCode == 40 && $("#icon8").is(":focus")){	
		document.getElementById("menu__active").checked = false;
		document.getElementById("degree--up-4").checked = true;
	}

	if (inEvent.keyCode == 40 && $("#icon9").is(":focus")){	
		document.getElementById("menu__active").checked = false;
		document.getElementById("degree--up-4").checked = true;
	}

	if (inEvent.keyCode == 38 && $("#buttonPrev").is(":focus")){	
		document.getElementById("menu__active").checked = true;
	}

	if (inEvent.keyCode == 37 && $("#section1-firstIcon").is(":focus")){	
		document.getElementById("section1-back").click();
	}

	if (inEvent.keyCode == 39 && $("#section1-lastIcon").is(":focus")){	
		document.getElementById("section1-next").click();
	}

	if (inEvent.keyCode == 37 && $("#section2-firstIcon").is(":focus")){	
		document.getElementById("section2-back").click();
	}

	if (inEvent.keyCode == 39 && $("#section2-lastIcon").is(":focus")){	
		document.getElementById("section2-next").click();
	}

	if (inEvent.keyCode == 37 && $("#section3-firstIcon").is(":focus")){	
		document.getElementById("section3-back").click();
	}

	if (inEvent.keyCode == 39 && $("#section3-lastIcon").is(":focus")){	
		document.getElementById("section3-next").click();
	}

	if (inEvent.keyCode == 38 && $("#section1-firstIcon").is(":focus")){	
		document.getElementById("categoria1-next").click();
	}

	if (inEvent.keyCode == 40 && $("#section2-").is(":focus")){	
		document.getElementById("section3-next").click();
	}

});

$('.scrollRight').on('sn:willmove', function () {
	var containerParentId = $(this).parent().attr('id');
	var containerParent = '#'.concat($(this).parent().attr('id'));

	var catalogoParent = '#'.concat($(this).parent().parent().attr('id'));
	console.log(containerParent);
	console.log(catalogoParent);

	$(containerParent).children('.contContainer').each(function () {
		var num = 0;
		var contNumberContainer = parseFloat(document.getElementById($(this).attr('id')).value);
		console.log(contNumberContainer);

		/*if (document.getElementById('moverArriba').value == 0) {
			num = contNumberContainer - 100;	
			document.getElementById($(this).attr('id')).value = num;
			$(catalogoParent).children('.scrollDown').each(function () {
				var item = document.getElementById($(this).attr('id'));
				var translateY = "translateY(".concat(num).concat('%)');
				item.style.WebkitTransform = translateY;
			});
		}

		if (document.getElementById('moverAbajo').value == 0) {
			num = contNumberContainer + 100;
			document.getElementById($(this).attr('id')).value = num;
			$(catalogoParent).children('.scrollDown').each(function () {
				var item = document.getElementById($(this).attr('id'));
				var translateY = "translateY(".concat(num).concat('%)');
				item.style.WebkitTransform = translateY;
			});	
		}*/

		if (document.getElementById('moverDerecha').value == 1) {
			num = contNumberContainer - 100;	
			document.getElementById($(this).attr('id')).value = num;
			$(containerParent).children('.scrollRight').each(function () {
				var item = document.getElementById($(this).attr('id'));
				var translateX = "translateX(".concat(num).concat('%)');
				item.style.WebkitTransform = translateX;
			});
		}

		if (document.getElementById('moverIzquierda').value == 1) {
			num = contNumberContainer + 100;	
			document.getElementById($(this).attr('id')).value = num;
			$(containerParent).children('.scrollRight').each(function () {
				var item = document.getElementById($(this).attr('id'));
				var translateX = "translateX(".concat(num).concat('%)');
				item.style.WebkitTransform = translateX;
			});
		}

	});
})

/*$(document).ready(function() {
	var carousel = document.getElementById('myCarousel');

	if ($("#buttonPrev").is(":focus") && inEvent.keyCode == 40){	
		console.log("Se dio foco a 'Ver más'");	  	
	}

	if ($("#buttonNext").is(":focus") && inEvent.keyCode == 40){	
		console.log("Se dio foco a 'Ver más'");	  	
	}

	window.addEventListener("blur", function() { 
    	console.log("Focus off");
    }, false);
    window.addEventListener("focus", function() { 
    	console.log("Focus on");
    	document.getElementById("buttonNext").focus();
    }, false);

	function cursorVisibilityChange(event) {
	    var visibility = event.detail.visibility;
	    if(visibility){
	        console.log("Cursor appeared");
	        document.getElementById("results").innerHTML = "Cursor appeared";
	    }
	    else{
	        console.log("Cursor disappeared");
	        document.getElementById("results").innerHTML = "Cursor disappeared";
	    }
	}
	document.addEventListener('cursorStateChange', cursorVisibilityChange, false);
})*/


