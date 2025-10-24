<template>
  <div class="relative min-h-screen">
    <!-- Mouse spotlight effect -->
    <div
      ref="spotlight"
      class="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      :style="spotlightStyle"
    ></div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

// Initialize dark mode
const { isDark } = useColorMode();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Portfolio` : "Portfolio - gorihei";
  },
  htmlAttrs: {
    class: () => (isDark.value ? "dark" : ""),
  },
});

// Spotlight effect
const mouseX = ref(0);
const mouseY = ref(0);
const spotlight = ref<HTMLElement | null>(null);

const spotlightStyle = computed(() => {
  return {
    background: `radial-gradient(600px circle at ${mouseX.value}px ${mouseY.value}px, rgba(14, 165, 233, 0.15), transparent 40%)`,
  };
});

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
};

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>
