<template>
    <div class="login">
      <h1 class="text-center mb-4">Login</h1>
      <form >
        <div class="mb-3">
          <label for="email" class="form-label">Email adresa</label>
          <input type="email" class="form-control" id="email" placeholder="Email" v-model="email" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Lozinka</label>
          <input type="password" class="form-control" id="password" placeholder="Password" v-model="lozinka" required>
        </div>
        <button type="button" @click="login()" class="btn btn-secondary active" to="Home" >Prijavi se</button>
        <b>Nemate profil? <router-link class="r" to="Registracija">Registracija</router-link></b>
      </form>
      
    </div>
  </template>
  
  <script>
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

  export default {
    name: 'Login',
    data: function() {
      return {
        email: '',
        lozinka: ''
      };
    },
    methods: {
      login: function() {
        let self = this;
        signInWithEmailAndPassword(auth, this.email, this.lozinka)
                .then(function(userCredential) {
                    const user = userCredential.user;
                    alert("Hvala na prijavi " + self.email);
                    self.$router.replace('Home');
                })
                .catch(function(error) {
                    console.error('Greška pri registraciji:', error);
                    alert("Greška pri registraciji: " + error.message);
                });
      }
    }
  };
  </script>
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .form-label {
    font-weight: bold;
  }
  
  .btn-secondary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
 .r {
  text-decoration: none;
 }
  
  </style>
  