import { ref } from 'vue';
import { apiBaseUrl } from '../config';
import type { TagResponse } from '~/types/tag';
import { useAuthStore } from '~/store/auth';

export const useTag = () => {
  const tags = ref<TagResponse[]>([]);
  const authStore = useAuthStore();

  const createTag = async (name: string, color: number) => {
    authStore.loadToken();
    try {
      const response = await fetch(`${apiBaseUrl}/api/tags/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          color: color
        })
      })
      const data: TagResponse = await response.json()
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

  const fetchTags = async () => {
    authStore.loadToken();
    try {
      const response = await fetch(`${apiBaseUrl}/api/tags`, {
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        },
      });
      const data: TagResponse[] = await response.json();  // データを先に取得しておく
      if (response.ok) {
        tags.value = data;
      } else {
        alert(data[0]?.detail || '不明なエラーが発生しました');
      }
    } catch (err) {
      console.error('An error occurred:', err);
      alert('タスクの取得に失敗しました');
    }
  };

  return {
    createTag,
    fetchTags,
    tags
  };
};