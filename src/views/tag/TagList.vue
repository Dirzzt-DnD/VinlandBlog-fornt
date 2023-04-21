<template>
    <div id="tag-list">
        <vinland-header/>
        <vinland-wife-cover>
            <h1>标签</h1>
        </vinland-wife-cover>

        <div class="container">
            <div class="side-content">
                <vinland-admin-card/>
                <vinland-hot-article-card/>
                <vinland-category-card/>
                <vinland-tag-card/>
                <vinland-archive-card/>
            </div>

            <vinland-world-cloud-card :words="tagCounts" baseUrl="/tag"/>
        </div>

        <vinland-footer/>
        <vinland-back-to-top/>
    </div>
</template>
<script>
import { mapState } from "../../store/map";
export default{
    name:"tagList",
    setup() {
        window.scrollTo({ top: 0 });
        let { tagCounts } = mapState("tagAbout");
        return { tagCounts };
    },
}
</script>
<style lang="less" scoped>
#tag-list {
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