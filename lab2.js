// Show loading screen until ajax call is complete
$(document).ajaxStart(function() {
  $(".load").show();
});

$(document).ajaxStop(function() {
  $(".load").fadeOut();
});

$(document).ready(function() {
  // If Geolocation is enabled go to success function
  // --if not display error message in console & popup
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("error: location not supported");
  }
});

// Get current location coordinates
function success(pos) {
  var crd = pos.coords;
  printWeather(crd.latitude, crd.longitude);
}

function error() {
  alert(
    "You must allow location access to view forecast! Please refresh and allow location access."
  );
}

// Mapquest Request: Used to lookup City, State via lat and long
function printWeather(latitude, longitude) {
  $.ajax({
    url:
      "https://www.mapquestapi.com/geocoding/v1/reverse?key=[API_KEY]&location=" +
      latitude +
      "," +
      longitude +
      "&outFormat=json&thumbMaps=false",
    dataType: "json",
    success: function(parsed_json) {
      var loc =
        "<h1>" +
        parsed_json.results[0].locations[0].adminArea5 +
        ", " +
        parsed_json.results[0].locations[0].adminArea3 +
        "</h1>";
      $(".currloc").html(loc);
    }
  });

  // Dark Sky Requests:
  $.ajax({
    url:
      "https://api.darksky.net/forecast/[API_KEY]/" +
      latitude +
      "," +
      longitude,
    dataType: "jsonp",
    success: function(parsed_json) {
      // Variables for Current Weather
      var temp_f = parsed_json["currently"]["temperature"];
      var summary = parsed_json["currently"]["summary"];
      var humidity = parsed_json["currently"]["humidity"];
      var windspeed = parsed_json["currently"]["windSpeed"];
      var icon = parsed_json["currently"]["icon"];
      var img;

      if (icon == "cloudy") {
        img = "img/cloudy.png";
      }
      if (icon == "clear-day") {
        img = "img/clearday.png";
      }
      if (icon == "clear-night") {
        img = "img/clearnight.png";
      }
      if (icon == "fog") {
        img = "img/fog.png";
      }
      if (icon == "partly-cloudy-night") {
        img = "img/pcn.png";
      }
      if (icon == "partly-cloudy-day") {
        img = "img/pcd.png";
      }
      if (icon == "rain") {
        img = "img/rain.png";
      }
      if (icon == "sleet") {
        img = "img/sleet.png";
      }
      if (icon == "snow") {
        img = "img/snow.png";
      }
      if (icon == "wind") {
        img = "img/wind.png";
      }

      var sumline = "<b>Current Weather:</b> " + summary;
      var templine = "<b>Temperature:</b> " + temp_f + " &deg; F";
      var humline = "<b>Humidity:</b> " + humidity + "%";
      var windline = "<b>Windspeed:</b> " + windspeed + " mph";
      var mainimg = '<img class="weather-icon" src="' + img + '">';

      $(".img1").append(mainimg);
      $(".summl").append(sumline);
      $(".templ").append(templine);
      $(".huml").append(humline);
      $(".windl").append(windline);

      // Variables for hourly & daily weather
      var hourly = parsed_json["hourly"]["summary"];
      var hourlyicon = parsed_json["hourly"]["icon"];
      var daily = parsed_json["daily"]["summary"];
      var dailyicon = parsed_json["daily"]["icon"];
      var img2, img3;

      if (hourlyicon == "cloudy") {
        img2 = "img/cloudy.png";
      }
      if (hourlyicon == "clear-day") {
        img2 = "img/clearday.png";
      }
      if (hourlyicon == "clear-night") {
        img2 = "img/clearnight.png";
      }
      if (hourlyicon == "fog") {
        img2 = "img/fog.png";
      }
      if (hourlyicon == "partly-cloudy-night") {
        img2 = "img/pcn.png";
      }
      if (hourlyicon == "partly-cloudy-day") {
        img2 = "img/pcd.png";
      }
      if (hourlyicon == "rain") {
        img2 = "img/rain.png";
      }
      if (hourlyicon == "sleet") {
        img2 = "img/sleet.png";
      }
      if (hourlyicon == "snow") {
        img2 = "img/snow.png";
      }
      if (hourlyicon == "wind") {
        img2 = "img/wind.png";
      }

      if (dailyicon == "cloudy") {
        img3 = "img/cloudy.png";
      }
      if (dailyicon == "clear-day") {
        img3 = "img/clearday.png";
      }
      if (dailyicon == "clear-night") {
        img3 = "img/clearnight.png";
      }
      if (dailyicon == "fog") {
        img3 = "img/fog.png";
      }
      if (dailyicon == "partly-cloudy-night") {
        img3 = "img/pcn.png";
      }
      if (dailyicon == "partly-cloudy-day") {
        img3 = "img/pcd.png";
      }
      if (dailyicon == "rain") {
        img3 = "img/rain.png";
      }
      if (dailyicon == "sleet") {
        img3 = "img/sleet.png";
      }
      if (dailyicon == "snow") {
        img3 = "img/snow.png";
      }
      if (dailyicon == "wind") {
        img3 = "img/wind.png";
      }

      var hourlyimg = '<img class="weather-icon" src="' + img2 + '">';
      var dailyimg = '<img class="weather-icon" src="' + img3 + '">';

      $(".hourly").append(hourly);
      $(".daily").append(daily);
      $(".img2").append(hourlyimg);
      $(".img3").append(dailyimg);
    }
  });
}
