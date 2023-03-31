<template>
  <div class="home">
    <vinland-header/>
    <vinland-cover imgUrl="src/assets/image/home-cover.jpg" title="Vinland Blog" content="真正的战士不用剑">
    </vinland-cover>
    <div class="container">
      <vinland-side-content></vinland-side-content>
    </div>
    <vinland-back-to-top/>
  </div>
</template>

<script>
import VinlandCover from '../components/VinlandCover.vue';
import VinlandSideContent from '../components/VinlandSideContent.vue';
import VinlandHeader from '../components/VinlandHeader.vue';
import VinlandBackToTop from '../components/VinlandBackToTop.vue';
import store from '../store'

  export default{
    name: "Home",
    components:{
    VinlandCover,
    VinlandSideContent,
    VinlandHeader,
    VinlandBackToTop,
},

    setup(){
      store.dispatch("adminAbout/getAdminInfo");
      store.dispatch("adminAbout/getArticleCount");
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
}
</style>
