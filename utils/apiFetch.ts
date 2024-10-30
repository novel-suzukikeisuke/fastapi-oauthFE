import { useAuthStore } from '~/store/auth'

export const apiFetch = async <T>(
  url: string,
  method: string,
  body?: T, // ジェネリック型:どんな型の引数も受け入れを可能にする
  isBlobResponse = false,
  headers: Record<string, string> = {}, // Record型:特定の型のキーに対して特定の型の値をマッピングする('Content-Type': 'application/x-www-form-urlencoded')
) => {
  const authStore = useAuthStore()
  const defaultHeaders = {
    Authorization: `Bearer ${authStore.token}`,
    ...(body instanceof FormData || body instanceof URLSearchParams // instanceof演算子:あるオブジェクトの型を動的に判定する(true or falseを返す)
      ? {} // bodyがFormDataまたはURLSearchParamsの場合は空欄を設定する
      : { 'Content-Type': 'application/json' }),
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...defaultHeaders, // スプレッド構文: 配列やオブジェクトを展開してくれる
        ...headers,
      },
      body:
        body instanceof URLSearchParams || body instanceof FormData
          ? body // bodyがURLSearchParamsまたはFormDataのインスタンスである場合に、そのまま送信する(条件が真)
          : body // (条件が偽の場合)
            ? JSON.stringify(body) // bodyが存在するならJSON.stringify(body)として送信
            : undefined, // bodyが存在しないならundefinedとして送信
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail)
    }

    if (isBlobResponse) {
      return await response.blob() // isBlobResponseがtrueの場合はresponse.blob()を使用してファイルデータを返す
    }

    return await response.json()
  }
  catch (e) {
    alert(e)
    return null // エラー時にはnullを返す
  }
}
