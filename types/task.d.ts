import type { TagResponse } from '~/types/tag';

export type TaskResponse = {
  id: number;
  title: string;
  description: string;
  completed: number;
  user_id: number;
  tags: TagResponse[];
  detail?: string;
};
