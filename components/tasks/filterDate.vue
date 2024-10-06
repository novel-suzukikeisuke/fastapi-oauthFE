<template>
  <v-row>
    <v-col>
      <v-date-picker
        v-model="startDate"
        label="開始日"
        @change="onDateChange"
      />
    </v-col>
    <v-col>
      <v-date-picker
        v-model="endDate"
        label="終了日"
        @change="onDateChange"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  filterStartDate: {
    type: String,
    default: null,
  },
  filterEndDate: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['filterChange']);

const startDate = ref(props.filterStartDate);
const endDate = ref(props.filterEndDate);

const onDateChange = () => {
  // 両方の値が設定されているかチェック
  if (startDate.value && endDate.value) {
    emit('filterChange', { startDate: startDate.value, endDate: endDate.value });
  } else {
    // どちらかが設定されていない場合は、フィルタリングをクリアする
    emit('filterChange', { startDate: null, endDate: null });
  }
};

// プロパティが変更されたときに値を更新
watch(() => props.filterStartDate, (newValue) => {
  startDate.value = newValue; // プロパティの新しい値を反映
});

watch(() => props.filterEndDate, (newValue) => {
  endDate.value = newValue; // プロパティの新しい値を反映
});
</script>

<style scoped>
/* スタイルが必要な場合はここに追加 */
</style>
