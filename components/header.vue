<template>
  <v-app-bar color="surface-variant">
    <v-tabs>
      <v-tab
        v-for="(menuItem, index) in filteredMenuItems"
        :key="index"
        :to="menuItem.link"
      >
        {{ menuItem.name }}
      </v-tab>
    </v-tabs>

    <v-spacer/>

    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn v-bind="props">
          <span :style="{ color: 'white' }">{{ user?.username }}</span>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-btn  color="surface-variant" @click="logOut">ログアウト</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import { useAuth } from '~/composables/useAuth' // useAuthをインポート
import { UserRole } from '~/constants/userRole'

const { logOut } = useAuth() // logOutを取得

// propsを受け取る
// user プロップを受け取る
const props = defineProps<{
  user: {
    id: number
    username: string
    email: string
    disabled: boolean
    role: number
  }
}>()

// メニュー項目を定義
const menuItems = ref([
  { name: 'タスク一覧', link: '/tasks' },
  { name: 'タグ一覧', link: '/tags' },
  { name: 'ユーザー一覧', link: '/users', roleRequired: UserRole.ADMIN },
])

// user.roleに基づいてフィルタリングされたメニュー項目を取得
const filteredMenuItems = computed(() => {
  return menuItems.value.filter((menuItem) => {
    return !menuItem.roleRequired || props.user?.role === menuItem.roleRequired
  })
})
</script>
