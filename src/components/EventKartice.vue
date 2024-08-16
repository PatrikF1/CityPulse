<template>
    
  <div class="event-cards">
      <div v-for="event in filtriraniDogadaji" :key="event.id" class="event-card">
        <img :src="event.imageUrl" alt="Event image" class="event-image">
      </div>
    </div>
</template>

<script>
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default {
data() {
    return{
        dogadaji: [],
        filtriraniDogadaji: [],
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
          email: dogadaj.email, 
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
    },
    prikaziSveEvente() {
      this.filtriraniDogadaji = this.dogadaji;
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
}

.event-card {
  position: fixed;
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
}
</style>