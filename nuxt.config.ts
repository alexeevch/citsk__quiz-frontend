export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  modules: ["@nuxt/eslint", "@primevue/nuxt-module"],

  runtimeConfig: {
    public: {
      appName: "",
      apiUrl: ""
    }
  },

  css: ["~/assets/styles/main.scss"],

  primevue: {
    importTheme: { from: "~/assets/themes/citsk-preset.ts" },
    components: {
      include: ["Button"]
    },
    options: {
      ripple: false
    }
  },

  ssr: false
});
