<template>
  <v-dialog v-model="isActive" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        variant="flat"
        icon="mdi-magnify"
        color="surface-variant"
      ></v-btn>
    </template>

    <template v-slot:default>
      <v-card>
        <v-card-title class="text-h5">タスク検索</v-card-title>
        <v-card-item>
          <v-form>
            <v-text-field
              v-model="title"
              label="タグ名を入力してください"
            ></v-text-field>
            <v-text-field
              v-model="description"
              label="説明を入力してください"
            ></v-text-field>
          </v-form>
        </v-card-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="検索"
            @click="_searchTask"
            :disabled="!title && !description"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['taskSearch']);

const isActive = ref<boolean>(false);
const title = ref<string>('');
const description = ref<string>('');

const _searchTask = async () => {
  emit('taskSearch', { title: title.value, description: description.value });
  title.value = '';
  description.value = '';
  isActive.value = false;
};
</script>
