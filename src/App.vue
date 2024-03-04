<script setup>
  import { OhVueIcon, addIcons } from 'oh-vue-icons'
  import { FaDesktop, CoAboutMe, FaUserCircle, RiLogoutCircleLine   } from 'oh-vue-icons/icons'
  import LoginModal from './components/LoginModal.vue';
  import { useUserStore } from './states/userStore'; // Asegúrate de que la ruta al store sea la correcta
  import { ref, computed } from 'vue';

  // Add Icons
  addIcons(FaDesktop, CoAboutMe, FaUserCircle, RiLogoutCircleLine);

  const userStore = useUserStore();  
  const user = computed(() => userStore.getUser);
  const logged = computed(() => userStore.isLogged);
</script>

<template>
  <!--login-modal / -->
  <div>
    <header>
      <h1 style="margin: 0; color: white;">Devices Manager</h1>
      <div>
        <span style="margin: 0; color: white;"> User: {{ user.username }} </span>
        <RouterLink to="user-profile"><v-icon name="fa-user-circle" scale="2.6" style="color: #FFFFFF;"/></RouterLink>
        <button><v-icon name="ri-logout-circle-line" scale="2.4" style="color: #FFFFFF;" /></button>
      </div>
    </header>
    <nav>
      <RouterLink to="/"><h3><v-icon name="fa-desktop" /> Devices</h3></RouterLink>
      <RouterLink to="about"><h3><v-icon name="co-about-me" /> About</h3></RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>

header {
  width: 100%; 
  height: 6vh; 
  position: fixed;
  top: 0; 
  left: 0; 
  z-index: 1000; 
  
  background-color: #26a69a;

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
  padding-top:  8vh;
  left: 0;
  top: 0vh; 
  width: 8%;
  height: 100vh; 
  /*background-color: #333; */
  background-image: linear-gradient(to bottom, #26a69a, #ffffff);
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

button {
  background-color: #26a69a; 
  border: none;
  color: white;
  padding: 7px 14px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 1px 0.5px;
  cursor: pointer;
  border-radius: 8px;
}

button:hover {
  background-color: #009688;
}

</style>