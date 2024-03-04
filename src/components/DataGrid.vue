<script setup>
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiMusicPlayer, FaRegularTrashAlt , FcGlobe, OiRepoPull, FaRegularEdit, RiDeleteBin5Line, MdFibernewTwotone } from 'oh-vue-icons/icons'
import { ref, onMounted } from 'vue';
import axios from 'axios';
// import { deviceStore } from '../states/deviceStore'; // Asegúrate de que la ruta al store sea la correcta


//Add Icons
addIcons(BiMusicPlayer, FcGlobe,FaRegularTrashAlt , OiRepoPull, FaRegularEdit, RiDeleteBin5Line, MdFibernewTwotone)

const isModalOpen = ref(false);
const editingMode = ref(false); 
const currentUuid = ref(''); 

const modalType = ref('');  

const responseData = ref(null);
const responseDataPage = ref(null);
const responseDataLimit = ref(null);
const responseDataTotalElements = ref(null);

const name = ref('');
const type = ref('');
const brand = ref('');
const model = ref('');
const registration_date = ref('');
const status = ref('');

const nameFilter = ref('');
const typeFilter = ref('');
const brandFilter = ref('');
const modelFilter = ref('');
const registrationDateFilter = ref('');
const statusFilter = ref('');

const truncateText = (text, length) => {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length) + '...';
};

const deleteDevice = async (uuid) => {
  const isConfirmed = confirm(`¿Estás seguro de querer eliminar el dispositivo con UUID: ${uuid}?`);

  if (isConfirmed) {
    try {
      await axios.delete(`https://localhost:3000/device/${uuid}`);
      console.log(`Dispositivo con UUID: ${uuid} ha sido eliminado.`);
      fetchData(responseDataPage.value);
    } catch (error) {
      console.error('Error al eliminar el dispositivo:', error); 
    }
  } else {
    console.log('Eliminación cancelada por el usuario.');
  }
};

const handleSubmit = async () => {
  const formData = {
    name: name.value,
    type: type.value,
    brand: brand.value,
    model: model.value,
    registration_date: registration_date.value,
    status: status.value,
  };

  try {
    if (editingMode.value) {
      response = await axios.put(`https://localhost:3000/device/${currentUuid.value}`, formData);
    } else {
      response = await axios.post('https://localhost:3000/device', formData);
    }

    toggleModal();
  } catch (error) {
    console.error('Error al enviar los datos:', error);
  }

  clearForm();
};

const clearForm = () => {
  name.value = '';
  type.value = '';
  brand.value = '';
  model.value = '';
  registration_date.value = '';
  status.value = '';
};

const fetchData = async (page) => {

  try {
    const nameQuery = nameFilter.value?`&name=${nameFilter.value}`:''
    const typeQuery = typeFilter.value?`&type=${typeFilter.value}`:''
    const brandFQuery = brandFilter.value?`&brand=${brandFilter.value}`:''
    const modelFQuery = modelFilter.value?`&model=${modelFilter.value}`:''
    const registrationDateQuery = registrationDateFilter.value?`&registrationDate=${registrationDateFilter.value}`:''
    const statusQuery = statusFilter.value?`&status=${statusFilter.value}`:''

    const queryParams = statusQuery+nameQuery+typeQuery+brandFQuery+modelFQuery+registrationDateQuery

    const response = await axios.get('https://localhost:3000/devices?limit=10&page='+page+'&'+queryParams);
    
    responseData.value =response.data._data.devices
    responseDataPage.value=parseInt(response.data._page.page)
    responseDataLimit.value=parseInt(response.data._page.limit)
    responseDataTotalElements.value= response.data._page.totalElements
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

const toggleModal = (isEditing = false, uuid = '', device = null) => {
  isModalOpen.value = !isModalOpen.value;
  editingMode.value = isEditing;
  if (!isEditing) {
    modalType.value = "Add New Device"
    clearForm();
  } else {
    modalType.value = "Modify Device"
    currentUuid.value = uuid;
    prepareFormForEdit(uuid, device);
  }
};

const prepareFormForEdit = (uuid, device) => {
  name.value = device.name;
  type.value = device.type;
  brand.value = device.brand;
  model.value = device.model;
  registration_date.value = device.registration_date;
  status.value = device.status;
};

onMounted(() => {
  //deviceStore.fetchDevices();
  
  fetchData(1);
});

</script>

<template>
  <div v-if="isModalOpen" class="modal">
    <!-- Modal -->
    <div class="modal-content">
      <span class="close" @click="toggleModal">&times;</span>
      <h2>{{ modalType }}</h2>

      <form @submit.prevent="handleSubmit">
        <div>
          <label for="name">Name: </label>
          <input id="name" v-model="name" type="text" />
        </div>
        <div>
          <label for="type">Type: </label>
          <input id="type" v-model="type" type="text" />
        </div>
        <div>
          <label for="brand">Brand: </label>
          <input id="brand" v-model="brand" type="text" />
        </div>
        <div>
          <label for="model">Model: </label>
          <input id="model" v-model="model" type="text" />
        </div>
        <div>
          <label for="registration_date">Registration Date: </label>
          <input id="registration_date" v-model="registration_date" type="date" />
        </div>
        <div>
          <label for="status">Status: </label>
          <select id="status" v-model="status">
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" >Done </button>
      </form>
    </div>
  </div>
  <div id="filter-form" class = "filter-form">
    <div class="filter-div">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="nameFilter" name="name">
      </div>
      
      <div>
        <label for="type">Type:</label>
        <input type="text" id="type" v-model="typeFilter" name="type">
      </div>
      
      <div>
        <label for="brand">Brand:</label>
        <input type="text" id="brand" v-model="brandFilter" name="brand">
      </div>
      
      <div>
        <label for="model">Model:</label>
        <input type="text" id="model" v-model="modelFilter" name="model">
      </div>
      
      <div>
        <label for="registration_date">Registration Date:</label>
        <input type="date" id="registration_date" v-model="registrationDateFilter" name="registration_date">
      </div>
      
      <div>
        <label for="status">Status</label>
        <select id="status" v-model="statusFilter">
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
      </div>
      <div >
        <button class="device-button" @click="fetchData(1)">
          Filter
        </button>
        <button class="device-button" @click="toggleModal(false, '', null)">
                Add
              </button>
      </div>
    </div>
    
  </div>
  <table>
    <thead>
      <tr>
        <th class="uuid">Uuid</th>
        <th class="name">Name</th>
        <th class="type">Type</th>
        <th class="brand">Brand</th>
        <th class="model">Model</th>
        <th class="registration_date">Registration Date</th>
        <th class="status">Status</th>
        <th class="actions">Actions</th>        
      </tr>
    </thead>
    <tbody>
      <tr v-for="device in responseData" :key="device.uuid">
        <td>{{ truncateText(device.uuid, 50) }}</td>
        <td>{{ truncateText(device.name, 15) }}</td>
        <td>{{ truncateText(device.type, 12) }}</td>
        <td>{{ truncateText(device.brand, 10) }}</td>
        <td>{{ truncateText(device.model, 10) }}</td>
        <td>{{ truncateText(device.registration_date, 12) }}</td>
        <td>{{ truncateText(device.status, 8) }}</td>
        <td>
          <v-icon name="fa-regular-edit" @click="toggleModal(true, device.uuid, device)" />
          <v-icon name="fa-regular-trash-alt" @click="deleteDevice(device.uuid)" />
        </td>
      </tr>
    </tbody>
  </table>
  <div class="data-base-navigator">
    <button class="device-button" @click="fetchData(responseDataPage>1?responseDataPage-1:responseDataPage)">
      < Prev
    </button>
    <span class="pagination-text">  Page:  {{responseDataPage}}  </span> 
    <button class="device-button" 
      @click="fetchData(responseDataLimit/responseDataTotalElements>responseDataPage-1 && responseDataTotalElements>responseDataLimit ?responseDataPage+1:responseDataPage)"> 
      Next >
    </button>
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
  .device-button {
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

  .device-button:hover {
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
  th.type, td.type { width: 200px; }
  th.brand, td.brand { width: 200px; }
  th.model, td.model { width: 200px; }
  th.registration_date, td.registration_date { width: 180px; }
  th.status, td.status { width: 100px; }
  th.actions, td.actions { width: 70px; }

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