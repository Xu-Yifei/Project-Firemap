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
				fire_index: score,
				display_weather: weather.weather.[1],
				display_temp: weather.main.temp - 273.15,
				display_humidity: weather.main.humidity,
				display_windspeed: weather.wind.speed
			}
		};
	})
	.then(function(location){
		document.getElementById('weather').innerHTML = location.display_temp;
		console.log(location.display_temp);
		return location;
	})
	.catch(function(error) {
		console.log(error);
		/* error :( */
	});
}

/*function display (location) {
	document.getElementById('weather').innerHTML = location.fire_index;
	console.log(location.display_weather);
}*/

function colour (location) {
	// calculates the colour of each location based on the fire index
	if (location.fire_index <= 5) {
		return '#F7F7F7';
	}
	else if (location.fire_index <= 7.5) {
		return 'ffff70';
	}
	else if (location.fire_index <= 10) {
		return '#FFFF24';
	}
	else if (location.fire_index <= 12.5) {
		return '#ffd83d';
	}
	else if (location.fire_index <= 15) {
		return '#F5C400';
	}
	else if (location.fire_index <= 17.5) {
		return '#ffaf11';
	}
	else if (location.fire_index <= 20) {
		return '#F58F00';
	}
	else if (location.fire_index <= 25) {
		return '#ff5400';
	}
	else if (location.fire_index <= 30) {
		return '#ff2a00';
	}
	else if (location.fire_index <= 40) {
		return '#FF0000';
	}
	else if (location.fire_index <= 50) {
		return '#c1000d';
	}
	else if (location.fire_index <= 60) {
		return '#620007';
	}
	else if (location.fire_index <= 75) {
		return '#45002f';
	}
	else if (location.fire_index <= 90) {
		return '#450045';
	}
	else {
		return '#000000';
	}
}
