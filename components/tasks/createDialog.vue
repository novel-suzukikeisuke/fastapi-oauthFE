<template>
  <v-dialog v-model="isActive" max-width="500">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn
      v-bind="activatorProps"
      color="surface-variant"
      text="タスク追加"
      variant="flat"
      size="large"
    ></v-btn>
  </template>

  <template v-slot:default="{ isActive }">
    <v-card>
      <v-card-title class="text-h5">タスク追加</v-card-title>
      <v-card-item>
        <v-form v-model="valid">
          <v-text-field
            v-model="title"
            :rules="[titleRules]"
            :counter="20"
            label="タイトル"
            prepend-icon="mdi mdi-pencil"
          ></v-text-field>
          <v-text-field
            v-model="description"
            :rules="[descriptionRules]"
            :counter="50"
            label="説明"
            prepend-icon="mdi mdi-book-open-variant-outline"
          ></v-text-field>
          <v-select
            v-model="tags"
            label="関連タグ"
            item-title="name"
            item-value="id"
            :items="tagsItems"
            :rules="[tagsRules]"
            multiple
            prepend-icon="mdi mdi-tag"
            @change="updateSelectedTags"
          ></v-select>
          <fileSelection v-model:file="file" />
        </v-form>
      </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="保存"
          @click="_createTask"
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
import { ref, onMounted } from 'vue';
import { useTask } from '~/composables/useTask';
import { useTag } from '~/composables/useTag';
import fileSelection from './fileSelection.vue';
import type { TagResponse } from '~/types/tag';

const { createTask } = useTask();

const emit = defineEmits(['taskFetch']);

const title = ref<string>('');
const description = ref<string>('');
const tags = ref<number[]>([]);
const file = ref<File | null>(null); // アップロードファイルを管理するref
const isActive = ref<boolean>(false); // モーダルのアクティブ状態を管理
const valid = ref<boolean>(false); // フォームのバリデーション結果を管理
const tagsItems = ref<TagResponse[]>([]);// タグのリストを格納するためのref

const { fetchTags, tags: fetchedTags } = useTag();

// バリデーションルール
// v : 検証対象の値
// v.length <= 50: vの長さを指定
// false : バリデーションが失敗した場合エラーメッセージ表示
const titleRules = (v: string) => (!!v && v.length <= 20)  || 'タイトルは必須で、20文字以内である必要があります';
const descriptionRules = (v: string) =>(!!v && v.length <= 50) || '説明は必須で、50文字以内である必要があります';
const tagsRules = (v: number[]) => v.length > 0 || '少なくとも1つのタグを選択してください';


//tagsItemsから選択されたタグオブジェクトがselectedTags
const updateSelectedTags = (selectedTags: TagResponse[]) => {
  tags.value = selectedTags.map(tag => tag.id);; // 選択されたタグのオブジェクトをセット
};

const _createTask = async () => {
  const success = await createTask(title.value, description.value, tags.value, file.value); // IDの配列を送信
  if (success) {
    title.value = '';
    description.value = '';
    tags.value = [];
    isActive.value = false; // 更新が成功した場合にモーダルを閉じる
    emit('taskFetch'); // 更新成功時にイベントを発火
  }
};

onMounted(async () => {
  await fetchTags();
  tagsItems.value = fetchedTags.value; // 取得したタグを格納
});
</script>

<style scoped>
</style>
