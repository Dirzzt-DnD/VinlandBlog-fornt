<template>
    <vinland-card :icon="['fas','tags']" iconColor="#db669f" title="标签">
        <div class="tag-clouds">
            <router-link class="tag-item" v-for="tag in tagClouds"  :to="`/tag/${tag.id}`" :key="tag.id" :style="tag.style">
                {{tag.name}}
            </router-link> 
        </div>
    </vinland-card>
</template>
<script>
import { mapState } from '../store/map';
import {linearColorWordCloud} from '../utils/word-cloud'
export default{
    name:"VinlandTagCard",
    setup(){
        let { tagCounts } = mapState("tagAbout");
        let tagClouds = computed(() => linearColorWordCloud(tagCounts.value));
        return { tagClouds };
    }
}
</script>
<style scoped>

.tag-clouds{
    font-size: 14;
    box-sizing: border-box;
}

.tag-item{
    text-decoration: none;
    display: inline-block;
    transition: all 0.4s;
    padding: 0 4px;
    overflow-wrap: break-word;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 2;
}

.tag-item:hover{
    color:#1892ff !important;
}
</style>