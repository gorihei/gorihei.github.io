<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-in">
        <h1 class="page-title">プロフィール</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          よくいるWeb系エンジニアの自己紹介
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
                Gori Hei
              </h2>
              <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Web開発してるエンジニアです。気がついたらこの業界にいました。フロントもバックも適当に触れます。
              </p>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                まあ、そこそこ頑張ってます。たぶん。
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="mb-16 animate-slide-up" style="animation-delay: 0.2s">
        <h2 class="section-title">触れるやつ</h2>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-6">
          いろいろ書いてますが、最近はもっぱらC#とVueばっかやってます。
        </p>
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
            <div class="flex flex-wrap gap-3">
              <span
                v-for="skill in skillGroup.items"
                :key="skill.name"
                class="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <img :src="skill.icon" :alt="skill.name" class="w-5 h-5" />
                <span>{{ skill.name }}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Timeline -->
      <section class="mb-16 animate-slide-up" style="animation-delay: 0.4s">
        <h2 class="section-title">職歴っぽいの</h2>
        <div class="relative">
          <!-- Timeline Line -->
          <div
            class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-600 to-blue-600"
          ></div>

          <div class="space-y-8">
            <div
              v-for="(exp, index) in experience"
              :key="index"
              class="relative pl-20"
            >
              <!-- Timeline Dot -->
              <div
                class="absolute left-6 top-6 w-4 h-4 rounded-full bg-primary-600 border-4 border-white dark:border-gray-900 shadow-lg"
              ></div>

              <!-- Content Card -->
              <div
                class="card hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div class="flex justify-between items-start mb-2">
                  <h3
                    class="text-xl font-bold text-gray-800 dark:text-gray-100"
                  >
                    {{ exp.title }}
                  </h3>
                  <span
                    class="text-sm font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full"
                  >
                    {{ exp.period }}
                  </span>
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
          </div>
        </div>
      </section>

      <!-- Certifications Section -->
      <section class="mb-16 animate-slide-up" style="animation-delay: 0.5s">
        <h2 class="section-title">持ってる資格</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(cert, index) in certifications"
            :key="index"
            class="card flex items-center gap-4 hover:scale-105 transition-transform duration-300"
          >
            <div class="text-3xl">🏅</div>
            <div>
              <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100">
                {{ cert.name }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ cert.issuer }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="animate-slide-up" style="animation-delay: 0.6s">
        <div
          class="card text-center bg-gradient-to-r from-primary-600 to-blue-600 text-white"
        >
          <h2 class="text-3xl font-bold mb-4">連絡先</h2>
          <p class="text-lg mb-6 opacity-90">
            何かあればお気軽にどうぞ。返信は気まぐれです。
          </p>
          <div class="flex justify-center gap-4">
            <a
              href="mailto:gorihei.ff@gmail.com"
              class="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                />
              </svg>
              メールする
            </a>
            <a
              href="https://github.com/gorihei"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
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
      {
        name: "Vue",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      },
      {
        name: "Nuxt",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "HTML",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "Vite",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
      },
    ],
  },
  {
    category: "UIフレームワーク",
    items: [
      {
        name: "Vuetify",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuetify/vuetify-original.svg",
      },
      { name: "Quasar", icon: "https://cdn.quasar.dev/logo-v2/svg/logo.svg" },
      {
        name: "Nuxt UI",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
    ],
  },
  {
    category: "バックエンド",
    items: [
      {
        name: "C#",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
      },
      {
        name: ".NET",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
      },
      {
        name: "ASP.NET Core",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
      },
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "C++",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      },
      {
        name: "SQL Server",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
      },
      {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
    ],
  },
  {
    category: "インフラ・ツール",
    items: [
      {
        name: "Azure",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
      },
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "CI/CD",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      },
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "Electron",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg",
      },
      {
        name: "Figma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      },
      {
        name: "FigJam",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      },
      {
        name: "Miro",
        icon: "https://cdn.simpleicons.org/miro/050038",
      },
      {
        name: "Cloudflare",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg",
      },
      {
        name: "Auth0",
        icon: "https://cdn.simpleicons.org/auth0/EB5424",
      },
      {
        name: "Supabase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
      },
      {
        name: "GitHub Copilot",
        icon: "https://cdn.simpleicons.org/githubcopilot/000000",
      },
      {
        name: "Codex",
        icon: "https://cdn.simpleicons.org/openai/412991",
      },
      {
        name: "Claude",
        icon: "https://cdn.simpleicons.org/anthropic/CC9B7A",
      },
      {
        name: "Windows",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg",
      },
      {
        name: "macOS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
      },
      {
        name: "Linux",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      },
    ],
  },
];

const certifications = [
  {
    name: "基本情報技術者",
    issuer: "IPA（情報処理推進機構）",
  },
  {
    name: "Microsoft Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
  },
  {
    name: "Microsoft Azure AI Fundamentals (AI-900)",
    issuer: "Microsoft",
  },
  {
    name: "Developing Solutions for Microsoft Azure (AZ-204)",
    issuer: "Microsoft",
  },
];

const experience = [
  {
    title: "シニアエンジニア",
    company: "自社開発企業",
    period: "2023年 - 現在",
    description:
      "自社開発系の会社に転職。Webアプリ開発を担当しています。まあまあ楽しくやってます。",
  },
  {
    title: "エンジニア",
    company: "受託系IT企業",
    period: "2018年 - 2022年",
    description:
      "このままじゃ未来ないなと思って、未経験でIT業界に飛び込みました。デスクトップアプリ、Webアプリ、受けた仕事はなんでも作ってました。",
  },
  {
    title: "工場",
    company: "製造業",
    period: "2015年 - 2017年",
    description:
      "ライン作業の派遣の人たちをまとめるリーダーやってました。同じことの繰り返しで１日が１００時間くらいに感じてました。",
  },
  {
    title: "水道屋",
    company: "水道設備業者",
    period: "2013年 - 2015年",
    description:
      "バリバリのガテン系で毎日上司からパワハラ受けながら土を掘り返してました。バイクで事故って身体壊して続けられなくなりました。まさかエンジニアになるとは思ってませんでした。",
  },
];
</script>
