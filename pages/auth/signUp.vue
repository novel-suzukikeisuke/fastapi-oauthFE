<template>
  <v-card
    class="mx-auto text-center"
    width="400"
  >
    <v-card-title class="text-h5">新規登録</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="_signUp" v-model="valid">
        <v-text-field
          v-model="username"
          :rules="[nameRules]"
          :counter="20"
          label="ユーザーネーム"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="[emailRules]"
          :counter="50"
          label="メールアドレス"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="[passwordRules]"
          :counter="10"
          label="パスワード"
          type="password"
          required
        ></v-text-field>
        <v-btn
          color="primary"
          type="submit"
          block
          class="mt-4"
          :disabled="!valid"
        >
          新規登録
        </v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <p class="sign_up_link">ログインしますか？<br>
        <router-link to="/auth/login">ログインはこちら</router-link>
      </p>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const { signUp } = useUser();

definePageMeta({
  layout: "auth",
});

const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const valid = ref<boolean>(false); // フォームのバリデーション結果を管理

// バリデーションルール
// v : 検証対象の値
// v.length <= 50: vの長さを指定
// false : バリデーションが失敗した場合エラーメッセージ表示
const nameRules = (v: string) => v.length <= 20 || 'ユーザー名は20文字以内である必要があります';
const emailRules = (v: string) => v.length <= 50 || 'メールアドレスは50文字以内である必要があります';
const passwordRules = (v: string) => v.length <= 10 || 'パスワードは10文字以内である必要があります';

const _signUp = async () => {
  await signUp(username.value, email.value, password.value);
};
</script>

<style scoped>
</style>
