<template>
    <div class="article">
        <vinland-header/>
        <vinland-wife-cover>
            <div class="article-info">
            <h1 class="article-title">{{articleDetails.title}}</h1>
                <div class="article-meta-data-wrap">
                    <span class="article-meta-data">
                        <font-awesome-icon :icon="['fas', 'calendar-days']" />
                        发表于{{ articleDetails.createTime }}
                    </span>
                    <span class="article-meta-data-divider">|</span>
                    <span class="article-meta-data">
                        <font-awesome-icon :icon="['fas', 'box-archive']" />
                            分类 {{ articleDetails.categoryName }}
                    </span>
                    <span class="article-meta-data-divider">|</span>
                    <span class="article-meta-data">
                        <font-awesome-icon :icon="['fas', 'eye']" />
                        阅读量 {{ articleDetails.viewCount }}
                    </span>
                </div>
            </div>
        </vinland-wife-cover>

        <div class="container">
            <!-- 侧边栏 -->
            <div class="side-content">
                <vinland-admin-card />
                <div class="sticky-layout">
                    <vinland-catalog-card v-if="articleLoaded"/>
                    <vinland-hot-article-card />
                </div>
            </div>

            <!-- 文章内容 -->
            <div class="post-body">
                <div
                    class="article-content"
                    v-html="articleDetails.content"
                ></div>


            <div class="article-signature">
                <img :src="adminInfo.avatar" alt="头像">
                <div class="copyright">
                    <div class="copyright-item">
                        <span class="copyright-title">文章作者：</span>
                            <span class="copyright-content">
                                <router-link to="/">
                                    {{ adminInfo.nickName }}</router-link
                                ></span>
                    </div>
                    <div class="copyright-item">
                        <span class="copyright-title">文章链接：</span>
                        <span class="copyright-content">
                        <a :href="articleUrl">{{ articleUrl }}</a>
                        </span>
                    </div>
                        <div class="copyright-item">
                            <span class="copyright-title">版权声明：</span>
                            <span class="copyright-content">
                                本博客所有文章除特别声明外，均采用
                                <a
                                    href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
                                    >BY-NC-SA</a
                                >
                                许可协议。转载请注明出处！
                            </span>
                        </div>
                    </div>
                </div>

                <div class="article-tags" v-if="articleDetails.tagVos">
                    <span>
                        <font-awesome-icon :icon="['fas', 'tags']" />
                        标签：
                    </span>
                    <router-link
                        :to="'/tag/' + tag.id"
                        v-for="tag in articleDetails.tagVos"
                        :key="tag.id"
                        >{{ tag.name }}</router-link>
                </div>

                <div class="previous-next-article">
                    <div class="previous-article" v-if="previousArticle.id" :style="{width: nextArticle.id?'50%':'100%'}">
                        <router-link :to="`/article/${previousArticle.id}`">
                            <img :src="previousArticle.thumbnail" alt="缩略图" @error.once="useDefaultThumbnail"/>
                            <div class="previous-article-info">
                                <div class="label">« 上一篇</div>
                                <div class="title">
                                    {{ previousArticle.title }}
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="next-article" v-if="nextArticle.id" :style="{ width: previousArticle.id ? '50%' : '100%' }">
                        <router-link :to="`/article/${nextArticle.id}`">
                            <img :src="nextArticle.thumbnail" alt="缩略图" @error.once="useDefaultThumbnail"/>
                            <div class="next-article-info">
                                <div class="label">下一篇 »</div>
                                <div class="title">
                                    {{ nextArticle.title }}
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

        </div>
        <!-- 回到顶部 -->
        <vinland-back-to-top />

        <vinland-light-box ref="lightBoxRef" v-if="articleLoaded"/>

        <!-- 页脚 -->
        <vinland-footer />

    </div>
</template>
<script>
import VinlandHeader from '../components/VinlandHeader.vue'
import VinlandFooter from '../components/VinlandFooter.vue';
import VinlandWifeCover from '../components/VinlandWifeCover.vue';
import VinlandAdminCard from '../components/VinlandAdminCard.vue';
import VinlandHotArticleCard from '../components/VinlandHotArticleCard.vue';
import VinlandBackToTop from '../components/VinlandBackToTop.vue';
import VinlandCatalogCard from '../components/VinlandCatalogCard.vue';
import { getPreviousNextArticle, getArticleDetails, updateViewCount } from "../api/articleInfo";
import { reactive, nextTick, ref } from "vue";
import VMdEditor from '../utils/MyMDEditor';
import { xss } from '@kangc/v-md-editor';
// import { buildHljsLineNumber } from "../utils/hljs";
// import buildCopyButton from "../utils/copyButton";
import buildCodeBlock from "../utils/code-block";
import { mapState } from "../store/map";
import { useDefaultThumbnail, defaultThumbnail } from '../utils/thumbnail';
import VinlandLightBox from '../components/VinlandLightBox.vue';
import markdownIt from "../utils/markdown-it";
import MathQueue from "../utils/mathjax"

export default{
    components:{
        VinlandHeader,
        VinlandAdminCard,
        VinlandFooter,
        VinlandBackToTop,
        VinlandHotArticleCard,
        VinlandWifeCover,
        VinlandCatalogCard,
        VinlandLightBox,
    },
    setup(props){
        window.scrollTo({ top: 0 });

        let articleLoaded = ref(false);

        let articleDetails = reactive({});

        let { adminInfo } = mapState("adminAbout");


        let articleUrl = ref(window.location.href);

        let previousArticle = reactive({});
        let nextArticle = reactive({});
         let lightBoxRef = ref();

        getArticleDetails(props.id).then((data) => {
            Object.assign(articleDetails, data);
            const html = markdownIt.render(data.content);
            articleDetails.content = html

            nextTick(() => {
                //调用querySelector更方便将html元素调用进去而不是直接传class名称
                // buildHljsLineNumber();
                // buildCopyButton();
                MathQueue("article-content");
                buildCodeBlock(".article-content");
                articleLoaded.value = true;
            }).then(()=>{
                lightBoxRef.value.addImageClickedListener();
            })
        })

        updateViewCount(props.id)
        getPreviousNextArticle(props.id).then((data) => {
        if (data.previous) {
            Object.assign(previousArticle, data.previous);
            if (!previousArticle.thumbnail) {
                previousArticle.thumbnail = defaultThumbnail;
            }
        }
        if (data.next) {
            Object.assign(nextArticle, data.next);
            if (!nextArticle.thumbnail) {
                nextArticle.thumbnail = defaultThumbnail;
            }
        }
    })

        return { articleDetails,
                articleLoaded,
                adminInfo,
               articleUrl,
               useDefaultThumbnail,
               previousArticle,
               nextArticle,
               lightBoxRef};
    },
     props: ["id"],
}

</script>
<style lang="less" scoped>

.sticky-layout {
    position: sticky;
    top: 20px;
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
}
.side-content {
    width: 26%;
    margin-right: 20px;
}
.article-info {
    text-align: center;
    position: absolute;
    width: 100%;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}
.article-title {
    font-size: 35px;
    font-weight: normal;
    color: white;
    line-height: 1.5;
    margin-bottom: 15px;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.article-meta-data-wrap {
    display: flex;
    justify-content: center;
}
.article-meta-data {
    font-size: 14px;
    color: white;
    box-sizing: border-box;
    line-height: 24px;
    overflow: hidden;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.article-meta-data-divider {
    color: white;
    margin: 3px 8px;
    font-size: 14px;
}
.post-body {
    width: 74%;
    background: white;
    border-radius: 8px;
    box-shadow: var(--card-box-shadow);
    padding: 30px 40px;
    box-sizing: border-box;
    :deep(.article-content) {
        img {
            display: block;
            margin: 15px auto 15px;
            border-radius: 6px;
            width: 100%;
            cursor: pointer;
            box-shadow: 0 1px 15px rgba(27, 31, 35, 0.15),
                0 0 1px rgba(106, 115, 125, 0.35);
        }
        h1 code,
        h2 code,
        h3 code,
        h4 code,
        h5 code,
        h6 code,
        p > code,
        li > code,
        table code {
            color: #c7254e;
            line-height: 1.2;
            font-family: consolas !important;
            vertical-align: middle;
            margin: 0 3px;
            background-color: #f9f2f4 !important;
            font-size: 14px !important;
            padding: 0.2em 0.3em !important;
            border-radius: 3px !important;
            border: 1px solid #f9f2f4 !important;
        }
        p {
            color: #4c4948;
            font-size: 15px;
            line-height: 28px;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            overflow: hidden;
            -webkit-line-clamp: 4;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            color: #1f2d3d;
            transition: all 0.2s ease-out;
        }
        h4,
        h5,
        h6 {
            font-size: 16px;
        }
        h1 {
           font-size: 24px;
           margin: 10px 0;
        }
        h2 {
            font-size: 20px;
        }
        h3 {
            font-size: 17px;
        }
        /* 代码样式 */
        pre {
            white-space: pre;
            position: relative;
            border-radius: 7px;
            color: #bababa;
            background-color: #282c34;
            font-size: 14px;
            padding: 3px 10px;
            code {
                border: none;
                border-radius: 7px;
                font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
                    monospace !important;
                line-height: 21px;
            }
        }
    }

    .article-signature {
        border: 1px solid #ddd;
        position: relative;
        overflow: hidden;
        margin: 30px 5px 10px 5px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        padding: 12px;
        transition: all 0.4s;
        &:hover {
            box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
        }

        img {
            margin: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 6px;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            transition: all 0.6s;
            &:hover {
                transform: rotate(-360deg);
            }
        }
        .copyright {
            padding-left: 20px;
            .copyright-item {
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                line-height: 28px;
                font-size: 15px;
                color: #4c4948;
                a {
                    /* text-decoration: none; */
                    color: #99a9bf;
                    transition: all 0.4s;
                    cursor: pointer;
                    &:hover {
                        color: #19b1f5;
                    }
                }
                .copyright-title {
                    font-weight: bold;
                    color: #19b1f5;
                }
            }
        }
    }
    .article-tags {
        padding-left: 3px;
        margin-top: 20px;
        color: #4c4948;
        font-size: 15px;
        a {
            border-radius: 4px;
            font-size: 13px;
            padding: 3px 12px;
            text-decoration: none;
            transition: all 0.4s;
            background: #49b1f5;
            margin-right: 8px;
            color: white;
        }
    }

    .previous-next-article{
        width: 100%;
        margin-top: 50px;
        overflow: hidden;
        background: black;
        display: flex;
        border-radius: 9px;

        .previous-article,
        .next-article{
            width: 50%;
            a {
                height: 150px;
                overflow: hidden;
                display: block;
                position: relative;

                img {
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    object-fit: cover;
                    opacity: 0.5;
                    transition: all 0.6s ease-in-out;
                    &:hover {
                        transform: scale(1.1);
                        opacity: 0.8;
                    }
                }

                .previous-article-info,
                .next-article-info{
                    pointer-events: none;
                    position: absolute;
                    top: 50%;
                    width: 100%;
                    padding: 20px 40px;
                    transform: translate(0, -50%);
                    color: white;
                    line-height: 28px;
                    box-sizing: border-box;

                    .label {
                        font-size: 13px;
                    }

                    .title {
                        font-weight: 500;
                        font-size: 14px;
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }

                    .next-article-info {
                    text-align: right;
                    }
                }
                
            }
        }
    }
}
@media screen and (max-width: 900px) {
    .side-content {
        display: none;
    }
    .post-body {
        width: 100%;
    }
}

@keyframes fadeInUp {
    from {
        margin-top: 50px;
        opacity: 0;
    }
    to {
        margin-top: 0;
        opacity: 1;
    }
}
</style>