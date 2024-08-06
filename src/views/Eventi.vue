<template>
  <div id="event">
    <div class="background"></div>
    <Navigacija/>
    <h1 class="pretrazite">Pretražite Evente!</h1>
    <div class="element">
      <div class="kategorije" @click="toggleDropdown">
        Kategorije
        <div class="dropdown" v-if="showDropdown">
          <div class="dropdown-item">Kućna Zabava</div>
          <div class="dropdown-item">Koncerti</div>
          <div class="dropdown-item">Sport</div>
          <div class="dropdown-item">Festivali</div>
        </div>
      </div>
      <div class="dodaj">Dodaj Event</div>
    </div>
  </div>
</template>

<script>
import Navigacija from '@/components/Navigacija.vue';

export default {
  name: 'Eventi',
  components: { Navigacija },
  data() {
    return {
      showDropdown: false
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
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
  top: 60px; /* Pomaknite dropdown ispod kategorija */
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

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
</style>
