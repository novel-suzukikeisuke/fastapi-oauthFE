<template>
  <v-dialog v-model="isActive" max-width="500">
    <template #activator="{ props: activatorProps }">
      <BaseButton
        v-bind="activatorProps"
        text="編集"
      />
    </template>

    <template #default="{ isActive }">
      <v-card>
        <v-card-title class="text-h5">ユーザー編集</v-card-title>
        <v-card-item>
          <v-form v-model="valid">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              :counter="20"
              label="ユーザー名"
            />
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :counter="50"
              label="メールアドレス"
            />
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :counter="10"
              label="パスワード"
            />
            <v-select
              v-model="role"
              label="役割"
              item-title="title"
              item-value="value"
              :items="[
                { title: '管理者', value: UserRole.ADMIN },
                { title: 'ユーザー', value: UserRole.USER }
              ]"
            />
          </v-form>
        </v-card-item>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            text="編集"
            :disabled="!valid"
            @click="_updateUser"
          />
          <v-btn
            text="閉じる"
            @click="isActive.value = false"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { UserRole } from '~/constants/userRole'

const { updateUser } = useUser()
const { required, maxLength, minLength, validEmail } = validations()

// user プロップを受け取る
const props = defineProps<{
  user: {
    id: number
    username: string
    email: string
    disabled: boolean
    role: number
  }
}>()

const emit = defineEmits(['userFetch'])

const username = ref<string>(props.user.username)
const email = ref<string>(props.user.email)
const password = ref<string>('')
const role = ref<number>(props.user.role)
const isActive = ref<boolean>(false) // モーダルのアクティブ状態を管理
const valid = ref<boolean>(false) // フォームのバリデーション結果を管理

const usernameRules = [
  required('ユーザー名を入力してください'),
  maxLength(20, 'ユーザー名は20文字以内である必要があります'),
]
const emailRules = [
  required('メールアドレスを入力してください'),
  maxLength(50, 'メールアドレスは50文字以内である必要があります'),
  validEmail('正しいメールアドレスをにゅうりょっ苦してください'),
]
const passwordRules = [
  required('パスワードを入力してください'),
  maxLength(10, 'パスワードは10文字以内である必要があります'),
  minLength(4, 'パスワードは4文字以上である必要があります'),
]

const _updateUser = async () => {
  const success = await updateUser(props.user.id, username.value, email.value, password.value, role.value)
  if (success) {
    isActive.value = false // 更新が成功した場合にモーダルを閉じる
    emit('userFetch') // 更新成功時にイベントを発火
  }
}
</script>
