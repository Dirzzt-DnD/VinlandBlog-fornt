<template>
  <div class="home">
    <vinland-cover imgUrl="src/assets/image/home-cover.jpg" title="Vinland Blog" content="真正的战士不用剑">
    </vinland-cover>
    <div class="container">
      <vinland-side-content></vinland-side-content>
    </div>
  </div>
</template>

<script>
import VinlandCover from '../components/VinlandCover.vue';
import VinlandSideContent from '../components/VinlandSideContent.vue';

  export default{
    name: "home",
    components:{
    VinlandCover,
    VinlandSideContent,
},

    setup(){

    }
  }
</script>

<style scoped>
.home {
    height: 100%;
    width: 100%;
}
.container{
  padding: 50px;
}
</style>
