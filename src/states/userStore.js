import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
    currentPage: 1,
    limit: 10,
    totalElements: 0,
    user: {
      avatar: '',
      bio: '',
      created_at: '',
      email: '',
      name: '',
      password: '',
      role: '',
      updated_at: '',
      username: '',
      uuid: '',
     
    },
    logged: false,
  }),
  getters: {
    getUser: (state) => state.user,
    isLogged: (state) => state.logged,
  },
  actions: {
    setUser(userData) {
      this.user = { ...this.user, ...userData };
    },
    setLogged(isLog) {
      this.logged = !isLog;
    },
    async addUser(formData,page) {
      try {
        await axios.post('https://localhost:3000/user', formData);
        const response = await axios.get(`https://localhost:3000/users?limit=10&page=${page}`);
        this.users = response.data._data.users;
        console.log(response.data)
        this.currentPage = parseInt(response.data._page.page);
        this.limit = parseInt(response.data._page.limit);
        this.totalElements = response.data._page.totalElements;
      } catch (error) {
        console.error('Error al crear dispositivo:', error);
      }
    },
    async modifyUser(uuid, formData,page) {
      try {
        await axios.put(`https://localhost:3000/user/${uuid}`, formData)
        const response = await axios.get(`https://localhost:3000/users?limit=10&page=${page}`);
        this.users = response.data._data.users;
        this.currentPage = parseInt(response.data._page.page);
        this.limit = parseInt(response.data._page.limit);
        this.totalElements = response.data._page.totalElements;
      } catch (error) {
        console.error('Error al modificar los dispositivos:', error);
      }
    },
    async fetchUsers(page, uuidFilter, nameFilter, usernameFilter, emailFilter, roleFilter, registrationDateFilter) {
      console.log(page)
      const uuidQuery = uuidFilter ? `&uuid=${uuidFilter}` : '';
      const nameQuery = nameFilter ? `&name=${nameFilter}` : '';
      const usernameQuery = usernameFilter ? `&username=${usernameFilter}` : '';
      const emailQuery = emailFilter ? `&email=${emailFilter}` : '';
      const roleQuery = roleFilter ? `&role=${roleFilter}` : '';
      const registrationDateQuery = registrationDateFilter ? `&registrationDate=${registrationDateFilter}` : '';
      const filterParams = uuidQuery + nameQuery + usernameQuery + emailQuery + roleQuery + registrationDateQuery;
    
      try {
        const response = await axios.get(`https://localhost:3000/users?limit=10&page=${page}${filterParams}`);
    
        this.users = response.data._data.users;
        this.currentPage = parseInt(response.data._page.page);
        this.limit = parseInt(response.data._page.limit);
        this.totalElements = response.data._page.totalElements;
    
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    },    
    async deleteUser(uuid) {
        
      if (confirm(`¿Estás seguro de querer eliminar el dispositivo con UUID: ${uuid}?`)) {
        try {
          await axios.delete(`https://localhost:3000/user/${uuid}`);
          console.log(`Dispositivo con UUID: ${uuid} ha sido eliminado.`);
          this.fetchUsers(this.currentPage);
        } catch (error) {
          console.error('Error al eliminar el dispositivo:', error);
        }
      } else {
        console.log('Eliminación cancelada por el usuario.');
      }
    },
    async fetchUserByUuid(uuid) {
      try {
        
        const response = await axios.get(`https://localhost:3000/users/${uuid}`);
        
        if (response.data._data && response.data._data.users[0]) {
          this.setUser(response.data._data.users[0]);
          this.setLogged(true);
        } else {
          console.error('User not found');
          this.setLogged(false);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        this.setLogged(false);
      }
    }

  },
});