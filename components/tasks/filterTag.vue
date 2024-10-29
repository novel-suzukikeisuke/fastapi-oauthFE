<template>
  <v-dialog v-model="isActive" max-width="500">
  <template #activator="{ props: activatorProps }">
    <BaseButton
      v-bind="activatorProps"
      text="タグ"
      width="100"
      @click="fetchTags"
    />
  </template>

  <template #default>
    <v-card title="タグ絞り込み">
      <v-card-item>
        <v-select
          v-model="selectedTagId"
          label="タグを選択してください"
          item-title="name"
          item-value="id"
          :items="tags"
        />
      </v-card-item>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          text="検索"
          :disabled="!selectedTagId"
          @click="applyFilter"
        />
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import BaseButton from '../BaseButton.vue'

const { fetchTags, tags } = useTag()
const { filterTagId } = useTask()

const emit = defineEmits(['taskFetch'])

const isActive = ref<boolean>(false)
const selectedTagId = ref<number | null>(null)

const applyFilter = () => {
  filterTagId.value = selectedTagId.value
  isActive.value = false
  selectedTagId.value = null
  emit('taskFetch', filterTagId.value)
}
</script>
