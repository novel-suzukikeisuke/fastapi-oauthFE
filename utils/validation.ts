const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // メールアドレスの正規表現

export const validations = () => {
  const required = (message: string) => (v: string) => !!v || message // 空欄禁止

  const requiredArray = (message: string) => (v: number[]) => v.length > 0 || message // 数字配列空欄禁止

  const maxLength = (max: number, message: string) => (v: string) => v.length <= max || message // 最大文字数制限

  const minLength = (min: number, message: string) => (v: string) => v.length >= min || message // 最小文字数制限

  const validEmail = (message: string) => (v: string) => (!!v && emailPattern.test(v)) || message // メールアドレスが有効であることを確認

  return {
    required,
    requiredArray,
    maxLength,
    minLength,
    validEmail,
  }
}
