async function getWeather() {
    const select = document.getElementById("locationSelect");
    const weatherDiv = document.getElementById("weather");

    if (select.value === "") {
        weatherDiv.innerHTML = "⚠ Please select a location.";
        return;
    }

    const [lat, lon] = select.value.split(",");

    try {
        weatherDiv.innerHTML = "⏳ Loading...";

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );

        const data = await response.json();

        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;

        weatherDiv.innerHTML = `
            🌡 Temperature: <b>${temp}°C</b><br>
            💨 Wind Speed: <b>${wind} km/h</b>
        `;

    } catch (error) {
        weatherDiv.innerHTML = "❌ Failed to fetch weather.";
    }
}
