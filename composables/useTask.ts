import { ref } from 'vue';
import { apiBaseUrl } from '../config';
import type { TaskResponse } from '~/types/task';
import type { TagResponse } from '~/types/tag';
import { useAuthStore } from '~/store/auth';

export const useTask = () => {
  const tasks = ref<TaskResponse[]>([]);
  const authStore = useAuthStore();

  const fetchTasks = async () => {
    authStore.loadToken();
    try {
      const response = await fetch(`${apiBaseUrl}/api/tasks`, {
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        },
      });
      const data: TaskResponse[] = await response.json();  // データを先に取得しておく
      if (response.ok) {
        tasks.value = data;
      } else {
        alert(data[0]?.error || '不明なエラーが発生しました');
      }
    } catch (err) {
      console.error('An error occurred:', err);
      alert('タスクの取得に失敗しました');
    }
  };

  const updateTask = async (taskId: number, title: string, description: string, completed: number, tags: number[]) => {
    authStore.loadToken();
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
        alert(data.error)
        return false;
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const deleteTask = async (taskId: number) => {
    authStore.loadToken();
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
    fetchTasks,
    updateTask,
    deleteTask,
    tasks
  };
};