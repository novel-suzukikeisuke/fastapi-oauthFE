export type UserResponse = {
  id: Int
  username: string
  email: string
  disabled: boolean
  role: number
  detail?: string
}

export type SignUpUserRequest = {
  username: string
  email: string
  password: string
}

export type UpdateUserRequest = {
  username: string
  email: string
  password: string
  role: number
}

export type DisabledUserRequest = {
  disabled: boolean
}
