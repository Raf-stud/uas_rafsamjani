<template>
  <div class="lokasi">
    <h2>Lokasi Anda</h2>
    <div v-if="latitude && longitude">
      <p>Lintang: {{ latitude }}</p>
      <p>Bujur: {{ longitude }}</p>
    </div>
    <div v-else>
      <p>Mencari lokasi Anda...</p>
    </div>

    <div class="location-input">
      <label for="latitude">Lintang:</label>
      <input type="text" id="latitude" v-model="inputLatitude" />
    </div>
    <div class="location-input">
      <label for="longitude">Bujur:</label>
      <input type="text" id="longitude" v-model="inputLongitude" />
    </div>

    <button @click="searchLocation">Temukan Detail Lokasi</button>

    <div v-if="foundLocation">
      <h3>Detail Lokasi</h3>
      <p>Negara: {{ foundLocation.components.country }}</p>
      <p>Kota: {{ foundLocation.components.city }}</p>
      <p>Jalan: {{ foundLocation.components.street }}</p>
      <p>Kode Pos: {{ foundLocation.components.postcode }}</p>
    </div>

    <div id="map" class="map"></div>
  </div>
</template>

<script>
import L from 'leaflet';

export default {
  data() {
    return {
      latitude: null,
      longitude: null,
      inputLatitude: '',
      inputLongitude: '',
      foundLocation: null,
      map: null,
    };
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getPosition);
    }
  },
  methods: {
    getPosition(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    },
    searchLocation() {
      const latitude = parseFloat(this.inputLatitude);
      const longitude = parseFloat(this.inputLongitude);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        this.foundLocation = {
          components: {
            country: 'Negara Contoh',
            city: 'Kota Contoh',
            street: 'Jalan Contoh',
            postcode: '12345',
          },
          geometry: {
            latitude,
            longitude,
          },
        };

        this.showLocationOnMap(this.foundLocation);
      } else {
        this.foundLocation = null;
        alert('Masukkan lintang dan bujur yang valid.');
      }
    },
    showLocationOnMap(location) {
      const { latitude, longitude } = location.geometry;

      this.map = L.map('map').setView([latitude, longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      L.marker([latitude, longitude]).addTo(this.map)
        .bindPopup('Ini adalah lokasi yang dicari.')
        .openPopup();
    },
  },
};
</script>

<style scoped>
.lokasi {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
  background-color: #f8f8f8;
  border-radius: 8px;
}

.lokasi h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.lokasi p {
  color: #666;
}

.location-input {
  margin-top: 20px;
}

.location-input label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-size: 16px;
}

.location-input input {
  width: 200px;
  padding: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #ccc;
  color: #999;
  cursor: not-allowed;
}

.location-details {
  margin-top: 20px;
  text-align: left;
}

.location-details h3 {
  margin-bottom: 10px;
  color: #333;
  font-size: 18px;
}

.location-details p {
  margin: 5px 0;
  color: #666;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
