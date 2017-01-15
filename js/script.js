/**
 * Created by gurpreet on 15/01/17.
 */

$(document).ready(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            // console.log(lat+" "+lon);
            $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat +
                "&lon=" + lon + "&appid=a1ff265d249cc69c1c87939a917d9aef&units=metric&callback=",
                function (json) {
                    var description = json.weather[0].description;
                    var temp = json.main.temp;
                    var pressure = json.main.pressure;
                    var humidity = json.main.humidity;
                    var temp_min = json.main.temp_min;
                    var temp_max = json.main.temp_max;
                    var wind_speed = json.wind.speed;
                    var wind_direction = json.wind.deg;
                    $("#test").html(description + " " + temp + " " + wind_direction + " " + wind_speed + " " + humidity);
                });
        });
    } else {
        $("#test").html("Couldn't get lat long");
    }
});