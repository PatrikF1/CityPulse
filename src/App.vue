<template>
  <div id="app">
    <router-view/>
    <div v-if="pocetnaApp" class="pocetna-app">
      <h1 class="naslov">Dobrodošli u CityPulse</h1>
      <div class="link1-container">
        <router-link class="l1" to="Login">Login</router-link>
        <router-link class="l1" to="Registracija">Registracija</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/views/store';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: "App",
  computed: {
    pocetnaApp() {
      return this.$route.path === '/';
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("prijavljen korisnik: " + user.email);
        store.currentUser = user.email;
      } else {
        console.log("Nema korisnika");
        store.currentUser = null;
      }
    });
  },
  data() {
    return {
      store,
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
  color: #000000;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase; 
  color: #BBE1FA;
}

.link-light {
  color: #fff;
}

.naslov {
  display: flex;
  justify-content: center;
  padding-top: 100px;
}

.pocetna-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1B262C 0%, #3282B8 100%);
  color: #BBE1FA;
  text-align: center;
  padding: 20px;
}

.naslov {
  font-size: 3rem;
  color: #BBE1FA;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: fadeInDown 1s ease-in-out;
  margin-bottom: 40px;
}

.link1-container {
  margin-top: 40px;
}

.l1 {
  display: inline-block;
  margin: 10px 20px;
  padding: 15px 30px;
  border: 2px solid #BBE1FA;
  border-radius: 30px;
  color: #BBE1FA;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 1s ease-in-out;
}

.l1:hover {
  background-color: #BBE1FA;
  color: #1B262C;
  transform: translateY(-5px);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
