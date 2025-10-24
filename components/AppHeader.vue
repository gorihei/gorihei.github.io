<template>
  <header
    ref="headerRef"
    class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
    @mousemove="handleMouseMove"
  >
    <!-- Cute Eyes Mouse Stalker -->
    <div
      class="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-3 z-10"
    >
      <!-- Left Eye -->
      <div
        class="relative w-10 h-10 bg-white dark:bg-gray-100 rounded-full shadow-lg border-2 border-gray-300 dark:border-gray-400"
      >
        <div
          class="absolute w-5 h-5 bg-gray-900 rounded-full transition-all duration-200 ease-out"
          :style="leftPupilStyle"
        />
      </div>
      <!-- Right Eye -->
      <div
        class="relative w-10 h-10 bg-white dark:bg-gray-100 rounded-full shadow-lg border-2 border-gray-300 dark:border-gray-400"
      >
        <div
          class="absolute w-5 h-5 bg-gray-900 rounded-full transition-all duration-200 ease-out"
          :style="rightPupilStyle"
        />
      </div>
    </div>
    <nav class="container mx-auto px-4 py-4 relative z-10">
      <div class="flex items-center justify-between">
        <NuxtLink
          to="/"
          class="text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
        >
          Gori Hei
        </NuxtLink>

        <div class="hidden lg:flex items-center space-x-4">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="nav-link relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-300"
          >
            {{ item.name }}
          </NuxtLink>
          <div class="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>

        <div class="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <Transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-black/50 z-40 lg:hidden"
        @click="closeMobileMenu"
      />
    </Transition>

    <!-- Mobile Menu Sidebar -->
    <Transition name="slide-right">
      <div
        v-if="isMobileMenuOpen"
        class="fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-xl z-50 lg:hidden"
      >
        <div class="p-4">
          <div class="flex justify-between items-center mb-8">
            <span
              class="text-xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent"
            >
              メニュー
            </span>
            <button
              @click="closeMobileMenu"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav class="space-y-4">
            <NuxtLink
              v-for="item in menuItems"
              :key="item.path"
              :to="item.path"
              @click="closeMobileMenu"
              class="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all duration-300"
            >
              {{ item.name }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const menuItems = [
  { name: "プロフィール", path: "/about" },
  { name: "ポートフォリオ", path: "/portfolio" },
  { name: "ブログ", path: "/blog" },
];

const isMobileMenuOpen = ref(false);
const headerRef = ref<HTMLElement | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
};

// ページ全体のマウス移動を監視
onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});

// 瞳の位置を計算（目玉の中心からの相対位置）
const calculatePupilPosition = (eyeX: number, eyeY: number) => {
  const dx = mouseX.value - eyeX;
  const dy = mouseY.value - eyeY;
  const angle = Math.atan2(dy, dx);
  const distance = Math.sqrt(dx * dx + dy * dy);
  const maxMove = 12; // 最大移動距離（ピクセル）を増加

  // 距離に応じてより敏感に反応
  const normalizedDistance = Math.min(distance / 50, 1);

  return {
    left: `${20 + Math.cos(angle) * maxMove * normalizedDistance}px`,
    top: `${20 + Math.sin(angle) * maxMove * normalizedDistance}px`,
    transform: "translate(-50%, -50%)",
  };
};

const leftPupilStyle = computed(() => {
  if (!headerRef.value)
    return { left: "20px", top: "20px", transform: "translate(-50%, -50%)" };
  const rect = headerRef.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const eyeOffset = 26; // 目の間隔の半分
  return calculatePupilPosition(
    centerX - eyeOffset,
    rect.top + rect.height / 2
  ); // 左目の中心
});

const rightPupilStyle = computed(() => {
  if (!headerRef.value)
    return { left: "20px", top: "20px", transform: "translate(-50%, -50%)" };
  const rect = headerRef.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const eyeOffset = 26; // 目の間隔の半分
  return calculatePupilPosition(
    centerX + eyeOffset,
    rect.top + rect.height / 2
  ); // 右目の中心
});
</script>

<style scoped>
.nav-link::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #0ea5e9, #3b82f6);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Fade transition for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide transition for sidebar */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
