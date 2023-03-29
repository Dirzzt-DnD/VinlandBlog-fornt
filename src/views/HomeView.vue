<template>
  <div class="home">
    <vinland-cover imgUrl="src/assets/image/home-cover.jpg" title="Vinland Blog" content="真正的战士不用剑">
    </vinland-cover>
  </div>
</template>

<script>
import VinlandCover from '../components/VinlandCover.vue';

  export default{
    name: "home",
    components:{
    VinlandCover
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
</style>
