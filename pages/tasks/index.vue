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
                :key="tag.id"
                class="ma-1"
              >
                <v-icon icon="mdi-label" start></v-icon>
                {{ tag.name }}
              </v-chip>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <updateDialog :task="task" @taskUpdated="fetchTasks" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTask } from '~/composables/useTask';
import updateDialog from '~/components/tasks/updateDialog.vue';

const { tasks, fetchTasks} = useTask();

onMounted(fetchTasks);
</script>

<style scoped>
</style>
