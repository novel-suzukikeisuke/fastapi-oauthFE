<template>
  <v-container fluid style="height: 100vh;">
    <v-row
      style="height: 100%;"
    >
      <v-col>
        <Header v-if="user" :user="user"/>
        <main class="main">
          <slot />
        </main>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import Header from '~/components/header.vue'; // 修正: 大文字に

const { fetchUser, user } = useUser(); // fetchUser と user を取得

onMounted(async () => {
  await fetchUser(); // コンポーネントがマウントされたときにユーザー情報を取得
});
</script>

<style scoped>
.main {
  padding-top: 60px;
}
</style>
