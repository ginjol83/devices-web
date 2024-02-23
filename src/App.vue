<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Devices manager</h1>
  </header>
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
.RouterView {
  margin-top: 10vh; 
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}


nav a {
  display: inline-block;
  padding: 0 1rem;
 /* border: 1px solid var(--color-border); */
}

nav a:first-of-type {
  border: 0;
}


</style>
