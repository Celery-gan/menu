import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './global'
import './filters'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './bus'

import echarts from 'echarts'
import VCharts from 'v-charts'
Vue.use(VCharts)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'zh', // 语言标识，通过切换locale的值来实现语言切换 this.$i18n.locale
    messages: {
        'zh': require('./assets/i18n/zh'), // 中文语言包
        'en': require('./assets/i18n/en'), // 英文语言包
        'tw': require('./assets/i18n/tw') // 繁体语言包
    }
})


Vue.use(ElementUI)
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false

new Vue({
    router,
    i18n,
    dayjs,
    store,
    render: h => h(App)
}).$mount('#app')