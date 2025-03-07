let input = document.querySelector("#input-value");
let searchBtn = document.querySelector("#search-btn");
let cName = document.querySelector("#name");
let country = document.querySelector("#country");
let area = document.querySelector(".area-container");
let time = document.querySelector("#time");
let temp = document.querySelector("#temp");
let tempTime = document.querySelector(".temp-time");
let text = document.querySelector("#text");
let icon = document.querySelector("#icon");
let gps = document.querySelector("#gps");
let curTime = document.querySelector("#current-time");
let toggleCont = document.querySelector("#toggle-container");
let toggleBtn = document.querySelector(".light-mode");
let body = document.querySelector("body");
let secCont = document.querySelector(".secondry-container");
let timeContainer = document.querySelector(".time-container");
let contentCont = document.querySelector(".content-container");
let isDay = document.querySelector("#day");



// WHEATHER API LOGIC#################################
async function weatherDetail(location) {
    let promise1 = await fetch(`http://api.weatherapi.com/v1/current.json?key=8bc0a6a835854df5926110236241305&q=${location}&aqi=yes`);
    let promise2 = await promise1.json();
    cName.innerText =  `${promise2.location.name}-${promise2.location.region}`;
    country.innerText = promise2.location.country;
    time.innerText = "Time: " + promise2.location.localtime;
    temp.innerText = "Temp: "+promise2.current.temp_c + "°C";
    text.innerText = promise2.current.condition.text;
    icon.src = promise2.current.condition.icon;

    let dayValue = promise2.current.is_day;
    if(dayValue == "1") {
    isDay.innerText = "Day☀️";
    }else {
    isDay.innerText = "Night🌙"
    }
}

searchBtn.addEventListener("click", async () => {
    let location = await input.value;
    weatherDetail(location);
    area.style.fontSize = "1.9rem";
    tempTime.style.fontSize = "1.8rem"
    input.value = "";
});

// KEYBOARD ENTER KEY LOGIC#########################
input.addEventListener("keyup", async (e) => {
    if(e.keyCode == "13"){
        let location = await input.value;
        weatherDetail(location);
        area.style.fontSize = "1.9rem";
        tempTime.style.fontSize = "1.8rem"; 
        input.value = "";    
    }
});


// GPS PART LOGIC########################################
async function gpsLocation(lat, long) {
    let promiseGps1 = await fetch(`http://api.weatherapi.com/v1/current.json?key=8bc0a6a835854df5926110236241305&q=${lat},${long}&aqi=yes`);
    let promiseGps2 = await promiseGps1.json();
    cName.innerText =  `${promiseGps2.location.name}-${promiseGps2.location.region}`;
    country.innerText = promiseGps2.location.country;
    time.innerText = "Time: " + promiseGps2.location.localtime;
    temp.innerText = "Temp: "+promiseGps2.current.temp_c + "°C";
    text.innerText = promiseGps2.current.condition.text;
    icon.src = promiseGps2.current.condition.icon;

    let dayValue = promiseGps2.current.is_day;
    if(dayValue == "1") {
    isDay.innerText = "Day☀️";
    }else {
    isDay.innerText = "Night🌙"
    }
}

async function getCords(position) {
   await gpsLocation(position.coords.latitude , position.coords.longitude);
} 
function failed() {
    alert("Unable to fetch location, Please try manually");
}


gps.addEventListener("click", async () => {
    navigator.geolocation.getCurrentPosition(getCords, failed);
});


setInterval(function showTime() {
    let currentTime = new Date();
    let time = `Current Time: ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
    curTime.innerText = time;
},1000);



// LIGHT MODE-DARK MODE LOGIC############################
if(localStorage.getItem("mode") === "dark") {
    body.classList.add("dark");
    toggleCont.style.backgroundColor = "#121212";
    toggleBtn.classList.toggle("dark-mode");
    secCont.style.backgroundColor = "rgb(74, 93, 122";
    secCont.style.color = "aliceblue";
    toggleBtn.innerHTML= `<i class="fa-solid fa-moon"></i>`;
    timeContainer.style.backgroundColor = "rgb(133, 132, 132)";
    contentCont.style.color = "white";
}

toggleCont.addEventListener("click", () => {
    toggleCont.style.backgroundColor = "#121212";
    toggleBtn.classList.toggle("dark-mode");
    body.classList.toggle("dark");
    secCont.style.backgroundColor = "rgb(74, 93, 122";
    secCont.style.color = "aliceblue";
    toggleBtn.innerHTML= `<i class="fa-solid fa-moon"></i>`;
    toggleBtn.style.textShadow = "green";
    timeContainer.style.backgroundColor = "rgb(133, 132, 132)";
    contentCont.style.color = "white";
    let pageMode = localStorage.getItem("mode");
    if(pageMode === "light" || pageMode === null){
        localStorage.setItem("mode", "dark")
    }else {
        localStorage.setItem("mode", "light");
        toggleBtn.innerHTML= `<i class="fa-solid fa-sun">`;
        timeContainer.style.backgroundColor = "rgb(236, 234, 234)"
        toggleCont.style.backgroundColor = "white";
        secCont.style.backgroundColor = "aliceblue";
        contentCont.style.color = "black";
    }
});












