<template>
  <v-card
    class="mx-auto"
    width="400"
  >
    <v-card-title class="text-h5">新規登録</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="_signUp">
        <v-text-field
          label="ユーザーネーム"
          v-model="username"
          required
        ></v-text-field>
        <v-text-field
          label="メールアドレス"
          v-model="email"
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
        >
          新規登録
        </v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <p class="sign_up_link">ログインしますか？<br>
        <router-link to="/auth/login">ログインはこちら</router-link>
      </p>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "auth",
});

const { signUp } = useUser();

const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');

const _signUp = async () => {
  await signUp(username.value, email.value, password.value);
};
</script>

<style scoped>
</style>
