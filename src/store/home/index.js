import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'

export default {
    namespaced: true,
    state: {
        // 首页进度条数据
        progressList: [],
        // 城市利润列表
        cityData: [],
        // 词云图 基础数据
        chartData: {
            columns: ["city", "value"],
            rows: []
        },
        // 词云图 设置
        chartSettings: {
            sizeMin: 12,
            sizeMax: 22
        },
        // 获得的动态数据
        dynamicList: null,
        // 相关汇报人列表
        reportList: [],
        // 网站调查列表
        questionList: []
    },
    mutations: {
        setProgress(state, data) {
            state.progressList = data
        },
        setcityData(state, data) {
            state.chartData.rows = data
        },
        setDynamic(state, data) {
            state.dynamicList = data
        },
        addDynamic(state, data) {
            state.dynamicList.push(data)
        },
        setReport(state, data) {
            state.reportList = data
        },
        setQuestion(state, data) {
            state.questionList = data
        }
    },
    actions: {
        // 首页进度条数据
        async getProgress({ commit }) {
            let res = await api.getProgress()
            if (res.code == 200) {
                commit("setProgress", res.data)
            }
        },
        // 城市利润
        async getCityValue({ commit }) {
            let res = await api.getCityValue()
            if (res.code == 200) {
                commit("setcityData", res.data)
            }
        },
        // 获得动态
        async getDynamic({ commit }) {
            let res = await api.getDynamics()
            if (res.code == 200) {
                commit("setDynamic", res.data)
            }
        },
        // 获得动态汇报人
        async getReport({ commit }) {
            let res = await api.getReport()
            if (res.code == 200) {
                commit("setReport", res.data)
            }
        },
        // 添加动态
        async addOneDynamic({ commit }, params) {
            console.log(params);
            let res = await api.addOneDynamic(params)
            if (res.code === 200) {
                Message.success(res.msg)
                commit("addDynamic", res.data)
            }
        },
        // 网站调查
        async getquestion({ commit }) {
            let res = await api.getquestion()
            console.log(res);
            if (res.code == 200) {
                commit("setQuestion", res.data)
            }
        },
    }

}