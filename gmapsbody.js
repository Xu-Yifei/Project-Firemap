//import {getData} from 'raster.js'
//import {colour} from 'raster.js'
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
//export default {
	var map, infoWindow;

	function initMap() {
		var latitude, longitude;
		var myLatLng = {lat: latitude, lng: longitude};

	 	map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 51.397, lng: 257.644},
			zoom: 3.7
	  	});
	  	infoWindow = new google.maps.InfoWindow;

	  	// Try HTML5 geolocation.
	  	if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
		  	var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			infoWindow.setPosition(pos);
			infoWindow.setContent('Location found');
		  	infoWindow.open(map);
		  	map.setCenter(pos);
		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	  	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	  	}

	  	// Update lat/long value of div when anywhere in the map is clicked    
	    google.maps.event.addListener(map,'click',function(event) {                
	        document.getElementById('latclicked').innerHTML = event.latLng.lat();
	        document.getElementById('longclicked').innerHTML =  event.latLng.lng();
	        console.log("Latitude: " + event.latLng.lat());
	        console.log("Longitude: " + event.latLng.lng());
		    
		    getData(event.latLng.lat(),event.latLng.lng()).then(function(citymap) {
		      	// Construct the circle for each value in map.
			    for (var city in citymap) {
			      	// Add the circle for this city to the map.
			      	var cityCircle = new google.maps.Circle({
			        	strokeColor: '#bcbfc4',
			        	strokeOpacity: 0.8,
			        	strokeWeight: 0.8,
			        	fillColor: colour(citymap[city]),
			        	fillOpacity: 0.5,
			        	map: map,
			        	center: citymap[city].center,
			        	radius: 50000
			      	});
			    }
			});
	    });

	}

	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	  	infoWindow.setPosition(pos);
	  	infoWindow.setContent(browserHasGeolocation ?
			'Error: The Geolocation service failed.' :
			'Error: Your browser doesn\'t support geolocation.');
		infoWindow.open(map);
	}
