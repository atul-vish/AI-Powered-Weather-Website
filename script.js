const apiKey = "64f8ab06e4144853bb581257251803"; // Your API Key

// Fetch weather data based on user input
async function fetchWeather() {
    const location = document.getElementById("location").value;
    if (!location) {
        alert("Please enter a city name!");
        return;
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
            alert("Location not found!");
            return;
        }

        updateUI(data);
        localStorage.setItem("lastLocation", location); // Save last searched location
    } catch (error) {
        alert("Error fetching weather data!");
        console.error(error);
    }
}

// Update the UI with weather data
function updateUI(data) {
    document.getElementById("city-name").innerText = data.location.name + ", " + data.location.country;
    document.getElementById("temperature").innerText = data.current.temp_c;
    document.getElementById("condition").innerText = data.current.condition.text;
    document.getElementById("humidity").innerText = data.current.humidity;
    document.getElementById("wind-speed").innerText = data.current.wind_kph;
    document.getElementById("air-quality").innerText = data.current.air_quality["pm2_5"];

    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.src = "https:" + data.current.condition.icon;
}

// Load last searched location
window.onload = () => {
    const lastLocation = localStorage.getItem("lastLocation");
    if (lastLocation) {
        document.getElementById("location").value = lastLocation;
        fetchWeather();
    }
};
