<template>
  <v-dialog v-model="isActive" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="削除"
        variant="flat"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="text-h5">確認</v-card-title>
        <v-card-item>
          <v-card-text>
            本当にタスク「{{ props.task.title }}」を削除しますか？
          </v-card-text>
        </v-card-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="削除"
            @click="_deleteTask"
          ></v-btn>
          <v-btn
            text="キャンセル"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTask } from '~/composables/useTask';
import type { TagResponse } from '~/types/tag';

const { deleteTask } = useTask();

const props = defineProps<{
  task: {
    id: number;
    title: string;
    description: string;
    completed: number;
    tags: TagResponse[];
  };
}>();

const emit = defineEmits(['taskFetch']);

// フォームのバリデーション状態
const isActive = ref<boolean>(false); // モーダルのアクティブ状態を管理

const _deleteTask = async () => {
  const success = await deleteTask(props.task.id);
  if (success) {
    isActive.value = false; // 削除が成功した場合にモーダルを閉じる
    emit('taskFetch'); // 削除成功時にイベントを発火
  }
};
</script>

<style scoped>
</style>
