import { ref } from 'vue'
import { apiBaseUrl } from '../config'
import { TaskPagination } from '~/constants/taskPagination'
import type { TaskResponse, PaginatedTasksResponse, SearchTasksRequest } from '~/types/task'

export const useTask = () => {
  const tasks = ref<TaskResponse[]>([])
  const filterTagId = ref<number | null>(null)
  const filterCompleted = ref<number | null>(null)
  const filterStartDate = ref<Date | null>(null)
  const filterEndDate = ref<Date | null>(null)
  const page = ref<number>(TaskPagination.DEFAULT_PAGE)
  const limit = ref<number>(TaskPagination.DEFAULT_LIMIT)
  const totalTasks = ref<number>(TaskPagination.TOTAL_TASK)

  const createTask = async (title: string, description: string, tags: number[], file: File | null) => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('tags', JSON.stringify(tags)) // タグをJSON文字列として送信
    if (file) {
      formData.append('file', file) // ファイルを追加
    }
    const data = await apiFetch(`${apiBaseUrl}/api/task/create`, 'POST', formData)
    return data !== null
  }

  const fetchTasks = async () => {
    const params = new URLSearchParams()
    if (filterTagId.value !== null) params.append('tag_id', String(filterTagId.value))
    if (filterCompleted.value !== null) params.append('completed', String(filterCompleted.value))
    if (filterStartDate.value) params.append('start_date', filterStartDate.value.toISOString())
    if (filterEndDate.value) params.append('end_date', filterEndDate.value.toISOString())
    params.append('page', String(page.value))
    params.append('limit', String(limit.value))

    const queryString = params.toString() ? `?${params.toString()}` : ''
    const data: PaginatedTasksResponse = await apiFetch(`${apiBaseUrl}/api/tasks${queryString}`, 'GET')
    if (data) {
      tasks.value = data.tasks // タスクを設定
      totalTasks.value = data.total_tasks // 総タスク数を設定（必要に応じて）
    }
  }

  // fetchAllTasks関数を実装
  const fetchAllTasks = async () => {
    limit.value = 9999 // 大きな数を設定して全てのタスクを取得
    page.value = 1 // 最初のページにリセット
    await fetchTasks()
  }

  const fetchDefaultTasks = async () => {
    limit.value = 6 // 大きな数を設定して全てのタスクを取得
    page.value = 1 // 最初のページにリセット
    await fetchTasks()
  }

  const updateTask = async (taskId: number, title: string, description: string, completed: number, tags: number[], file: File | null) => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('completed', completed.toString())
    formData.append('tags', JSON.stringify(tags)) // タグをJSON文字列として送信
    if (file) {
      formData.append('file', file) // ファイルを追加
    }
    const data = await apiFetch(`${apiBaseUrl}/api/task/update?task_id=${taskId}`, 'PUT', formData)
    return data !== null
  }

  const deleteTask = async (taskId: number) => {
    const data = await apiFetch(`${apiBaseUrl}/api/task/delete?task_id=${taskId}`, 'DELETE')
    return data !== null
  }

  const searchTasks = async (title: string, description: string) => {
    const body: SearchTasksRequest = {}
    if (title) {
      body.title = title
    }
    if (description) {
      body.description = description
    }
    const data = await apiFetch(`${apiBaseUrl}/api/tasks/search`, 'POST', body)
    return tasks.value = data
  }

  const downloadFile = async (filename: string) => {
    try {
      const blob = await apiFetch(`${apiBaseUrl}/api/task/download/${filename}`, 'GET', undefined, true)
      // ダウンロード用のURLを作成
      const url = window.URL.createObjectURL(blob)
      // aタグを作成してクリックをシミュレート
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename) // ダウンロード属性付与、ダウンロード時のファイル名を指定
      document.body.appendChild(link)
      link.click()
      // 要素を削除し、メモリを解放
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }
    catch {
      alert('ファイルダウンロード中に不明なエラーが発生しました')
    }
  }

  return {
    createTask,
    fetchTasks,
    fetchAllTasks,
    fetchDefaultTasks,
    updateTask,
    deleteTask,
    searchTasks,
    downloadFile,
    tasks,
    totalTasks,
    page,
    limit,
    filterTagId,
    filterCompleted,
    filterStartDate,
    filterEndDate,
  }
}
