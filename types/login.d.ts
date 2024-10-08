export type AuthResponse = {
  access_token: string; // トークンが正常に返される場合
  token_type: string;   // トークンのタイプ (通常は "bearer")
  detail?: string;       // エラーメッセージが存在する場合
};