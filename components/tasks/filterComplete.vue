<template>
  <v-select
    v-model="selectedCompletedStatus"
    :items="completedStatusOptions"
    label="完了状態"
    @change="onFilterChange"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { TaskCompleted } from '~/constants/taskCompleted';

const props = defineProps({
  filterCompleted: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(['filterChange']);

const completedStatusOptions = [
  { title: '未対応', value: TaskCompleted.NOT_STARTED },
  { title: '処理中', value: TaskCompleted.IN_PROGRESS },
  { title: '完了', value: TaskCompleted.COMPLETED },
];

const selectedCompletedStatus = ref(props.filterCompleted);

const onFilterChange = () => {
  emit('filterChange', selectedCompletedStatus.value);
};

watch(selectedCompletedStatus, (newValue) => {
  emit('filterChange', newValue); // 新しい値をフィルタリングに渡す
});
</script>

<style scoped>
</style>
