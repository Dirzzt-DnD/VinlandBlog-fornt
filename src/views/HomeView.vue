<template>
  <div class="home">
    <vinland-header/>
    <vinland-cover imgUrl="src/assets/image/home-cover.jpg" title="Vinland Blog" content="真正的战士不用剑">
    </vinland-cover>
    <div class="container">
      <vinland-side-content></vinland-side-content>
      
      <div class="post-article-list">
        <vinland-post-article-card v-for="(article,index) in postArticleList" :key="id" :article="article" :reverse="index % 2 == 1"/>
      </div>
    </div>
    <vinland-back-to-top/>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import VinlandCover from '../components/VinlandCover.vue';
import VinlandSideContent from '../components/VinlandSideContent.vue';
import VinlandHeader from '../components/VinlandHeader.vue';
import VinlandBackToTop from '../components/VinlandBackToTop.vue';
import store from '../store'
import VinlandPostArticleCard from "../components/VinlandPostArticleCard.vue";
import { getPostArticleList } from "../api/articleInfo"

  export default{
    name: "Home",
    components:{
    VinlandCover,
    VinlandSideContent,
    VinlandHeader,
    VinlandBackToTop,
    VinlandPostArticleCard,
},

    setup(){
      store.dispatch("adminAbout/getAdminInfo");
      store.dispatch("adminAbout/getArticleCount");

      let postArticleList = reactive([])
      let articleCount = ref(0)

      getPostArticleList(0,10).then((data) => {
        console.log(data)
        articleCount = data.total;
        data.rows.forEach((article) => {
                article.createTime = article.createTime.split(" ")[0];
                article.thumbnail = article.thumbnail || defaultThumbnail;
            });
            postArticleList.push(...data.rows);
      })

      return { postArticleList, articleCount };
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


</style>
