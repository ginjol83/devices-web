<script setup>
  import { OhVueIcon, addIcons } from 'oh-vue-icons'
  import { RouterLink } from 'vue-router';

  import { FaDesktop, CoAboutMe, FaUserCircle, RiLogoutCircleLine,FaUsers    } from 'oh-vue-icons/icons'
  import LoginModal from './components/LoginModal.vue';
  import { useUserStore } from './states/userStore'; // Asegúrate de que la ruta al store sea la correcta
  import { ref, computed, onMounted } from 'vue';
  import Cookies from 'js-cookie';

  const show = ref(true);
  // Add Icons
  addIcons(FaDesktop, CoAboutMe, FaUserCircle, RiLogoutCircleLine, FaUsers );
  const userStore = useUserStore();  
  const user = computed(() => userStore.getUser);
  
  const logout = () => {
    if (confirm("Are you sure you want to log out?")) {
      Cookies.remove('useruuid')
      show.value = true;
      window.location.reload();
    }
  }
  onMounted(() => {
  
    const userUuid = Cookies.get('useruuid');
  
  if (userUuid) {
    userStore.fetchUserByUuid(userUuid)
    show.value = false;
  } else {
    show.value = true;
  }
});


</script>

<template>
  <login-modal v-if="show" />
  <div v-if="!show">
    <header>
      <h1 style="margin: 0; color: white;">Devices Manager</h1>
      <div>
        <span style="margin: 0; color: white;"> User: {{ user.username }} </span>
        <RouterLink to="user-profile"><v-icon name="fa-user-circle" scale="2.6" style="color: #FFFFFF;"/></RouterLink>
        <button style="background-color: black; color: #FFFFFF;"><v-icon name="ri-logout-circle-line" scale="2.4"  
          @click="logout()" /></button>
      </div>
    </header>
    <nav>
      <RouterLink to="/"><h3><v-icon name="fa-desktop" /> Devices</h3></RouterLink>
      <RouterLink to="/user-manager"><h3><v-icon name="fa-users" /> Users</h3></RouterLink>
      <RouterLink to="/about"><h3><v-icon name="co-about-me" /> About</h3></RouterLink>
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
  background-color: #000000;
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  height: 60px; 
  padding: 0 20px;
} 

nav {
  position: fixed;
  padding-top:  8vh;
  left: 0;
  top: 0vh; 
  width: 8%;
  height: 100vh; 
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