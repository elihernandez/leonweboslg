var app = new Vue({
  	el : '#app',
  	data : {
    	spotlights : [],
    	menus : [],
    	envivo : [],
    	catalogos : [],
    	peliculas : [],
    	envivo : [],
    	base_url: '<?php echo url('/'); ?>'	    	
    	
  	},
  	computed: {
  	},
	methods: {
  		listSpotlight(){
  			/*var myVar = setInterval(myTimer, 1000);
			function myTimer() {
			 	var d = new Date();
  				console.log(d.toLocaleTimeString());
			}*/
			/*var ip = 10;

			var req = new XMLHttpRequest();
			req.setRequestHeader("Access-Control-Allow-Origin", "*");
			req.setRequestHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
			req.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Accept, x-requested-with");
			req.setRequestHeader("Access-Control-Max-Age", "1728000");
			req.open('GET', 'http://wapi.lap55.com/api/cs/leon_home_spotlight', true);
			req.onreadystatechange = function (aEvt) {
			  if (req.readyState == 4) {
			     if(req.status == 200)
			      console.log(req.responseText);
			     else
			      console.log("Error loading page\n");
			  }
			};
			req.send(null); 


			$.ajax({
			  type: 'GET',
			  url: 'http://wapi.lap55.com/api/cs/leon_home_spotlight',
			  contentType: 'text/plain',

			  xhrFields: {
			    Access-Control-Allow-Credentials: true,
			    withCredentials: false
			  },

			  headers: {
			    Access-Control-Allow-Headers: 
			  },

			  success: function() {
			  },

			  error: function() {
			  }
			});*/
			/*var myHeaders = new Headers({
			  "Content-Type": "text/plain"
			});

			var miInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

            var myRequest = new Request('http://wapi.lap55.com/api/cs/leon_home_spotlight', miInit);

			fetch(miInit)
			.then(function(response) {
			  return response.json();
			}).then(function(data) {
			  console.log(data);
			}).catch(function() {
			  console.log("Booo");
			});*/

  			let me = this;

  			/*;(async () => {
			  const response = await axios({
			    url: 'http://wapi.lap55.com/api/cs/leon_home_spotlight',
			    method: 'get'
			  })

			  me.spotlights = response.data;
			})()*/
  			/*axios.get('http://wapi.lap55.com/api/cs/leon_home_spotlight')
	      	.then(response => {			      		
	      		me.spotlights = response.data;
	      	})
	      	.catch(error => {
	        	console.log(error);
	        })	*/	

	        var xmlHttp = new XMLHttpRequest();
		    xmlHttp.onreadystatechange = function() { 
		        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
		        	console.log(xmlHttp.responseText);
		        	me.spotlights = JSON.parse(xmlHttp.responseText);
		        	console.log(me.spotlights);
		        }
		    }
		    xmlHttp.open("GET", 'http://wapi.lap55.com/api/cs/leon_home_spotlight', false); // true for asynchronous 
		    xmlHttp.send(null);	  		
  		},
  		listMenu(){
  			let me = this;

  			/*;(async () => {
			  const response = await axios({
			    url: 'http://wapi.lap55.com/api/cs/leon_home_bm',
			    method: 'get'
			  })

			  me.menus = response.data;
			})()*/
  			axios.get('http://wapi.lap55.com/api/cs/leon_home_bm')
	      	.then(response => {			      		
	      		me.menus = response.data;
	      	})
	      	.catch(error => {
	        	console.log(error);
	        })		  		
  		},
  		listCatalogo(){
  			let me = this;

  			;(async () => {
			  const response = await axios({
			    url: 'http://wapi.lap55.com/api/cmdata/leon/entplus/5bec56dcb00dc8f',
			    method: 'get'
			  })

			  me.catalogos = response.data;
			  console.log(response.data[0]);
			})()
  		},
  		listEnVivo(){
  			let me = this;

  			;(async () => {
			  const response = await axios({
			    url: 'http://wapi.lap55.com/api/cmdata/leon/livetvplus/5bec56dcb00dc8f',
			    method: 'get'
			  })

			  me.envivo = response.data;
			  console.log(response.data);
			})()
  		},
  		video(menu = []){
  			$("#app").delay(2000).fadeOut("slow");
			$("#video").delay(2500).fadeIn("slow");
  			let me = this;
  			axios.get('http://wapi.lap55.com/api/cmdata/leon/livetvplus/5bec56dcb00dc8f')
	      	.then(response => {			      		
	      		me.envivo = response.data;
	      		console.log(me.envivo);

		        if(Hls.isSupported()) {
				    var vid = document.getElementById('video');
				    var hls = new Hls();
				    hls.loadSource('http://ferrari.lap55.com:8081/ssp/moviez/smil:UnbrokenPathtoRedemption.smil/playlist.m3u8');
				    hls.attachMedia(vid);
				    hls.on(Hls.Events.MANIFEST_PARSED,function() {
				      vid.play();
				  });
				}
	      	})
	      	.catch(error => {
	        	console.log(error);
	        })	
  		},
  		loadeddata(start) {
            var vid = document.getElementById('myVideo');
            vid.currentTime = start;
        },
        verEvento(){
        	console.log("Ver Evento");
        }
	},
	mounted() {
	    this.listSpotlight();
	    /*this.listMenu();*/
	}
})