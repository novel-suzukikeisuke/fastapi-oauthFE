import { ref } from 'vue';
import { apiBaseUrl } from '../config';
import type { TaskResponse } from '~/types/task';
import { useAuthStore } from '~/store/auth';

export const useTask = () => {
  const tasks = ref<TaskResponse[]>([]);
  const filterTagId = ref<number | null>(null);
  const filterCompleted = ref<number | null>(null);
  const filterStartDate = ref<Date | null>(null);
  const filterEndDate = ref<Date | null>(null);
  const authStore = useAuthStore();

  const createTask = async (title: string, description: string, tags: number[]) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/task_create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description,
          tags: tags
        })
      })
      const data: TaskResponse = await response.json()
      if (response.ok) {
        return true;
      } else  {
        alert(data.detail)
        return false;
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const fetchTasks = async () => {
    try {
      // クエリパラメータを組み立て
      const params = new URLSearchParams();
      if (filterTagId.value !== null) params.append('tag_id', String(filterTagId.value));
      if (filterCompleted.value !== null) params.append('completed', String(filterCompleted.value));
      if (filterStartDate.value) params.append('start_date', filterStartDate.value.toISOString());
      if (filterEndDate.value) params.append('end_date', filterEndDate.value.toISOString());

      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await fetch(`${apiBaseUrl}/api/tasks${queryString}`, {
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        },
      });
      const data: TaskResponse[] = await response.json();  // データを先に取得しておく
      if (response.ok) {
        tasks.value = data;
      } else {
        alert(data[0]?.detail || 'タスクが存在しません');
      }
    } catch (err) {
      console.error('An error occurred:', err);
      alert('タスクの取得に失敗しました');
    }
  };

  const updateTask = async (taskId: number, title: string, description: string, completed: number, tags: number[]) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/tasks/update?task_id=${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description,
          completed: completed,
          tags: tags
        })
      })
      const data: TaskResponse = await response.json()
      if (response.ok) {
        return true;
      } else  {
        alert(data.detail)
        return false;
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const deleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/tasks/delete?task_id=${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        return true;
      } else  {
        const errorData = await response.json(); // エラーデータを取得
        alert(errorData.detail);
        return false;
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return {
    createTask,
    fetchTasks,
    updateTask,
    deleteTask,
    tasks,
    filterTagId,
    filterCompleted,
    filterStartDate,
    filterEndDate
  };
};