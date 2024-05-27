<template>
    <div class="login">
      <h1 class="text-center mb-4">Login</h1>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email adresa</label>
          <input type="email" class="form-control" id="email" v-model="email" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Lozinka</label>
          <input type="password" class="form-control" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-secondary active" to="Home" >Prijavi se</button>
      </form>
      
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
    data: function() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login: function() {
        console.log('Prijavljen korisnik:', this.email);
        alert("hvala na prijavi " + this.email)
        this.$router.push('/home');
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
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
  </style>
  