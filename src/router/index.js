import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import ComUser from '../pages/common/comUser'
import comHome from '../pages/common/comHome'

Vue.use(VueRouter)

const routes = [{
        path: '/', // 默认进入路由
        redirect: '/home' //重定向
    }, {
        path: '/',
        component: comHome,
        children: [{
            path: '/home',
            name: 'home',
            component: Home
        }]
    },
    // 登录页面
    {
        path: '/',
        component: ComUser,
        children: [{
            path: '/login',
            name: 'login',
            component: () =>
                import ('../pages/login/Login')
        }]
    },
    // 注册页面
    {
        path: '/',
        component: ComUser,
        children: [{
            path: '/regiest',
            name: 'regiest',
            component: () =>
                import ('../pages/login/regiest')
        }]
    },
    // 找回密码
    {
        path: '/',
        component: ComUser,
        children: [{
            path: '/findPwd',
            name: 'findPwd',
            component: () =>
                import ('../pages/login/findPwd')
        }]
    },
    //锁屏页面 
    {
        path: '/lockView',
        name: 'lockView',
        component: () =>
            import ('../pages/lockView/lockView')
    },
    // 日程管理
    {
        path: '/',
        component: comHome,
        children: [{
            path: '/calendar',
            name: 'calendar',
            component: () =>
                import ('../pages/calendar/Calendar')
        }]
    },
    // 通讯录
    {
        path: '/',
        component: comHome,
        children: [{
            path: '/maillist',
            name: 'maillist',
            component: () =>
                import ('../pages/maillist/Maillist')
        }]
    },
    // offer管理
    {
        path: '/',
        component: comHome,
        children: [{
            path: '/organization/offer',
            name: 'organization/offer',
            component: () =>
                import ('../pages/organization/Offer')
        }]
    },
    // 人员信息
    {
        path: '/',
        component: comHome,
        children: [{
            path: '/organization/userInfo',
            name: 'organization/userInfo',
            component: () =>
                import ('../pages/organization/UserInfo')
        }]
    },
    // 薪酬管理
    {
        path: '/',
        component: comHome,
        children: [{
            path: '/organization/pay',
            name: 'organization/pay',
            component: () =>
                import ('../pages/organization/Pay')
        }]
    },
    // 分步表单
    {
        path: '/',
        component: comHome,
        children: [{
            path: '/form/stepForm',
            name: 'form/stepForm',
            component: () =>
                import ('../pages/form/StepForm')
        }]
    },
]

const isPro = process.env.NODE_ENV === 'production'


const router = new VueRouter({
    mode: isPro ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem("adminToken")
    if (token == null) {
        if (to.path == "/login" || to.path == "/regiest" || to.path == "findPwd") {
            next()
        } else {
            next("/login")
        }
    } else {
        // if (to.path !== "/lockView") {
        //     if (sessionStorage.getItem("isUnLock") == "true") {
        //         next()
        //     } else {
        //         next("/lockView")
        //     }
        // } else {
        next()
            // }
    }
})

export default router