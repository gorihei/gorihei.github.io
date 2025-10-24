<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-in">
        <h1 class="page-title">プロフィール</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          デジタル体験を創造する情熱的な開発者
        </p>
      </div>

      <!-- Profile Section -->
      <section class="mb-16 animate-slide-up">
        <div class="card">
          <div class="flex flex-col md:flex-row gap-8 items-center">
            <div class="flex-shrink-0">
              <div
                class="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-primary-500"
              >
                <img
                  src="/profile_icon.png"
                  alt="gorihei"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            <div class="flex-grow">
              <h2
                class="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100"
              >
                gorihei
              </h2>
              <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                私は最新のWeb技術に精通した情熱的なフルスタック開発者です。実際の問題を解決する美しく機能的でユーザーフレンドリーなアプリケーションを作ることが大好きです。
              </p>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                フロントエンドとバックエンドの両方の開発において強固な基盤を持ち、期待を超える高品質なソリューションを提供することに努めています。
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="mb-16 animate-slide-up" style="animation-delay: 0.2s">
        <h2 class="section-title">スキルと専門知識</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(skillGroup, index) in skills"
            :key="index"
            class="card hover:scale-105 transition-transform duration-300"
          >
            <h3
              class="text-xl font-bold mb-4 text-primary-600 dark:text-primary-400"
            >
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
        <h2 class="section-title">経験</h2>
        <div class="space-y-6">
          <div
            v-for="(exp, index) in experience"
            :key="index"
            class="card border-l-4 border-primary-600 hover:shadow-2xl transition-shadow duration-300"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100">
                {{ exp.title }}
              </h3>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{
                exp.period
              }}</span>
            </div>
            <p
              class="text-primary-600 dark:text-primary-400 font-semibold mb-2"
            >
              {{ exp.company }}
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              {{ exp.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="animate-slide-up" style="animation-delay: 0.6s">
        <div
          class="card text-center bg-gradient-to-r from-primary-600 to-blue-600 text-white"
        >
          <h2 class="text-3xl font-bold mb-4">つながりましょう</h2>
          <p class="text-lg mb-6 opacity-90">
            新しいプロジェクト、クリエイティブなアイデア、または機会について話し合うことをいつでも歓迎します。
          </p>
          <div class="flex justify-center gap-4">
            <a
              href="mailto:contact@gorihei.com"
              class="inline-block bg-white text-primary-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              メールする
            </a>
            <a
              href="https://github.com/gorihei"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block bg-white/10 backdrop-blur text-white font-semibold py-2 px-6 rounded-lg hover:bg-white/20 transition-colors duration-300"
            >
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
  title: "About",
});

const skills = [
  {
    category: "フロントエンド",
    items: [
      "Vue.js",
      "Nuxt.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "バックエンド",
    items: [
      "Node.js",
      "Express",
      "Python",
      "REST API",
      "GraphQL",
      "Database Design",
    ],
  },
  {
    category: "ツール・その他",
    items: ["Git", "Docker", "CI/CD", "AWS", "Testing", "Agile"],
  },
  {
    category: "デザイン",
    items: [
      "UI/UX",
      "Figma",
      "Responsive Design",
      "Accessibility",
      "Animation",
    ],
  },
];

const experience = [
  {
    title: "フルスタック開発者",
    company: "Tech Company",
    period: "2023年 - 現在",
    description:
      "Vue.js、Nuxt.js、Node.jsを使用したモダンなWebアプリケーションの開発。フロントエンドアーキテクチャの決定をリードし、ジュニア開発者のメンタリングを行っています。",
  },
  {
    title: "フロントエンド開発者",
    company: "Digital Agency",
    period: "2021年 - 2023年",
    description:
      "レスポンシブでインタラクティブなユーザーインターフェースを構築。デザイナーやバックエンドチームと協力して高品質な製品を提供しました。",
  },
  {
    title: "ジュニア開発者",
    company: "Startup",
    period: "2020年 - 2021年",
    description:
      "Web開発のベストプラクティスを学び、さまざまなプロジェクトに貢献することで、プロフェッショナルとしてのキャリアをスタートしました。",
  },
];
</script>
