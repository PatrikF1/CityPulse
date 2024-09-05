<template>
    <div id="admin">
    <div class="admin-panel-container">
      <h1 class="admin-title">Admin Panel</h1>
      <div class="admin-actions">
        <button @click="fetchUsers" class="admin-button">Prikaži sve korisnike</button>
        <button @click="fetchEvents" class="admin-button">Prikaži sve evente</button>
      </div>
  
      <div v-if="users.length" class="users-section">
        <h2 class="section-title">Korisnici:</h2>
        <ul class="users-list">
          <li v-for="user in users" :key="user.id" class="user-item">
            <span class="user-email">{{ user.email }}</span>
            <button @click="removeUser(user.id)" class="delete-button">Obriši</button>
          </li>
        </ul>
      </div>
      <div v-else class="no-users">
        <p style="color: white">Nema korisnika za prikaz.</p>
      </div>
  
      <div v-if="events.length" class="events-section">
        <h2 class="section-title">Eventi:</h2>
        <ul class="events-list">
          <li v-for="event in events" :key="event.id" class="event-item">
            <strong class="event-name">{{ event.name }}</strong><br>
            <span class="event-description">Opis: {{ event.description }}</span><br>
            <button @click="removeEvent(event.id)" class="delete-button">Obriši</button>
          </li>
        </ul>
      </div>
      <div v-else class="no-events">
        <p style="color: white">Nema eventa za prikaz.</p>
      </div>
      
      <router-link to="Home" class="home-link">Home</router-link>
    </div>
</div>
  </template>
  
  


  
  <script>
  import { getAllUsers, getAllEvents, deleteUser, deleteEvent } from '@/firebase';
  
  export default {
    data() {
      return {
        users: [],
        events: []
      };
    },
    methods: {
        async fetchUsers() {
  try {
    this.users = await getAllUsers();
    console.log('Dobijeni korisnici:', this.users);
  } catch (error) {
    console.error('Greška pri dohvaćanju korisnika:', error);
  }
},
      async fetchEvents() {
        this.events = await getAllEvents();
      },
      async removeUser(userId) {
        await deleteUser(userId);
        this.fetchUsers();
      },
      async removeEvent(eventId) {
        await deleteEvent(eventId);
        this.fetchEvents();
      }
    }
  };
  </script>
  
  <style >



#admin {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #BBE1FA; 
}

.admin-panel-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  background-color: #1B262C;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  color: #BBE1FA;
  text-align: center;
}


.admin-title {
  font-size: 50px;
  color: #BBE1FA;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  border-bottom: 2px solid #BBE1FA;
  padding-bottom: 20px;
}


.admin-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.admin-button {
  background-color: #3282B8;
  color: #BBE1FA;
  border: 2px solid #BBE1FA;
  padding: 12px 30px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s, transform 0.3s;
}

.admin-button:hover {
  background-color: #BBE1FA;
  color: #1B262C;
  transform: translateY(-5px);
}


.section-title {
  font-size: 25px;
  color: #BBE1FA;
  margin-bottom: 20px;
  border-bottom: 1px solid #BBE1FA;
  padding-bottom: 10px;
}


.users-section, .events-section {
  margin-bottom: 40px;
}

.users-list, .events-list {
  list-style-type: none;
  padding: 0;
}

.user-item, .event-item {
  background-color: #1B262C;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  text-align: left;
}

.user-email, .event-name {
  font-size: 25px;
  font-weight: bold;
  color: #BBE1FA;
}

.event-description {
  font-size: 15px;
  color: #BBE1FA;
}


.delete-button {
  background-color: #BBE1FA;
  color: #1B262C;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 15px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.delete-button:hover {
  background-color: #3282B8;
  color: #BBE1FA;
}


.no-users, .no-events {
  font-size: 35px;
  margin-top: 30px;
}


.home-link {
  text-decoration: none;
  color: #BBE1FA;
  font-weight: bold;
  margin-top: 20px;
  padding: 12px 30px;
  border: 2px solid #BBE1FA;
  border-radius: 30px;
  text-transform: uppercase;
  transition: color 0.3s, background-color 0.3s, transform 0.3s;
  display: inline-block;
}

.home-link:hover {
  background-color: #BBE1FA;
  color: #1B262C;
  transform: translateY(-5px);
}


@media (max-width: 768px) {
  .admin-panel-container {
    padding: 20px;
  }

  .admin-title {
    font-size: 2.5px;
  }

  .admin-actions {
    flex-direction: column;
  }

  .admin-button {
    width: 100%;
    margin-bottom: 10px;
  }

  .user-item, .event-item {
    padding: 15px;
  }

  .delete-button {
    top: 15px;
    right: 15px;
  }
}

  
  </style>
  