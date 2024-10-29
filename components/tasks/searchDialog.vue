<template>
  <v-dialog v-model="isActive" max-width="500">
    <template #activator="{ props: activatorProps }">
      <BaseButton
        v-bind="activatorProps"
        icon="mdi-magnify"
      />
    </template>

    <template #default>
      <v-card>
        <v-card-title class="text-h5">タスク検索</v-card-title>
        <v-card-item>
          <v-form>
            <v-text-field
              v-model="title"
              label="タイトルを入力してください"
            />
            <v-text-field
              v-model="description"
              label="説明を入力してください"
            />
          </v-form>
        </v-card-item>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            text="検索"
            :disabled="!title && !description"
            @click="_searchTask"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['taskSearch'])

const isActive = ref<boolean>(false)
const title = ref<string>('')
const description = ref<string>('')

const _searchTask = async () => {
  emit('taskSearch', { title: title.value, description: description.value })
  title.value = ''
  description.value = ''
  isActive.value = false
}
</script>
