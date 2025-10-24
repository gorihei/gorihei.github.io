<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Back Link -->
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8 transition-colors duration-300"
      >
        ← Back to Blog
      </NuxtLink>

      <!-- Article Header -->
      <article class="animate-fade-in">
        <div class="text-center mb-8">
          <div class="text-6xl mb-4">{{ post.icon }}</div>
          
          <div class="flex items-center justify-center gap-3 mb-4">
            <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full font-semibold">
              {{ post.category }}
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(post.date) }}
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              ⏱️ {{ post.readTime }} min read
            </span>
          </div>

          <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            {{ post.title }}
          </h1>
          
          <p class="text-xl text-gray-600 dark:text-gray-400">
            {{ post.excerpt }}
          </p>
        </div>

        <!-- Article Content -->
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <ContentRenderer :value="post" />
        </div>

        <!-- Article Footer -->
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
          >
            ← Back to Blog
          </NuxtLink>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Fetch the blog post from Nuxt Content
const { data: post } = await useAsyncData(`blog-${route.path}`, () => 
  queryCollection('content').path(route.path).first()
)

// If post not found, show 404
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

// Set page meta
useHead({
  title: post.value.title,
  meta: [
    { name: 'description', content: post.value.excerpt }
  ]
})

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
/* Custom styles for blog post content */
.prose {
  @apply text-gray-700 dark:text-gray-300;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4) {
  @apply text-gray-800 dark:text-gray-100 font-bold;
}

.prose :deep(h2) {
  @apply text-3xl mt-8 mb-4;
}

.prose :deep(h3) {
  @apply text-2xl mt-6 mb-3;
}

.prose :deep(a) {
  @apply text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300;
}

.prose :deep(code) {
  @apply bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm;
}

.prose :deep(pre) {
  @apply bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto;
}

.prose :deep(pre code) {
  @apply bg-transparent p-0;
}

.prose :deep(ul),
.prose :deep(ol) {
  @apply my-4;
}

.prose :deep(li) {
  @apply my-2;
}

.prose :deep(blockquote) {
  @apply border-l-4 border-primary-500 pl-4 italic;
}
</style>
