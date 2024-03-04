<script setup>
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiPersonFill, FcManager  } from 'oh-vue-icons/icons'
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '../states/userStore.js';

addIcons(FcManager, BiPersonFill);

const userStore = useUserStore(); // Usar store de Pinia
const show = ref(true);
const username = ref('');
const password = ref('');
const loginError = ref(false); 

const login = async () => {  
  try {
    const response = await axios.get(`https://localhost:3000/users?username=${username.value}&password=${password.value}`);
    if (response.data._data.users.length > 0) {
      show.value = false;
      userStore.setUser(response.data._data.users[0]); // Usando una acción de Pinia
      userStore.setLogged(true); 
    } else { 
      loginError.value = true; 
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}
</script>

<template>
    <div class="modal-backdrop" v-if="show">
      <div class="modal">
        <h2><v-icon name="bi-person-fill" scale="2.0" />Login</h2>
        
        <form @submit.prevent="login" class="login-form">
          <div class="input-group">
            <input type="text" placeholder="Username" v-model="username" />
          </div>
          <div class="input-group">
            <input type="password" placeholder="Password" v-model="password" />
          </div>
          <p v-if="loginError" class="error-message">Username or password incorrect. Please try again.</p>
          <button type="submit" class="login-button">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  
  
  <style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background-color: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 400px;
    max-width: 90%;
  }
  
  h2 {
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .login-button {
    width: 100%;
    padding: 10px;
    background-color: #26a69a;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .login-button:hover {
    background-color: #009688;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
  }
  </style>
  