import Vue from 'vue'
import Vuex from 'vuex'
import user from "./user"
import home from "./home"
import calendar from "./calendar"
import mailList from "./mailList"
import organize from "./organize"
Vue.use(Vuex)

// 只放公共的状态
export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        home,
        calendar,
        mailList,
        organize
    }
})