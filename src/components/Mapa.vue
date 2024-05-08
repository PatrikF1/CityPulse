<template>
  <div>
    <div id="mapContainer" ></div>

  
    <div v-if="prikaziFormu" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Dodaj događaj</h3>
            <button type="button" class="btn-close" @click="zatvoriFormu"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="dodajDogadjaj">
              <div class="mb-3">
                <label for="nazivDogadjaja" class="form-label">Naziv događaja:</label>
                <input
                  type="text"
                  v-model="nazivDogadjaja"
                  class="form-control"
                  id="nazivDogadjaja"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="opisDogadjaja" class="form-label">Opis događaja:</label>
                <textarea
                  v-model="opisDogadjaja"
                  class="form-control"
                  id="opisDogadjaja"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="slikaDogadjaja" class="form-label">Slika događaja:</label>
                <input
                  type="file"
                  class="form-control"
                  id="slikaDogadjaja"
                  @change="odaberiSliku"
                  accept="image/*"
                />
              </div>
              <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">Dodaj</button>
                <button type="button" class="btn btn-secondary" @click="zatvoriFormu">Zatvori</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import Geocoder from 'leaflet-control-geocoder';

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
      slikaDogadjaja: null,
  
    };
  },
  mounted() {
    const graniceIstre = L.latLngBounds([45.12, 13.42], [45.68, 14.08]);

    this.mapa = L.map('mapContainer', {
      maxBounds: graniceIstre,
      maxBoundsViscosity: 1.0,
    }).setView([this.lat, this.long], 13);

    L.tileLayer(
      'https://api.maptiler.com/maps/basic-v2-dark/256/{z}/{x}/{y}.png?key=pWOwvlooKGifdZ9OWFI2',
      {
        maxZoom: 19,
        attribution: '&copy; MapTiler & OpenStreetMap contributors',
      }
    ).addTo(this.mapa);

    const geocodeControl = L.Control.geocoder({
      defaultMarkGeocode: false,
    });

    geocodeControl.on('markgeocode', (s) => {
      const sredina = s.geocode.center;
      const marker = L.marker(sredina).addTo(this.mapa);
      marker.bindPopup('Novi događaj').openPopup();
      this.markeri.push(marker);
      this.otvoriFormu(marker);
    });

    geocodeControl.addTo(this.mapa);
  },
  methods: {
    otvoriFormu(marker) {
      this.prikaziFormu = true;
      this.odabraniMarker = marker;
      /* tu ide za brisanje jer mi to otvara formu ali moram tek namjestit*/
    },
    zatvoriFormu() {
      this.prikaziFormu = false;
      this.nazivDogadjaja = '';
      this.opisDogadjaja = '';
      this.odabraniMarker = null;
      this.slikaDogadjaja = null;
    },
    odaberiSliku(event) {
      this.slikaDogadjaja = event.target.files[0];
    },
    dodajDogadjaj() {
      if (this.odabraniMarker) {
        let sadrzaj = `<strong>${this.nazivDogadjaja}</strong><br><p>${this.opisDogadjaja}</p>`;
        if (this.slikaDogadjaja) {
          const slikaUrl = URL.createObjectURL(this.slikaDogadjaja);
          sadrzaj += `<br><img src="${slikaUrl}" alt="Slika događaja" width="150">`;
        }


        this.odabraniMarker.bindPopup(sadrzaj).openPopup();
        this.odabraniMarker = null;
        this.prikaziFormu = false;
        this.nazivDogadjaja = '';
        this.opisDogadjaja = '';
        this.slikaDogadjaja = null;
      }
    },
  },


/* neznam kako dodati gumb za brisanje moram jos vidjeti*/ 




};
</script>

<style>

#mapContainer {
  width: auto;
  height: 685px;
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
