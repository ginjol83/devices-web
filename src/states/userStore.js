import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('userStore', {
  state: () => ({
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