import { apiBaseUrl } from '../config'
import type { TagResponse, CreateTagRequest, UpdateTagRequest } from '~/types/tag'

export const useTag = () => {
  const tags = ref<TagResponse[]>([])

  const createTag = async (name: string, color: number) => {
    const body: CreateTagRequest = { name, color }
    const data = await apiFetch(`${apiBaseUrl}/api/tag/create`, 'POST', body)
    return data !== null // データが返ってきたらtrueを返す。nullの場合はfalseを返す
  }

  const fetchTags = async () => {
    const data = await apiFetch(`${apiBaseUrl}/api/tags`, 'GET')
    return tags.value = data // データが返ってきたらtrueを返す。nullの場合はfalseを返す
  }

  const updateTag = async (tagId: number, name: string, color: number) => {
    const body: UpdateTagRequest = { name, color }
    const data = await apiFetch(`${apiBaseUrl}/api/tag/update?tag_id=${tagId}`, 'PUT', body)
    return data !== null
  }

  const deleteTag = async (tagId: number) => {
    const data = await apiFetch(`${apiBaseUrl}/api/tag/delete?tag_id=${tagId}`, 'DELETE')
    return data !== null
  }

  return {
    createTag,
    fetchTags,
    updateTag,
    deleteTag,
    tags,
  }
}
