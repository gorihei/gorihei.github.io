<template>
  <code
    :class="[
      'prose-code',
      $props.class,
      {
        'inline-code': !$props.filename,
      },
    ]"
  >
    <slot />
  </code>
</template>

<script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});
</script>

<style scoped>
.prose-code {
  @apply font-mono text-sm;
}

.inline-code {
  @apply px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200;
}
</style>
