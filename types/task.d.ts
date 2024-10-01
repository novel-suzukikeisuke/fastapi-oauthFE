export type TaskResponse = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  user_id: number;
  tags: string[];
  error?: string;
};
