<template>
  <v-row>
    <v-col
      v-for="task in props.tasks"
      :key="task.id"
      cols="4"
    >
      <v-card>
        <v-card-title>
          <span>{{ task.title }}</span>
        </v-card-title>
        <v-card-subtitle class="text-pre-wrap">
          {{ task.description }}
        </v-card-subtitle>
        <v-card-text class="card-text">
          <div class="mb-1">
            <span>完了状態:</span>
            <v-chip
              v-if="task.completed === TaskCompleted.NOT_STARTED"
              color="orange"
              size="small"
              class="ma-1"
            >
              未対応
            </v-chip>
            <v-chip
              v-else-if="task.completed === TaskCompleted.IN_PROGRESS"
              color="blue"
              size="small"
              class="ma-1"
            >
              処理中
            </v-chip>
            <v-chip
              v-else-if="task.completed === TaskCompleted.COMPLETED"
              color="green"
              size="small"
              class="ma-1"
            >
              完了
            </v-chip>
          </div>
          <div>関連タグ:</div>
          <v-chip
            v-for="tag in task.tags"
            :key="tag.id"
            :color="
              tag.color === TagColor.RED ? 'red' :
              tag.color === TagColor.BLUE ? 'blue' :
              tag.color === TagColor.YELLOW ? 'yellow' :
              'default'
            "
            class="ma-1"
          >
            <v-icon icon="mdi-label" start/>
            {{ tag.name }}
          </v-chip>
        </v-card-text>
        <v-card-actions>
          <imgDialog :task />
          <BaseButton
            text="ダウンロード"
            @click="downloadFile(task.file_path.replace('uploads/', ''))"
          />
          <v-spacer />
          <updateDialog :task="task" @task-fetch="fetchTasks" />
          <deleteDialog :task="task" @task-fetch="fetchTasks" />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { TaskCompleted } from '~/constants/taskCompleted'
import { TagColor } from '~/constants/tagColor'
import imgDialog from './imgDialog.vue'
import updateDialog from './updateDialog.vue'
import deleteDialog from './deleteDialog.vue'
import type { TagResponse } from '~/types/tag'

const { downloadFile } = useTask()

const props = defineProps<{
  tasks: Array<{
    id: number
    title: string
    description: string
    completed: number
    tags: TagResponse[]
    file_path: string
  }>
  fetchTasks: () => void
}>()
</script>
