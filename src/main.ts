import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { abilitiesPlugin, Can } from '@casl/vue'
import App from './App.vue'
import router from './router'
import ability from './plugins/casl'
import vuetify from './plugins/vuetify'
import 'vuetify/styles/main.css'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(abilitiesPlugin, ability)
app.component('Can', Can)
app.use(router)
app.use(vuetify)
app.mount('#app')
