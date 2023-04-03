<template>
    <div class="side-content">
        <vinland-admin-card></vinland-admin-card>
        <vinland-hot-article-card/>
    </div>
</template>
<script>
import VinlandAdminCard from "./VinlandAdminCard.vue"
import VinlandHotArticleCard from "./VinlandHotArticleCard.vue";
export default{
    name:"VinlandSideContent",
    components:{VinlandAdminCard, VinlandHotArticleCard},
    setup(){},
}
</script>
<style>
</style>