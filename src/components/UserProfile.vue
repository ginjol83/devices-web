<script setup>

    import { ref } from 'vue';
    import { OhVueIcon, addIcons } from 'oh-vue-icons'
    import { IoPersonCircle  } from 'oh-vue-icons/icons'

    //Add Icons
    addIcons( IoPersonCircle   )

    const userName = ref('');
    const userEmail = ref('');
    const userRole = ref('');
    const userBio = ref('');
   
</script>

<template>
    <div class="user-profile">
        <div class="avatar">
            <v-icon name="io-person-circle" scale="3" />
            <!--img :src="user.avatar" alt="User Avatar" /-->
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
         <button type="submit" class="submit-btn">Save Changes</button>
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
    background-color: #5e85b0; 
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
  background-color: #0056b3;
}
</style>
  