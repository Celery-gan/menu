import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'

export default {
    namespaced: true,
    state: {
        payPwdForm: {
            payPwd: ""
        },
        ruleForm: {
            payAccount: "", // 付款账户
            payMethod: "银行卡", // 转账方式
            payNumber: "", // 转账账号
            payeeName: "", // 收款人姓名
            payAmount: "" // 收款金额
        },
        rules: {
            payAccount: [
                { required: true, message: "请输入付款人账户", trigger: "blur" }
            ],
            payNumber: [
                { required: true, message: "请输入收款人账户", trigger: "blur" }
            ],
            payeeName: [
                { required: true, message: "请输入收款人姓名", trigger: "blur" }
            ],
            payAmount: [
                { required: true, message: "请输入转账金额", trigger: "blur" }
            ]
        }
    },
    mutations: {
        setRuleForm(state, data) {
            state.ruleForm = {
                payAccount: "", // 付款账户
                payMethod: "银行卡", // 转账方式
                payNumber: "", // 转账账号
                payeeName: "", // 收款人姓名
                payAmount: "" // 收款金额
            }
        },
        saveRuleForm(state, data) {
            state.ruleForm = data
        },
        setPayPwd(state, data) {
            state.payPwdForm.payPwd = ''
        }
    },
    actions: {

    },
    // 注册
    async regiestOneUser({ commit }, params) {}

}