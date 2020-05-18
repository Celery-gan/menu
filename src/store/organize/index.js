import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'

export default {
    namespaced: true,
    state: {
        offerList: [],
        // offer管理表格所有属性
        allField: [],
        showField: [],
        hideField: [],
        offerNmu: [0, 0, 0, 0, 0],
        userList: [],
        showUser: [],
        payList: [],
        paySum: []
    },
    mutations: {
        setOffer(state, data) {
            state.offerList = data
            state.offerNmu = [0, 0, 0, 0, 0]
            state.offerList.map(item => {
                if (item.status == '0') {
                    state.offerNmu[0] += 1
                } else if (item.status == '1') {
                    state.offerNmu[1] += 1
                } else if (item.status == '2') {
                    state.offerNmu[2] += 1
                } else if (item.status == '3') {
                    state.offerNmu[3] += 1
                } else if (item.status == '4') {
                    state.offerNmu[4] += 1
                }
                if (item.marriage == 1) {
                    item.marriage = "未婚";
                } else {
                    item.marriage = "已婚";
                }
                if (item.education == 0) {
                    item.education = "初中";
                } else if (item.education == 1) {
                    item.education = "高中";
                } else if (item.education == 2) {
                    item.education = "大专";
                } else if (item.education == 3) {
                    item.education = "大学";
                } else if (item.education == 4) {
                    item.education = "硕士";
                } else if (item.education == 5) {
                    item.education = "博士";
                } else if (item.education == 6) {
                    item.education = "博士以上";
                }
                if (item.gender == 1) {
                    item.gender = "女";
                } else {
                    item.gender = "男";
                }
            })
            console.log(state.offerList);
            state.allField = []
            for (let i in data[0]) {
                if (i != "img" && i != "age") {
                    state.allField.push(i)
                }
            }
            state.showField = state.allField.slice(0, 7)
            state.hideField = state.allField.slice(7, state.allField.length)
        },
        addField(state, data) {
            state.showField = state.showField.concat(data)
            state.hideField = state.hideField.filter(item => {
                return data.join().indexOf(item) == -1
            })
        },
        delField(state, data) {
            state.hideField = state.hideField.concat(data)
            state.showField = state.showField.filter(item => {
                return data.join().indexOf(item) == -1
            })
        },
        setUserInfo(state, data) {
            state.userList = data
            state.showUser = data
        },
        changeShow(state, data) {
            if (data == 0) {
                state.showUser = state.userList
            } else if (data == 1) {
                state.showUser = state.userList.filter(item => {
                    return item.state != 0
                })
            } else {
                state.showUser = state.userList.filter(item => {
                    return item.state == 0
                })
            }
        },
        userRegular(state, data) {
            data.map(item1 => {
                state.userList.map(item2 => {
                    if (item2 === item1) {
                        item2.state = 0
                    }
                })
            })
        },
        setPayList(state, data) {
            state.payList = data
            state.paySum = [0, 0, 0, 0]
            data.map(item => {
                state.paySum[0] += Number(item.planMoney)
                state.paySum[1] += Number(item.thisMonth)
                state.paySum[2] += Number(item.actualMoney)
                state.paySum[3] += Number(item.lastMonth)
            })
        }
    },
    actions: {
        // 获得通讯录树形结构数据
        async getOffer({ commit }) {
            let res = await api.getOffer()
            if (res.code === 200) {
                commit("setOffer", res.data)
            }
            return res
        },
        // 获取员工信息
        async getUserInfo({ commit }) {
            let res = await api.getUserInfo()
            if (res.code === 200) {
                commit("setUserInfo", res.data)
            }
            return res
        },
        // 获取薪酬管理信息
        async getPay({ commit }) {
            let res = await api.getPay()
            console.log(res);
            if (res.code === 200) {
                commit("setPayList", res.data)
            }
            return res
        },
    }
}