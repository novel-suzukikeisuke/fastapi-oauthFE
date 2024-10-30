<template>
  <v-menu>
    <template #activator="{ props: activatorProps }">
      <BaseButton
        v-bind="activatorProps"
        size="x-small"
        icon="mdi mdi-dots-horizontal"
      />
    </template>
    <v-list class="d-flex flex-column px-2">
      <BaseButton
          text="ダウンロード"
          @click="downloadFile(task.file_path.replace('uploads/', ''))"
        />
      <div class="my-1"/>
      <updateDialog :task="task" :fetch-tasks="fetchTasks" @task-fetch="fetchTasks"/>
      <div class="my-1"/>
      <deleteDialog :task="task" :fetch-tasks="fetchTasks" @task-fetch="fetchTasks"/>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import UpdateDialog from './updateDialog.vue'
import DeleteDialog from './deleteDialog.vue'

const { downloadFile } = useTask()

const props = defineProps<{
  task: {
    id: number
    title: string
    description: string
    completed: number
    tags: TagResponse[]
    file_path: string
  }
  fetchTasks: () => void
}>()
</script>
