import type { TagResponse } from '~/types/tag';

export type TaskResponse = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  user_id: number;
  tags: TagResponse[];
  error?: string;
};
