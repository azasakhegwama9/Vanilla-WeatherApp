function formatDate(timestamp) {
    let date = new Date();
    let hours = date.getHours();
    if (hours < 10 ) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[date.getDay()];
    return `${day}   ${hours}:${minutes}`;
}

function displayTemp (response){
    let city = document.querySelector("#city");
    city.innerHTML = response.data.name;

    let temperature = document.querySelector("#temp"); 
    temperature.innerHTML = Math.round(response.data.main.temp);

    let humid = document.querySelector("#humidity"); 
    humid.innerHTML = `Humidity: ${response.data.main.humidity}%`;

    let windSpeed = document.querySelector("#wind");
    windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
    
    let pressure = document.querySelector("#pressure");
    pressure.innerHTML = `Pressure: ${(response.data.main.pressure)}`;
 
    let weather = document.querySelector("#weather-description");
    weather.innerHTML = response.data.weather[0].description;

    let date = document.querySelector("#date");
    date.innerHTML = formatDate(response.data.dt * 1000);

    let icon = document.querySelector("#icon1");
    icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function search (city) {
let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);   
}


function searchCity (event){
  event.preventDefault();
  let city = document.querySelector("#input-city");
  search(city.value);
  console.log(city.value);
}

search("Port Elizabeth");

let buttonClick = document.querySelector("#input-form");
buttonClick.addEventListener("submit", searchCity);