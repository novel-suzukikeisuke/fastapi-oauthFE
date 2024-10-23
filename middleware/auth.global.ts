import { useAuthStore } from '~/store/auth';
import { UserRole } from '~/constants/userRole';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const { fetchUser } = useUser();

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
      const user = await fetchUser();

      if (user) {
        if (to.path === '/users' && user.role !== UserRole.ADMIN) {
          return navigateTo('/tasks');
        }
      }
    }
  }
});
