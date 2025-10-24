<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Hero Section -->
    <section class="min-h-[70vh] flex items-center justify-center">
      <div class="text-center animate-fade-in">
        <h1
          class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up"
        >
          ここは
          <div class="inline-block align-middle mx-4">
            <div
              class="w-48 h-24 rounded-full bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold animate-float shadow-2xl"
            >
              Gori Hei
            </div>
          </div>
          が
          <span
            class="block bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent"
          >
            適当に作ったサイト
          </span>
        </h1>
        <p
          class="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 animate-slide-up"
          style="animation-delay: 0.2s"
        >
          まあ、暇つぶしに見ていってください
        </p>
      </div>
    </section>

    <!-- Navigation Cards Section -->
    <section class="py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <NuxtLink
          v-for="(navCard, index) in navigationCards"
          :key="navCard.path"
          :to="navCard.path"
          class="card group hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-up"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          <div class="text-center">
            <div
              class="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              {{ navCard.icon }}
            </div>
            <h3
              class="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"
            >
              {{ navCard.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              {{ navCard.description }}
            </p>
            <span
              class="inline-block text-primary-600 dark:text-primary-400 font-semibold group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300"
            >
              詳しく見る →
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Home",
});

const navigationCards = [
  {
    icon: "👤",
    title: "プロフィール",
    description:
      "よくいるWeb系エンジニアの自己紹介です。特に珍しいことは書いてません。",
    path: "/about",
  },
  {
    icon: "💼",
    title: "ポートフォリオ",
    description: "個人開発したもの並べてます。まあ、見てやってください。",
    path: "/portfolio",
  },
  {
    icon: "📝",
    title: "ブログ",
    description: "たまに技術ネタ書いてます。誰得かわかりませんが。",
    path: "/blog",
  },
];
</script>
