// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ['~/assets/style/all.scss', '~/assets/style/vendor/themes/aura/aura-light/blue/theme.scss'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
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
      include: [
        'IconField',
        'InputIcon',
        'InputText',
        'InputNumber',
        'Password',
        'Button',
        'InputSwitch'
        // 'Toast'
      ]
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
  },

  runtimeConfig: {
    // apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    googleAnalyticsId: '',
    firebaseApiKey: '',
    firebaseAuthDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    googleSecretId: '',
    public: {
      // apiBase: '' // can be overridden by NUXT_PUBLIC_API_BASE environment variable
      googleApiUrl: '',
      firebaseApiUrl: '',
      webUrl: '',
      googleClientId: ''
    }
  }

  // nitro: {
  //   preset: 'vercel'
  // }
})
