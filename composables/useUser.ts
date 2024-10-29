import { ref } from 'vue'
import { apiBaseUrl } from '../config'
import type { UserResponse, SignUpUserRequest, UpdateUserRequest, DisabledUserRequest } from '~/types/user'

export const useUser = () => {
  const user = ref<UserResponse>()
  const users = ref<UserResponse[]>([])

  const signUp = async (username: string, email: string, password: string) => {
    const body: SignUpUserRequest = { username, email, password }
    const data = await apiFetch(`${apiBaseUrl}/api/signUp`, 'POST', body)
    if (data !== null) {
      navigateTo('/')
    }
    return data !== null
  }

  const fetchUser = async () => {
    const data = await apiFetch(`${apiBaseUrl}/api/user`, 'GET')
    return user.value = data
  }

  const fetchUsers = async () => {
    const data = await apiFetch(`${apiBaseUrl}/api/users`, 'GET')
    return users.value = data
  }

  const updateUser = async (userId: number, username: string, email: string, password: string, role: number) => {
    const body: UpdateUserRequest = { username, email, password, role }
    const data = await apiFetch(`${apiBaseUrl}/api/user/update?user_id=${userId}`, 'PUT', body)
    return data !== null
  }

  const updateUserDisabled = async (userId: number, disabled: boolean) => {
    const body: DisabledUserRequest = { disabled }
    const data = await apiFetch(`${apiBaseUrl}/api/user/disabled?user_id=${userId}`, 'PUT', body)
    return data !== null
  }

  return {
    signUp,
    fetchUser,
    fetchUsers,
    updateUser,
    updateUserDisabled,
    users,
    user,
  }
}
