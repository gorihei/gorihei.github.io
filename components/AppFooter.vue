<template>
  <footer class="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p class="text-gray-600 dark:text-gray-400">
            © {{ currentYear }} gorihei. All rights reserved.
          </p>
        </div>
        
        <div class="flex space-x-6">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
            :aria-label="social.name"
          >
            <component :is="social.icon" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/gorihei',
    icon: 'IconGitHub',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/gorihei',
    icon: 'IconTwitter',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/gorihei',
    icon: 'IconLinkedIn',
  },
]
</script>
