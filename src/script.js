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
minuteOfDay.innerHTML = `${now.getMinutes()}`;
month.innerHTML = `${months[now.getMonth()]}`;
date.innerHTML = `${now.getDate()}`;
year.innerHTML = `${now.getFullYear()}`;

// search function and weather info retrieval
function changeCountry(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  let currentCity = document.querySelector(`#city`);
  currentCity.innerHTML = cityInput.value;


  // api variables
  let apiKey = `866a208a73eeff02182218e9441647a1`;
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.innerHTML}&units=metric&appid=${apiKey}`;
  function changeInformation (response) {
    let currentCity = document.querySelector(`#city`);
    let currentCityTemp = document.querySelector(`#temp`);
    let currentTemp = Math.round(response.data.main.temp);
    let currentDesc = document.querySelector(`#weather`);
    let humidity = document.querySelector(`#humidity`);
    let wind = document.querySelector(`#wind`);

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
        let apiKey = `866a208a73eeff02182218e9441647a1`;
        let apiUrlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        function changeSetLocation(response) {
            let currentCity = document.querySelector(`#city`);
            currentCity.innerHTML = `Current location`;

            let currentCityTemp = document.querySelector(`#temp`);
            let currentTemp = Math.round(response.data.main.temp);
            let currentDesc = document.querySelector(`#weather`);
            let humidity = document.querySelector(`#humidity`);
            let wind = document.querySelector(`#wind`);

            console.log(response.data);
            currentCityTemp.innerHTML = currentTemp;    
            currentDesc.innerHTML = response.data.weather[0].description;
            humidity.innerHTML = response.data.main.humidity;
            wind.innerHTML = response.data.wind.speed;

        }
        axios.get(apiUrlCoords).then(changeSetLocation);
    }   
    navigator.geolocation.getCurrentPosition(getLocation);
}


let citysearch = document.querySelector("#city-search");
citysearch.addEventListener("submit", changeCountry);
let locationSet = document.querySelector(`#location-set`);
locationSet.addEventListener("click",setCountry);


// unit change
function changeToFahrenheit(event) {
    //event.preventDefault(); doesn't work with for some reason
    
    let celsiusButton = document.querySelector(`#celsius`);
    let fahrenheitButton = document.querySelector(`#fahrenheit`);
     
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
    
    let celsiusButton = document.querySelector(`#celsius`);
    let fahrenheitButton = document.querySelector(`#fahrenheit`);
     
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
