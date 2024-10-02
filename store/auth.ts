import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
  }), //どういう役割をしているか
  actions: {
    setToken(token: string) {
      this.token = token;
      if (import.meta.client) {
        localStorage.setItem('jwtToken', token);
      }
    },
    logout() {
      this.token = null;
      if (import.meta.client) {
        localStorage.removeItem('jwtToken');
      }
    },
  },
});
