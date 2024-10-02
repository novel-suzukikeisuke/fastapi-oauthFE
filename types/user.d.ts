export type UserResponse = {
  id: Int;
  username: string;
  email: string;
  disabled: boolean;
  role: number;
  error?: string;
};