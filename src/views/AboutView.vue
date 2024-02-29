<script setup>
// Aquí puedes importar cualquier dependencia necesaria o definir datos reactivos/composables si es necesario.
</script>

<template>
  <main class="about-page">
    <section class="hero">
      <h1>Devices Manager App</h1>
    </section>

    <section class="content">
      <h2>Developed by</h2>
      <p>Andrés Giménez</p>

      <h2>Contact us</h2>
      <p>click to <a href="mailto:andres.gimenez@solarisdevelopments.com">send mail</a>.</p>
    </section>
  </main>
</template>

<style scoped>


body {
  background-image: linear-gradient(to bottom, #007bff, #ffffff);
}
.about-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  background-color: #f0f0f0;
  text-align: center;
  padding: 40px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.hero h1 {
  margin-bottom: 10px;
}

.hero p {
  margin-top: 0;
}

.content {
  float: left;
}

.content h2 {
  color: #333;
  margin-top: 20px;
}

.content p {
  color: #666;
  line-height: 1.6;
}

a {
  color: #007bff;
}
</style>
