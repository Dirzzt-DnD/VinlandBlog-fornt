<template>
    <div id="category-list">
        <vinland-header/>
        <vinland-wife-cover>
            <h1>分类</h1>
        </vinland-wife-cover>

        <div class="container">
            <vinland-side-bar/>
            <vinland-world-cloud-card :words="categoryCounts" baseUrl="/category"/>
        </div>

        <vinland-footer/>
        <vinland-back-to-top/>
    </div>
</template>
<script>
import VinlandSidebar from "../../components/VinlandSidebar.vue";
import { mapState } from "../../store/map";

export default{
    name: "CategoryList",
    setup() {
        window.scrollTo({ top: 0 });
        let { categoryCounts } = mapState("categoryAbout");
        console.log(categoryCounts);
        return { categoryCounts };
    },
    components: { VinlandSidebar }
}
</script>

<style lang="less" scoped>
#category-list {
    height: 100%;
    width: 100%;
}
.container {
    padding: 40px 15px;
    max-width: 1300px;
    margin: 0 auto;
    display: flex;
    animation: fadeInUp 1s;
}
.wife-cover {
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
        width: 100%;
        text-align: center;
        position: absolute;
        text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
        font-size: 40px;
        color: white;
        line-height: 1.5;
        margin-bottom: 15px;
        padding: 0 30px;
        box-sizing: border-box;
    }
}
.side-content {
    width: 26%;
    margin-right: 20px;
}
.cloud-card {
    width: 74%;
    margin: 0;
}
</style>