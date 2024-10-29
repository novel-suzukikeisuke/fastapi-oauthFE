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
                    v-model="formattedStartDate"
                    label="開始日"
                    variant="outlined"
                    v-bind="props"
                    readonly
                  />
                </template>
                <v-locale-provider locale="ja">
                  <v-date-picker
                    v-model="selectedStart"
                    title="開始日"
                    header="日付を選択"
                  />
                </v-locale-provider>
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
                    v-model="formattedEndDate"
                    label="終了日"
                    variant="outlined"
                    v-bind="props"
                    readonly
                  />
                </template>
                <v-locale-provider locale="ja">
                  <v-date-picker
                    v-model="selectedEnd"
                    title="終了日"
                    header="日付を選択"
                  />
                </v-locale-provider>
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
const { filterStartDate, filterEndDate } = useTask()

const emit = defineEmits(['taskFetch'])

const isActive = ref(false)
const selectedStart = ref<Date | null>(null)
const selectedEnd = ref<Date | null>(null)
const menuStart = ref(false) // 開始日のメニューを制御する
const menuEnd = ref(false) // 終了日のメニューを制御する

// 日付を日本語形式でフォーマットする関数
const toJapaneseDate = (date: Date | null): string => {
  if (!date) return ''
  const year = date.getFullYear() // 年の値を取得する
  const month = date.getMonth() + 1 // 月は0から始まるため1を足す, 月の値を取得する
  const day = date.getDate() // 日の値を取得する
  return `${year}年${month}月${day}日`
}

const formattedStartDate = computed(() => toJapaneseDate(selectedStart.value))
const formattedEndDate = computed(() => toJapaneseDate(selectedEnd.value))

const applyFilter = () => {
  filterStartDate.value = selectedStart.value
  filterEndDate.value = selectedEnd.value
  isActive.value = false
  selectedStart.value = null
  selectedEnd.value = null
  emit('taskFetch', filterStartDate.value, filterEndDate.value)
}
</script>
