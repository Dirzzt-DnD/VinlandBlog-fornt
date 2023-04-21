import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import ArticleInfoTableView from '../views/ArticleInfoTableView.vue'
import ArticleDetails from '../views/article/ArticleDetails.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import HomeView from '../views/HomeView.vue'
import ArticleEdit from "../views/article/ArticleEdit.vue"
import Settings from '../views/Settings.vue'
import CategoryDetails from '../views/category/CategoryDetails.vue'
import CategoryList from '../views/category/CategoryList.vue'
import TagDetails from '../views/Tag/TagDetails.vue'
import TagList from '../views/Tag/TagList.vue'
import ArchiveList from '../views/archive/ArchiveList.vue'
import ArchiveDetails from '../views/archive/ArchiveDetails.vue'
import PageNotFound from '../views/PageNotFound.vue'
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
      path: "/article/:id/edit",
      name: "ArticleEdit",
      component: ArticleEdit,
      props: true,
      meta: {
          needAuthentication: true
      }
    },

    {
      path: "/article/add",
      name: "ArticleAdd",
      component: ArticleEdit,
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
      path: "/user/settings",
      name: "UserSettings",
      component: Settings,
      props: true,
      meta: {
        needLogin: true
    }
    },
    {
      path: "/category/:id",
      name: "CategoryDetails",
      component: CategoryDetails,
      props: true
  },
  {
    path: "/category",
    name: "CategoryList",
    component: CategoryList,
  },
  {
      path: "/tag/:id",
      name: "TagDetails",
      component: TagDetails,
      props: true
  },
  {
    path: "/tag",
    name: "TagList",
    component: TagList,
  },
  {
    path:"/archive",
    name:"ArchiveList",
    component: ArchiveList
  },
  {
    path:"/archive/:year/:month",
    name:"ArchiveDetails",
    component: ArchiveDetails,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFound
  }
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
    } else if(to.meta.needLogin){
      let userInfo = getUserInfo()
        if (userInfo) {
            next()
        } else {
            next({ name: "Login" })
        }
    }
     else {
        next()
      }
})

export default router
