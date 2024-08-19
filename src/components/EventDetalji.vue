<template>
    <div class="event-details">
      <div class="close">
        <span class="close-icon" @click="$emit('close')">&times;</span>
      </div>
      <h2>{{ event.name }}</h2>
      <img :src="event.imageUrl" alt="Event image" class="event-image-details">
      <p class="slova">{{ event.description }}</p>
      <p class="slova">Datum: {{ formattedDate }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      event: Object,
    },
    computed: {
        formattedDate() {
            return new Date(this.event.date).toLocaleDateString();
        }
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
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.9);
    z-index: 1;
    max-width: 700px;
    width: 90%;
    color: #76ABAE;
  }
  
  .event-image-details {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 15px;
  }
  
  .close-icon {
    cursor: pointer;
    font-size: 24px;
    float: right;
    color: white;
  }
  
  .close-icon:hover {
    color: #76ABAE;
  }

  .slova {
    color: #76ABAE;
    font-weight: 700;
  }
  </style>
  