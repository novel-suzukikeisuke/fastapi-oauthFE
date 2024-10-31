import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
  }), // どういう役割をしているか
  actions: {
    setToken(token: string) {
      this.token = token
      const jwtCookie = useCookie('jwtToken')
      jwtCookie.value = token
    },
    logout() {
      this.token = null
      const jwtCookie = useCookie('jwtToken')
      jwtCookie.value = null
    },
    loadToken() {
      const jwtCookie = useCookie('jwtToken')
      if (jwtCookie.value) {
        this.token = jwtCookie.value
      }
    },
  },
})
