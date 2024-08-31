<template>
  <div class="event-details">
    <div v-if="loading" class="loading-indicator">Loading...</div>
    <div class="close-container">
      <span class="close-icon" @click="$emit('close')">&times;</span>
    </div>
    <h2 class="event-title">{{ event.name }}</h2>
    <img :src="event.imageUrl" alt="Event image" class="event-image-details">
    <p class="event-description">{{ event.description }}</p>
    <p class="event-date">Datum: {{ formattedDate }}</p>

    
    <div class="reservation-section">
      <h3 class="reservation-title">Rezervacije</h3>

      <div v-if="isOrganizator" class="organizer-actions">
        <h4 class="actions-title">Dodaj/Izbrisi Rezervaciju</h4>
        <form @submit.prevent="addTable" class="add-table-form">
          <label for="tableName">Naziv Stola:</label>
          <input type="text" v-model="newTable.name" required class="input-field">
          <br>
          <label for="tableNumber">Broj Stola:</label>
          <input type="number" v-model="newTable.number" required class="input-field">
          <br>
          <label for="tableConditions">Uvjeti Stola:</label>
          <input type="text" v-model="newTable.conditions" required class="input-field">
          <br>
          <button type="submit" class="submit-button">Dodaj Stol</button>
        </form>
        <ul class="table-list">
          <li v-for="(table, index) in event.tables" :key="index" class="table-item">
            Stol #{{ table.number }} - {{ table.name }}
            <br>
            Uvjeti: {{ table.conditions }}
            <button v-if="isOrganizator" @click="removeTable(index)" class="delete-button">Izbrisi</button>
          </li>
        </ul>
      </div>

      <div v-else class="user-actions">
        <h4 class="actions-title">Odaberi Stol Za Rezervaciju</h4>
        <form @submit.prevent="reserveTables" class="reserve-tables-form">
          <ul class="table-list">
            <li v-for="(table, index) in event.tables" :key="index" class="table-item">
              <input type="checkbox" :value="table.number" v-model="selectedTables" :disabled="table.reservedBy" class="checkbox">
              Stol #{{ table.number }} - {{ table.name }}
              <br>
              Uvjeti: {{ table.conditions }}
              <span v-if="table.reservedBy" class="reserved-by">(Rezervirano od: {{ table.reservedBy.email }})</span>
            </li>
          </ul>
          <button class="reservation-button" type="submit" :disabled="selectedTables.length === 0">Rezerviraj</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { db } from '@/firebase';
import { auth } from '@/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';



export default {
  props: {
    event: Object,
  },
  data() {
    return {
      isOrganizator: false,
      newTable: {
        name: '',
        number: null,
        conditions: '',
      },
      selectedTables: [],
      loading: true,
    };
  },
  computed: {
    formattedDate() {
      return new Date(this.event.date).toLocaleDateString();
    }
  },
  mounted() {
    this.checkIfOrganizator();
    this.loadTables();
  },
  methods: {
    checkIfOrganizator() {
      const user = auth.currentUser;
      if (user) {
        if (user.email === this.event.organizatorEmail) {
          this.isOrganizator = true;
          console.log("Ovo je kreator eventa.");
        } else {
          console.log("Ovo nije kreator eventa.");
        }
      } else {
        console.log("Nema ulogiranog korisnika.");
      }
    },

    async loadTables() {
      try {

        const eventRef = doc(db, 'Events', this.event.id);
        const eventSnap = await getDoc(eventRef);

        if (eventSnap.exists()) {
          const eventData = eventSnap.data();
          this.event.tables = eventData.tables || [];
          console.log('Učitani stolovi: ', this.event.tables);
        } else {
          console.log('Event ne postoji');
        }
      } catch (error) {
        console.error('Greška pri učitavanju stolova: ', error);
      } finally {
        this.loading = false;
      }
    },

    async addTable() {
      try {
        const newTable = {
          name: this.newTable.name,
          number: this.newTable.number,
          conditions: this.newTable.conditions
        };
        

        const eventRef = doc(db, 'Events', this.event.id);
        await updateDoc(eventRef, {
          tables: arrayUnion(newTable)
        });
   
        this.event.tables.push(newTable);

        this.newTable.name = '';
        this.newTable.number = null;
        this.newTable.conditions = '';
      } catch (error) {
        console.error('Greška pri dodavanju stola: ', error);
      }
    },

    async removeTable(index) {
      try {
        const table = this.event.tables[index];

        const eventRef = doc(db, 'Events', this.event.id);
        await updateDoc(eventRef, {
          tables: arrayRemove(table)
        });

        this.event.tables.splice(index, 1);
        console.log('Stol je obrisan: ', table)
        window.location.reload();
      } catch (error) {
        console.error('Greška pri brisanju stola: ', error);
      }
    },

    async reserveTables() {
  try {
    const user = auth.currentUser;

    const eventRef = doc(db, 'Events', this.event.id);
    const eventSnap = await getDoc(eventRef);

    if (eventSnap.exists()) {
      const eventData = eventSnap.data();

      const updatedTables = eventData.tables.map(table => {
        if (this.selectedTables.includes(table.number)) {
          return {
            name: table.name,
            number: table.number,
            conditions: table.conditions,
            reservedBy: {
              uid: user.uid,
              email: user.email,
            }
          };
        } else {
          return {
            name: table.name,
            number: table.number,
            conditions: table.conditions,
            reservedBy: table.reservedBy,
          };
        }
      });

      await updateDoc(eventRef, {
        tables: updatedTables
      });

      
      this.event.tables = updatedTables;
      alert( "Rezervacija uspješno izvršena");

      window.location.reload();
    } else {
      console.log("Event ne postoji");
    }
  } catch (error) {
    console.error("Greška pri rezervaciji stola: ", error);
  }
},


    
  }
};
</script>
  
  <style>


 .event-details {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1B262C;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.9);
  z-index: 15;
  max-width: 700px;
  width: 90%;
  color: #76ABAE;
  max-height: 70vh;
  overflow-y: auto;
}

.loading-indicator {
  color: #76ABAE;
  font-weight: 700;
}

.close-container {
  text-align: right;
}

.close-icon {
  cursor: pointer;
  font-size: 24px;
  color: white;
}

.close-icon:hover {
  color: #76ABAE;
}

.event-title {
  color: #76ABAE;
}

.event-image-details {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 15px;
}

.event-description, .event-date {
  color: #76ABAE;
  font-weight: 700;
}

.reservation-section {
  background-color: #233545;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.reservation-title {
  margin-top: 0;
  color: #76ABAE;
}

.organizer-actions, .user-actions {
  margin-top: 20px;
}

.actions-title {
  margin-top: 0;
  color: #A1C4D9;
}

.add-table-form, .reserve-tables-form {
  margin-bottom: 20px;
}

.input-field {
  width: calc(100% - 20px);
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #76ABAE;
  background-color: #1B262C;
  color: #76ABAE;
}

.submit-button, .reservation-button {
  background-color: #76ABAE;
  color: #1B262C;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.submit-button:disabled, .reservation-button:disabled {
  background-color: #4A5A6F;
  cursor: not-allowed;
}

.table-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.table-item {
  background-color: #1B262C;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  color: #76ABAE;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkbox {
  margin-right: 10px;
}

.reserved-by {
  color: #A1C4D9;
}

.delete-button {
  background-color: #BF3F3F; 
  color: #ffffff;
}

.delete-button:hover {
  background-color: #A72D2D; 
}

  </style>
  