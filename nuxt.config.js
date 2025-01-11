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
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  modules: [
    '@pinia/nuxt',
    'nuxt-primevue',
    '@unocss/nuxt',
    'nuxt-nodemailer',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-gtag'
  ],

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
        'InputSwitch',
        'Sidebar',
        'Divider',
        'ScrollPanel',
        'BlockUI',
        'DataTable',
        'Column',
        'ColumnGroup',
        'Row',
        'Galleria',
        'OverlayPanel',
        'BlockUI'
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
    firebaseAuthDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    googleSecretId: '',
    firebaseApiUrl: '',
    firebaseApiKey: '',
    googleApiUrl: '',
    webUrl: '',
    gmailAppPassword: '',
    public: {
      googleClientId: '',
      gtagId: ''
    }
  },

  site: {
    url: 'https://www.yooooobook.com/',
    name: 'Yooooobook Website'
  },
  sitemap: {
    exclude: ['/user/**', '/order', '/cart'],
    sources: ['/api/__sitemap__/bookUrls'],
    defaults: {
      lastmod: new Date().toISOString(),
      priority: 0.5,
      changefreq: 'weekly'
    }
  },
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID,
    enabled: process.env.NODE_ENV === 'production'
  }

  // nitro: {
  //   preset: 'vercel'
  // }
})
