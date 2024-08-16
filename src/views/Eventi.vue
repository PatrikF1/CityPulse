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
    <div class="element">
      <div class="kategorije" @click="toggleDropdown">
        Kategorije
        <div class="dropdown" v-if="prikaziKategorije">
          <div class="dropdown-item" @click="filterCategory('Kućna Zabava')">Kućna Zabava</div>
          <div class="dropdown-item" @click="filterCategory('Koncerti')">Koncerti</div>
          <div class="dropdown-item" @click="filterCategory('Sport')">Sport</div>
          <div class="dropdown-item" @click="filterCategory('Festivali')">Festivali</div>
          <div class="dropdown-item" @click="showAllEvents">Prikazi sve</div>
        </div>
      </div>
      <div class="dodaj">Dodaj Event</div>
      <button @click="showAllEvents" class="prikazi-sve-gumb">Prikazi Sve Evente</button>
    </div>
    <eventKartice ref="eventKarticeComponent" />
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
      this.odabraniDan = day.date;
      this.$refs.eventKarticeComponent.filterEvents(this.odabraniDan, this.odabranaKategorija);
    },
    filterCategory(category) {
      this.odabranaKategorija = category;
      this.$refs.eventKarticeComponent.filterEvents(this.odabraniDan, this.odabranaKategorija);
    },
    showAllEvents() {
      this.$refs.eventKarticeComponent.prikaziSveEvente();
    }
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
  z-index: 1;
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
  z-index: 1;
}

.dropdown-item {
  padding: 10px 15px;
  color: #BBE1FA;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #76ABAE;
}

.dodaj {
  display: flex;
  align-items: center; 
  justify-content: center; 
  position: absolute;
  width: 230px; 
  height: 50px; 
  top: 10px; 
  left: 87%; 
  transform: translateX(-50%); 
  background-color: #76ABAE;
  color: #000000; 
  font-size: 30px; 
  font-weight: 600;
  border-radius: 25px; 
  z-index: 1;
}



.calendar { 
  position: fixed; 
  top: 0; 
  left: 0; 
  background-color: #76ABAE; 
  margin-top: 345px;
  margin-left: 20px;
 
}

.prikazi-sve-gumb {
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
  font-size: 23px; 
  font-weight: 600;
  border-radius: 25px; 
  z-index: 1;
}



</style>
