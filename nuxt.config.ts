export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  modules: ["@nuxt/eslint", "@primevue/nuxt-module", "@pinia/nuxt"],

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

  ssr: false,

  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"]
    }
  },

  app: {
    head: {
      script: [
        {
          innerHTML: `(function(){try{var s=JSON.parse(localStorage.getItem('layout:settings')||'{}');if(s.isDarkMode)document.documentElement.classList.add('dark')}catch(e){}})()`,
          tagPosition: "head"
        }
      ]
    }
  }
});
