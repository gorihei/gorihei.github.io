<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="isOpen = !isOpen"
      class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2"
      :aria-label="`Current language: ${currentLocale.name}`"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      <span class="text-sm font-medium hidden sm:inline">{{ currentLocale.code.toUpperCase() }}</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
      >
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="switchLocale(locale.code)"
          :class="[
            'w-full px-4 py-2 text-left text-sm transition-colors duration-200',
            locale.code === currentLocale.code
              ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
        >
          {{ locale.name }}
          <span v-if="locale.code === currentLocale.code" class="ml-2">✓</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'

const { locale, availableLocales } = useI18n()
const isOpen = ref(false)
const dropdownRef = ref(null)

const currentLocale = computed(() => {
  return availableLocales.find((l: any) => l.code === locale.value) || availableLocales[0]
})

const switchLocale = (newLocale: string) => {
  locale.value = newLocale
  isOpen.value = false
}

// Close dropdown when clicking outside
onClickOutside(dropdownRef, () => {
  isOpen.value = false
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
