<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "App",

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



</style>
