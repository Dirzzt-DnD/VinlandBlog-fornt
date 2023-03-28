import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import UploadArticleView from '../views/UploadArticleView.vue'
import ArticleInfoTableView from '../views/ArticleInfoTableView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  component: StartView,
  routes: [

    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/uploadArticle',
      name: 'uploadArticle',
      component: UploadArticleView,
      meta: {
        title: '上传文章'
      }
    },
    {
      path: '/articleInfo',
      name: 'articleInfo',
      component: ArticleInfoTableView,
      meta: {
        title: '文章信息'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录'
      }
    },

    {
      path: "/register",
      name: "Register",
      component: Register,
    },

    {
      path: '/startView',
      name: 'start',
      component: StartView,
      meta: {
        title: '起始页'
      }
    },
  ]
})

export default router
