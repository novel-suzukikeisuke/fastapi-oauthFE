import { ref } from 'vue';
import { apiBaseUrl } from '../config';
import type { TaskResponse } from '~/types/task';
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

  return {
    fetchTasks,
    tasks
  };
};