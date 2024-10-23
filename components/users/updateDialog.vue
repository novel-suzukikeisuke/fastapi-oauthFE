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
      <v-card>
        <v-card-title class="text-h5">ユーザー編集</v-card-title>
        <v-card-item>
          <v-form v-model="valid">
            <v-text-field
              v-model="username"
              :rules="[nameRules]"
              :counter="20"
              label="ユーザー名"
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="[emailRules]"
              :counter="50"
              label="メールアドレス"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="[passwordRules]"
              :counter="10"
              label="パスワード"
            ></v-text-field>
            <v-select
              v-model="role"
              label="役割"
              item-title="title"
              item-value="value"
              :items="[
                { title: '管理者', value: UserRole.ADMIN },
                { title: 'ユーザー', value: UserRole.USER }
              ]"
            ></v-select>
          </v-form>
        </v-card-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="編集"
            @click="_updateUser"
            :disabled="!valid"
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
import { ref } from 'vue';
import { useUser } from '~/composables/useUser';
import { UserRole } from '~/constants/userRole';

const { updateUser } = useUser();

// user プロップを受け取る
const props = defineProps<{
  user: {
    id: number;
    username: string;
    email: string;
    disabled: boolean;
    role: number;
  };
}>();

const emit = defineEmits(['userFetch']);

const username = ref<string>(props.user.username);
const email = ref<string>(props.user.email);
const password = ref<string>('');
const role = ref<number>(props.user.role)
const isActive = ref<boolean>(false); // モーダルのアクティブ状態を管理
const valid = ref<boolean>(false); // フォームのバリデーション結果を管理

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// バリデーションルール
// v : 検証対象の値
// v.length <= 50: vの長さを指定
// false : バリデーションが失敗した場合エラーメッセージ表示
const nameRules = (v: string) => (!!v && v.length <= 20) || 'ユーザー名は必須で、20文字以内である必要があります'; // 空欄禁止 & 20文字以内
const emailRules = (v: string) => (!!v && v.length <= 50 && emailPattern.test(v)) || 'メールアドレスは必須で、正しいメールアドレスを50文字以内で入力してください'; // 空欄禁止 & EmailStr & 50文字以内
const passwordRules = (v: string) => (!!v && v.length >= 4 && v.length <= 10) || 'パスワードは4文字以上10文字以内である必要があります'; // 空欄禁止 & 4文字以上10文字以内

const _updateUser = async () => {
  const success = await updateUser(props.user.id, username.value, email.value, password.value, role.value);
  if (success) {
    isActive.value = false; // 更新が成功した場合にモーダルを閉じる
    emit('userFetch'); // 更新成功時にイベントを発火
  }
};
</script>
