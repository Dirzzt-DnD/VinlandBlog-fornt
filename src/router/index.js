import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import UploadArticleView from '../views/UploadArticleView.vue'
import ArticleInfoTableView from '../views/ArticleInfoTableView.vue'
import ArticleDetails from '../views/ArticleDetails.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import HomeView from '../views/HomeView.vue'
import Edit from "../views/Edit.vue"
import { getUserInfo } from "../utils/storage"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  component: StartView,
  routes: [

    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/uploadArticle',
      name: 'uploadArticle',
      component: UploadArticleView,
    },

    {
      path: "/article/:id/edit",
      name: "ArticleEdit",
      component: Edit,
      props: true,
      meta: {
          needAuthentication: true
      }
    },

    {
      path: "/article/add",
      name: "ArticleAdd",
      component: Edit,
      meta:{
        needAuthentication: true
      }
    },

    {
      path: '/articleInfo',
      name: 'articleInfo',
      component: ArticleInfoTableView,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
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
    {
      path: "/article/:id",
      name: "Article",
      component: ArticleDetails,
      props: true
    },
    {
      path: "/article/:id/edit",
      name: "ArticleEdit",
      component: Edit,
      props: true,
      meta: {
          needAuthentication: true
      }
    },
  ]
})

router.beforeEach((to,from,next)=>{
  if (to.meta.needAuthentication) {
    let isAdmin = getUserInfo() ? getUserInfo().isAdmin : false;
    if (isAdmin) {
        next()
    } else {
        next({ name: "Login" })
    }
    } else {
        next()
    }
})

export default router
