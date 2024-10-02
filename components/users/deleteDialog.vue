<template>
  <v-dialog v-model="isActive" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        :text="props.user.disabled ? '再開' : '利用停止'"
        variant="flat"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="text-h5">確認</v-card-title>
        <v-card-item>
          <v-card-text>
            本当にユーザー「{{ props.user.username }}」を{{ props.user.disabled ? '再開' : '利用停止' }}にしますか？
          </v-card-text>
        </v-card-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :text="props.user.disabled ? '再開' : '利用停止'"
            @click="_updateUserStatus"
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
import { useUser } from '~/composables/useUser';

const { updateUserStatus } = useUser();

// user プロップを受け取る
const props = defineProps<{
  user: {
    id: number;
    username: string;
    email: string;
    disabled: boolean;
    role: string;
  };
}>();

const emit = defineEmits(['userFetch']);

// フォームのバリデーション状態
const isActive = ref<boolean>(false); // モーダルのアクティブ状態を管理

const _updateUserStatus = async () => {
  const success = await updateUserStatus(props.user.id, !props.user.disabled);
  if (success) {
    isActive.value = false; // 更新が成功した場合にモーダルを閉じる
    emit('userFetch'); // 更新成功時にイベントを発火
  }
};
</script>

<style scoped>
</style>
