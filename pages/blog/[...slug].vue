<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Back Link -->
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8 transition-colors duration-300"
      >
        ← ブログに戻る
      </NuxtLink>

      <!-- Article Header -->
      <article v-if="post" class="animate-fade-in">
        <div class="text-center mb-8">
          <div class="text-6xl mb-4">{{ post.icon }}</div>

          <div class="flex items-center justify-center gap-3 mb-4">
            <span
              class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full font-semibold"
            >
              {{ post.category }}
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(post.date) }}
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              ⏱️ {{ post.readTime }}分で読めます
            </span>
          </div>
        </div>

        <!-- Article Content -->
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <div v-html="post.content"></div>
        </div>

        <!-- Article Footer -->
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
          >
            ← ブログに戻る
          </NuxtLink>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

// Mock blog posts data (same as in blog index)
const blogPosts = [
  {
    title: "TypeScript Best Practices",
    excerpt:
      "Essential TypeScript patterns and practices that will make your code more maintainable and less error-prone.",
    icon: "📘",
    category: "チュートリアル",
    date: "2024-10-08",
    readTime: 9,
    path: "/blog/typescript-best-practices",
    content:
      "<h1>TypeScript Best Practices</h1><p>TypeScriptのベストプラクティスについて...</p>",
  },
  {
    title: "State Management in Vue 3",
    excerpt:
      "Deep dive into state management patterns in Vue 3, comparing Pinia, Vuex, and the Composition API approach.",
    icon: "🗄️",
    category: "チュートリアル",
    date: "2024-10-12",
    readTime: 12,
    path: "/blog/state-management-vue3",
    content:
      "<h1>State Management in Vue 3</h1><p>Vue 3の状態管理について...</p>",
  },
  {
    title: "Building Accessible Web Applications",
    excerpt:
      "A practical guide to creating web applications that are accessible to everyone, including people with disabilities.",
    icon: "♿",
    category: "チュートリアル",
    date: "2024-10-15",
    readTime: 10,
    path: "/blog/building-accessible-web-apps",
    content:
      "<h1>Building Accessible Web Applications</h1><p>アクセシブルなWebアプリケーションの構築について...</p>",
  },
  {
    title: "Case Study: E-Commerce Platform Redesign",
    excerpt:
      "How we improved conversion rates by 40% through a complete redesign and performance optimization of an e-commerce platform.",
    icon: "📊",
    category: "ケーススタディ",
    date: "2024-10-10",
    readTime: 15,
    path: "/blog/ecommerce-platform-redesign",
    content:
      "<h1>Case Study: E-Commerce Platform Redesign</h1><p>Eコマースプラットフォームの改善事例について...</p>",
  },
  {
    title: "The Future of Web Development",
    excerpt:
      "Exploring emerging trends and technologies that are shaping the future of web development, from AI integration to edge computing.",
    icon: "🔮",
    category: "オピニオン",
    date: "2024-10-18",
    readTime: 6,
    path: "/blog/future-of-web-development",
    content:
      "<h1>The Future of Web Development</h1><p>Web開発の未来について...</p>",
  },
  {
    title: "Getting Started with Nuxt 3 and Vue 3",
    excerpt:
      "Learn how to build modern web applications with Nuxt 3 and Vue 3. This comprehensive guide covers setup, routing, and best practices.",
    icon: "🚀",
    category: "チュートリアル",
    date: "2024-10-20",
    readTime: 8,
    path: "/blog/getting-started-with-nuxt3",
    content:
      "<h1>Getting Started with Nuxt 3 and Vue 3</h1><p>Nuxt 3とVue 3の始め方について...</p>",
  },
];

// Find the current post
const post = computed(() => {
  return blogPosts.find((p) => p.path === route.path);
});

// If post not found, show 404
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

// Set page meta
useHead({
  title: post.value.title,
  meta: [{ name: "description", content: post.value.excerpt }],
});

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
</script>
