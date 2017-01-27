function mapIreland() {
    "use strict";
    var dublin = {lat: 53.3498, lng: 6.2603};
    
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: dublin,
        map: map
    });
    //marker not working yet.. 
    var marker = new google.maps.Marker({position: dublin, title: 'Hello' });
    
    marker.setMap(map);
}



function checkFunction(checkid, id) {
    console.log(id);
    console.log(checkid);
    if(document.getElementById(checkid).checked) {
        document.getElementById(id).style.display = "block";
    }
    else {
        document.getElementById(id).style.display = "none";
    }
}

function detailed(id, dayNum, destId) {
    console.log("We are in the detailed onclick function");
    console.log(dayNum);
    console.log(destId);
    var detailedInfo, dateTime, cloudiness, seaLevel, rain, windDirection, windSpeed, groundLevel, dayId;
    "use strict";
    //need to store the array placement for each day's 3hour blocks in their own arrays to iterate through later
    //need to somehow link dayNum to the arrays below
    if (dayNum === 0) { 
        dayNum = [0, 1, 2, 3, 4];
        dayId = 1;
    }
    else if (dayNum === 1) {
        dayNum = [5, 6, 7, 8, 9, 10, 11, 12];
        dayId = 2;
    }
    else if (dayNum === 2) {
        dayNum = [13, 14, 15, 16, 17, 18, 19, 20];
        dayId = 3;
    }
    else if (dayNum === 3) {
        dayNum = [21, 22, 23, 24, 25, 26, 27, 28];
        dayId = 4;
    }
    else if (dayNum === 4) {
        dayNum = [29, 30, 31, 32, 33, 34, 35, 36];
        dayId = 5;
    }
    
    function detailedDisplay(detailedInfo) {
        var i, out = "";
        out += "<p id ='detailForecast'>Day " + dayId + " detailed forecast";
        for (i in dayNum) {
            var j = dayNum[i];
            console.log(j);
            dateTime = detailedInfo.list[j].dt_txt;
            cloudiness = detailedInfo.list[j].clouds.all;
            seaLevel = detailedInfo.list[j].main.sea_level;
            //rain = detailedInfo.list[i].rain.3h;
            windDirection = detailedInfo.list[j].wind.deg;
            windSpeed = detailedInfo.list[j].wind.speed;
            groundLevel = detailedInfo.list[j].main.grnd_level;
            out+= "<li><div><p style='text-decoration: underline'>Detailed Forecast<br>"
            + "Date & Time: " + dateTime
            + "</p><p><br>Cloudiness: " + cloudiness 
            + "<br><br>Wind Speed: " + windSpeed
            + "<br><br>Wind Direction: " + windDirection
            + "<br><br>Sea Level: " + seaLevel
            + "<br><br>Ground Level: " + groundLevel
            + "</p></div></li>"
        }
        out += "</p>";
        
        document.getElementById(destId).innerHTML = out;
        checkFunction(id, destId);
        //this doesn't fully work yet - see .README for details
        //if (document.getElementById(destId).style.display = "none") {
            //console.log("display is none - changing to block");
            //document.getElementById(destId).style.display = "block";
        //}
        //else if (document.getElementById(destId).style.display = "block") {
            //console.log("display is block - changing to none");
            //document.getElementById(destId).style.display = "none";
        //}
    }
    
    var xmlhttp2 = new XMLHttpRequest();
    var url = "Detailed.json";
    xmlhttp2.open("GET", url, true);
    xmlhttp2.send();
    
    function processRequest(e) {
        if (xmlhttp2.readyState === 4 && xmlhttp2.status === 200) {
            detailedInfo = JSON.parse(xmlhttp2.responseText);
            console.log(detailedInfo);
            //detailedDisplay(detailedInfo);
            detailedDisplay(detailedInfo);
        }
    }
    
    xmlhttp2.addEventListener("readystatechange", processRequest, false);
}

function subClick() {
    "use strict";
    console.log("hello");
    var frm = document.getElementById("frm1"), days, info, city, basic, minTemp, maxTemp,pressure, humidity, windSpeed, pressureCheckBox, humidityCheckBox, windspeedCheckBox, check, DAYS_ELEMENT, iconCode, iconUrl, pCheckBox;
    DAYS_ELEMENT = 1;
    days = frm.elements[DAYS_ELEMENT].value;

    function weatherDisplay(wInfo) {
        var i, out = "<ul>";
        for (i = 0; i < days; i++) {
            city = wInfo.city.name;
            basic = wInfo.list[i].weather[0].description;
            minTemp = wInfo.list[i].temp.min;
            maxTemp = wInfo.list[i].temp.max;
            pressure = wInfo.list[i].pressure;
            humidity = wInfo.list[i].humidity;
            windSpeed = wInfo.list[i].speed;
            //window.dayId = "day" + i;
            //getting icons to work
            iconCode = wInfo.list[i].weather[0].icon;
            iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
            out +=
                "<li><div><p>" 
                + "Day" + (i + 1) + ": " + city 
                + "<br>" 
                + basic + "<br><img src ='" + iconUrl + "'>" 
                + "<br><br>" 
                + "Min Temp: " + minTemp 
                + "<br>" 
                + "Max Temp: " + maxTemp 
                + "<br><br>" 
                + "<div id=\"container\">Pressure" + "<input onclick = \"checkFunction(\'pressure" + i + "\',\'p" + i + "\')\" id =\"pressure" + i + "\" type =\"checkbox\"><br>"
                + "<p id=\"p" + i + "\" style=\"display:none\">" + pressure + "</p>"
                + "Humidity" + "<input onclick = \"checkFunction(\'humidity" + i + "\',\'h" + i + "\')\" id = \"humidity" + i + "\" type=\"checkbox\"><br>"
                + "<p id=\"h" + i + "\" style=\"display:none\">" + humidity + "</p>"
                + "Wind Speed" + "<input onclick =\"checkFunction(\'windSpeed" + i + "\',\'ws" + i + "\')\" id = \"windSpeed" + i + "\" type=\"checkbox\"><br>"
                + "<p id=\"ws" + i + "\" style=\"display:none\">" + windSpeed + "</p>"
                + "<br>Detailed" + "<input onclick = \"detailed(\'detailed" + i + "\', " + i + ", \'dt" + i + "\')\" id = \"detailed" + i + "\" type=\"checkbox\"><br>"
                //+ "<button onclick = \"detailed(\'btn" + i + "\'," + i + ", \'day" + i + "\')\">Detailed Forecast</button>"onclick =\"checkFunction(\'detailed" + i + "\', \'dt" + i + "\')\"
                + "</div></div></li>";
        }
        out+= "</ul>";
        out += "<ul>";
        for (i = 0; i < days; i++) {
            console.log("we are in the second loop");
            console.log(i);
            out += "<div id=\"dt" + i + "\"><p id=\"day" + i + "\" style=\"display:none\"></p></div>";
        }
        out += "</ul>";
        document.getElementById("id01").innerHTML = out;
    }

    
    var xmlhttp = new XMLHttpRequest();
    var url = "Daily.json";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    function processRequest(e) {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            info = JSON.parse(xmlhttp.responseText);
            console.log(info);
            weatherDisplay(info);
        }
    }
    
    xmlhttp.addEventListener("readystatechange", processRequest, false);
    
}