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
.side-content{
    width: 26%;
}
@media screen and (max-width: 900px) {
    .side-content {
        display: none;
    }
}
</style>