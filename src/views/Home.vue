<template>
    <div id="home"> 
      <Navigacija/>
      <Mapa />
      <Footer/>
    </div>
  </template>
  
  <script>
  
  
import Footer from '@/components/Footer.vue';
import Mapa from '@/components/Mapa.vue';
import Navigacija from '@/components/Navigacija.vue';
  
  export default {
    name: 'Home',
    components: {  Mapa, Footer,Navigacija },
  };
  </script>
  
  <style>
  
  
  </style>
  