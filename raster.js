
    var weather;
    var score;

function getData(latitude, longitude) {
    return axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=e5d2334fc57b0005a1abcf1638be18a0')
    .then(function(response) {
      weather = response.data;
    })
    .then(function() {
      score = 10 * Math.exp(Math.log(2) - 0.45 - 0.0345 * weather.main.humidity + 0.0338 * (weather.main.temp - 273.15) + 0.0234 * (weather.wind.speed * 36 / 10));
      console.log(score);
      return score;
      /* do something with the result */
    })
    .then(function(score) {
      return {
        location: {
          center: {lat: latitude, lng: longitude},
          fire_index: score
        }
      };
    })
    .catch(function(error) {
      console.log(error);
      /* error :( */
    });
  }

  function colour (location) {
    // calculates the colour of each location based on the fire index
    if (location.fire_index <= 5) {
      return '#F7F7F7';
    }
    else if (location.fire_index <= 10) {
      return '#FFFF24';
    }
    else if (location.fire_index <= 15) {
      return '#F5C400';
    }
    else if (location.fire_index <= 20) {
      return '#F58F00';
    }
    else if (location.fire_index <= 25) {
      return '#FF0000';
    }
    else if (location.fire_index <= 50) {
      return '#620007';
    }
    else if (location.fire_index <= 75) {
      return '#450045';
    }
    else {
      return '#000000';
    }
  }

  function initMap() {
    // Create the map.
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: {lat: 37.090, lng: -95.712},
      mapTypeId: 'terrain'
    });

    getData(latitude, longitude).then(function(citymap) {
      // Construct the circle for each value in map.
    for (var city in citymap) {
      // Add the circle for this city to the map.
      var cityCircle = new google.maps.Circle({
        strokeColor: colour(citymap[city]),
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

  }
