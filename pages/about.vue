<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-in">
        <h1 class="page-title">About Me</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Passionate developer creating digital experiences
        </p>
      </div>

      <!-- Profile Section -->
      <section class="mb-16 animate-slide-up">
        <div class="card">
          <div class="flex flex-col md:flex-row gap-8 items-center">
            <div class="flex-shrink-0">
              <div class="w-48 h-48 rounded-full bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center text-white text-7xl font-bold shadow-2xl">
                G
              </div>
            </div>
            <div class="flex-grow">
              <h2 class="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">gorihei</h2>
              <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                I'm a passionate full-stack developer with expertise in modern web technologies. 
                I love creating beautiful, functional, and user-friendly applications that solve real-world problems.
              </p>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                With a strong foundation in both frontend and backend development, I strive to deliver 
                high-quality solutions that exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="mb-16 animate-slide-up" style="animation-delay: 0.2s">
        <h2 class="section-title">Skills & Expertise</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="(skillGroup, index) in skills"
            :key="index"
            class="card hover:scale-105 transition-transform duration-300"
          >
            <h3 class="text-xl font-bold mb-4 text-primary-600 dark:text-primary-400">
              {{ skillGroup.category }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in skillGroup.items"
                :key="skill"
                class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Timeline -->
      <section class="mb-16 animate-slide-up" style="animation-delay: 0.4s">
        <h2 class="section-title">Experience</h2>
        <div class="space-y-6">
          <div
            v-for="(exp, index) in experience"
            :key="index"
            class="card border-l-4 border-primary-600 hover:shadow-2xl transition-shadow duration-300"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100">{{ exp.title }}</h3>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ exp.period }}</span>
            </div>
            <p class="text-primary-600 dark:text-primary-400 font-semibold mb-2">{{ exp.company }}</p>
            <p class="text-gray-600 dark:text-gray-400">{{ exp.description }}</p>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="animate-slide-up" style="animation-delay: 0.6s">
        <div class="card text-center bg-gradient-to-r from-primary-600 to-blue-600 text-white">
          <h2 class="text-3xl font-bold mb-4">Let's Connect</h2>
          <p class="text-lg mb-6 opacity-90">
            I'm always open to discussing new projects, creative ideas, or opportunities.
          </p>
          <div class="flex justify-center gap-4">
            <a href="mailto:contact@gorihei.com" class="inline-block bg-white text-primary-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Email Me
            </a>
            <a href="https://github.com/gorihei" target="_blank" rel="noopener noreferrer" class="inline-block bg-white/10 backdrop-blur text-white font-semibold py-2 px-6 rounded-lg hover:bg-white/20 transition-colors duration-300">
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About',
})

const skills = [
  {
    category: 'Frontend',
    items: ['Vue.js', 'Nuxt.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'REST API', 'GraphQL', 'Database Design'],
  },
  {
    category: 'Tools & Others',
    items: ['Git', 'Docker', 'CI/CD', 'AWS', 'Testing', 'Agile'],
  },
  {
    category: 'Design',
    items: ['UI/UX', 'Figma', 'Responsive Design', 'Accessibility', 'Animation'],
  },
]

const experience = [
  {
    title: 'Full Stack Developer',
    company: 'Tech Company',
    period: '2023 - Present',
    description: 'Developing modern web applications using Vue.js, Nuxt.js, and Node.js. Leading frontend architecture decisions and mentoring junior developers.',
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Agency',
    period: '2021 - 2023',
    description: 'Built responsive and interactive user interfaces. Collaborated with designers and backend teams to deliver high-quality products.',
  },
  {
    title: 'Junior Developer',
    company: 'Startup',
    period: '2020 - 2021',
    description: 'Started my professional journey learning web development best practices and contributing to various projects.',
  },
]
</script>
