<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h1>タスク一覧</h1>
        <createDialog @taskFetch="fetchTasks" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" md="5" sm="12">
        <v-card
          variant="tonal"
        >
          <v-card-item>
            <v-row>
              <v-col cols="3" class="d-flex justify-center">
                <tagFilter @taskFetch="handleTagFilter" />
              </v-col>
              <v-col cols="3" class="d-flex justify-center">
                <completeFilter @taskFetch="handleCompleteFilter" />
              </v-col>
              <v-col cols="3" class="d-flex justify-center">
                <dateFilter @taskFetch="handleDateFilter" />
              </v-col>
              <v-col cols="3" class="d-flex justify-center">
                <v-btn
                  color="surface-variant"
                  text="リセット"
                  variant="flat"
                  width="100"
                  @click="resetFilters"
                ></v-btn>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
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
              <v-icon icon="mdi-label" start></v-icon>
              {{ tag.name }}
            </v-chip>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <updateDialog :task="task" @taskFetch="fetchTasks" />
            <deleteDialog :task="task" @taskFetch="fetchTasks" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTask } from '~/composables/useTask';
import createDialog from '~/components/tasks/createDialog.vue';
import updateDialog from '~/components/tasks/updateDialog.vue';
import deleteDialog from '~/components/tasks/deleteDialog.vue';
import tagFilter from '~/components/tasks/filterTag.vue';
import completeFilter from '~/components/tasks/filterComplete.vue';
import dateFilter from '~/components/tasks/filterDate.vue';
import { TaskCompleted } from '~/constants/taskCompleted';
import { TagColor } from '~/constants/tagColor';

const { tasks, filterTagId, filterCompleted, filterStartDate, filterEndDate, fetchTasks } = useTask();
const { fetchTags, tags } = useTag();

const handleTagFilter = (selected: number) => {
  filterTagId.value = selected;
  fetchTasks();
};
const handleCompleteFilter = (selected: number) => {
  filterCompleted.value = selected;
  fetchTasks();
};
const handleDateFilter = (selectedStart: Date, selectedEnd: Date) => {
  filterStartDate.value = selectedStart;
  filterEndDate.value = selectedEnd;
  fetchTasks();
};

const resetFilters = () => {
  filterTagId.value = null;
  filterCompleted.value = null;
  filterStartDate.value = null;
  filterEndDate.value = null;
  fetchTasks();
};

onMounted(async () => {
  await fetchTasks();
  await fetchTags(); // タグを取得
});
</script>

<style scoped>
.card-text {
  height: 150px;
  overflow-y: auto;
}
</style>
