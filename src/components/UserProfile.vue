<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { IoPersonCircle } from 'oh-vue-icons/icons';
import { useUserStore } from '../states/userStore.js'; 
import Cookies from 'js-cookie';

// Añadir iconos
addIcons(IoPersonCircle);

const userStore = useUserStore();

// Acceder al estado a través de un getter
const user = computed(() => userStore.getUser);

const userName = ref('');
const userEmail = ref('');
const userRole = ref('');
const userBio = ref('');

const updateSuccess = ref(false); 


// Observar cambios en el objeto de usuario
watch(user, (newUser) => {
  userName.value = newUser.username;
  userEmail.value = newUser.email;
  userRole.value = newUser.role;
  userBio.value = newUser.bio;
}, { immediate: true });

const modifyUser = () => {
  const userUuid = Cookies.get('useruuid');
  const formData = {
    username: userName.value,
    email: userEmail.value,
    role: userRole.value,
    bio: userBio.value
  };
  // Suponemos que modifyUser devuelve una promesa
  userStore.modifyUser(userUuid, formData, 1).then(() => {
    updateSuccess.value = true; // Mostrar mensaje de éxito
    setTimeout(() => {
      updateSuccess.value = false; // Ocultar mensaje después de 5 segundos
    }, 3000);
    console.log("Usuario modificado con éxito");
  }).catch(error => {
    console.error("Error al modificar el usuario", error);
  });
}

onMounted(() => {
  const userUuid = Cookies.get('useruuid');
  
  if (userUuid) {
    const us = userStore.fetchUserByUuid(userUuid)
    console.log(us)
  } 
});
</script>

<template>
    <div class="user-profile">
      <p v-if="updateSuccess" style="color: green;">Usuario actualizado con éxito!</p>
        <div class="avatar">
            <v-icon name="io-person-circle" scale="3" />
        </div >
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="userName" />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="userEmail" />
        </div>
        <div class="form-group">
          <label for="role">Role:</label>
          <input type="text" id="role" v-model="userRole" />
        </div>
        <div class="form-group">
          <label for="bio">Bio:</label>
          <textarea id="bio" v-model="userBio"></textarea>
        </div>
         <button type="submit" class="submit-btn" 
          @click="modifyUser()">
            Save Changes
          </button>
          

    </div>
   
  </template>
  
 
  
  <style scoped>

.user-profile {
  background-color: #fff;
  
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%; 
  max-width: 1400px; 

  display: block;
  justify-content: left;
  align-items: left;
  min-height: 10vh; 
  padding: 40px; 
  
}
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
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

.submit-btn:hover {
  background-color: #009688;
}
</style>
