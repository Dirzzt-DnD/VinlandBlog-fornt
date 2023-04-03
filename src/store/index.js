import { createStore } from "vuex";
import { getAdminInfo } from '../api/login'
import { getArticleCount } from '../api/articleInfo'
import { data } from "jquery";

let adminAbout = {
    namespaced: true,
    state: {
        adminInfo: {
            nickName: "",
            motto: "",
            avatar: "src/assets/image/avatar.jpg",
            githubUrl: "https://github.com/Dirzzt-DnD"
        },

        articleCountInfo:{
            article: 0,
            category: 0,
            tag: 0
        }
    },

    actions: {
        getAdminInfo(context){
            return new Promise((resolve) => {
                getAdminInfo().then(data => {
                    context.commit('updateAdminInfo',data)
                    resolve(data)
                })
            })
        },

        getArticleCount(context){
            return new Promise((resolve) => {
                getArticleCount().then(data => {
                    context.commit('updateArticleCountInfo',data)
                    resolve(data)
                })
            })
        }
    },

    mutations: {
        updateAdminInfo(state, adminInfo){
			Object.assign(state.adminInfo, adminInfo)
        },
        updateArticleCountInfo(state, articleCountInfo) {
			Object.assign(state.articleCountInfo, articleCountInfo)
		},
    }
}

let websiteAbout = {
	namespaced: true,
	state: {
		startDate: "2023-03-01"
	},
	actions: {},
	mutations: {},
}

export default createStore({
	modules: { adminAbout, websiteAbout },
});