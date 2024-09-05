import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Logout from '@/views/Logout.vue';
import Login from '@/views/Login.vue';
import Registracija from '@/views/Registracija.vue';
import Eventi from '@/views/Eventi.vue';
import Profil from '@/views/Profil.vue';
import Klubovi from '@/views/Klubovi.vue';
import AdminPage from '@/views/AdminPage.vue';

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
  {
    path: '/profil',
    name: 'Profil',
    component: Profil,
  },
  {
    path: '/klubovi',
    name: 'Klubovi',
    component: Klubovi,
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage, 
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
