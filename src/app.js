function dateFormatted(time) {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let actualDay = weekDays[date.getDay()];
  return `${actualDay}   ${hours}:${minutes}`;
}

function dayFormatted(time) {
  let date = new Date(time * 1000);
  let actualDay = date.getDay();
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekDays[actualDay];
}

function showForecast(response){
  let daily = response.data.daily;
  let forecast = document.querySelector("#weekly-forecast");

  let forecastHTML = `<div class="row">`;
  
  daily.forEach(function (day,index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="week-day" id="day">${dayFormatted(day.time)} </div>
          <img src=${day.condition.icon_url} alt=${day.condition.icon}/>
          <span class="degrees"><strong> ${Math.round(
            day.temperature.maximum
          )}° </strong> <em> /${Math.round(
          day.temperature.minimum
        )}° </em> </span>
         </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
  
}

function forecastCall(coordinates) {
  let apiKey = "t33bbb07a7bba4737bfcaf2ca66oea00";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function displayTemp (response){
    
    forecastCall(response.data.coordinates);
    celsiusTemp = Math.round(response.data.temperature.current);
    
    let city = document.querySelector("#city");
    city.innerHTML = response.data.city;

    let temperature = document.querySelector("#temp"); 
    temperature.innerHTML = Math.round(response.data.temperature.current);

    let humid = document.querySelector("#humidity"); 
    humid.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;

    let windSpeed = document.querySelector("#wind");
    windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
    
    let pressure = document.querySelector("#pressure");
    pressure.innerHTML = `Pressure: ${response.data.temperature.pressure}`;
 
    let weather = document.querySelector("#weather-description");
    weather.innerHTML = response.data.condition.description;

    let date = document.querySelector("#date");
    date.innerHTML = dateFormatted(response.data.time * 1000);

    let icon = document.querySelector("#icon1");
    icon.setAttribute(
      "src",
      `${response.data.condition.icon_url}`
      );



  }

function linkF(event) {
  event.preventDefault();
  let fah = document.querySelector("#temp");
  fah.innerHTML = Math.round(celsiusTemp * (9 / 5) + 32);
}
let buttonLink = document.querySelector("#fahrenheit");
buttonLink.addEventListener("click", linkF);


function linkC(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp"); 
  temperature.innerHTML = celsiusTemp;
}
let buttonLink1 = document.querySelector("#celsius");
buttonLink1.addEventListener("click", linkC);


function search (city) {
let apiKey = "t33bbb07a7bba4737bfcaf2ca66oea00";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);   
}


function searchCity (event){
  event.preventDefault();
  let city = document.querySelector("#input-city");
  search(city.value);
}

let celsiusTemp = null;
let buttonClick = document.querySelector("#input-form");
buttonClick.addEventListener("submit", searchCity);

search("Port Elizabeth");
