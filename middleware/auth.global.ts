import { useAuthStore } from '~/store/auth'
import { UserRole } from '~/constants/userRole'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const { fetchUser } = useUser()

  const NOT_AUTH_PAGES = ['/signUp', '/']

  // クライアントサイドのみでトークンをロード
  if (import.meta.client) {
    await authStore.loadToken()

    // トークンが存在しない場合はログインページへリダイレクト
    if (!authStore.token && !NOT_AUTH_PAGES.includes(to.path)) {
      setTimeout(() => navigateTo('/', { replace: true }), 100) // 遷移後レイアウトが崩れるため100ms程度の遅延を追加
      return
    }

    if (authStore.token) {
      try {
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
      catch {
        // トークンが無効または取得に失敗した場合、トークンを削除してログインページへリダイレクト
        authStore.logout()
        return navigateTo('/', { replace: true })
      }
    }
  }
})
