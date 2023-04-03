<template>
    <div :class="cardClass">
        <router-link :to="`/article/${article.id}`" :class="thumbnailLinkClass">
        <img    :src="article.thumbnail"
                @error.once="useDefaultThumbnail"
                alt="缩略图"
                class="post-article-thumbnail"/>
        </router-link>
        <div class="post-article-info">
            <router-link
                :to="`/article/${article.id}`"
                class="post-article-title"
                >{{ article.title }}
            </router-link>

            <div class="post-article-meta-data-wrap">
                <span class="post-article-meta-data">
                    <font-awesome-icon :icon="['fas', 'calendar-days']" />
                    发表于 {{ article.createTime }}
                </span>
                <span class="post-article-meta-data-divider">|</span>
                <span class="post-article-meta-data">
                    <font-awesome-icon :icon="['fas', 'box-archive']" />
                    分类 {{ article.categoryName }}
                </span>
                <span class="post-article-meta-data-divider">|</span>
                <span class="post-article-meta-data">
                    <font-awesome-icon :icon="['fas', 'eye']" />
                    阅读量 {{ article.viewCount }}
                </span>
            </div>
            <div class="post-article-summary">
                {{ article.summary }}
            </div>
        </div>
    </div>
</template>
<script>
import { reactive } from "vue";
import {useDefaultThumbnail } from "../utils/thumbnail";

export default{
    name: "VinlandPostArticleCard",
    props:{
        article:{
            type: Object,
            require: true,
        },
        reverse: {
            type: Boolean,
            require: false,
        },
    },

    setup(props){
        let cardClass = reactive(["post-article-card"])
        let thumbnailLinkClass = reactive(["post-article-card"])

        if(props.reverse){
            cardClass.push("post-article-card-reversed")
            thumbnailLinkClass.push("post-article-thumbail-link-reversed");
        }

        let defaultThumbnail = "src/assets/image/article-thumbnail.jpg";

        return { cardClass, thumbnailLinkClass, useDefaultThumbnail };
    }
}
</script>

<style scoped>
.post-article-card{
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
}

.post-article-card-reversed{
    flex-direction: row-reverse;
}

.post-article-thumbnail-link{
    width: 44%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 8px 0 0 8px;
}

.post-article-thumbnail-link-reversed{
    border-radius: 0 8px 8px 0;
}

.post-article-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.4s ease;
    box-sizing: border-box;
    overflow: hidden;
}

.post-article-thumbnail:hover{
    transform: scale(1.1);
}

.post-article-info {
    width: 57%;
    padding: 0 40px;
}

.post-article-title {
    color: #1f2d3d;
    font-size: 24px;
    text-decoration: none;
    transition: color 0.4s;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 1.5;
    -webkit-line-clamp: 2;
}

.post-article-title:hover {
    color: #1892ff;
}

.post-article-meta-data-wrap {
    display: flex;
    margin: 9px 0;
}
.post-article-meta-data {
    font-size: 12px;
    color: rgb(133, 133, 133);
    box-sizing: border-box;
    line-height: 24px;
    overflow: hidden;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.post-article-meta-data-divider {
    color: rgb(133, 133, 133);
    margin: 3px 8px;
    font-size: 12px;
}

.post-article-summary {
    color: #4c4948;
    font-size: 14px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 2;
    -webkit-line-clamp: 2;
}

</style>