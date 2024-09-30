<template>
  <v-dialog v-model="isActive" max-width="500">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn
      v-bind="activatorProps"
      color="surface-variant"
      text="編集"
      variant="flat"
    ></v-btn>
  </template>

  <template v-slot:default="{ isActive }">
    <v-card title="ユーザー編集">
      <v-card-item>
        <v-form>
          <v-text-field
            v-model="username"
            label="ユーザー名"
            hide-details
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="メールアドレス"
            hide-details
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="パスワード"
            hide-details
          ></v-text-field>
          <v-select
            v-model="role"
            label="Select"
            :items="['admin', 'user']"
          ></v-select>
        </v-form>
      </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="編集"
          @click="_updateUser"
        ></v-btn>
        <v-btn
          text="閉じる"
          @click="isActive.value = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import { useUser } from '~/composables/useUser';

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

const emit = defineEmits(['userUpdated']);

// フォームのバリデーション状態
const username = ref(props.user.username);
const email = ref(props.user.email);
const password = ref('');
const role = ref(props.user.role)
const isActive = ref(false); // モーダルのアクティブ状態を管理

const { updateUser } = useUser();

const _updateUser = async () => {
  const success = await updateUser(props.user.id, username.value, email.value, password.value, role.value);
  if (success) {
    isActive.value = false; // 更新が成功した場合にモーダルを閉じる
    emit('userUpdated'); // 更新成功時にイベントを発火
  }
};

</script>

<style scoped>
</style>
