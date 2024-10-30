<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="8" class="d-flex justify-space-between align-center">
        <h1>タグ一覧</h1>
        <createDialog @tag-fetch="fetchTags" />
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col cols="8">
        <v-data-table :headers="headers" :items="tags">
          <template #[`item.color`]="{ item }">
            <v-chip
              :color="
              item.color === TagColor.RED ? 'red' :
              item.color === TagColor.BLUE ? 'blue' :
              item.color === TagColor.YELLOW ? 'yellow' :
              'default'
              "
            >
              <v-icon icon="mdi-label" start/>
              {{ item.name }}
            </v-chip> <!-- 色付きチップ -->
          </template>

          <template #[`item.actions`]="{ item }">
            <updateDialog :tag="item" @tag-fetch="fetchTags" />
            <deleteDialog :tag="item" @tag-fetch="fetchTags" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { TagColor } from '~/constants/tagColor'
import createDialog from '~/components/tags/createDialog.vue'
import updateDialog from '~/components/tags/updateDialog.vue'
import deleteDialog from '~/components/tags/deleteDialog.vue'
import { useAuthStore } from '~/store/auth'

// タグを取得
const { tags, fetchTags } = useTag()
const authStore = useAuthStore()

const headers = [
  { title: 'タグ名', value: 'name' },
  { title: '色', value: 'color' },
  { title: '操作', value: 'actions', sortable: false },
]

onMounted(async () => {
  await authStore.loadToken()
  if (authStore.token) {
    await fetchTags()
  }
})
</script>
