import { ref } from 'vue';
import { apiBaseUrl } from '../config';
import type { UserResponse } from '~/types/user';
import { useAuthStore } from '~/store/auth';

export const useUser = () => {
  const users = ref<UserResponse[]>([]); // ユーザーリストを格納するref
  const error = ref<string | null>(null); // エラーを格納するref
  const authStore = useAuthStore();

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
      const data: UserResponse = await response.json()
      if (response.ok) {
        navigateTo('/')
      } else  {
        alert(data.error)
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const fetchUsers = async () => {
    authStore.loadToken();
    try {
      const response = await fetch(`${apiBaseUrl}/api/users`, {
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        },
      });

      if (response.ok) {
        users.value = await response.json(); // ユーザー情報を取得
      } else {
        error.value = `エラー: ${response.status}`;
      }
    } catch (err) {
      console.error('ユーザー情報の取得に失敗しました', err);
      error.value = 'ユーザー情報の取得に失敗しました';
    }
  };

  const updateUser = async (userId: number, username: string, email: string, password: string, role: string) => {
    authStore.loadToken();
    try {
      const response = await fetch(`${apiBaseUrl}/api/user/update?user_id=${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          role: role
        })
      })
      const data: UserResponse = await response.json()
      if (response.ok) {
        return true;
      } else  {
        alert(data.error)
        return false;
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const deleteUser = async (userId: number, disabled: boolean) => {
    authStore.loadToken();
    try {
      const response = await fetch(`${apiBaseUrl}/api/users/disabled?user_id=${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          disabled: disabled
        })
      })
      const data: UserResponse = await response.json()
      if (response.ok) {
        return true;
      } else  {
        alert(data.error)
        return false;
      }
    } catch (error) {
      console.error('An error occurred:', error)
      return false;
    }
  }

  return {
    signUp,
    fetchUsers,
    updateUser,
    deleteUser,
    users
  };
};