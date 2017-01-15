/**
 * Created by gurpreet on 15/01/17.
 */

$(document).ready(function () {
    $('.data')
        .hide()  // Hide it initially
        .ajaxStart(function () {
            $(this).show();
            $("#placeholder").html("Fetching latest results...");
        });
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
                    var humidity = json.main.humidity;
                    var clouds = json.clouds.all;

                    $("#temp").html(temp);
                    $("#humidity").html(humidity);
                    $("#description").html(description);
                    var intensity = 1;
                    if (clouds <= 5) {
                        intensity = 0;
                    } else if (clouds > 5 && clouds < 20) {
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

                    $(".data")
                        .show()
                        .ajaxStop(function () {
                            $(this).hide();
                            $("#placeholder").html(" ");
                        });
                });
        });
    } else {
        $("#test").html("Couldn't get lat long");
    }

});