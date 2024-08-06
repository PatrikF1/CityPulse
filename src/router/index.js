import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Logout from '@/views/Logout.vue';
import Login from '@/views/Login.vue';
import Registracija from '@/views/Registracija.vue';
import Eventi from '@/views/Eventi.vue';

Vue.use(VueRouter);

const routes = [

 

  {
    path: '/home', 
    name: 'Home',
    component: Home,
  },
  {
    path: '/logout', 
    name: 'Logout',
    component: Logout,
    
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registracija',
    name: 'Registracija',
    component: Registracija,
  },
  {
    path: '/eventi',
    name: 'Eventi',
    component: Eventi,
  },
  
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
