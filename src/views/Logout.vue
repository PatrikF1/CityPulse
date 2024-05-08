<template>
  <div class="logout">
    <h1 class="centered">Hvala, book!</h1>
    <router-link class="btn btn-secondary active" to="Login" >Login</router-link>
  </div>
</template>

<script>
export default {
  name: 'Logout',
};



</script>

<style>
.logout {
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  height: 100vh; 
  background-color: #1B262C;
}

.centered {
  text-align: center;
  color: #BBE1FA;
  margin-bottom: 20px; 
}


</style>
