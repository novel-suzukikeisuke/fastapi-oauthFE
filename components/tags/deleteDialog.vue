<template>
  <v-dialog v-model="isActive" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="削除"
        variant="flat"
        class="mx-2"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="text-h5">確認</v-card-title>
        <v-card-item>
          <v-card-text>
            本当にタグ「{{ props.tag.name }}」を削除しますか？
          </v-card-text>
        </v-card-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="削除"
            @click="_deleteTag"
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
import { useTag } from '~/composables/useTag';

const { deleteTag } = useTag();

const props = defineProps<{
  tag: {
    id: number;
    name: string;
    color: number;
    user_is: number;
  };
}>();

const emit = defineEmits(['tagFetch']);

// フォームのバリデーション状態
const isActive = ref<boolean>(false); // モーダルのアクティブ状態を管理

const _deleteTag = async () => {
  const success = await deleteTag(props.tag.id);
  if (success) {
    isActive.value = false; // 削除が成功した場合にモーダルを閉じる
    emit('tagFetch'); // 削除成功時にイベントを発火
  }
};
</script>
