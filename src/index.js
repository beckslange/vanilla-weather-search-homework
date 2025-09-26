const apiKey = "tfo33b89af42954f2d60430a801e1b3c";

// Format the current day and time in 12-hour format
function formatDate() {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${day}, ${hours}:${minutes} ${ampm}`;
}

// Fetch weather data
async function getWeather() {
  const city = document.getElementById("city-input").value.trim();
  if (!city) return;

  const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const weatherHTML = `
      <main>
        <div class="weather-app-data">
          <!-- Left Side -->
          <div>
            <h1 class="weather-app-city">${data.city}</h1>
            <div id="date-time">${formatDate()}</div>
            <div class="weather-app-details">
              <div class="wind-speed">💨 <strong>${Math.round(
                data.wind.speed
              )}</strong> mph</div>
              <div class="description">🌤️ ${data.condition.description}</div>
            </div>
          </div>

          <!-- Right Side -->
          <div class="weather-app-temperature-container">
            <span class="weather-app-temperature">${Math.round(
              data.temperature.current
            )}°F</span>
            <img class="weather-app-icon" src="${
              data.condition.icon_url
            }" alt="${data.condition.description}">
          </div>
        </div>
      </main>
    `;

    document.getElementById("weather").innerHTML = weatherHTML;
  } catch (error) {
    document.getElementById("weather").innerHTML = "Error fetching weather.";
  }
}

// Load a default city on page load
window.onload = () => {
  document.getElementById("city-input").value = "New York";
  getWeather();
};
