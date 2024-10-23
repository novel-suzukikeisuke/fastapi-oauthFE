<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="8" class="d-flex justify-space-between align-center">
        <h1>タグ一覧</h1>
        <createDialog @tagFetch="fetchTags" />
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col cols="8">
        <v-data-table :headers="headers" :items="tags">
          <template v-slot:item.color="{ item }">
            <v-chip :color="
              item.color === TagColor.RED ? 'red' :
              item.color === TagColor.BLUE ? 'blue' :
              item.color === TagColor.YELLOW ? 'yellow' :
              'default'
              "
            >
              <v-icon icon="mdi-label" start></v-icon>
              {{ item.name }}
            </v-chip> <!-- 色付きチップ -->
          </template>

          <template v-slot:item.actions="{ item }">
            <updateDialog :tag="item" @tagFetch="fetchTags" />
            <deleteDialog :tag="item" @tagFetch="fetchTags" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { TagColor } from '~/constants/tagColor';
import createDialog from '~/components/tags/createDialog.vue';
import updateDialog from '~/components/tags/updateDialog.vue';
import deleteDialog from '~/components/tags/deleteDialog.vue';

// タグを取得
const { tags, fetchTags } = useTag();

const headers = [
  { title: 'タグ名', value: 'name' },
  { title: '色', value: 'color' },
  { title: '操作', value: 'actions', sortable: false },
];

onMounted(async () => {
  await fetchTags();
});
</script>
