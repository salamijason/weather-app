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
  console.log(now);

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
  month.innerHTML = `${months[now.getMonth()]}`;
  date.innerHTML = `${now.getDate()}`;
  year.innerHTML = `${now.getFullYear()}`;

  function formatTime (offsetsecs){
    
    offsetHours = ((offsetsecs)/60)/60;
    offsetMins = ((offsetsecs)/60)-(60*Math.floor(offsetHours));

    console.log(offsetMins,offsetHours);
    
    let hours = utcHours+Math.floor(offsetHours);
    if (hours < 0){
      hours = 24+hours;
      dayOfWeek.innerHTML = `${daysOfWeek[now.getDay()-1]}`;
      date.innerHTML = `${now.getDate()-1}`;
    }
    else if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = utcMins+offsetMins;
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    hourOfDay.innerHTML = hours;
    minuteOfDay.innerHTML = minutes;
  }

  function formatDay (timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();

    return daysOfWeek[day];
  }

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
          let currentCityTemp = document.querySelectorAll(`#temp`);
          currentCityTemp.forEach((tempelement) => {
            tempelement.innerHTML = Math.round((tempelement.innerHTML * (9/5))+32);
          });
          let currentUnit = document.querySelectorAll(`#unit`); 
          currentUnit.forEach((unitelement) => {
            unitelement.innerHTML = `°F`;
          });
          
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
          let currentCityTemp = document.querySelectorAll(`#temp`);
          currentCityTemp.forEach((tempelement) => {
            tempelement.innerHTML = Math.round((tempelement.innerHTML - 32) * (5/9));
          });
          
          let currentUnit = document.querySelectorAll(`#unit`); 
          currentUnit.forEach((unitelement) => {
            unitelement.innerHTML = `°C`;
          });
      }

  }
  let changeToCelsiusButton = document.querySelector(`#celsius`);
  let changeToFahrenheitButton = document.querySelector(`#fahrenheit`);
  changeToCelsiusButton.addEventListener(`click`,changeToCelsius);
  changeToFahrenheitButton.addEventListener(`click`,changeToFahrenheit);


// search function and weather info retrieval, icon swapping
  let apiKey = `866a208a73eeff02182218e9441647a1`;
  let currentCity = document.querySelector(`#city`);
  let currentCityTemp = document.querySelector(`#temp`);
  let currentDesc = document.querySelector(`#weather`);
  let humidity = document.querySelector(`#humidity`);
  let wind = document.querySelector(`#wind`);
  let currentMainIcon = document.querySelector(`#main-icon`);
  let unit = ``;
  let dayOrNight = ``;

  // starting page
    // api variables
    unit = checkUnit();
    let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=Cairo&units=${unit}&appid=${apiKey}`;
    axios.get(apiUrlCity).then(changeInformation);

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
    
    axios.get(apiUrlCity).then(changeInformation);
    tokyoButton.classList.remove(`clicked`);
    londonButton.classList.remove(`clicked`);
    newyorkButton.classList.remove('clicked');
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
          currentCity.innerHTML = `Current location`;
          
          axios.get(apiUrlCoords).then(changeInformation);
      }   
      navigator.geolocation.getCurrentPosition(getLocation);
      tokyoButton.classList.remove(`clicked`);
      londonButton.classList.remove(`clicked`);
      newyorkButton.classList.remove('clicked');
  }

 function changeInformation (response) {
    let currentTemp = Math.round(response.data.main.temp);
    console.log(response.data);
    currentCity.innerHTML = response.data.name;
    currentCityTemp.innerHTML = currentTemp;
    currentDesc.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = response.data.wind.speed;

    // correcting time 
    utcOffset = response.data.timezone;
    console.log(utcOffset);
    formatTime (utcOffset);

    //setting icon
    currentMainIcon.setAttribute(`src`,`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    // forecast
    getForecast(response.data.coord);
  }

  function getForecast(coordinates) {
    console.log(coordinates);

    let apiUrlFore = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit}&appid=${apiKey}`;
    
    axios.get(apiUrlFore).then(displayForecast);
  }
  function displayForecast(response) {
    console.log(response.data.daily);
    let forecastElement = document.querySelector(`#forecast`);
   
    let forecastHTML =`<div class="row">`;
    let days = response.data.daily.slice(1,6);
    let dayincrement = 0;
    days.forEach(function(forecastday)  {
      forecastHTML += `
      <div class="col forecastStats">
        <div class="icon">
          <img
            class="icon"
            id="forecast-icon"
            src="https://openweathermap.org/img/wn/${forecastday.weather[0].icon}@2x.png"
            />
            </div>
        <h6 > ${formatDay(forecastday.dt)} </h6>
        <h3 id="temp-and-unit">
          <span id="temp">${Math.round(forecastday.temp.max)}</span>
          <span id="unit">°C</span> /
          <span id="temp">${Math.round(forecastday.temp.min)}</span>
          <span id="unit">°C</span>
        </h3>
        <h6 id="forecast-one-weather">${forecastday.weather[0].description}</h6>
        </div>`;
        dayincrement = dayincrement + 1;
      });
    
    forecastElement.innerHTML= forecastHTML;
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



