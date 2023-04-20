<template>
    <div class="tag">
        <vinland-header/>
        <VinlandWifeCover>
            <div>
                <h1 class="tag-name">{{ tagName }}</h1>
            </div>
        </VinlandWifeCover>

        <div class="container">
            <div class="side-content">
                <vinland-admin-card/>
                <vinland-hot-article-card/>
                <vinland-category-card/>
                <vinland-tag-card/>
                <vinland-archive-card/>
            </div>
        </div>

        <div class="post-article-list">
            <vinland-post-article-card v-for="(article, index) in postArticles" :key="article.id" :reverse="index % 2 ==1"/>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="articleCount"
                    :page-size="pageSize"
                    id="pagination"
                    @current-change="onCurrentPageChanged"
                    v-if="articleCount > 0"
                >
                </el-pagination>
        </div>

        <vinland-footer/>
        <vinland-back-to-top/>

    </div>
</template>

<script>
import { getPostArticleList } from "../api/articleInfo";
import { defaultThumbnail } from "../utils/thumbnail";
import { mapState } from "../store/map";

export default{
    name:"tag",

    setup(props){
        let pageSize = 10
        let postArticles = reactive([])
        let articleCount = ref(0)
        let { tagCounts } = mapState("tagAbout")
        let tagName = computed(() => {
            let map = Object.fromEntries(
                tagCounts.value.map((i) => [i.id, i.name])
            )
            return map[props.id]
        })

        function onCurrentPageChanged(pageNum) {
            getPostArticleList(pageNum, pageSize, null, props.id).then(
                (data) => {
                    articleCount.value = parseInt(data.total);
                    data.rows.forEach((article) => {
                        article.createTime = article.createTime.split(" ")[0];
                        article.thumbnail =
                            article.thumbnail || defaultThumbnail;
                    });
                    postArticles.splice(0, postArticles.length, ...data.rows);
                }
            );
        }

        window.scrollTo({ top: 0 })
        return {
            tagName,
            postArticles,
            articleCount,
            pageSize,
            onCurrentPageChanged,
        };
    },

    props: ["id", "name"],
}
</script>
<style lang="less" scoped>
#tag{
    width: 100%;
    height: 100%;
}
</style>