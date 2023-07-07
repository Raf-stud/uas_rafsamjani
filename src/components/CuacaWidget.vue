<template>
  <div class="cuaca">
    <h2 class="widget-title">Widget Cuaca</h2>
    <div class="location-input">
      <label for="location">Masukkan Lokasi:</label>
      <input type="text" id="location" v-model="location" />
      <button @click="fetchWeatherData">Dapatkan Cuaca</button>
    </div>
    <div v-if="weatherData" class="weather-data">
      <p class="location">Lokasi: {{ weatherData.name }}</p>
      <p v-if="weatherData.main" class="temperature">
        Suhu: {{ weatherData.main.temp }}°C
      </p>
      <p v-if="weatherData.weather" class="description">
        Deskripsi: {{ getWeatherDescription(weatherData.weather[0].icon) }}
      </p>
    </div>
    <p v-else>Loading weather data...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: '',
      weatherData: null
    };
  },
  methods: {
    async fetchWeatherData() {
      try {
        const apiKey = 'b7bfca7b27a3485144fea086c50d09dc';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        this.weatherData = data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    },
    getWeatherDescription(icon) {
      // Mapping antara kode ikon cuaca dengan deskripsi bahasa Indonesia
      const weatherDescriptions = {
        '01d': 'Cerah',
        '01n': 'Cerah',
        '02d': 'Cerah Berawan',
        '02n': 'Cerah Berawan',
        '03d': 'Berawan',
        '03n': 'Berawan',
        '04d': 'Berawan',
        '04n': 'Berawan',
        '09d': 'Hujan',
        '09n': 'Hujan',
        '10d': 'Hujan Ringan',
        '10n': 'Hujan Ringan',
        '11d': 'Hujan Petir',
        '11n': 'Hujan Petir',
        '13d': 'Salju',
        '13n': 'Salju',
        '50d': 'Kabut',
        '50n': 'Kabut',
      };

      // Mengambil deskripsi bahasa Indonesia berdasarkan kode ikon cuaca
      return weatherDescriptions[icon] || '';
    }
  }
};
</script>

  
  
  <style scoped>
  .cuaca {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
    text-align: center;
    background-color: #f2f2f2;
  }
  
  .widget-title {
    margin-top: 0;
    color: #333;
    font-family: Arial, sans-serif;
    font-size: 24px;
  }
  
  .location-input {
    margin-bottom: 10px;
  }
  
  .location-input label {
    display: block;
    margin-bottom: 5px;
    font-family: Arial, sans-serif;
    font-size: 16px;
  }
  
  .location-input input[type="text"] {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    font-size: 14px;
  }
  
  .location-input button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    background-color: #2196f3;
    color: #fff;
    cursor: pointer;
  }
  
  .weather-data {
    margin-top: 10px;
  }
  
  .location {
    font-size: 18px;
    font-weight: bold;
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  .temperature {
    font-size: 24px;
    color: #210f88;
    font-family: Arial, sans-serif;
  }
  
  .description {
    font-size: 16px;
    font-family: Arial, sans-serif;
  }
  </style>