<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Initialize dark mode
const { isDark } = useColorMode()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Portfolio` : 'Portfolio - gorihei';
  },
  htmlAttrs: {
    class: () => isDark.value ? 'dark' : '',
  },
})
</script>
