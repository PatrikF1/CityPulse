<template>
    <div id="map" style="height: 300px; width: 100%;"></div>
  </template>
  
  <script>
  import L from 'leaflet';
  
  export default {
    data() {
      return {
        map: null,
      };
    },
    methods: {
      initializeMap() {
        this.map = L.map('map').setView([45.255999, 19.845999], 13);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a> contributors',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(this.map);
      },
    },
    mounted() {
      this.initializeMap();
    }
  }
  </script>
  
  <style>
  #map {
   
    height: 300px;
    width: 100%;
  }
  </style>
  