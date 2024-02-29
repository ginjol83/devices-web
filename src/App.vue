<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { OhVueIcon, addIcons } from 'oh-vue-icons'
  import { FcHome,FcContacts,FcManager  } from 'oh-vue-icons/icons'
  import LoginModal from './components/LoginModal.vue';

  //Add Icons
  addIcons( FcHome,FcContacts, FcManager   )
  
</script>

<template>
   <login-modal />
  <header >
    <h1 style="margin: 0; color: white;">Devices Manager</h1>
    
    <RouterLink to="user-profile"><v-icon name="fc-manager" scale="2.6" /></RouterLink>
  </header>
  <nav>
    
    <RouterLink to="/"><h3><v-icon name="fc-home" /> Home</h3></RouterLink>
    <RouterLink to="about"><h3><v-icon name="fc-contacts" /> About</h3></RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>

header {
  width: 100%; 
  height: 6vh; 
  position: fixed;
  top: 0; 
  left: 0; 
  z-index: 1000; 
  
  background-color: #5e85b0;

  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  height: 60px; 
  padding: 0 20px;
} 

/*h1{
  margin-left: 10%;
  padding-top: 5px;
}*/

nav {
  position: fixed;
  padding-top:  10vh;
  left: 0;
  top: 0vh; 
  width: 8%;
  height: 100vh; 
  /*background-color: #333; */
  background-image: linear-gradient(to bottom, #5e85b0, #ffffff);
  color: white; 
  z-index: 500; 
  font-weight: 600;
}

.content {
  margin-left: 10%; 
  margin-top: 10vh; 
}

.RouterView {
  margin-top: 10vh; 
  width: 100%;
}

nav a {
  display: block; 
  padding: 10px; 
  color: white; 
  text-decoration: none; 
}

nav a:hover {
  background-color: #555; 
}
</style>