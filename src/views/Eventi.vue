<template>
  <div id="event">
    <div class="background"></div>
    <Navigacija/>
    <div class="container">
      <div class="calendar">
        <v-calendar @dayclick="selectedDate" :attributes="atributiKalendara"></v-calendar>
      </div>
    </div>
    <h1 class="pretrazite">Pretražite Evente!</h1>
    <div class="dropdown" v-if="prikaziKategorije">
          <div class="dropdown-item" @click="filterCategory('Kućna Zabava')">Kućna Zabava</div>
          <div class="dropdown-item" @click="filterCategory('Koncerti')">Koncerti</div>
          <div class="dropdown-item" @click="filterCategory('Sport')">Sport</div>
          <div class="dropdown-item" @click="filterCategory('Festivali')">Festivali</div>
        </div>
    <div class="element">
      <div class="kategorije" @click="toggleDropdown">
        Kategorije
        
      </div>
      
      <button @click="showAllEvents" class="prikaziSve">Prikazi Sve Evente</button>
    </div>
    <eventKartice ref="eventKarticeComponent" />
    <div v-if="Greska" class="greska">Nema odabranog događaja u kategoriji: {{ odabranaKategorija }}</div>
  </div>
  
</template>

<script>
import Navigacija from '@/components/Navigacija.vue';
import EventKartice from '@/components/EventKartice.vue';
import { Calendar as VCalendar } from 'v-calendar';


export default {
  name: 'Eventi',
  components: { Navigacija, VCalendar, EventKartice },
  data() {
    return {
      prikaziKategorije: false,
      odabraniDan: new Date(),
      Greska: false,
      atributiKalendara: [
        { 
          key: 'today', 
          dates: new Date(), 
        },
      ]
    };
  },
  methods: {
    toggleDropdown() {
      this.prikaziKategorije = !this.prikaziKategorije;
    },
    selectedDate(day) {
      this.odabraniDan = new Date(day.date.getTime() + (24 * 60 * 60 * 1000));
      this.$refs.eventKarticeComponent.filterEvents(this.odabraniDan, this.odabranaKategorija);
    },
    filterCategory(category) {
      this.odabranaKategorija = category;
      this.prikaziKategorije = false;
      this.$refs.eventKarticeComponent.filterEvents(null, this.odabranaKategorija);

      if (this.$refs.eventKarticeComponent.filtriraniDogadaji.length === 0) {
        this.Greska = true;
      } else {
        this.Greska = false;
      }
    },
    showAllEvents() {
      this.$refs.eventKarticeComponent.showAllEvents();
      this.Greska = false;
      window.location.reload();
    },
    
  }
};
</script>

<style>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #76ABAE;
  z-index: -1; 
}

.pretrazite {
  font-weight: 600;
  color: #1B262C;
  position: absolute;
  top: 170px;
  left: 150px;
  z-index: -1;
}

.element {
  position: absolute;
  width: 1730px; 
  height: 70px;
  background-color: #1B262C; 
  top: 230px;
  right: 100px;
  border-radius: 150px;
  transition: box-shadow 0.3s ease;
  z-index: -1;
}

.element:hover {
  box-shadow: 0px 10px 13px rgba(0, 0, 0, 0.5); 
}

.kategorije {
  display: flex;
  align-items: center; 
  justify-content: center; 
  position: absolute;
  width: 230px; 
  height: 50px; 
  top: 10px; 
  left: 70%; 
  transform: translateX(-50%); 
  background-color: #76ABAE;
  color: #000000; 
  font-size: 30px; 
  font-weight: 600;
  border-radius: 25px; 
  cursor: pointer;
 
}

.dropdown {
  position: absolute;
  top: 60px; 
  left: 0;
  width: 100%;
  background-color: #1B262C;
  border: 1.5px solid #000000;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s ease;
  overflow: hidden;
  
}

.dropdown-item {
  padding: 10px 15px;
  color: #BBE1FA;
  cursor: pointer;
  z-index: 1;
}

.dropdown-item:hover {
  background-color: #76ABAE;

}



.calendar { 
  position: fixed; 
  top: 0; 
  left: 0; 
  background-color: #76ABAE; 
  margin-top: 345px;
  margin-left: 20px;
 
}

.prikaziSve {
  display: flex;
  align-items: center; 
  justify-content: center; 
  position: absolute;
  width: 230px; 
  height: 50px; 
  top: 10px; 
  left: 53%; 
  transform: translateX(-50%); 
  background-color: #76ABAE;
  color: #000000; 
  font-size: 20px; 
  font-weight: 700;
  border-radius: 25px; 
  z-index: 1;
}

.greska {
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 35%;
  margin-top: 250px;
  font-weight: 700;
  font-size: 30px;
  z-index: -1;
}

</style>
