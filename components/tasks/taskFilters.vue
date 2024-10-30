<template>
  <v-row class="d-flex align-center">
      <v-col cols="12" md="auto">
        <v-card
          variant="tonal"
        >
          <v-card-item>
            <v-row>
              <v-col cols="4" class="d-flex justify-center">
                <tagFilter @task-fetch="handleTagFilter" />
              </v-col>
              <v-col cols="4" class="d-flex justify-center">
                <completeFilter @task-fetch="handleCompleteFilter" />
              </v-col>
              <v-col cols="4" class="d-flex justify-center">
                <dateFilter @task-fetch="handleDateFilter" />
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
      <v-spacer />
      <v-col cols="12" md="2" sm="12" class="d-flex justify-end">
        <searchDialog @task-search="handleSearch" />
      <BaseButton
        icon="mdi mdi-rotate-right"
        class="ms-2"
        @click="resetFilters"
      />
    </v-col>
    </v-row>
</template>

<script setup lang="ts">
import tagFilter from '~/components/tasks/filterTag.vue'
import completeFilter from '~/components/tasks/filterComplete.vue'
import dateFilter from '~/components/tasks/filterDate.vue'
import searchDialog from '~/components/tasks/searchDialog.vue'
import BaseButton from '~/components/BaseButton.vue'

const emit = defineEmits(['tag-filter', 'complete-filter', 'date-filter', 'search', 'reset'])

const handleTagFilter = (selected: number) => emit('tag-filter', selected)
const handleCompleteFilter = (selected: number) => emit('complete-filter', selected)
const handleDateFilter = (selectedStart: Date, selectedEnd: Date) => emit('date-filter', selectedStart, selectedEnd)
const handleSearch = async (query: { title: string, description: string }) => emit('search', query)
const resetFilters = () => emit('reset')
</script>
