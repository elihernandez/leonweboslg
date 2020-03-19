window.addEventListener('load', function() {
  	SpatialNavigation.init();
  	SpatialNavigation.add({
    	selector: 'a, .focusable'
  	});
  	SpatialNavigation.makeFocusable();
  	SpatialNavigation.focus();
});

/*window.addEventListener('load', function() {
  	SpatialNavigation.init();
  	SpatialNavigation.add({
    	selector: 'li, .focusable'
  	});
  	SpatialNavigation.makeFocusable();
  	SpatialNavigation.focus();
});*/


document.addEventListener("keydown", function(inEvent){
	var message = "<h1>" + "Keycode is <lg_red>" + inEvent.keyCode + "</lg_red></h1>"+ "</br>";
	document.getElementById("results").innerHTML = message;

	if(inEvent.keyCode == 13){
		document.getElementById("results").innerHTML = "Botón de OK presionado";
	}
});

$(document).ready(function() {

	$('#app').hide();
	$("#contenido").delay(2000).fadeOut("slow");
	$("#app").delay(2500).fadeIn("slow");

	var carousel = document.getElementById('myCarousel');

	$( "#buttonPrev" ).focus(function() {
	  console.log( "Izquierda" );
	  $(".carousel-caption").delay(50).fadeIn("slow");
	});

	$( "#buttonNext" ).focus(function() {
	  console.log( "Derecha" );
	  $(".carousel-caption").delay(50).fadeIn("slow");
	});

	$( "#buttonPrev" ).focusout(function() {
		$(".carousel-caption").delay(50).fadeIn("slow");
		if ($("#buttonNext").is(":focus")){
		}else{
			$(".carousel-caption").delay(50).fadeOut("slow");
		}
	});

	$( "#buttonNext" ).focusout(function() {
		$(".carousel-caption").delay(50).fadeIn("slow");
		if ($("#buttonPrev").is(":focus")){		  	
		}else{
			$(".carousel-caption").delay(50).fadeOut("slow");
		}
	});

	if ($("#buttonPrev").is(":focus") && inEvent.keyCode == 13){	
		console.log("Se presiono el boton de OK en Izquierda");	  	
	}

	if ($("#buttonNext").is(":focus") && inEvent.keyCode == 13){	
		console.log("Se presiono el boton de OK en Izquierda");	  	
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
	        // Do something.
	    }
	    else{
	        console.log("Cursor disappeared");
	        document.getElementById("results").innerHTML = "Cursor disappeared";
	        // Do something.
	    }
	}
	document.addEventListener('cursorStateChange', cursorVisibilityChange, false);
})