<template>
  <v-row>
    <v-col
      v-for="task in props.tasks"
      :key="task.id"
      cols="4"
    >
      <v-card>
        <v-card-title>
          <div class="d-flex justify-space-between">
            <span>{{ task.title }}</span>
            <MenuButton :task="task" :fetch-tasks="fetchTasks" @task-fetch="fetchTasks"/>
          </div>
        </v-card-title>
        <v-card-subtitle class="text-pre-wrap">
          <!-- substring(): 文字列を分割したり任意の箇所を抽出したりする関数 -->
          {{ task.description.length > 20 ? task.description.substring(0, 20) + '...' : task.description }}
        </v-card-subtitle>
        <v-card-text class="card-text">
          <v-img
            :src="`${apiBaseUrl}/uploads/${task.file_path.replace('uploads/', '')}`"
          />
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
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { TaskCompleted } from '~/constants/taskCompleted'
import { TagColor } from '~/constants/tagColor'
import MenuButton from './menuButton.vue'
import { apiBaseUrl } from '~/config'
import type { TagResponse } from '~/types/tag'

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
