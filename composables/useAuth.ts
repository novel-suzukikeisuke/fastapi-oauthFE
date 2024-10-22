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
        navigateTo('/tasks')
      } else {
        switch (response.status) {
          case 401:
            alert('無効なリクエストです。パスワードを確認してください。');
            break;
          case 404:
            alert('無効なリクエストです。ユーザー名を確認してください。');
            break;
          case 500:
            alert('サーバー内部エラーが発生しました。しばらくしてから再度お試しください。');
            break;
          default:
            alert('ログインに失敗しました。');
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('ネットワークエラーが発生しました。');
    }
  };

  const logOut = async () => {
    authStore.logout();
    navigateTo('/');
  };

  return {
    login,
    logOut
  };
};