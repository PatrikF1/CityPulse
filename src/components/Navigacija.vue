<template>
    <header>
      <nav class="container">
          <div class="brendiranje">
              <router-link class="header" :to="{name: 'Home'}">CityPulse</router-link>
          </div>
          <div class="nav-links">
              <ul v-show="!mobitel">
                  <router-link class="link" to="#">Home</router-link>
                  <router-link class="link" to="#">Login/Registracija</router-link>
                  <router-link class="link" to="#">nez</router-link>
                  <router-link class="link" to="#">nez</router-link>
              </ul>
          </div>
      </nav>
      <MenuIkona @click="otvoriMobilnuNav" class="menu-ikona" v-show="mobitel"/>
      <transition name="mobilna-nav">
          <ul class="mobilna-nav" v-show="mobilnaNav">
                  <router-link class="link" to="#">Home</router-link>
                  <router-link class="link" to="#">Login/Registracija</router-link>
                  <router-link class="link" to="#">nez</router-link>
                  <router-link class="link" to="#">nez</router-link>
          </ul>
      </transition>
    </header>
  </template>
  
  <script>
  import MenuIkona from '../assets/ikone/menu-bars-svgrepo-com.svg'
  export default {
      name:'navigacija',
      components: {
          MenuIkona,
      },
      data() {
          return {
              mobitel: null,
              mobilnaNav: null,
          };
      },
      created() {
          window.addEventListener('resize', this.provjeriZaslon);
          this.provjeriZaslon();
      },
      methods: {
          provjeriZaslon() {
              const windowWidth = window.innerWidth;
              if (windowWidth <= 750) {
                  this.mobitel = true;
              } else {
                  this.mobitel = false;
                  this.mobilnaNav = false;
              }
          },
          otvoriMobilnuNav() {
              this.mobilnaNav = !this.mobilnaNav;
          }
      }
  };
  </script>
  
  <style lang="scss" scoped>
  header {
      background-color: #1B262C;
      padding: 0 25px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px 6px -1px rgba(0, 0, 0, 0.6);
      z-index: 99;
  }
  
  .link {
      font-weight: 500;
      padding: 0 8px;
      transition: .3s color ease;
  
      &:hover {
          color: #3282B8;
      }
  }
  
  nav {
      display: flex;
      padding: 25px 0;
  
      .brendiranje {
          display: flex;
          align-items: center;
  
          .header {
              font-weight: 600;
              font-size: 24px;
              color: #BBE1FA;
              text-decoration: none;
          }
      }
  
      .nav-links {
          position: relative;
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: flex-end;
  
          ul {
              margin-right: 32px;
  
              .link {
                  margin-right: 32px;
              }
  
              .link:last-child {
                  margin-right: 0;
              }
          }
      }
  }
  
  .menu-ikona {
      cursor: pointer;
      position: absolute;
      top: 32px;
      right: 25px;
      height: 25px;
      width: auto;
  }
  
  .mobilna-nav {
      padding: 20px;
      width: 70%;
      max-width: 250px;
      display: flex;
      flex-direction: column;
      position: absolute;
      height: 100%;
      background-color: #1B262C;
      top: 0;
      left: 0;
      list-style: none;
  
      .link {
          padding: 15px;
          color: #BBE1FA;
          text-decoration: none;
          transition: .3s color ease;
  
          &:hover {
              color: #3282B8;
          }
      }
  }

  .mobilna-nav-enter-active,
  .mobilna-nav-leave-active{
    transition: all 1s ease;
  }

  .mobilna-nav-enter{
    transform: translateX(-250px);
  }

  .mobilna-nav-enter-to{
    transform: translateX(0);
  }

  .mobilna-nav-leave-to{
    transform: translateX(-250px);
  }

  </style>
  