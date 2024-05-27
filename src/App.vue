<template>
  <div id="app">
    
    <router-view/>
    <div v-if="pocetnaApp">
      <h1 class="naslov">Dobrodosli u city pulse</h1>
      <router-link to="Login">Login</router-link>
      <router-link to="Registracija">Registracija</router-link>
      
    </div>
    

  </div>
</template>

<script>




export default {
  name: "App",
  computed: {
    pocetnaApp: function(){
      return this.$route.path === '/';
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


.link-light{
color: #fff;
} 

.naslov{
  display: flex;
  justify-content: center;
  padding-top:100px ;
}


</style>
