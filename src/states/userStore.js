import { defineStore } from 'pinia';

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
    }
  },
});