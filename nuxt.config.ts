export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,

  modules: ["@nuxt/eslint", "@primevue/nuxt-module", "@pinia/nuxt", "@nuxt/image"],

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
      include: ["Button", "Card", "Form", "Input", "Toast"]
    },
    options: {
      ripple: false
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/common/_functions.scss" as *;'
        }
      }
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
