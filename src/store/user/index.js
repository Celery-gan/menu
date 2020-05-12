import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'

export default {
    namespaced: true,
    state: {
        verified: '', //图形验证码
        // 账号密码登录验证规则
        rules: {
            username: [
                { required: true, message: "用户名不能为空", trigger: "blur" },
                { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
            ],
            password: [
                { required: true, message: "密码不能为空", trigger: "blur" },
                { min: 6, message: "密码长度应大于 6 个字符", trigger: "blur" }
            ],
            code: [
                { required: true, message: "验证码不能为空", trigger: "blur" },
                { min: 4, max: 4, message: "验证码长度应为4位", trigger: "blur" }
            ]
        },
        // 手机号登录验证规则
        rulesT: {
            phone: [
                { required: true, message: "用户名不能为空", trigger: "blur" },
            ],
            code: [
                { required: true, message: "验证码不能为空", trigger: "blur" },
                { min: 6, max: 6, message: "验证码长度应为6位", trigger: "blur" }
            ]
        },
        // 注册验证规则
        registrule: {
            phone: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
            code: [
                { required: true, message: "验证码不能为空", trigger: "blur" },
                { min: 6, max: 6, message: "验证码长度应为6位", trigger: "blur" }
            ],
            username: [
                { required: true, message: "用户名不能为空", trigger: "blur" },
                { min: 2, max: 10, message: "用户名长度在 2 到 10 个字符", trigger: "blur" }
            ],
            password: [
                { required: true, message: "密码不能为空", trigger: "blur" },
                { min: 6, max: 15, message: "密码长度在 6 到 15 个字符", trigger: "blur" }
            ],
            email: [
                { required: true, message: "请输入邮箱地址", trigger: "blur" },
                { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur"] }
            ]
        },
        //找回密码是验证规则
        findRules: {
            username: [
                { required: true, message: "用户名不能为空", trigger: "blur" },
                { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
            ],
            email: [
                { required: true, message: "请输入邮箱地址", trigger: "blur" },
                { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur"] }
            ]
        },
        // 用户名密码登录表单数据
        ruleForm: { username: "gan", password: "123123", code: "" },
        // 手机号登录表单数据
        ruleFormT: { phone: "18281620530", code: "" },
        // 注册表单
        registForm: {
            username: '',
            password: '',
            email: "",
            phone: "",
            code: ""
        },
        // 手机号登录表单数据
        findForm: {
            username: "",
            email: ""
        },
        // 用户信息
        userInfo: {},
        // 修改密码的表单
        modifyForm: {
            oldPass: "",
            NewPass: "",
            surePass: ""
        },
        asidList: []
    },
    mutations: {
        clearCode(state, data) {
            state.ruleForm.code = ''
        },
        // 图片验证码信息
        setVertify(state, data) {
            state.verified = data
        },
        // 手机号登录手机号规则补充
        setLoginRule(state, data) {
            state.rulesT.phone.push(data)
        },
        // 注册表单手机号规则补充
        setRegistRule(state, data) {
            state.registrule.phone.push(data)
        },
        // 格式化数据
        FormatData(state, data) {
            if (data == "findForm") {
                state.findForm = {
                    username: "",
                    email: ""
                }
            } else if (data == "registForm") {
                state.registForm = {
                    username: '',
                    password: '',
                    email: "",
                    phone: "",
                    code: ""
                }
            } else if (data == "ruleForm") {
                state.ruleForm = {
                    username: "gan",
                    password: "123123",
                    code: ""
                }
            } else {
                state.ruleFormT = {
                    phone: "18281620530",
                    code: ""
                }
            }
        },
        // 用户信息
        setUser(state, data) {
            state.userInfo = data
        },
        // 侧边菜单
        setAsid(state, data) {
            state.asidList = data
        }
    },
    actions: {
        // 得到图片验证码
        async getVerify({ commit }) {
            let res = await api.getCaptcha()
            commit("setVertify", res)
        },
        // 账号密码登录
        async goLogin({ commit, dispatch }, params) {
            // console.log(params);
            let res = await api.userLogin({
                username: params.username,
                password: params.password,
                code: params.code
            })
            if (res.code == 200) {
                localStorage.setItem("adminUser", JSON.stringify(res.data))
                localStorage.setItem("adminToken", "Bearer " + res.token)
                Message.success(res.msg)
                router.push("/")
                commit("FormatData", "ruleForm")
            } else {
                Message.error(res.msg)
                dispatch("getVerify")
                commit("clearCode")
            }

        },
        // 手机号登录
        async PhoneLogin({ commit }, params) {
            // console.log(params);
            commit("FormatData", "ruleFormT")
            let res = await api.phoneLogin(params)
                // console.log(res);
                // 登录成功 res.code == 200 保存用户信息
            if (res.code == 200) {
                localStorage.setItem("adminUser", JSON.stringify(res.data))
                localStorage.setItem("adminToken", "Bearer" + res.token)
                Message.success(res.msg)
                router.push("/")
                commit("FormatData", "ruleForm")
            } else {
                Message.error(res.msg)
            }
        },
        // 获取手机验证码
        async getCodes({ commit }, params) {
            let res = await api.getCode({
                    phone: params
                })
                // console.log(res);
            if (res.code == 200) {
                Message.success(res.msg)
                commit("setCode", res.data.code)
            }
        },
        // 注册
        async regiestOneUser({ commit }, params) {
            let obj = {
                username: params.username,
                password: params.password,
                sms: params.code,
                phone: params.phone,
                email: params.email
            }
            let res = await api.userRegiest(obj)
            if (res.code == 200) {
                Message.success(res.msg)
                router.push("/login")
                commit("FormatData", "registForm")
            } else {
                Message.error(res.msg)
            }
        },
        // 找回密码
        async findOnePwd({ commit }, params) {
            let res = await api.findUserPwd(params)
            if (res.code == 200) {
                Message.success(res.msg)
                router.push("/login")
                commit("FormatData", "findForm")
            } else {
                Message.error(res.msg)
            }
        },
        // 修改密码
        async updatePwd({ commit }, params) {
            // console.log(params);
            let res = await api.updateUserPwd(params)
            if (res.code == 200) {
                Message.success(res.msg)
            } else {
                Message.error(res.msg)
            }
        },
        // 获取侧边栏菜单
        async getMenus({ commit }) {
            let res = await api.getMenus()
            commit("setAsid", res.data)
        },
        // 退出登录
        async logOut({ commit }) {
            let res = await api.logOut()
            if (res.code == 200) {
                Message.success(res.msg)
                localStorage.removeItem("adminUser")
                localStorage.removeItem("adminToken")
                router.push("/login")
            }
        }
    },

}