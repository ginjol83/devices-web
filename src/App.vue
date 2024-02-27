<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  
</script>

<template>
  <header>
    <h1>Devices manager</h1>
  </header>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="about">About</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>

header {
  width: 100%; 
  height: 10vh; 
  position: fixed;
  top: 0; 
  left: 0; 
  z-index: 1000; 
  background-color: #f2f2f2; 
}

h1{
  margin-left: 10%;
  padding-top: 5px;
}

nav {
  position: fixed;
  left: 0;
  top: 10vh; 
  width: 10%;
  height: 90vh; 
  background-color: #333; 
  color: white; 
  z-index: 500; 
}

.content {
  margin-left: 10%; 
  margin-top: 10vh; 
}

.RouterView {
  margin-top: 10vh; 
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