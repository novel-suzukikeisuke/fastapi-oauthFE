import type { TagResponse } from '~/types/tag';

export type TaskResponse = {
  id: number;
  title: string;
  description: string;
  completed: number;
  file_path: string;
  user_id: number;
  tags: TagResponse[];
  detail?: string;
};

export type PaginatedTasksResponse = {
  total_tasks: number;
  page: number;
  limit: number;
  tasks: TaskResponse[];
  detail?: string;
};