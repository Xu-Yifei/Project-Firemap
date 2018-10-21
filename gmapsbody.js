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
        document.getElementById('coordinates').innerHTML = "Coordinates: " + event.latLng.lat() + ", " + event.latLng.lng();

	    
	    getData(event.latLng.lat(),event.latLng.lng()).then(function(citymap) {
	      	// Construct the circle for each value in map.
		    for (var city in citymap) {
		      	// Add the circle for this city to the map.
		      	var cityCircle = new google.maps.Circle({
		        	strokeColor: 555555,
		        	strokeOpacity: 0.8,
		        	strokeWeight: 0.35,
		        	fillColor: colour(citymap[city]),
		        	fillOpacity: 0.35,
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
