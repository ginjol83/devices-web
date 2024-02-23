<script setup>
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiMusicPlayer, FcGlobe, OiRepoPull, MdEditOutlined, RiDeleteBin5Line, MdFibernewTwotone } from 'oh-vue-icons/icons'
import { ref, onMounted } from 'vue';
import axios from 'axios';

//Add Icons
addIcons(BiMusicPlayer, FcGlobe, OiRepoPull, MdEditOutlined, RiDeleteBin5Line, MdFibernewTwotone)

const responseData = ref(null);

const fetchData = async () => {
  try {
    const response = await axios.get('https://localhost:3000/devices');
    responseData.value = response.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

onMounted(() => {
  fetchData();
});

</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Uuid</th>
        <th>Name</th>
        <th>Type</th>
        <th>Brand</th>
        <th>Model</th>
        <th>Registration_date</th>
        <th>Status</th>
        <th>Actions</th>
        
      </tr>
    </thead>
    <tbody>
      <!-- Generación de filas -->
      <tr v-for="device in responseData" :key="device.uuid">
        <td>{{ device.uuid }}</td>
        <td>{{ device.name }}</td>
        <td>{{ device.type }}</td>
        <td>{{ device.brand }}</td>
        <td>{{ device.model }}</td>
        <td>{{ device.registration_date }}</td>
        <td>{{ device.status }}</td>
        <td>
          <v-icon name="md-edit-outlined" />
          <v-icon name="ri-delete-bin-5-line" />
        </td>
      </tr>
      <tr>
        <td colspan="8">
          <div class="data-base-navigator">
            <button class="device-button">Add</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  
</template>

<style scoped>

  .data-base-navigator{
    width: 100%;
    padding: 0%;
   /* border: 1px solid black;*/
  }
  .device-button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 1px 0.5px;
    cursor: pointer;
    border-radius: 8px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 8px;
    text-align: left;
    border: 1px solid black;
  }

  th {
    background-color: #f2f2f2; /* Color de fondo para la cabecera */
    color: #000; /* Color de texto para la cabecera */
    font-weight: bold; /* Hace que el texto de la cabecera sea en negrita */
  }
</style>