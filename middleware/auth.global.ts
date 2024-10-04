import { useAuthStore } from '~/store/auth';
import { UserRole } from '~/constants/userRole';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const { fetchUser, user } = useUser();

  const NOT_AUTH_PAGES = ['/signUp', '/'];

  // クライアントサイドのみでトークンをロード
  if (import.meta.client) {
    await authStore.loadToken();

    // トークンが存在しない場合はログインページへリダイレクト
    if (!authStore.token && !NOT_AUTH_PAGES.includes(to.path)) {
      setTimeout(() => {
        return navigateTo('/', { replace: true });
      }, 100);  // 遷移後レイアウトが崩れるため100ms程度の遅延を追加
    }

    if (authStore.token) {
      await fetchUser();

      if (user.value && user.value.role) { // user.value と user.value.role を確認
        if (to.path === '/users' && user.value.role !== UserRole.ADMIN) { // user.value.role にアクセス
          return navigateTo('/tasks');
        }
      }
    }
  }
});