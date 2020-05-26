const environment = process.env.NODE_ENV || 'development';
const envSet = require(`./env.${environment}.js`)
console.log('スタート nuxt.config.js')
const config =  {
  mode: 'universal',
  env: envSet,
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  router: {
    middleware: ['redirect']
  },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/common.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "@/plugins/element-ui" },
    { src: "~/plugins/axios.js", ssr: false },
    { src: "~/plugins/localStorage.js", ssr: false },
    { src: "~plugins/vue2-google-maps.js" }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL: envSet.apiBaseUrl,
    // browserBaseURL: 'http://localhost:3000',
    proxy: true
  },
  auth: {
    redirect: {
      login: '/login', 
      logout: '/login',
      callback: false,
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: envSet.browserBaseUrl + '/auth/sign_in', method: 'post', propertyName: false },
          logout: { url: envSet.browserBaseUrl + '/auth/sign_out', method: 'DELETE'},
          user: false
        }
      }
    }
  },
  proxy: {
    '/api/': {
      target: 'https://api.gnavi.co.jp/RestSearchAPI/v3/',
      pathRewrite: {
        '^/api/': '/'
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/, /^vue2-google-maps($|\/)/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}

// if (environment === 'development') {
//   config.proxy = { '/api': 'http://backend:3000' }
// }


export default config
console.log('終了 nuxt.config.js')
