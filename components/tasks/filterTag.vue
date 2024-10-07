<template>
  <v-dialog v-model="isActive" max-width="500">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn
      v-bind="activatorProps"
      color="surface-variant"
      text="タグ"
      variant="flat"
      width="100"
      @click="fetchTags"
    ></v-btn>
  </template>

  <template v-slot:default>
    <v-card title="タグ絞り込み">
      <v-card-item>
        <v-select
          label="タグを選択してください"
          item-title="name"
          item-value="id"
          :items="tags"
          v-model="selectedTagId"
        ></v-select>
      </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="検索"
          :disabled="!selectedTagId"
          @click="applyFilter"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
const { fetchTags, tags } = useTag();
const { filterTagId } = useTask();

const emit = defineEmits(['taskFetch']);

const isActive = ref<boolean>(false);
const selectedTagId = ref<number | null>(null);

const applyFilter = () => {
  filterTagId.value = selectedTagId.value;
  isActive.value = false;
  selectedTagId.value = null;
  emit('taskFetch', filterTagId.value);
};

</script>

<style scoped>
</style>
