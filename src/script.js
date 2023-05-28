// date variables
let daysOfWeek = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
let months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
let dayOfWeek = document.querySelector(`#day-of-week`);
let hourOfDay = document.querySelector(`#hour-of-day`);
let minuteOfDay = document.querySelector(`#minute-of-day`);
let month = document.querySelector(`#month`);
let date = document.querySelector(`#day`);
let year = document.querySelector(`#year`);
let now = new Date();

// utc 
let utcWeekday = daysOfWeek[now.getUTCDay()];
let utcMonth = months[now.getUTCMonth()];
let utcDate = now.getUTCDate();
let utcYear = now.getUTCFullYear();
let utcHours = now.getUTCHours();
let utcMins = now.getUTCMinutes();
let utcSecs = now.getUTCSeconds();
console.log(`UTC TIME RIGHT NOW: ${utcWeekday} ${utcMonth} ${utcDate} ${utcYear} ${utcHours}hrs ${utcMins}mins ${utcSecs}secs`);

// date formatting
dayOfWeek.innerHTML = `${daysOfWeek[now.getDay()]}`;
let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}

hourOfDay.innerHTML = hours;
minuteOfDay.innerHTML = minutes;
month.innerHTML = `${months[now.getMonth()]}`;
date.innerHTML = `${now.getDate()}`;
year.innerHTML = `${now.getFullYear()}`;

// unit change
let celsiusButton = document.querySelector(`#celsius`);
let fahrenheitButton = document.querySelector(`#fahrenheit`);
function changeToFahrenheit(event) {
    //event.preventDefault(); doesn't work with for some reason
    
     
    // check if it's already the unit
    if (fahrenheitButton.classList.contains(`clicked`)) {
        alert(`Unit is already set to Fahrenheit.`);
    } else {
        // change button appearance 
        celsiusButton.classList.remove(`clicked`);
        fahrenheitButton.classList.add(`clicked`);

        // change page temp and unit
        let currentCityTemp = document.querySelector(`#temp`);
        currentCityTemp.innerHTML = Math.round((currentCityTemp.innerHTML * (9/5))+32);
        let currentUnit = document.querySelector(`#unit`); 
        currentUnit.innerHTML = `°F`;
    }
}

function changeToCelsius(event) {
    //event.preventDefault(); doesn't work with for some reason
     
    // check if it's already the unit
    if (celsiusButton.classList.contains(`clicked`)) {
        alert(`Unit is already set to Celsius.`);
    } else {
        // change button appearance 
        celsiusButton.classList.add(`clicked`);
        fahrenheitButton.classList.remove(`clicked`);

        // change page temp and unit
        let currentCityTemp = document.querySelector(`#temp`);
        currentCityTemp.innerHTML = Math.round((currentCityTemp.innerHTML - 32) * (5/9));
        let currentUnit = document.querySelector(`#unit`); 
        currentUnit.innerHTML = `°C`;
    }

}
let changeToCelsiusButton = document.querySelector(`#celsius`);
let changeToFahrenheitButton = document.querySelector(`#fahrenheit`);
changeToCelsiusButton.addEventListener(`click`,changeToCelsius);
changeToFahrenheitButton.addEventListener(`click`,changeToFahrenheit);

// search function and weather info retrieval
let apiKey = `866a208a73eeff02182218e9441647a1`;
let currentCity = document.querySelector(`#city`);
let currentCityTemp = document.querySelector(`#temp`);
let currentDesc = document.querySelector(`#weather`);
let humidity = document.querySelector(`#humidity`);
let wind = document.querySelector(`#wind`);
let unit = ``;
function checkUnit(){
    if (celsiusButton.classList.contains(`clicked`)) {
    unit = 'metric';
    console.log(unit);
    } else if (fahrenheitButton.classList.contains(`clicked`)) {
    unit = 'imperial';
    console.log(unit);
    }
    return unit;
}


function changeCountry(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  currentCity.innerHTML = cityInput.value;


  // api variables
  unit = checkUnit();
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.innerHTML}&units=${unit}&appid=${apiKey}`;
  function changeInformation (response) {
    let currentTemp = Math.round(response.data.main.temp);
    

    console.log(response.data);
    currentCity.innerHTML = response.data.name;
    currentCityTemp.innerHTML = currentTemp;
    currentDesc.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = response.data.wind.speed;
  }
  
  axios.get(apiUrlCity).then(changeInformation);
}
function setCountry(event) {
    event.preventDefault();
    function getLocation(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        // api variables
        unit = checkUnit();
        let apiKey = `866a208a73eeff02182218e9441647a1`;
        let apiUrlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
        function changeSetLocation(response) {
            currentCity.innerHTML = `Current location`;

            let currentTemp = Math.round(response.data.main.temp);

            console.log(response.data);
            currentCityTemp.innerHTML = currentTemp;    
            currentDesc.innerHTML = response.data.weather[0].description;
            humidity.innerHTML = response.data.main.humidity;
            wind.innerHTML = response.data.wind.speed;

        }
        axios.get(apiUrlCoords).then(changeSetLocation);
    }   
    navigator.geolocation.getCurrentPosition(getLocation);
    tokyoButton.classList.remove(`clicked`);
    londonButton.classList.remove(`clicked`);
    newyorkButton.classList.remove('clicked');
}


let citysearch = document.querySelector("#city-search");
citysearch.addEventListener("submit", changeCountry);
let locationSet = document.querySelector(`#location-set`);
locationSet.addEventListener("click",setCountry);

// location buttons 
function setTokyo(event) {
  event.preventDefault();
  currentCity.innerHTML = `Tokyo`;

  // api variables
  unit = checkUnit();
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.innerHTML}&units=${unit}&appid=${apiKey}`;
  function changeInformation (response) {
    let currentTemp = Math.round(response.data.main.temp);
    console.log(response.data);
    currentCity.innerHTML = response.data.name;
    currentCityTemp.innerHTML = currentTemp;
    currentDesc.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = response.data.wind.speed;
  }
  
  axios.get(apiUrlCity).then(changeInformation);
  tokyoButton.classList.add(`clicked`);
  londonButton.classList.remove(`clicked`);
  newyorkButton.classList.remove('clicked');
}

function setLondon(event) {
  event.preventDefault();

  
  currentCity.innerHTML = `London`;


  // api variables
  unit = checkUnit();
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.innerHTML}&units=${unit}&appid=${apiKey}`;
  function changeInformation (response) {
    let currentTemp = Math.round(response.data.main.temp);
    console.log(response.data);
    currentCity.innerHTML = response.data.name;
    currentCityTemp.innerHTML = currentTemp;
    currentDesc.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = response.data.wind.speed;
  }
  axios.get(apiUrlCity).then(changeInformation);
  tokyoButton.classList.remove(`clicked`);
  londonButton.classList.add(`clicked`);
  newyorkButton.classList.remove('clicked');
}

function setNewYork(event) {
  unit = checkUnit();
  event.preventDefault();

  
  currentCity.innerHTML = `New York`;


  // api variables
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.innerHTML}&units=${unit}&appid=${apiKey}`;
  function changeInformation (response) {
    let currentTemp = Math.round(response.data.main.temp);
    console.log(response.data);
    currentCity.innerHTML = response.data.name;
    currentCityTemp.innerHTML = currentTemp;
    currentDesc.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = response.data.wind.speed;
  }
  
  axios.get(apiUrlCity).then(changeInformation);
  tokyoButton.classList.remove(`clicked`);
  londonButton.classList.remove(`clicked`);
  newyorkButton.classList.add('clicked');
}

let tokyoButton = document.querySelector(`#tokyo-button`);
let londonButton = document.querySelector(`#london-button`);
let newyorkButton = document.querySelector(`#newyork-button`);
tokyoButton.addEventListener(`click`, setTokyo);
londonButton.addEventListener(`click`, setLondon);
newyorkButton.addEventListener(`click`, setNewYork);



