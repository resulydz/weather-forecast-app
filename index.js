const apikey = "592652706359d4bf42a16be745d4aaf7";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

const description_translate = {
    'clear sky': 'Açık hava',
    'sunny': 'Güneşli',
    'partly cloudy': 'Parçalı bulutlu',
    'mostly cloudy': 'Çoğunlukla bulutlu',
    'overcast clouds': 'Çok bulutlu',
    'cloudy': 'Bulutlu',
    'few clouds': 'Az bulutlu',
    'scattered clouds': 'Dağınık bulutlu',
    'broken clouds': 'Parçalı bulutlu',
    'rain': 'Yağmurlu',
    'light rain': 'Hafif yağmurlu',
    'heavy intensity rain': 'Şiddetli yağmur',
    'showers': 'Sağanak yağış',
    'thunderstorm': 'Fırtına',
    'snow': 'Karlı',
    'fog': 'Sisli',
  };
  

formEl.addEventListener("submit", (event) => {
    event.preventDefault(); //submit'den sonra yenilememesini sağlar
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // const temperature = Math.round(data.main.temp);

        // const description = data.weather[0].description;

        // const icon = data.weather[0].icon;

        // const details = [
        //     `Hissedilen: ${Math.round(data.main.feels_like)}`,
        //     `Nem: ${data.main.humidity}`,
        //     `Rüzgar hızı: ${data.wind.speed}`,
        // ];

        // weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon"/>`;

        // weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;

        // weatherDataEl.querySelector(".description").textContent = `${description}`;

        // for (let index = 0; index < details.length; index++) {
        //     weatherDataEl.querySelector(".details").innerHTML = 
        //     details.map((detail) => `<div>${detail}</div>`).join("");
        // }

        weatherDataEl.innerHTML = `
            <div class="main-card">
                <div class="icon">
                    <img
                        src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"
                        alt="Weather Icon"
                    />
                </div>
                <div class="city">${data.name}</div>
                <div class="temperature">${Math.round(data.main.temp)}°C</div>
                <div class="description">${description_translate[data.weather[0].description]} </div>
            </div>
            <div class="details">
                <div>Hissedilen:  ${data.main.feels_like} °C</div>
                <div>Nem: ${data.main.humidity}%</div>
                <div>Rüzgar hızı: ${data.wind.speed} m/s</div>
            </div> 
        `;
        
    } catch (error) {
        weatherDataEl.innerHTML = `<p style="font-size: 2rem;">Sonuç bulunamadı!</p>`;
    }
}
