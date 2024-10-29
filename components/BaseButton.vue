<template>
  <v-btn
    color="surface-variant"
    variant="flat"
    :text="props.text"
    :size="props.size"
    :width="props.width"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'default',
  },
  width: {
    type: String,
    default: '',
  },
})
</script>
