<template>
  <v-dialog v-model="isActive" max-width="500">
    <template #activator="{ props: activatorProps }">
      <BaseButton
        v-bind="activatorProps"
        color="surface-variant"
        text="編集"
        variant="flat"
        @click="fetchTags"
      />
    </template>

    <template #default="{ isActive }">
      <v-card>
        <v-card-title class="text-h5">タスク編集</v-card-title>
        <v-card-item>
          <v-form v-model="valid">
            <v-text-field
              v-model="title"
              :rules="[titleRules]"
              :counter="20"
              label="タイトル"
              prepend-icon="mdi mdi-pencil"
            />
            <v-text-field
              v-model="description"
              :rules="[descriptionRules]"
              :counter="50"
              label="説明"
              prepend-icon="mdi mdi-book-open-variant-outline"
            />
            <v-select
              v-model="completed"
              label="完了状態"
              item-title="title"
              item-value="value"
              :items="[
                  { title: '未対応', value: TaskCompleted.NOT_STARTED },
                  { title: '処理中', value: TaskCompleted.IN_PROGRESS },
                  { title: '完了', value: TaskCompleted.COMPLETED }
                ]"
              prepend-icon="mdi mdi-briefcase-outline"
            />
            <v-select
              v-model="tags"
              label="関連タグ"
              item-title="name"
              item-value="id"
              :items="availableTags"
              prepend-icon="mdi mdi-tag"
              multiple
            />
            <fileSelection v-model:file="file" />
          </v-form>
        </v-card-item>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            text="編集"
            :disabled="!valid"
            @click="_updateTask"
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
import { TaskCompleted } from '~/constants/taskCompleted'
import fileSelection from './fileSelection.vue'
import type { TagResponse } from '~/types/tag'

const { updateTask } = useTask()
const { fetchTags, tags: availableTags } = useTag()
const { maxLength } = validations()

const props = defineProps<{
  task: {
    id: number
    title: string
    description: string
    completed: number
    tags: TagResponse[]
  }
}>()

const emit = defineEmits(['taskFetch'])

const title = ref<string>(props.task.title)
const description = ref<string>(props.task.description)
const completed = ref<number>(props.task.completed)
const tags = ref<number[]>(props.task.tags.map(tag => tag.id)) // props.task.tagsの配列から各tagのidプロパティを取得し、それを新しい配列としてtagsに格納
const file = ref<File | null>(null) // アップロードファイルを管理するref
const isActive = ref<boolean>(false) // モーダルのアクティブ状態を管理
const valid = ref<boolean>(false) // フォームのバリデーション結果を管理

// バリデーションルール
// v : 検証対象の値
// v.length <= 50: vの長さを指定
// false : バリデーションが失敗した場合エラーメッセージ表示
const titleRules = maxLength(20, 'タイトルは20文字以内である必要があります')
const descriptionRules = maxLength(50, '説明は50文字以内である必要があります')

const _updateTask = async () => {
  const success = await updateTask(props.task.id, title.value, description.value, completed.value, tags.value, file.value) // IDの配列を送信
  if (success) {
    isActive.value = false // 更新が成功した場合にモーダルを閉じる
    emit('taskFetch') // 更新成功時にイベントを発火
  }
}
</script>
