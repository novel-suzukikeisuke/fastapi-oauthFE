<template>
  <v-card
    class="mx-auto text-center"
    width="400"
  >
    <v-card-title class="text-h5">ログイン</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="_login" v-model="valid">
        <v-text-field
          label="ユーザーネーム"
          v-model="username"
          required
        ></v-text-field>
        <v-text-field
          label="パスワード"
          type="password"
          v-model="password"
          required
        ></v-text-field>
        <v-btn
          color="primary"
          type="submit"
          block
          class="mt-4"
          :disabled="!valid"
        >
          ログイン
        </v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <p class="sign_up_link">アカウントを作成しますか？<br>
        <router-link to="/signUp">登録はこちら</router-link>
      </p>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "auth",
});

const { login } = useAuth();

const username = ref<string>('');
const password = ref<string>('');
const valid = ref<boolean>(false); // フォームのバリデーション結果を管理

const _login = async () => {
  await login(username.value, password.value);
};
</script>
