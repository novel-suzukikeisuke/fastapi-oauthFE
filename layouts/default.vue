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
import { useAuthStore } from '~/store/auth'

const { fetchUser, user } = useUser() // fetchUser と user を取得
const authStore = useAuthStore()

onMounted(async () => {
  await authStore.loadToken()
  if (authStore.token) {
    await fetchUser() // コンポーネントがマウントされたときにユーザー情報を取得
  }
})
</script>

<style scoped>
.main {
  padding-top: 60px;
}
</style>
