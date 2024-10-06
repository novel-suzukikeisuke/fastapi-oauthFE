<template>
  <v-select
    v-model="selectedTagId"
    :items="tags"
    label="関連タグ"
    item-title="name"
    item-value="id"
    @change="onFilterChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TagResponse } from '~/types/tag';

const props = defineProps({
  tags: {
    type: Array as () => TagResponse[], // ここでTagResponseを使用
    required: true,
  },
  filterTagId: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(['filterChange']);

const selectedTagId = ref(props.filterTagId);

const onFilterChange = () => {
  emit('filterChange', selectedTagId.value);
};

watch(selectedTagId, (newValue) => {
  emit('filterChange', newValue); // 新しい値をフィルタリングに渡す
});
</script>
