<template>
  <v-dialog v-model="isActive" max-width="500">
  <template #activator="{ props: activatorProps }">
    <BaseButton
      v-bind="activatorProps"
      text="添付資料"
      width="100"
    />
  </template>

  <template #default>
    <v-card title="添付資料">
      <v-card-item>
        <v-img
          :src="`${apiBaseUrl}/uploads/${props.task.file_path.replace('uploads/', '')}`"
        />
      </v-card-item>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          text="閉じる"
          @click="isActive = false"
        />
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import { apiBaseUrl } from '~/config'

const isActive = ref<boolean>(false)

const props = defineProps<{
  task: {
    file_path: string
  }
}>()
</script>
