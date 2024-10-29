<template>
  <v-dialog v-model="isActive" max-width="500">
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="編集"
        variant="flat"
        class="mx-2"
      />
    </template>

    <template #default="{ isActive }">
      <v-card>
        <v-card-title class="text-h5">タグ編集</v-card-title>
        <v-card-item>
          <v-form v-model="valid">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="10"
              label="タグ名"
            />
            <v-select
              v-model="color"
              label="色"
              item-title="title"
              item-value="value"
              :items="[
                  { title: 'red', value: TagColor.RED },
                  { title: 'blue', value: TagColor.BLUE },
                  { title: 'yellow', value: TagColor.YELLOW }
                ]"
            />
          </v-form>
        </v-card-item>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            text="保存"
            :disabled="!valid"
            @click="_updateTag"
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
import { ref } from 'vue'
import { useTag } from '~/composables/useTag'
import { TagColor } from '~/constants/tagColor'

const { updateTag } = useTag()
const { required, maxLength } = validations()

const props = defineProps<{
  tag: {
    id: number
    name: string
    color: number
    user_id: number
  }
}>()

const emit = defineEmits(['tagFetch'])

const name = ref<string>(props.tag.name)
const color = ref<number>(props.tag.color)
const isActive = ref<boolean>(false) // モーダルのアクティブ状態を管理
const valid = ref<boolean>(false) // フォームのバリデーション結果を管理

// バリデーションルール
// v : 検証対象の値
// v.length <= 50: vの長さを指定
// false : バリデーションが失敗した場合エラーメッセージ表示
const nameRules = [
  required('タグ名を入力してください'),
  maxLength(10, 'タグ名は10文字以内である必要があります'),
]

const _updateTag = async () => {
  const success = await updateTag(props.tag.id, name.value, color.value)
  if (success) {
    isActive.value = false // 更新が成功した場合にモーダルを閉じる
    emit('tagFetch') // 更新成功時にイベントを発火
  }
}
</script>
