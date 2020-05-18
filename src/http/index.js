import axios from "axios"
import router from "../router"
import NProgress from "nprogress" // 引入nprogress插件
import "nprogress/nprogress.css"
import { Message } from 'element-ui'

// 判断当前环境是生产环境还是开发环境
// process.env.NODE_ENV的值决定当前环境
// production为生产环境 development为开发环境
const isProduction = process.env.NODE_ENV === "production"

// 创建axios配置对象
const service = axios.create()

// 接口基础路径
service.defaults.baseURL = isProduction ? "线上接口地址" : "/api"

// 超时时间
service.defaults.timeout = 10000

// 请求拦截器
service.interceptors.request.use(
    config => {
        NProgress.start()
            // 取存储的token值
        let token = localStorage.getItem("adminToken")
            // 每次请求 都在请求头带上token
        if (token) {
            // 添加请求头的规则根据接口文档决定
            config.headers["Authorization"] = token
        }
        return config
    },
    err => {
        NProgress.done() //停下进度条
        console.log(err)
        return Promise.reject(err)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        NProgress.done()
        return response.data
    },
    err => {
        if (err.response.code === 401) {
            router.push("/login")
        }
        if (err.response.code === 404) {
            // 提示接口路径出错
            Message.error('接口路径出错')
        }
        if (err.response.code === 500) {
            // 提示服务器出错
            Message.error('服务器出错')
        }
        if (err.response.code === 503) {
            // 提示服务器维护
            Message.error('服务器维护')
        }
        if (err.response.status === 401) {
            router.push("/login")
        }

        NProgress.done()
        return Promise.reject(err.response)
    }
)

export default service