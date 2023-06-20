function formatDate(time) {
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
    date.innerHTML = formatDate(response.data.time * 1000);

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
//let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
let apiKey = "t33bbb07a7bba4737bfcaf2ca66oea00";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=t33bbb07a7bba4737bfcaf2ca66oea00&units=metric`;
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