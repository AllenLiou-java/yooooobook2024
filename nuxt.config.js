// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ['~/assets/style/all.scss', '~/assets/style/vendor/themes/aura/aura-light/blue/theme.scss'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'manifest',
          href: '/manifest.json'
        }
      ]
    }
  },

  imports: {
    dirs: ['stores']
  },

  modules: ['@pinia/nuxt', 'nuxt-primevue', '@unocss/nuxt'],

  primevue: {
    options: {
      ripple: true
    },
    components: {
      include: ['IconField', 'InputIcon', 'InputText', 'Button', 'InputSwitch']
    },
    cssLayerOrder: 'reset, primevue'
  },

  unocss: {
    nuxtLayers: true
  },

  vite: {
    css: {
      // css mixin使用
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/utils/mixin.scss" as *;'
        }
      }
    }
  }
})
