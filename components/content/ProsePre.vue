<template>
  <pre
    :class="[
      'prose-pre',
      `language-${language}`,
      {
        'with-filename': filename,
      },
    ]"
  >
    <div v-if="filename || code" class="code-header">
      <span v-if="filename" class="filename">{{ filename }}</span>
      <button
        v-if="code"
        class="copy-button"
        :class="{ copied: isCopied }"
        @click="copyCode"
      >
        <div class="flex">
            <span class="mr-2">{{ isCopied ? 'コピーしました!' : 'コードをコピー' }}</span>
            <span v-if="!isCopied">📋</span>
            <span v-else>✅</span>
        </div>
      </button>
    </div>
    <slot />
  </pre>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: "text",
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
});

const isCopied = ref(false);

const copyCode = async () => {
  if (!props.code) return;

  try {
    await navigator.clipboard.writeText(props.code);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy code:", err);
  }
};
</script>

<style scoped>
.prose-pre {
  @apply relative rounded-lg overflow-x-auto my-1 px-4 pt-0 pb-0;
  @apply bg-white dark:bg-gray-950;
  @apply border border-gray-200 dark:border-gray-800;
}

.prose-pre.with-filename {
  @apply pt-5;
}

.code-header {
  @apply absolute top-0 left-0 right-0 px-2;
  @apply bg-gray-100 dark:bg-gray-900;
  @apply border-b border-gray-200 dark:border-gray-800;
  @apply flex items-center justify-between text-xs;
  line-height: 1.2;
  height: 32px;
}

.filename {
  @apply text-gray-600 dark:text-gray-400 font-medium;
}

.copy-button {
  @apply px-1 rounded transition-all duration-200;
  @apply hover:bg-gray-200 dark:hover:bg-gray-800;
  @apply active:scale-95;
  cursor: pointer;
  border: none;
  background: transparent;
  font-size: 0.75rem;
  line-height: 1.2;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy-button.copied {
  @apply scale-110;
}

/* コードブロックのスタイル */
.prose-pre :deep(code) {
  @apply block font-mono text-sm;
  line-height: 1.4;
  padding-bottom: 0;
}

.prose-pre :deep(.line) {
  @apply block;
  line-height: 1.4;
}

/* Shiki テーマの背景色を上書き */
.prose-pre :deep(.shiki) {
  background-color: transparent !important;
}
</style>
