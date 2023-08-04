import { createRouter, createWebHistory } from 'vue-router'
import { getUserInfo } from "../utils/storage"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/article/:id/edit",
      name: "ArticleEdit",
      component: () => import("../views/article/ArticleEdit.vue"),
      props: true,
      meta: {
          needAuthentication: true
      }
    },

    {
      path: "/article/add",
      name: "ArticleAdd",
      component: () => import("../views/article/ArticleEdit.vue"),
      meta:{
        needAuthentication: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/Login.vue"),
    },

    {
      path: "/register",
      name: "Register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/article/:id",
      name: "Article",
      component: () => import("../views/article/ArticleDetails.vue"),
      props: true
    },
    {
      path: "/user/settings",
      name: "UserSettings",
      component: () => import("../views/Settings.vue"),
      props: true,
      meta: {
        needLogin: true
    }
    },
    {
      path: "/category/:id",
      name: "CategoryDetails",
      component: () => import("../views/category/CategoryDetails.vue"),
      props: true
  },
  {
    path: "/category",
    name: "CategoryList",
    component: () => import("../views/category/CategoryList.vue"),
  },
  {
      path: "/tag/:id",
      name: "TagDetails",
      component: () => import("../views/Tag/TagDetails.vue"),
      props: true
  },
  {
    path: "/tag",
    name: "TagList",
    component: () => import("../views/Tag/TagList.vue"),
  },
  {
    path:"/archive",
    name:"ArchiveList",
    component: () => import("../views/archive/ArchiveList.vue")
  },
  {
    path:"/archive/:year/:month",
    name:"ArchiveDetails",
    component: () => import("../views/archive/ArchiveDetails.vue"),
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import("../views/PageNotFound.vue")
  }
  ]
})

router.beforeEach((to,from,next)=>{
  if (to.meta.needAuthentication) {
    let isAdmin = getUserInfo() ? getUserInfo().isAdmin : false;
    if (isAdmin) {
        next()
    } else {
        next({ name: "login" })
    }
    } else if(to.meta.needLogin){
      let userInfo = getUserInfo()
        if (userInfo) {
            next()
        } else {
            next({ name: "login" })
        }
    }
     else {
        next()
      }
})

export default router
