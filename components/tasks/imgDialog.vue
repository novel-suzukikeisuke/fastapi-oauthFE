<template>
  <v-dialog v-model="isActive" max-width="500">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn
      v-bind="activatorProps"
      color="surface-variant"
      text="添付資料"
      variant="flat"
      width="100"
    ></v-btn>
  </template>

  <template v-slot:default>
    <v-card title="添付資料">
      <v-card-item>
        <v-img
          :src="`${apiBaseUrl}/uploads/${task.file_path.replace('uploads/', '')}`"
        ></v-img>
      </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="閉じる"
          @click="isActive = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import { apiBaseUrl } from '~/config';
const isActive = ref<boolean>(false);

const props = defineProps<{
  task: {
    file_path: string
  };
}>();

</script>

<style scoped>
</style>