export type TagResponse = {
  id: number
  name: string
  color: number
  user_id: number
  detail?: string
}

export type CreateTagRequest = {
  name: string
  color: number
}

export type CreateTagRequest = {
  name: string
  color: number
}

export type UpdateTagRequest = {
  name?: string
  color: number
}
