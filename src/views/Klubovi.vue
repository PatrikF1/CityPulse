<template>
    <div id="klub">
      <Navigacija />
      <h3 class="txt">Klubovi i Kafići u Istri</h3>
      <p class="intro-text">Zanima li vas popis svih klubova i kafića u Istri? Pogledajte ih na karti!</p>
      <div class="link-container">
        <a :href="googleMapsLink" target="_blank" rel="noopener noreferrer" class="button-link">
          Prikaži sve klubove i kafiće u Istri na Google Maps
        </a>
      </div>
      <div class="slideshow-container">
        <div class="mySlides fade">
          <img src="https://macumba.com.hr/portal/source/Image2b.jpg?1529053935432" alt="Slika 1">
        </div>
        <div class="mySlides fade">
          <img src="https://after5.hr/wp-content/uploads/2024/07/koncerti-atp-umag-f-image.jpg" alt="Slika 2">
        </div>
        <div class="mySlides fade">
          <img src="https://www.party.hr/images/stories/story-a47/umag0208221.jpg" alt="Slika 3">
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import Navigacija from '@/components/Navigacija.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    name: 'Klubovi',
    components: { Navigacija, Footer },
    computed: {
      googleMapsLink() {
        const query = 'Klubovi i Zabava u Istri';
        return `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
      },
    },
    mounted() {
      this.startSlideshow();
    },
    methods: {
      startSlideshow() {
        let slideIndex = 0;
        const slides = this.$el.getElementsByClassName("mySlides");
  
        const showSlides = () => {
          for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
          }
          slideIndex++;
          if (slideIndex > slides.length) { slideIndex = 1 }
          slides[slideIndex - 1].style.display = "block";
          setTimeout(showSlides, 3000); 
        };
        
        showSlides();
      }
    }
  }
  </script>
  
  <style>

#klub {
  background-color: #76ABAE;
}

.txt {
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
  margin-top: 50px;
}

.intro-text {
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
}

.link-container {
  margin-top: 20px;
  text-align: center;
}

.button-link {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.button-link:hover {
  background-color: #2980b9;
}

.slideshow-container {
  position: static;
  max-width: 80%;
  margin: 50px auto;
  overflow: hidden;
  border: 2px solid #ddd;
  border-radius: 10px;
}

.mySlides {
  display: none;
}

.mySlides img {
  width: 100%;
  height: auto;
}

.fade {
  -webkit-animation: fade 1.5s ease-in-out;
  animation: fade 1.5s ease-in-out;
}

@-webkit-keyframes fade {
  from { opacity: .4 }
  to { opacity: 1 }
}

@keyframes fade {
  from { opacity: .4 }
  to { opacity: 1 }
}
</style>

    