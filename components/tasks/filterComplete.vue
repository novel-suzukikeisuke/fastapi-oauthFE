<template>
  <v-dialog v-model="isActive" max-width="500">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn
      v-bind="activatorProps"
      color="surface-variant"
      text="完了状態"
      variant="flat"
      width="100"
    ></v-btn>
  </template>

  <template v-slot:default>
    <v-card title="完了状態絞り込み">
      <v-card-item>
        <v-select
          label="完了状態を選択してください"
          item-title="title"
          item-value="value"
          :items="completedStatusOptions"
          v-model="selectedCompleteId"
        ></v-select>
      </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="検索"
          :disabled="selectedCompleteId === null"
          @click="applyFilter"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import { TaskCompleted } from '~/constants/taskCompleted';

const { filterCompleted } = useTask();

const emit = defineEmits(['taskFetch']);

const isActive = ref<boolean>(false);
const selectedCompleteId = ref<number | null>(null);

const completedStatusOptions = [
  { title: '未対応', value: TaskCompleted.NOT_STARTED },
  { title: '処理中', value: TaskCompleted.IN_PROGRESS },
  { title: '完了', value: TaskCompleted.COMPLETED },
];
const applyFilter = () => {
  filterCompleted.value = selectedCompleteId.value;
  isActive.value = false;
  selectedCompleteId.value = null;
  emit('taskFetch', filterCompleted.value);
};

</script>

<style scoped>
</style>


