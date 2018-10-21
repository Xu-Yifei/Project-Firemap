		function calculator () {
			var weather;
			var score;
			var latitude = 34.5764337;
			var longitude = -120.4491638;
			// Write most of your code here, because you can only run the code AFTER the API has retrieved data
			axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=e5d2334fc57b0005a1abcf1638be18a0').then(function(response) {
				weather = response.data;
				console.log(response.data);

				// The formula for a location's "fire likelihood"
			 	score = 10 * Math.exp(Math.log(2) - 0.45 - 0.0345 * weather.main.humidity + 0.0338 * (weather.main.temp - 273.15) + 0.0234 * (weather.wind.speed * 36 / 10));

			 	// Display it in console
				return score;
			});
			// https://api.openweathermap.org/data/2.5/weather?lat=51.077299&lon=-114.0576971$appid=e5d2334fc57b0005a1abcf1638be18a0
			// e5d2334fc57b0005a1abcf1638be18a0
		}
