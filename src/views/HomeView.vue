<template>
  <div class="home">
    <vinland-header/>
    <vinland-cover imgUrl="src/assets/image/home-cover.jpg" title="Vinland Blog" content="真正的战士不用剑">
    </vinland-cover>
    <div class="container">
      <div class="side-content">
        <vinland-admin-card></vinland-admin-card>
        <vinland-hot-article-card/>
        <vinland-category-card/>
        <vinland-tag-card/>
        <vinland-archive-card/>
      </div>
      
      <div class="post-article-list">
        <vinland-post-article-card v-for="(article,index) in postArticleList" :key="article.id" :article="article" :reverse="index % 2 == 1"/>
        <!-- 分页 -->
        <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="articleCount"
                    :page-size="10"
                    id="pagination"
                    @current-change="onCurrentPageChanged"
                >
        </el-pagination>
      </div>
    </div>

    <vinland-footer :adminName="$store.state.adminAbout.adminInfo.nickName"/>
    <vinland-back-to-top/>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import VinlandCover from '../components/VinlandCover.vue';
import VinlandHeader from '../components/VinlandHeader.vue';
import VinlandBackToTop from '../components/VinlandBackToTop.vue';
import VinlandPostArticleCard from "../components/VinlandPostArticleCard.vue";
import { getPostArticleList } from "../api/articleInfo"
import VinlandFooter from "../components/VinlandFooter.vue";
import { defaultThumbnail } from "../utils/thumbnail";

import VinlandAdminCard from "../components/VinlandAdminCard.vue"
import VinlandHotArticleCard from "../components/VinlandHotArticleCard.vue";
import VinlandCategoryCard from "../components/VinlandCategoryCard.vue";
import VinlandTagCard from "../components/VinlandTagCard.vue";
import VinlandArchiveCard from "../components/VinlandArchiveCard.vue";

  export default{
    name: "Home",
    components:{
    VinlandCover,
    VinlandHeader,
    VinlandBackToTop,
    VinlandPostArticleCard,
    VinlandFooter,
    VinlandAdminCard,
    VinlandHotArticleCard,
    VinlandCategoryCard,
    VinlandTagCard,
    VinlandArchiveCard
},

    setup(){
      let postArticleList = reactive([])
      let articleCount = ref(0)

      onCurrentPageChanged(1);

      function onCurrentPageChanged(pageNum) {
        getPostArticleList(pageNum, 10).then((data) => {
          articleCount.value = parseInt(data.total);
          data.rows.forEach((article) => {
            article.createTime = article.createTime.split(" ")[0];
            article.thumbnail = article.thumbnail || defaultThumbnail;
          });
          postArticleList.splice(0, postArticleList.length, ...data.rows);
        });
        }

      return { postArticleList, articleCount,onCurrentPageChanged};
    }
  }
</script>

<style scoped>
.home {
    height: 100%;
    width: 100%;
    background-color: #f3f6f7;
}
.container{
  padding: 40px 15px;
  background: transparent;
  max-width: 1300px;
  margin: 0% top;
  display: flex;
  animation: fadeInUp 1s;
}
.post-article-list {
    width: 74%;
    padding-left: 20px;
}
.post-article-list .post-article-card {
    margin-top: 20px;
}
.post-article-list .post-article-card:nth-child(1) {
    margin-top: 0;
}

.side-content {
    width: 26%;
    margin-right: 20px;
}
#pagination {
    margin-top: 20px;
    justify-content: center;
}
:deep(#pagination > button) {
    box-shadow: var(--card-box-shadow);
    background: white;
    border-radius: 8px;
    height: 35px;
    width: 35px;
}

:deep(#pagination li) {
    box-shadow: var(--card-box-shadow);
    /*FIXME ?*/ 
    background-color: white;
    border-radius: 8px;
    margin: 0 6px;
    height: 35px;
    width: 35px;
}
:deep(#pagination li.active) {
    color: white;
    background: var(--theme-color);
    font-weight: normal;
}

@media screen and (max-width: 900px) {
    .side-content {
        display: none;
    }
    .post-article-list {
        width: 100%;
    }
}
@keyframes fadeInUp {
    from {
        margin-top: 50px;
        opacity: 0;
    }
    to {
        margin-top: 0;
        opacity: 1;
    }
}
</style>
