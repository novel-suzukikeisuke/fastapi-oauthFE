import { ref } from 'vue';
import { apiBaseUrl } from '../config';
import type { TaskResponse, PaginatedTasksResponse } from '~/types/task';
import { useAuthStore } from '~/store/auth';
import { TaskPagination } from '~/constants/taskPagination';

export const useTask = () => {
  const tasks = ref<TaskResponse[]>([]);
  const filterTagId = ref<number | null>(null);
  const filterCompleted = ref<number | null>(null);
  const filterStartDate = ref<Date | null>(null);
  const filterEndDate = ref<Date | null>(null);
  const page = ref<number>(TaskPagination.DEFAULT_PAGE);
  const limit = ref<number>(TaskPagination.DEFAULT_LIMIT);
  const totalTasks = ref<number>(TaskPagination.TOTAL_TASK);
  const authStore = useAuthStore();

  const createTask = async (title: string, description: string, tags: number[], file: File | null) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('tags', JSON.stringify(tags)); // タグをJSON文字列として送信
      if (file) {
        formData.append('file', file); // ファイルを追加
      }
      const response = await fetch(`${apiBaseUrl}/api/task_create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        },
        body: formData
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
      params.append('page', String(page.value));
      params.append('limit', String(limit.value));

      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await fetch(`${apiBaseUrl}/api/tasks${queryString}`, {
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        },
      });
      const data: PaginatedTasksResponse = await response.json();  // データを先に取得しておく
      if (response.ok) {
        tasks.value = data.tasks;
        totalTasks.value = data.total_tasks;
      } else {
        alert(data.detail || 'タスクが存在しません');
      }
    } catch (err) {
      console.error('An error occurred:', err);
      alert('タスクの取得に失敗しました');
    }
  };

  // fetchAllTasks関数を実装
  const fetchAllTasks = async () => {
    limit.value = 9999; // 大きな数を設定して全てのタスクを取得
    page.value = 1; // 最初のページにリセット
    await fetchTasks();
  };

  const fetchDefaultTasks = async () => {
    limit.value = 6; // 大きな数を設定して全てのタスクを取得
    page.value = 1; // 最初のページにリセット
    await fetchTasks();
  };

  const updateTask = async (taskId: number, title: string, description: string, completed: number, tags: number[], file: File | null) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('completed', completed.toString())
      formData.append('tags', JSON.stringify(tags)); // タグをJSON文字列として送信
      if (file) {
        formData.append('file', file); // ファイルを追加
      }
      const response = await fetch(`${apiBaseUrl}/api/tasks/update?task_id=${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        },
        body: formData
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

  const searchTasks = async (title: string, description: string) => {
    try {
      // リクエストボディを初期化
      const body: any = {};
      // 入力されている場合のみプロパティを追加
      if (title) {
        body.title = title;
      }
      if (description) {
        body.description = description;
      }
      const response = await fetch(`${apiBaseUrl}/api/tasks/search`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data: TaskResponse[] = await response.json();
      if (response.ok) {
        tasks.value = data;
        return true;
      } else {
        alert(data[0]?.detail || 'タスクが存在しません');
        return false;
      }
    } catch (err) {
      console.error('An error occurred:', err);
      alert('タスクの取得に失敗しました');
    }
  };

  const downloadFile = async (filename: string) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/tasks/download/${filename}`, {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
        },
      });
      // ステータスコードがOKかどうかを確認
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Blobオブジェクトを作成
      const blob = await response.blob();
      // ダウンロード用のURLを作成
      const url = window.URL.createObjectURL(blob);
      // aタグを作成してクリックをシミュレート
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // ダウンロード属性付与、ダウンロード時のファイル名を指定
      document.body.appendChild(link);
      link.click();
      // 要素を削除し、メモリを解放
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

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
    filterEndDate
  };
};
