import { useAuthStore } from '~/store/auth'
import { apiBaseUrl } from '~/config'

export const useAuth = () => {
  const authStore = useAuthStore()

  const login = async (username: string, password: string) => {
    try {
      const body = new URLSearchParams({
        username: username,
        password: password,
      })
      const data = await apiFetch(`${apiBaseUrl}/api/login`, 'POST', body, false, {
        'Content-Type': 'application/x-www-form-urlencoded',
      })
      if (data) {
        authStore.setToken(data.access_token)
        navigateTo('/tasks')
      }
      else {
        alert(data.detail)
      }
    }
    catch {
      alert('ログイン中に不明なエラーが発生しました。')
    }
  }

  const logOut = async () => {
    authStore.logout()
    navigateTo('/')
  }

  return {
    login,
    logOut,
  }
}
