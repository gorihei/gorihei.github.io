// @ts-nocheck
export default defineNuxtConfig({
  compatibilityDate: "2024-10-01",
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@nuxt/content"],

  app: {
    head: {
      title: "Portfolio - gorihei",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Personal portfolio website showcasing projects and blog posts",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  css: ["~/assets/css/main.css"],

  // @ts-ignore - Nuxt Content configuration
  content: {
    highlight: {
      theme: "github-dark",
      langs: ["cs"],
    },
  },

  // Prerender blog posts for static generation
  nitro: {
    preset: "github-pages",
    prerender: {
      crawlLinks: true,
      // Continue build even if some prerender routes fail
      failOnError: false,
    },
  },

  // Generate all blog routes for static hosting
  hooks: {
    async "prerender:routes"(ctx) {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const contentDir = path.resolve("content/blog");

      if (!fs.existsSync(contentDir)) return;

      const files = fs.readdirSync(contentDir);
      for (const file of files) {
        if (file.endsWith(".md")) {
          const slug = file.replace(".md", "");
          ctx.routes.add(`/blog/${slug}`);
        }
      }
    },
  },

  // Experimental features for better GitHub Pages compatibility
  experimental: {
    payloadExtraction: false,
  },
});
