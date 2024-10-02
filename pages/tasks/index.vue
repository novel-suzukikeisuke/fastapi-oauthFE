<template>
  <v-container>
    <h1 class="mb-5">タスク一覧</h1>
    <v-row>
      <v-col
        v-for="task in tasks"
        :key="task.id"
        cols="4"
      >
        <v-card>
          <v-card-title>
            <span>{{ task.title }}</span>
          </v-card-title>
          <v-card-subtitle>
            {{ task.description }}
          </v-card-subtitle>
          <v-card-text>
            <div>
              <span>完了状態 : {{task.completed}}</span>
            </div>
            <span>関連タグ:</span>
            <v-chip
                v-for="tag in task.tags"
                :key="tag"
                class="ma-1"
              >
                <v-icon icon="mdi-label" start></v-icon>
                {{ tag }}
              </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTask } from '~/composables/useTask';

const { tasks, fetchTasks} = useTask();

onMounted(fetchTasks);
</script>

<style scoped>
</style>
