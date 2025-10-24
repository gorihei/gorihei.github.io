<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Hero Section -->
    <section class="min-h-[70vh] flex items-center justify-center">
      <div class="text-center animate-fade-in">
        <div class="mb-8">
          <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center text-white text-5xl font-bold animate-float shadow-2xl">
            G
          </div>
        </div>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
          Welcome to My
          <span class="block bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
            Portfolio
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.2s">
          Full Stack Developer | Designer | Creator
        </p>
        <div class="flex flex-wrap justify-center gap-4 animate-slide-up" style="animation-delay: 0.4s">
          <NuxtLink to="/about" class="btn-primary">
            About Me
          </NuxtLink>
          <NuxtLink to="/portfolio" class="btn-secondary">
            View Projects
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20">
      <h2 class="section-title text-center mb-12">What I Do</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(feature, index) in features"
          :key="index"
          class="card text-center hover:scale-105 transition-transform duration-300 animate-slide-up"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          <div class="text-5xl mb-4">{{ feature.icon }}</div>
          <h3 class="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">{{ feature.title }}</h3>
          <p class="text-gray-600 dark:text-gray-400">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 text-center">
      <div class="card max-w-2xl mx-auto bg-gradient-to-r from-primary-600 to-blue-600 text-white">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
        <p class="text-lg mb-6 opacity-90">
          Have a project in mind? Let's create something amazing together.
        </p>
        <NuxtLink 
          to="/about" 
          class="inline-block bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300"
        >
          Get in Touch
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Home',
})

const features = [
  {
    icon: '🎨',
    title: 'Design',
    description: 'Creating beautiful, intuitive user interfaces with modern design principles.',
  },
  {
    icon: '💻',
    title: 'Development',
    description: 'Building robust, scalable applications with cutting-edge technologies.',
  },
  {
    icon: '🚀',
    title: 'Performance',
    description: 'Optimizing for speed, efficiency, and exceptional user experience.',
  },
]
</script>
