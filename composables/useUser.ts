import { ref } from 'vue';
import { apiBaseUrl } from '../config';
import { useAuthStore } from '~/store/auth';
import type { UserResponse } from '~/types/user';

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
        alert(data.detail)
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const fetchUser = async () => {
    if (!authStore.token) return null;
    try {
      const response = await fetch(`${apiBaseUrl}/api/user`, {
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        },
      });
      if (response.ok) {
        const userData: UserResponse = await response.json();
        return userData;
      } else {
        console.error('Failed to fetch user:', response.statusText);
        return null;
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      return null;
    }
  };

  const fetchUsers = async () => {
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
        alert(data.detail)
        return false;
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const updateUserDisabled = async (userId: number, disabled: boolean) => {
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
        alert(data.detail)
        return false;
      }
    } catch (error) {
      console.error('An error occurred:', error)
      return false;
    }
  }

  return {
    signUp,
    fetchUser,
    fetchUsers,
    updateUser,
    updateUserDisabled,
    users
  };
};