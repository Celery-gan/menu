import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'

export default {
    namespaced: true,
    state: {
        offerList: ''
    },
    mutations: {
        setOffer(state, data) {
            state.offerList = data
        },
    },
    actions: {
        // 获得通讯录树形结构数据
        async getOffer({ commit }) {
            let res = await api.getOffer()
            console.log(res);
            if (res.code === 200) {
                commit("setOffer", res.data)
            }
            return res
        },
    }


}