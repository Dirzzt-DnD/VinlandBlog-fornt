<template>
    <div class="side-content">
        <vinland-admin-card></vinland-admin-card>
        <vinland-hot-article-card/>
        <vinland-category-card/>
        <vinland-tag-card/>
    </div>
</template>
<script>
import VinlandAdminCard from "./VinlandAdminCard.vue"
import VinlandHotArticleCard from "./VinlandHotArticleCard.vue";
import VinlandCategoryCard from "./VinlandCategoryCard.vue";
import VinlandTagCard from "./VinlandTagCard.vue";
export default{
    name:"VinlandSideContent",
    components:{
        VinlandAdminCard,
        VinlandHotArticleCard,
        VinlandCategoryCard,
        VinlandTagCard},
}
</script>
<style>
</style>