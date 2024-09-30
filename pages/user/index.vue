<template>
  <v-card
    class="mx-auto"
    width="400"
  >
    <v-card-title class="text-h5">ユーザー一覧</v-card-title>
    <v-card-actions>
      <v-btn
        color="primary"
        block
        class="mt-4"
        @click="logOut"
      >
        ログアウト
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { useAuth } from '~/composables/useAuth';

// ログアウト関数の呼び出し
const { logOut } = useAuth();
</script>

<style scoped>
</style>
