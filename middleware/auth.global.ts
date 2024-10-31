import { useAuthStore } from '~/store/auth'
import { UserRole } from '~/constants/userRole'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const { fetchUser } = useUser()

  const NOT_AUTH_PAGES = ['/signUp', '/']

  // クライアントサイドのみでトークンをロード
  await authStore.loadToken()

  // トークンが存在しない場合はログインページへリダイレクト
  if (!authStore.token && !NOT_AUTH_PAGES.includes(to.path)) {
    return navigateTo('/', { replace: true })
  }

  if (authStore.token) {
    const user = await fetchUser()

    // 認証済みのユーザーがNOT_AUTH_PAGESにアクセスした場合は/tasksにリダイレクト
    if (NOT_AUTH_PAGES.includes(to.path)) {
      return navigateTo('/tasks', { replace: true })
    }

    // ユーザーがADMINでない場合は/usersページへのアクセスを制限
    if (user && to.path === '/users' && user.role !== UserRole.ADMIN) {
      return navigateTo('/tasks', { replace: true })
    }
  }
})
