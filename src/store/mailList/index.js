import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'

export default {
    namespaced: true,
    state: {
        // 通讯录树形结构
        treeData: [],
        // 通讯录数据
        mailData: [],
        showList: []
    },
    mutations: {
        setTreeData(state, data) {
            state.treeData = data
        },
        setMailData(state, data) {
            state.mailData = state.showList = data
        },
        changeList(state, data) {
            let str = ""
            state.treeData.map(item => {
                // 如果点击的是 区域中心
                if (data == item.label) {
                    str = ''
                } else { // 如果点击的不是 区域中心
                    item.children.map(item1 => {
                        // 如果点击的是 二级标签 例如北方区域中心
                        if (data == item1.label) {
                            // 如果二级标签下 没有三级标签
                            // console.log(item1);
                            if (item1.children == undefined) {
                                str = data
                            } else { // 如果二级标签下 有三级标签
                                item1.children.map(item2 => {
                                    // 如果三级标签下 没有四级标签
                                    if (item2.label == "签证部") {
                                        str += " 签证部 "
                                    }
                                    if (item2.children == undefined) {
                                        str += item2.label + ' '
                                    } else { // 如果三级标签下 有四级标签
                                        item2.children.map(item3 => {
                                            if (item3.label == "电商部") {
                                                str += " 电商部 "
                                            }
                                            if (item3.children == undefined) {
                                                str += item3.label + ' '
                                            } else {
                                                item3.children.map(item4 => {
                                                    str += item4.label + ' '
                                                })
                                            }
                                        })
                                    }
                                })

                            }
                        } else {
                            // 如果点击的是 三级标签  例如B2B事业部
                            if (item1.children != undefined) {
                                item1.children.map(item2 => {
                                    if (data == item2.label) {
                                        if (item2.children == undefined) {
                                            str += data
                                        } else {
                                            item2.children.map(item3 => {
                                                if (item3.label == "电商部") {
                                                    str += " 电商部 "
                                                }
                                                if (item3.children == undefined) {
                                                    str += item3.label + " "
                                                } else {
                                                    item3.children.map(item4 => {
                                                        str += item4.label + " "
                                                    })
                                                }
                                            })
                                        }
                                    } else { // 如果点击的是 四级标签 例如电商部
                                        if (item2.children != undefined) {
                                            item2.children.map(item3 => {
                                                if (data == item3.label) {
                                                    if (item3.children == undefined) {
                                                        str += data + " "
                                                    } else {
                                                        item3.children.map(item4 => {
                                                            str += item4.label + " "
                                                        })
                                                    }
                                                } else {
                                                    if (item3.children != undefined) {
                                                        item3.children.map(item4 => {
                                                            if (data == item4.label) {
                                                                str = data
                                                            }
                                                        })
                                                    }

                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            })
            if (str == '') {
                state.showList = state.mailData
            } else {
                // console.log(str);
                state.showList = state.mailData.filter(item => {
                    return str.indexOf(item.department) != "-1"
                })
            }
        }
    },
    actions: {
        // 获得通讯录树形结构数据
        async getTreeData({ commit }) {
            let res = await api.getTreeData()
                // console.log(res);
            if (res.code === 200) {
                commit("setTreeData", res.data.data)
            }
        },
        // 获得通讯录全部数据
        async getMailList({ commit }) {
            let res = await api.getMailList()
            if (res.code === 200) {
                commit("setMailData", res.data)
            }
        },
    }


}