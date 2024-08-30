<template>
  <div>
    <div id="mapContainer"></div>
    <div v-if="prikaziFormu" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Dodaj događaj</h3>
            <button type="button" class="btn-close" @click="closeForm"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addEvent">
              <div class="mb-3">
                <label for="nazivDogadjaja" class="form-label">Naziv događaja:</label>
                <input type="text" v-model="nazivDogadjaja" class="form-control" id="nazivDogadjaja" required />
              </div>
              <div class="mb-3">
                <label for="opisDogadjaja" class="form-label">Opis događaja:</label>
                <textarea v-model="opisDogadjaja" class="form-control" id="opisDogadjaja" rows="3" required></textarea>
              </div>
              <div class="mb-3">
                <label for="kategorijaDogadjaja" class="form-label">Kategorija događaja:</label>
                <select v-model="kategorijaDogadjaja" class="form-control" id="kategorijaDogadjaja">
                  <option>Kućna Zabava</option>
                  <option>Koncerti</option>
                  <option>Sport</option>
                  <option>Festivali</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="datumDogadjaja" class="form-label">Datum događaja:</label>
                <input type="date" v-model="datumDogadjaja" class="form-control" id="datumDogadjaja" required />
              </div>
              <div class="mb-3">
                <label for="slikaURL" class="form-label">URL slike događaja:</label>
                <input type="text" v-model="slikaURL" class="form-control" id="slikaURL" placeholder="Unesite URL slike">
              </div>
              <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">Dodaj</button>
                <button type="button" class="btn btn-secondary" @click="closeForm">Zatvori</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/views/store';
import L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import { Geocoder } from 'leaflet-control-geocoder';
import { db } from '@/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default {
  name: 'GeolocationComponent',
  data() {
    return {
      lat: 45.4333316,
      long: 13.5166646,
      mapa: null,
      markeri: [],
      prikaziFormu: false,
      odabraniMarker: null,
      nazivDogadjaja: '',
      opisDogadjaja: '',
      kategorijaDogadjaja: '',
      slikaURL: '',
      datumDogadjaja: '',  
    };
  },
  mounted() {
    this.initMap();
    this.loadEvents();
  },
  methods: {
    initMap() {
      const bounds = L.latLngBounds([45.12, 13.42], [45.68, 14.08]);
      this.mapa = L.map('mapContainer', {
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
      }).setView([this.lat, this.long], 13);

      L.tileLayer('https://api.maptiler.com/maps/basic-v2-dark/256/{z}/{x}/{y}.png?key=pWOwvlooKGifdZ9OWFI2', {
        maxZoom: 19,
        attribution: '&copy; MapTiler & OpenStreetMap contributors',
      }).addTo(this.mapa);

      const geocoder = new L.Control.Geocoder({ defaultMarkGeocode: false });
      geocoder.on('markgeocode', (e) => {
        const center = e.geocode.center;
        const marker = L.marker(center).addTo(this.mapa).bindPopup('Novi događaj').openPopup();
        this.markeri.push(marker);
        this.openForm(marker);
      });
      geocoder.addTo(this.mapa);
    },
    openForm(marker) {
      this.odabraniMarker = marker;
      this.prikaziFormu = true;
    },
    closeForm() {
      this.prikaziFormu = false;
      this.resetFormData();
    },
    addEvent() {
      if (!this.odabraniMarker || !this.slikaURL || !this.datumDogadjaja) return;
      const { lat, lng } = this.odabraniMarker.getLatLng();
      const eventDate = new Date(this.datumDogadjaja);
      if (isNaN(eventDate.getTime())) {
        alert("Invalid date. Please enter a valid date.");
        return;
      }
      addDoc(collection(db, 'Events'), {
        name: this.nazivDogadjaja,
        description: this.opisDogadjaja,
        category: this.kategorijaDogadjaja,
        latitude: lat,
        longitude: lng,
        date: eventDate.toISOString(),
        email: store.currentUser,
        imageUrl: this.slikaURL,
        
        
      }).then((docRef) => {
        console.log('Event dodan sa ID-e:', docRef.id);
        const popupContent = `<strong style="font-size: 30px;">${this.nazivDogadjaja}</strong><br><strong><p>${this.opisDogadjaja}</p><img src="${this.slikaURL}" style="width: 300px;"><br><p>Objavio: ${this.email}</p>`;
        this.odabraniMarker.bindPopup(popupContent).openPopup();
        this.closeForm();
        window.location.reload();
      }).catch((error) => {
        console.error('Error adding event:', error);
      });
    },
    loadEvents() {
      getDocs(collection(db, 'Events')).then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          const marker = L.marker([data.latitude, data.longitude]).addTo(this.mapa);
          marker.bindPopup(`<strong style="font-size: 30px;">${data.name}</strong><br><strong><p>${data.description}</p><img src="${data.imageUrl}" style="width: 300px;"><br><p>Objavio: ${data.email}</p>`);
          this.markeri.push(marker);
        });
      });
    },
    resetFormData() {
      this.nazivDogadjaja = '';
      this.opisDogadjaja = '';
      this.kategorijaDogadjaja = '';
      this.slikaURL = null;
      this.datumDogadjaja = '';
      this.odabraniMarker = null;
    },
  }
};
</script>

<style>
#mapContainer {
  width: 100vw;
  height: 73vh;
  background-color: #1a1a1a;
  border: 1px solid #333;
  flex: 1;
  display: flex;
  z-index: 1;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  text-align: left;
}

button {
  margin-right: 10px;
}
</style>
