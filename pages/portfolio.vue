<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-in">
        <h1 class="page-title">ポートフォリオ</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">個人開発したやつ</p>
      </div>

      <!-- Filter Tags -->
      <div class="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
        <button
          v-for="tag in tags"
          :key="tag"
          @click="selectedTag = tag"
          :class="[
            'px-4 py-2 rounded-full font-semibold transition-all duration-300',
            selectedTag === tag
              ? 'bg-primary-600 text-white shadow-lg scale-105'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600',
          ]"
        >
          {{ tag }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="card group cursor-pointer hover:scale-105 transition-all duration-300 animate-slide-up"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          <!-- Project Image -->
          <div
            class="relative overflow-hidden rounded-lg mb-4 bg-gradient-to-br from-primary-400 to-blue-500 h-48 flex items-center justify-center"
          >
            <div
              class="text-6xl group-hover:scale-110 transition-transform duration-300"
            >
              {{ project.icon }}
            </div>
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"
            ></div>
          </div>

          <!-- Project Info -->
          <div>
            <h3
              class="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"
            >
              {{ project.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              {{ project.description }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Links -->
            <div class="flex gap-3">
              <a
                v-if="project.demoUrl"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 text-center bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 text-sm font-semibold"
              >
                デモを見る
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 text-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 py-2 px-4 rounded-lg transition-colors duration-300 text-sm font-semibold"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          このカテゴリーのプロジェクトは見つかりませんでした
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

useHead({
  title: "Portfolio",
});

const selectedTag = ref("すべて");

const tags = ["すべて", "Webアプリ", "デスクトップアプリ", "オープンソース"];

const projects = [
  {
    id: 1,
    title: "Test",
    description: "hoge hoge fuga fuga piyo piyo",
    icon: "🛒",
    technologies: ["Vue.js", "Nuxt.js", "Node.js", "MongoDB"],
    category: "Webアプリ",
    demoUrl: "#",
    githubUrl: "#",
  },
];

const filteredProjects = computed(() => {
  if (selectedTag.value === "すべて") {
    return projects;
  }
  return projects.filter((project) => project.category === selectedTag.value);
});
</script>
