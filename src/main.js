import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import FontAwesomeIcon from "./utils/fontawesome-icons"
import './assets/css/index.css'
import store from "./store";
import VMdEditor from './utils/MyMDEditor'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(store)
app.use(ElementUI)
app.component("font-awesome-icon",FontAwesomeIcon)
app.use(VMdEditor)
app.mount('#app')
