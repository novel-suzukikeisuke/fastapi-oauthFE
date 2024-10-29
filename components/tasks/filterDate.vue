<template>
  <v-dialog v-model="isActive" max-width="500">
    <template #activator="{ props: activatorProps }">
      <BaseButton
        v-bind="activatorProps"
        text="日付指定"
        width="100"
      />
    </template>

    <template #default>
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
                <template #activator="{ props }">
                  <v-text-field
                    v-model="selectedStart"
                    label="開始日"
                    variant="outlined"
                    v-bind="props"
                    readonly
                  />
                </template>
                <v-date-picker v-model="selectedStart" @input="menuStart = false"/>
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
                <template #activator="{ props }">
                  <v-text-field
                    v-model="selectedEnd"
                    label="終了日"
                    variant="outlined"
                    v-bind="props"
                    readonly
                  />
                </template>
                <v-date-picker v-model="selectedEnd" @input="menuEnd = false"/>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-item>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            text="検索"
            :disabled="!selectedStart || !selectedEnd"
            @click="applyFilter"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import BaseButton from '../BaseButton.vue'

const { filterStartDate, filterEndDate } = useTask()

const emit = defineEmits(['taskFetch'])

const isActive = ref(false)
const selectedStart = ref<Date | null>(null)
const selectedEnd = ref<Date | null>(null)
const menuStart = ref(false) // 開始日のメニューを制御する
const menuEnd = ref(false) // 終了日のメニューを制御する

const applyFilter = () => {
  filterStartDate.value = selectedStart.value
  filterEndDate.value = selectedEnd.value
  isActive.value = false
  selectedStart.value = null
  selectedEnd.value = null
  emit('taskFetch', filterStartDate.value, filterEndDate.value)
}
</script>
