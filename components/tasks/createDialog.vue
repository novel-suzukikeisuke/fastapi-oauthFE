<template>
  <v-dialog v-model="isActive" max-width="500">
  <template #activator="{ props: activatorProps }">
    <BaseButton
      v-bind="activatorProps"
      text="タスク追加"
      size="large"
      @click="fetchTags"
    />
  </template>

  <template #default="{ isActive }">
    <v-card>
      <v-card-title class="text-h5">タスク追加</v-card-title>
      <v-card-item>
        <v-form v-model="valid">
          <v-text-field
            v-model="title"
            :rules="titleRules"
            :counter="20"
            label="タイトル"
            prepend-icon="mdi mdi-pencil"
          />
          <v-textarea
            v-model="description"
            :rules="descriptionRules"
            :counter="50"
            label="説明"
            prepend-icon="mdi mdi-book-open-variant-outline"
          />
          <v-select
            v-model="tags"
            :rules="tagsRules"
            :items="availableTags"
            label="関連タグ"
            item-title="name"
            item-value="id"
            multiple
            prepend-icon="mdi mdi-tag"
          />
          <fileSelection v-model:file="file" />
        </v-form>
      </v-card-item>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          text="保存"
          :disabled="!valid"
          @click="_createTask"
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
import fileSelection from './fileSelection.vue'

const { createTask } = useTask()
const { fetchTags, tags: availableTags } = useTag()
const { required, requiredArray, maxLength } = validations()

const emit = defineEmits(['taskFetch'])

const title = ref<string>('')
const description = ref<string>('')
const tags = ref<number[]>([]) // これは正しい定義
const file = ref<File | null>(null) // アップロードファイルを管理するref
const isActive = ref<boolean>(false) // モーダルのアクティブ状態を管理
const valid = ref<boolean>(false) // フォームのバリデーション結果を管理

const titleRules = [
  required('タイトルを入力してください'),
  maxLength(20, 'タイトルは20文字以内である必要があります'),
]
const descriptionRules = [
  required('説明を入力してください'),
  maxLength(50, '説明は50文字以内である必要があります'),
]
const tagsRules = [
  requiredArray('少なくとも1つのタグを選択してください'),
]

const _createTask = async () => {
  const success = await createTask(title.value, description.value, tags.value, file.value) // IDの配列を送信
  if (success) {
    title.value = ''
    description.value = ''
    tags.value = []
    isActive.value = false // 更新が成功した場合にモーダルを閉じる
    emit('taskFetch') // 更新成功時にイベントを発火
  }
}
</script>
