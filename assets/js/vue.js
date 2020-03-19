var app = new Vue({
  	el : '#app',
  	data : {
    	spotlights : [],
    	menus : [],
    	envivo : [],
    	catalogo : [],
    	peliculas : [],
    	envivo : [],
    	base_url: '<?php echo url('/'); ?>'	    	
    	
  	},
  	computed: {
  	},
	methods: {
  		listSpotlight(){
  			let me = this;

	        var xmlHttp = new XMLHttpRequest();
		    xmlHttp.onreadystatechange = function() { 
		        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
		        	console.log(xmlHttp.responseText);
		        	me.spotlights = JSON.parse(xmlHttp.responseText);
		        	console.log(me.spotlights);
		        }
		    }
		    xmlHttp.open("GET", 'http://wapi.lap55.com/api/cs/leon_home_spotlight', false); 
		    xmlHttp.send(null);	  		
  		},
      listEnvivo(){
        let me = this;
        var request = new XMLHttpRequest();

        request.open('GET', 'http://wapi.lap55.com/api/cmdata/leon/livetvplus/5bec56dcb00dc8f');
        request.onload = function() {          
          if (request.status >= 200 && request.status < 400) {
            me.catalogo = JSON.parse(this.response);
            console.log(me.catalogo);
            document.getElementById('demo').src = data[0].poster_card_url;
          }
        }

        request.send();

        /*let me = this;
        var request = new XMLHttpRequest();

        request.open('GET', 'http://wapi.lap55.com/api/cs/leon_home_spotlight');
        request.onload = function() {          
          if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(this.response);
            document.getElementById('demo').src = data[0].poster_card_url;
          }
        }

        request.send();*/
      }
	},
	mounted() {
	    this.listEnvivo();      
	}
})