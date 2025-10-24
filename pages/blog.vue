<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-in">
        <h1 class="page-title">Blog</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Thoughts, tutorials, and insights on web development
        </p>
      </div>

      <!-- Search Bar -->
      <div class="mb-12 animate-slide-up">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search articles..."
            class="w-full px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
          />
          <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap gap-3 mb-12 animate-slide-up" style="animation-delay: 0.1s">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-4 py-2 rounded-full font-semibold transition-all duration-300',
            selectedCategory === category
              ? 'bg-primary-600 text-white shadow-lg scale-105'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Blog Posts -->
      <div class="space-y-8">
        <NuxtLink
          v-for="(post, index) in paginatedPosts"
          :key="post._path"
          :to="post._path"
          class="block"
        >
          <article
            class="card group hover:scale-102 transition-all duration-300 cursor-pointer animate-slide-up"
            :style="`animation-delay: ${index * 0.1}s`"
          >
            <div class="flex flex-col md:flex-row gap-6">
              <!-- Post Image/Icon -->
              <div class="flex-shrink-0">
                <div class="w-full md:w-48 h-48 rounded-lg bg-gradient-to-br from-primary-400 to-blue-500 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                  {{ post.icon }}
                </div>
              </div>

              <!-- Post Content -->
              <div class="flex-grow">
                <div class="flex items-center gap-3 mb-3">
                  <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full font-semibold">
                    {{ post.category }}
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(post.date) }}
                  </span>
                </div>

                <h2 class="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {{ post.title }}
                </h2>

                <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {{ post.excerpt }}
                </p>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>⏱️ {{ post.readTime }} min read</span>
                  </div>
                  <span class="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300">
                    Read More →
                  </span>
                </div>
              </div>
            </div>
          </article>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-if="paginatedPosts.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">📭</div>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          No articles found
        </p>
      </div>

      <!-- Pagination -->
      <div v-if="paginatedPosts.length > 0" class="mt-12 flex justify-center gap-2">
        <button
          v-for="page in totalPages"
          :key="page"
          :class="[
            'w-10 h-10 rounded-lg font-semibold transition-all duration-300',
            currentPage === page
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          ]"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

useHead({
  title: 'Blog',
})

const searchQuery = ref('')
const selectedCategory = ref('All')
const currentPage = ref(1)
const postsPerPage = 10

// Fetch blog posts from Nuxt Content
const { data: blogPosts } = await useAsyncData('blog-posts', () => 
  queryCollection('content')
    .where('path', 'LIKE', '/blog/%')
    .order('date', 'DESC')
    .all()
)

// Extract unique categories from posts
const categories = computed(() => {
  const cats = new Set<string>(['All'])
  if (blogPosts.value) {
    blogPosts.value.forEach((post: any) => {
      if (post.category) cats.add(post.category)
    })
  }
  return Array.from(cats)
})

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const filteredPosts = computed(() => {
  let posts = blogPosts.value || []

  // Filter by category
  if (selectedCategory.value !== 'All') {
    posts = posts.filter((post: any) => post.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(
      (post: any) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
    )
  }

  return posts
})

// Paginate the filtered posts
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})
const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage)
})
</script>
