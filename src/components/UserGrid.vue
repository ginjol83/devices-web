<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../states/userStore.js'; // Asegúrate de que la ruta al store sea la correcta
import { OhVueIcon, addIcons } from 'oh-vue-icons';

import { BiMusicPlayer,PrFilterSlash ,RiAddLine,FaCaretDown, PrFilter, IoAddOutline,  
  FaRegularTrashAlt , FcGlobe, OiRepoPull, FaRegularEdit, RiDeleteBin5Line, MdFibernewTwotone } from 'oh-vue-icons/icons'


const userStore = useUserStore();

// Definir los iconos a usar
addIcons ( BiMusicPlayer,PrFilterSlash ,RiAddLine,FaCaretDown, PrFilter, IoAddOutline,  
  FaRegularTrashAlt , FcGlobe, OiRepoPull, FaRegularEdit, RiDeleteBin5Line, MdFibernewTwotone )

const isModalOpen = ref(false);
const editingMode = ref(false); 
const currentUserUuid = ref(''); 
const modalType = ref('');  

// Definir refs para cada atributo del usuario
const uuid = ref('');
const name = ref('');
const username = ref('');
const email = ref('');
const role = ref('');
const registration_date = ref('');
const bio = ref('');
const password = ref('')

// Definir variables para filtros 
const uuidFilter = ref('')
const nameFilter = ref('')
const usernameFilter = ref('')
const emailFilter = ref('')
const roleFilter = ref('')
const registrationDateFilter = ref('')

//funcion para limpiar los filtros
const cleanFilters = () => {
  uuidFilter.value = ''
  nameFilter.value = ''
  usernameFilter.value = ''
  emailFilter.value = ''
  roleFilter.value = ''
  registrationDateFilter.value = ''
}

// Función para manejar la presentación de la información en el formulario
const prepareFormForEdit = (uuid, user) => {
  name.value = user.name;
  username.value = user.username;
  email.value = user.email;
  role.value = user.role;
  registration_date.value = user.registration_date;
  bio.value = user.bio;
  currentUserUuid.value = uuid;
};

// Función para limpiar el formulario
const clearForm = () => {
  uuid.value = '';
  name.value = '';
  username.value = '';
  email.value = '';
  role.value = '';
  registration_date.value = '';
  bio.value = '';
  password.value = '';
};

// Función para abrir/cerrar el modal y configurar el modo de edición
const toggleModal = (isEditing = false, uuid = '', user = null) => {
  isModalOpen.value = !isModalOpen.value;
  editingMode.value = isEditing;
  modalType.value = isEditing ? "Modify User" : "Add New User";
  if (isEditing) {
    prepareFormForEdit(uuid, user);
  } else {
    clearForm();
  }
};

// Función para manejar el envío del formulario
const handleSubmit = async () => {
  const formData = {
    uuid: uuid.value,
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value,
    role: role.value,
    registration_date: registration_date.value,
    bio: bio.value,
  };

  try {
    if (editingMode.value) {
      // Modificar usuario
      userStore.modifyUser(currentUserUuid.value, formData,userStore.currentPage);
    } else {
      // Agregar usuario
      userStore.addUser(formData,userStore.currentPage);
    }
    toggleModal();
  } catch (error) {
    console.error('Error al enviar los datos:', error);
  }
};

onMounted(() => {
  userStore.fetchUsers(1);
});
</script>

<template>
  <div v-if="isModalOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="toggleModal">&times;</span>
      <h2>{{ modalType }}</h2>

      <form @submit.prevent="handleSubmit">
        <div>
          <label for="name">Name:</label>
          <input id="name" v-model="name" type="text" required />
        </div>
        <div>
          <label for="username">User Name:</label>
          <input id="username" v-model="username" type="text" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="text" required />
        </div>
        <div>
          <label for="password" v-if="modalType == 'Add New User'">Password:</label>
          <input id="password" v-model="password" v-if="modalType == 'Add New User'" type="text" required />
        </div>
        <div>
          <label for="role">Role:</label>
          <input id="role" v-model="role" type="text" required />
        </div>
        <div>
          <label for="bio">Bio:</label>
          <textarea id="bio" v-model="bio"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  <div id="filter-form" class="filter-form">
  <div class="filter-div">
    <div>
      <label for="uuid">UUID:</label>
      <input type="text" id="uuid" v-model="uuidFilter" name="uuid">
    </div>
    
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="nameFilter" name="name">
    </div>
    
    <div>
      <label for="username">User Name:</label>
      <input type="text" id="username" v-model="usernameFilter" name="username">
    </div>
    
    <div>
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="emailFilter" name="email">
    </div>
    
    <div>
      <label for="role">Role:</label>
      <input type="text" id="role" v-model="roleFilter" name="role">
    </div>
    <div>
      <button class="user-button" @click="toggleModal(false, '', null)">
        <v-icon name="ri-add-line" scale="0.8" style="color: white;" @click="toggleModal(true, '', null)" /> Add
      </button>
      <button class="user-button" 
        @click="userStore.fetchUsers(1, uuidFilter, nameFilter, usernameFilter, emailFilter, roleFilter, registrationDateFilter)"
        >
        <v-icon name="pr-filter" scale="0.8" />Filter
      </button> 
      <button class="user-button" @click="cleanFilters()">
        <v-icon name="pr-filter-slash" scale="0.8" /> Clean
      </button>
    </div>
  </div>
</div>


  <div id="user-table">
    <table>
      <thead>
        <tr>
          <th>Uuid</th>
          <th>Name</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userStore.users" :key="user.uuid">
          <td>{{ user.uuid }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <v-icon name="fa-regular-edit" @click="toggleModal(true, user.uuid, user)" />
            <v-icon name="fa-regular-trash-alt" @click="userStore.deleteUser(user.uuid)" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="data-base-navigator">
  <button class="pagination-button" @click="userStore.fetchUsers(userStore.currentPage > 1 ? userStore.currentPage - 1 : userStore.currentPage, uuidFilter.value, nameFilter.value, usernameFilter.value, emailFilter.value, roleFilter.value, registrationDateFilter.value)">
    < Prev
  </button>
  <span class="pagination-text">Page: {{ userStore.currentPage }}</span>
  <button class="pagination-button"
    @click="userStore.fetchUsers(
      userStore.currentPage < Math.ceil(userStore.totalElements / userStore.limit) ? userStore.currentPage + 1 : userStore.currentPage,
      uuidFilter.value,
      nameFilter.value,
      usernameFilter.value,
      emailFilter.value,
      roleFilter.value,
      registrationDateFilter.value)"
    >
      Next >
  </button>
</div>
  </div>
</template>
<style scoped>

  .pagination-text{
    margin-left: 15px;
    margin-right: 15px;
  }

  .data-base-navigator {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    margin-top: 10px;
  }

  .filter-form{
    display: flex; 
    flex-wrap: wrap; 
    align-items: center; 
    justify-content: space-between;
  }
  .filter-div{
    display: flex; 
    flex-wrap: wrap; 
    align-items: center; 
    gap: 20px; 
    flex-grow: 1;
  }
  .data-base-navigator{
    width: 100%;
    padding: 0%;
  }
  .user-button {
    background-color: #26a69a; 
    border: none;
    color: white;
    padding: 7px 14px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: 1px 0.5px;
    margin-top: 15px;
    cursor: pointer;
    border-radius: 8px;
  }

  .user-button:hover {
    background-color: #009688;
  }

  .pagination-button {
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

  .pagination-button:hover {
    background-color: #009688;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid black;
  }

  th, td {
    padding: 8px;
    text-align: left;
    border: 1px solid black;
    font-size:80%;
    border-left: none;
   border-right: none;
  }

  table tr:nth-child(odd) {
  background-color: #f2f2f2; /* Color para las filas impares */
}

table tr:nth-child(even) {
  background-color: #ffffff; /* Color para las filas pares */
}
  th {
    background-color: #26a69a; 
    color: white; 
    font-weight: bold; 
  }
  th.uuid, td.uuid { width: 350px; }
  th.name, td.name { width: 250px; }
  th.username, td.username { width: 200px; }
  th.email, td.email { width: 250px; }
  th.role, td.role { width: 150px; }
  th.registration_date, td.registration_date { width: 180px; }
  th.bio, td.bio { width: 200px; }
  th.actions, td.actions { width: 100px; }

  .modal {
  position: fixed; 
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto; 
  padding: 20px;
  border: 1px solid #888;
  width: 30%; 
  max-height: 90vh; 
  overflow-y: auto;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

  label {
    display: block;
    margin-bottom: 5px;
    color: #333;
    font-size: 16px;
    font-weight: bold;
  }

input {
 max-width: 140px;
 
}

  input[type="text"],
  input[type="date"],
  select {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; 
  }


  button[type="submit"] {
    width: 100%;
    background-color: #26a69a; 
    color: white;
    padding: 10px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease; 
  }

  button[type="submit"]:hover {
    background-color: #009688;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }


</style>