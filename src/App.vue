<template>
  <div id="app">
    <Navigacija/>
    <router-view/>
    <Mapa />
    <Footer />
  </div>
</template>

<script>
import Navigacija from './components/Navigacija.vue';
import Footer from './components/Footer.vue';
import Mapa from './components/Mapa.vue';
export default {
  name: "app",
  components: { Navigacija , Footer, Mapa}, 
  data(){
    return {};
  }
}

</script>

<style>




* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: "Quicksand", sans-serif;
color: #BBE1FA;
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


.link-light{
color: #fff;
} 



</style>
