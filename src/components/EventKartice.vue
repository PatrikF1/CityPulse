<template>
    
  <div class="event-cards">
      <div v-for="event in filtriraniDogadaji" :key="event.id" class="event-card">
        <img :src="event.imageUrl" alt="Event image" class="event-image" @click="openEventDetails(event)">
      </div>

      <EventDetalji v-if="selektiraniEvent" :event="selektiraniEvent"  @close="selektiraniEvent = null"/>
    </div>
    
</template>

<script>
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import EventDetalji from '@/components/EventDetalji.vue'


export default {
name: 'EventKartice',
components: { EventDetalji },
data() {
    return {
        dogadaji: [],
        filtriraniDogadaji: [],
        selektiraniEvent: null,
    };
},
mounted() {
this.fetchEvents();
},

methods: {
    async fetchEvents() {
      try {
      const querySnapshot = await getDocs(collection(db, 'Events'));
      this.dogadaji = querySnapshot.docs.map(doc => {
        const dogadaj = doc.data();
        if (dogadaj.date) {
          dogadaj.date = new Date(dogadaj.date);
        }
        else{
          dogadaj.date = new Date();
        }

        return { 
          id: doc.id,
          name: dogadaj.name,
          description: dogadaj.description,
          date: dogadaj.date,
          category: dogadaj.category,
          imageUrl: dogadaj.imageUrl,
          organizatorEmail: dogadaj.email, 
         };
      });

      this.filtriraniDogadaji = this.dogadaji;

      } catch (error) {
        console.error("Greska prilikom dohvacanja dogadaja: ", error);
      }
    },

    filterEvents(dan, kategorija) {
      this.filtriraniDogadaji = this.dogadaji.filter(event => {
        const pogodeniDatum = !dan || new Date(event.date).toISOString().slice(0, 10) === dan.toISOString().slice(0, 10);
        const pogodenaKategorija = !kategorija || event.category === kategorija;
        return pogodeniDatum && pogodenaKategorija;
      });
      return this.filtriraniDogadaji.length;
    },
    showAllEvents() {
      this.filtriraniDogadaji = this.dogadaji;
    },

    openEventDetails(event) {
      this.selektiraniEvent = event;
      console.log(this.selektiraniEvent);
    }
  }
};
</script>

<style>
.event-cards {
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 20%;
  margin-top: 250px;
  gap: 40px;
  z-index: -1;
}

.event-card {
  position: relative;
  width: 300px;
  margin: 10px;
  overflow: hidden;

}

.event-image {
  position: fixed;
  width: auto;
  height: 200px;
  object-fit: cover;
  border-radius: 30px;
  transition: transform 0.3s ease,box-shadow 0.3s ease;
  
}

.event-image:hover {
  transform: scale(1.05);
  box-shadow: 0px 10px 13px rgba(0, 0, 0, 0.5); 
}

</style>