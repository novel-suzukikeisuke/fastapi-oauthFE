<template>
  <v-card-item
    class="drop_area"
    @dragenter="dragEnter"
    @dragleave="dragLeave"
    @drop.prevent="dropFile"
    @dragover.prevent
    :class="{ enter: isEnter }"
  >
    <v-card-text
      v-if="!file"
      class="d-flex justify-center"
    >
      <p v-if="!file">ファイルをドラッグ＆ドロップしてください</p>
    </v-card-text>
    <v-card-text
      v-else
      class="d-flex align-center"
    >
      <v-icon>mdi-file-settings-outline</v-icon>
      <span class="ml-2">{{ file?.name }}</span>
      <v-spacer />
      <v-btn
        @click="removeFile"
        style="cursor: pointer;"
        color="red"
        icon="mdi mdi-close"
        density="compact"
        variant="outlined"
      ></v-btn>
    </v-card-text>
  </v-card-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['update:file']);

const isEnter = ref<boolean>(false);
const file = ref<File | null>(null);

// preventDefault: 新しいタブでファイルを開くデフォルトの動作を防ぐ
// ファイルをドラッグしたときにクラスを変化させて.enterを呼び出す
const dragEnter = (event: DragEvent) => {
  event.preventDefault();
  isEnter.value = true;
};
// ファイルが枠外に出た時に.enterを適用させない
const dragLeave = () => {
  isEnter.value = false;
};
// event.dataTransfer.files: ファイル情報を取得することができる
// ドロップしたファイルが2つ以上の場合に後から追加した 単一ファイルを格納する
const dropFile = (event: DragEvent) => {
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    file.value = files[0]; // 単一ファイルを格納
    emit('update:file', file.value);
  }
  isEnter.value = false; // ドロップ後にエリアの状態をリセット
};
// ファイルを削除する関数
const removeFile = () => {
  file.value = null; // ファイルをnullに設定して削除
  emit('update:file', null);
}
</script>

<style scoped>
.drop_area {
  width: 100%;
  height: 100px;
  border: 2px dashed #ccc;
}

.enter {
  border-color: #4caf50;
  background-color: #e8f5e9;
}
</style>
