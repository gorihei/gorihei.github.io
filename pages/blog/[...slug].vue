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
            <span
              v-if="post.date"
              class="text-sm text-gray-500 dark:text-gray-400"
            >
              {{ formatDate(post.date as string) }}
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              ⏱️ {{ post.readTime }}分で読めます（たぶん）
            </span>
          </div>
        </div>

        <!-- Table of Contents -->
        <nav
          v-if="post.toc && post.toc.links && post.toc.links.length > 0"
          class="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <button
            @click="isTocOpen = !isTocOpen"
            class="flex items-center justify-between w-full text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
          >
            <span>📑 目次</span>
            <span
              class="text-2xl transition-transform duration-300"
              :class="{ 'rotate-180': isTocOpen }"
            >
              ▼
            </span>
          </button>
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-[1000px]"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 max-h-[1000px]"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-show="isTocOpen" class="mt-4 space-y-2 overflow-hidden">
              <ul class="space-y-2">
                <li v-for="link in post.toc.links" :key="link.id">
                  <a
                    :href="`#${link.id}`"
                    class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300 block"
                    :class="{
                      'ml-0': link.depth === 2,
                      'ml-4': link.depth === 3,
                      'ml-8': link.depth === 4,
                    }"
                  >
                    {{ link.text }}
                  </a>
                  <!-- Nested children -->
                  <ul
                    v-if="link.children && link.children.length > 0"
                    class="mt-2 space-y-2"
                  >
                    <li v-for="child in link.children" :key="child.id">
                      <a
                        :href="`#${child.id}`"
                        class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300 block"
                        :class="{
                          'ml-4': child.depth === 3,
                          'ml-8': child.depth === 4,
                        }"
                      >
                        {{ child.text }}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </Transition>
        </nav>

        <!-- Article Content -->
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <ContentRenderer :value="post.body" />
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
import { ref } from "vue";

const route = useRoute();

// Table of Contents state
const isTocOpen = ref(false);

// Fetch the blog post from Nuxt Content
const { data: post } = await useAsyncData(`blog-${route.path}`, async () => {
  const content = await queryCollection("blog").all();
  const article = content.find((item: any) => item.path === route.path);

  if (!article) {
    return null;
  }

  return {
    title: article.title,
    excerpt: article.description,
    icon: article.icon || "📝",
    category: article.category || "その他",
    date: article.date,
    readTime: article.readTime ?? 5,
    path: article.path,
    body: article.body,
    toc: article.body?.toc,
  };
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
