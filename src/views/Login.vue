<template>
  <div id="log">
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
  </div>
  </template>
  
  <script>
import { auth, checkIfAdmin } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        lozinka: ''
      };
    },
    methods: {
      async login() {
      try {
        if (this.email === '' || this.lozinka === '') {
          alert('Molimo unesite e-mail i lozinku.');
          return;
        }

        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.lozinka);
        const user = userCredential.user;

        const isAdmin = await checkIfAdmin(this.email);

        if (isAdmin) {
          alert('Prijavljeni ste kao admin!');
          this.$router.push({ name: 'AdminPage' });  
        } else {
          alert('Prijavljeni ste kao korisnik!');
          this.$router.push({ name: 'Home' });
        }
      } catch (error) {
        console.error('Greška pri prijavi:', error);
        alert('Greška pri prijavi: ' + error.message);
      }
    }
  }
};
  </script>
  
  <style >

  
  
#log {
  max-width: 400px;
  margin: 100px auto; 
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}

.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 24px;
}

.mb-3 {
  margin-bottom: 16px;
}

.form-label {
  font-weight: bold;
  margin-bottom: 8px;
}

.form-control {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
}

.btn-secondary, .btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  padding: 10px;
  width: 100%;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary:hover, .btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.r, .l {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.r:hover, .l:hover {
  text-decoration: underline;
}

.input-group .btn {
  margin-left: 10px;
}


  
  </style>
  