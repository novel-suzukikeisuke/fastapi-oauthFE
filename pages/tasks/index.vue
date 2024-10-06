<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h1>タスク一覧</h1>
        <createDialog @taskFetch="fetchTasks" />
      </v-col>
      <v-col cols="12">
        <!-- タグフィルタリング -->
        <tagFilter
          :tags="tags"
          :filter-tag-id="filterTagId"
          @filterChange="onTagFilterChange"
        />
        <!-- 完了状態フィルタリング -->
        <completeFilter
          :filter-completed="filterCompleted"
          @filterChange="onCompletedFilterChange"
        />
        <!-- 日付フィルタリング -->
        <dateFilter
          :filter-start-date="filterStartDate"
          :filter-end-date="filterEndDate"
          @filterChange="onDateFilterChange"
        />
      </v-col>
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

const { tasks, fetchTasks, filterTagId, filterCompleted, filterStartDate, filterEndDate } = useTask();
const { fetchTags, tags } = useTag();

const onTagFilterChange = (selectedTagId: number) => {
  filterTagId.value = selectedTagId;
  fetchTasks(); // タグフィルタが変更されたときにタスクを再取得
};

const onCompletedFilterChange = (selectedCompletedStatus: number) => {
  filterCompleted.value = selectedCompletedStatus;
  fetchTasks(); // 完了状態フィルタが変更されたときにタスクを再取得
};

const onDateFilterChange = ({ startDate, endDate }) => {
  filterStartDate.value = startDate;
  filterEndDate.value = endDate;
  fetchTasks(); // 日付フィルタが変更されたときにタスクを再取得
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
