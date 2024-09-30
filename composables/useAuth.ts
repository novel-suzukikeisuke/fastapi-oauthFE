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
      if (response.ok) {
        authStore.setToken(data.access_token);
        navigateTo('/user')
      } else {
        alert(data.error)
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