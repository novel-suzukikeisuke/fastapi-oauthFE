import { apiBaseUrl } from '../config';
import type { AuthResponse } from '~/types/user';

export const useUser = () => {
  const signUp = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      })
      const data: AuthResponse = await response.json()
      if (response.ok) {
        navigateTo('/auth/login')
      } else  {
        alert(data.error)
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return {
    signUp
  };
};