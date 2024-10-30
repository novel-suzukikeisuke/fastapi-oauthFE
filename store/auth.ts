import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
  }), // どういう役割をしているか
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('jwtToken', token)
    },
    logout() {
      this.token = null
      localStorage.removeItem('jwtToken')
    },
    loadToken() {
      const token = localStorage.getItem('jwtToken')
      if (token) {
        this.token = token
      }
    },
  },
})
