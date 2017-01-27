function subClick() {
    var days = document.getElementById("frm1");
    var xmlhttp = new XMLHttpRequest();
    var url = "Daily.json";
    var response, basic, minTemp, maxTemp, pressure, humidity, windSpeed, city, i;
    //create event handler
    function processRequest(e) {
        "use strict";
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            response = JSON.parse(xmlhttp.responseText);
            console.log(response);
            city = response.city.name;
            basic = response.list[0].weather[0].description;
            minTemp = response.list[0].temp.min;
            maxTemp = response.list[0].temp.max;
            pressure = response.list[0].pressure;
            humidity = response.list[0].humidity;
            windSpeed = response.list[0].speed;
            weatherDisplay(days);
        }
    };

xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.addEventListener("readystatechange", processRequest, false);

function weatherDisplay(days) {
    "use strict";
    var out = "", i;
    for (i = 0; i < days.length;i++) {
        out += "<div><p>" + "Day " + (i+1) + "</p><p>" + city + "</p><br><p>" + basic + "</p><br><p>" + "Minimum Temperature: " + minTemp + "</p><br><p>" + "Maximum Temperature: " + maxTemp + "</p><br></div>";
    }
    document.getElementById("id01").innerHTML = out;
};
}