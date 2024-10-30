<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h1>タスク一覧</h1>
        <createDialog @task-fetch="fetchTasks" />
      </v-col>
    </v-row>
    <taskFilters
      @tag-filter="handleTagFilter"
      @complete-filter="handleCompleteFilter"
      @date-filter="handleDateFilter"
      @search="handleSearch"
      @reset="resetFilters"
    />
    <taskCard :tasks="tasks" :fetch-tasks="fetchTasks" />
    <v-row v-if="showAllButton">
      <v-col class="d-flex justify-center">
        <v-btn @click="fetchAllTasks">もっと見る</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="showPagination">
      <v-col>
        <v-pagination
          v-model="page"
          :length="totalPages"
          @click="fetchTasks"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import createDialog from '~/components/tasks/createDialog.vue'
import taskCard from '~/components/tasks/taskCard.vue'
import taskFilters from '~/components/tasks/taskFilters.vue'
import { useAuthStore } from '~/store/auth'

const { tasks, totalTasks, page, limit, filterTagId, filterCompleted, filterStartDate, filterEndDate, fetchTasks, searchTasks, fetchAllTasks, fetchDefaultTasks } = useTask()
const authStore = useAuthStore()

const showAllButton = ref(true)
const showPagination = ref(false)

const totalPages = computed(() => {
  return Math.ceil(totalTasks.value / limit.value) // totalTasks を limit で割ったページ数
})

/* 600pxより小さければshowAllButtonsをtrueに設定し、それ以外の場合はfalseに設定 */
const checkScreenSize = () => {
  showAllButton.value = window.innerWidth < 600
  showPagination.value = window.innerWidth >= 600
}

const handleTagFilter = (selected: number) => {
  filterTagId.value = selected
  fetchTasks()
}
const handleCompleteFilter = (selected: number) => {
  filterCompleted.value = selected
  fetchTasks()
}
const handleDateFilter = (selectedStart: Date, selectedEnd: Date) => {
  filterStartDate.value = selectedStart
  filterEndDate.value = selectedEnd
  fetchTasks()
}

const resetFilters = () => {
  filterTagId.value = null
  filterCompleted.value = null
  filterStartDate.value = null
  filterEndDate.value = null
  fetchDefaultTasks()
}

const handleSearch = async ({ title, description }: { title: string, description: string }) => {
  await searchTasks(title, description) // 検索条件を使用してタスクを取得
}

onMounted(async () => {
  await authStore.loadToken()
  if (authStore.token) {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    await fetchTasks()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>
