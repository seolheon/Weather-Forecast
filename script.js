function getWeather() {
  const locationInput = document.getElementById("locationInput").value;
  const apiKey = "e6de559c265d2daea172de2be63e0aa9";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              displayError();
          }
          return response.json();
      })
      .then(data => {
          displayWeather(data);
          hideError();
      })
}

function displayWeather(data) {
  const weatherInfo = document.querySelector(".weather");
  const tempElement = document.getElementById("temp");
  const cityElement = document.querySelector(".city");
  const humidityElement = document.querySelector(".humidity");
  const windSpeedElement = document.querySelector(".wind-speed");

  tempElement.textContent = `${data.main.temp}°C`;
  cityElement.textContent = `${data.name}, ${data.sys.country}`;

  if (data.main.humidity !== undefined) {
      humidityElement.textContent = `${data.main.humidity}%`;
      humidityElement.parentNode.parentNode.style.display = "flex";
  } else {
      humidityElement.parentNode.parentNode.style.display = "none";
  }

  if (data.wind.speed !== undefined) {
      windSpeedElement.textContent = `${data.wind.speed} m/s`;
      windSpeedElement.parentNode.parentNode.style.display = "flex";
  } else {
      windSpeedElement.parentNode.parentNode.style.display = "none";
  }

  weatherInfo.style.display = "block";
}


function displayError() {
  const errorElement = document.querySelector(".err");
  const okButton = errorElement.querySelector("button");
  errorElement.style.display = "block";
  okButton.addEventListener("click", function() {
      hideError()
  });
}

function hideError() {
  const errorElement = document.querySelector(".err");
  errorElement.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.querySelector(".btn");
  searchButton.addEventListener("click", getWeather);
});
