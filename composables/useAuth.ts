import { useAuthStore } from '~/store/auth';
import { apiBaseUrl } from '~/config';
import type { AuthResponse } from '~/types/login';

export const useAuth = () => {
  const authStore = useAuthStore();

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'username': username,
          'password': password,
        })
      })
      const data: AuthResponse = await response.json()
      console.log(data)
      if (response.ok) {
        authStore.setToken(data.access_token);
        navigateTo('/tasks')
      } else {
        alert(`ログインに失敗しました: ${data.detail}`)
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const logOut = async () => {
    authStore.logout();
    navigateTo('/');
  };

  return {
    login,
    logOut
  };
};