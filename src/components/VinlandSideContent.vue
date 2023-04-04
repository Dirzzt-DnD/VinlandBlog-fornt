<template>
    <div class="side-content">
        <vinland-admin-card></vinland-admin-card>
        <vinland-hot-article-card/>
        <vinland-category-card/>
        <vinland-tag-card/>
        <vinland-archive-card/>
    </div>
</template>
<script>
import VinlandAdminCard from "./VinlandAdminCard.vue"
import VinlandHotArticleCard from "./VinlandHotArticleCard.vue";
import VinlandCategoryCard from "./VinlandCategoryCard.vue";
import VinlandTagCard from "./VinlandTagCard.vue";
import VinlandArchiveCard from "./VinlandArchiveCard.vue";
export default{
    name:"VinlandSideContent",
    components:{
        VinlandAdminCard,
        VinlandHotArticleCard,
        VinlandCategoryCard,
        VinlandTagCard,
        VinlandArchiveCard},
}
</script>
<style>
</style>