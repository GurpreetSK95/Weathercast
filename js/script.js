/**
 * Created by gurpreet on 15/01/17.
 */

$(document).ready(function () {

    var measure = "metric";
    $("#fetching_data").css({opacity: 0});

    $("#metric_or_imperial").on("click", function () {
        if (measure === "metric") {
            $("#metric_or_imperial").html("F");
            measure = "imperial";
            fetchJSON();
        }
        else {
            $("#metric_or_imperial").html("C");
            measure = "metric";
            fetchJSON();
        }
    });

    if (navigator.geolocation) {
        fetchJSON();
    } else {
        $("#test").html("Couldn't get lat long");
    }

    function fetchJSON() {
        // $("#fetching_data").css({opacity: 1});
        $("#data_desc").hide();
        $("#data_humidity").hide();
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            // console.log(lat+" "+lon);
            $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat +
                "&lon=" + lon + "&appid=a1ff265d249cc69c1c87939a917d9aef&units=" + measure + "&callback=",
                function (json) {
                    var description = json.weather[0].description;
                    var temp = json.main.temp;
                    var humidity = json.main.humidity;
                    var clouds = json.clouds.all;

                    $("#temp").html(temp + "°");
                    if (measure === "metric")
                        $("#metric_or_imperial").html("C");
                    else
                        $("#metric_or_imperial").html("F");
                    $("#humidity").html(humidity);
                    $("#description").html(description);
                    var intensity = 1;
                    // if (clouds <= 5) {
                    //     intensity = 0;
                    if (clouds >= 0 && clouds < 20) {
                        intensity = 0.2;
                    } else if (clouds >= 20 && clouds < 40) {
                        intensity = 0.4;
                    } else if (clouds >= 40 && clouds < 60) {
                        intensity = 0.6;
                    } else if (clouds >= 60 && clouds < 80) {
                        intensity = 0.8;
                    } else if (clouds >= 80 && clouds <= 100) {
                        intensity = 1;
                    }
                    $(".cloud_data").css({opacity: intensity});
                    $("#data_humidity").show();
                    $("#data_desc").show();
                });
        });
    }

});

