import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],

  build: {
    transpile: ['trpc-nuxt']
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  css: ['~/assets/css/main.css'],
})
