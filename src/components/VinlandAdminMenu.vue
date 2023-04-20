<template>
    <div class="admin-menu">
        <vinland-admin-card></vinland-admin-card>
        <vinland-divider/>
        <el-menu>
            <el-menu-item index="1" @click="$router.push('/')">
                <font-awesome-icon :icon="['fab','fort-awesome']" class="menu-icon"></font-awesome-icon>
                <span>首页</span>
            </el-menu-item>

            <el-menu-item index="2" @click="$router.push('/archive')">
                <font-awesome-icon
                    :icon="['fas', 'box-archive']"
                    class="menu-icon"
                />
                <span>归档</span>
            </el-menu-item>

            <el-sub-menu index="3">
                <template #title>
                    <font-awesome-icon
                        :icon="['fas', 'folder']"
                        class="menu-icon"
                    />
                    <span>分类</span>
                </template>
                <el-menu-item v-for="category in $store.state.categoryAbout.categoryCounts"
                 :key="category.id" :index="'3-' + category.id" class="category-item" 
                 @click="$router.push('/category/'+category.id)">
                 <span class="category-name">{{ category.name }}</span>
                <span class="category-count">{{ category.count }}</span>
                </el-menu-item>
            </el-sub-menu>

            <!-- 标签 -->
            <el-sub-menu index="4">
                <template #title>
                    <font-awesome-icon
                        :icon="['fas', 'tags']"
                        class="menu-icon"
                    />
                    <span>标签</span>
                </template>
                <el-menu-item
                    v-for="tag in $store.state.tagAbout.tagCounts"
                    :key="tag.id"
                    :index="'4-' + tag.id"
                    class="tag-item"
                    @click="$router.push('/tag')"
                    >🔖
                    <span class="tag-name">{{ tag.name }}</span>
                    <span class="tag-count">{{ tag.count }}</span>
                </el-menu-item>
            </el-sub-menu>

            <el-menu-item
                index="5"
                v-if="$store.state.adminAbout.isAdmin"
                @click="$router.push('/article/add')"
            >
                <font-awesome-icon :icon="['fas', 'pen']" class="menu-icon" />
                <span>新随笔</span>
            </el-menu-item>

            <el-menu-item index="6" @click="$router.push('/user/settings')">
                <font-awesome-icon :icon="['fas', 'user']" class="menu-icon" />
                <span>个人中心</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import VinlandAdminCard from './VinlandAdminCard.vue';
import VinlandDivider from './VinlandDivider.vue'

export default{
    name: "VinlandAdminMenu",
    components: {
    VinlandAdminCard,
    VinlandDivider,
    }

}
</script>

<style scoped>
.admin-menu{
    text-shadow: none !important;
    width: 100%;
}
.admin-card{
    box-shadow: none;
    box-sizing: border-box;
    height: 375px;
}

.el-menu{
    padding: 0 10px;
    margin-top: 10px;
    border-right: none;
}

.menu-icon{
    margin: 0 10px 0 0;
}

:deep(.category-item, .tag-item) {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    padding-right: 30px;
    color: #4c4948;
    font-size: 14px;
    transition: all 0.4s;
    border-radius: 4px;
}
:deep(.category-item:hover, .tag-item:hover) {
    padding-left: 50px !important;
}
.category-name,
.tag-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 3px;
}

a {
    display: block;
}

</style>

