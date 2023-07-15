const apiKey = "5ea49a6af93ab7f9f1803900024953ce";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
  try {
    const resp = await fetch(url(city), {
      mode: "cors",
    });

    if (!resp.ok) {
      throw new Error("Network response was not ok.");
    }

    const respData = await resp.json();

    if (!respData.main || !respData.main.temp) {
      throw new Error("Temperature data not available in the API response.");
    }

    addWeatherToPage(respData);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    // Handle the error or display an error message on the page
  }
}

function addWeatherToPage(data) {
  const temp = Ktoc(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
    <h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      ${temp}°C
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    </h2>
    <small>${data.weather[0].main}</small>
  `;

  // cleanup
  main.innerHTML = "";
  main.appendChild(weather);
}

function Ktoc(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value.trim(); // Trim the city name to remove leading/trailing spaces

  if (city) {
    getWeatherByLocation(city);
  } else {
    console.error("City name is empty.");
    // Handle the case when the user did not enter a city name
  }
});
