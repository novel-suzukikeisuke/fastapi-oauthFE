<template>
  <v-dialog v-model="isActive" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="日付指定"
        variant="flat"
        width="100"
      ></v-btn>
    </template>

    <template v-slot:default>
      <v-card title="日付絞り込み">
        <v-card-item>
          <v-row>
            <v-col cols="5">
              <v-menu
                v-model="menuStart"
                :close-on-content-click="true"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    label="開始日"
                    variant="outlined"
                    v-model="selectedStart"
                    v-bind="props"
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker v-model="selectedStart" @input="menuStart = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="d-flex justify-center align-center">
              <span>~</span>
            </v-col>
            <v-col cols="5">
              <v-menu
                v-model="menuEnd"
                :close-on-content-click="true"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    label="終了日"
                    variant="outlined"
                    v-model="selectedEnd"
                    v-bind="props"
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker v-model="selectedEnd" @input="menuEnd = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="検索"
            :disabled="!selectedStart || !selectedEnd"
            @click="applyFilter"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
const { filterStartDate, filterEndDate } = useTask();

const emit = defineEmits(['taskFetch']);

const isActive = ref(false);
const selectedStart = ref<Date | null>(null);
const selectedEnd = ref<Date | null>(null);
const menuStart = ref(false);  // 開始日のメニューを制御する
const menuEnd = ref(false);    // 終了日のメニューを制御する

const applyFilter = () => {
  filterStartDate.value = selectedStart.value;
  filterEndDate.value = selectedEnd.value;
  isActive.value = false;
  selectedStart.value = null;
  selectedEnd.value = null;
  emit('taskFetch', filterStartDate.value, filterEndDate.value);
};
</script>

<style scoped>
</style>
