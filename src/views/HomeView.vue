<template>
  <div id="home">
    <vinland-header/>
    <vinland-cover title="Vinland Blog" content="真正的战士不用剑">
    </vinland-cover>
    <div class="container">
      <vinland-side-bar/>
      
      <div class="post-article-list">
        <vinland-post-article-card v-for="(article,index) in postArticleList" :key="article.id" :article="article" :reverse="index % 2 == 1"/>
        <!-- 分页 -->
        <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="articleCount"
                    :page-size=pageSize
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
import { getPostArticleList } from "../api/articleInfo"
import VinlandFooter from "../components/VinlandFooter.vue";
import { defaultThumbnail } from "../utils/thumbnail";
  export default{
    name: "Home",
    setup(){
      let pageSize = 10;
      let postArticleList = reactive([])
      let articleCount = ref(0)

      onCurrentPageChanged(1);

      function onCurrentPageChanged(pageNum) {
        getPostArticleList(pageNum, pageSize).then((data) => {
          articleCount.value = parseInt(data.total);
          data.rows.forEach((article) => {
            article.createTime = article.createTime.split(" ")[0];
            article.thumbnail = article.thumbnail || defaultThumbnail;
          });
          postArticleList.push(...data.rows);
        });
        }

      return { pageSize,postArticleList, articleCount,onCurrentPageChanged};
    }
  }
</script>

<style lang="less" scoped>
#home {
    height: 100%;
    width: 100%;
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
      .post-article-card {
        margin-top: 20px;
      }
      .post-article-card:nth-child(1) {
        margin-top: 0;
      }
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
