<template>
    <div class="admin-menu">
        <vinland-admin-card></vinland-admin-card>
        <vinland-divider/>
        <el-menu default-active="2" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
            <el-menu-item index="1">
                <font-awesome-icon :icon="['fab','fort-awesome']" class="menu-icon"></font-awesome-icon>
                <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="2">
                <template #title>
                    <font-awesome-icon
                        :icon="['fas', 'box-archive']"
                        class="menu-icon"
                    />
                    <span>归档</span>
                </template>

                <el-menu-item index="1-1">🎯 2022 年 1 月（2）</el-menu-item>
                <el-menu-item index="1-2">🎯 2022 年 2 月（3）</el-menu-item>
                
            </el-sub-menu>

            <el-sub-menu index="3">
                <template #title>
                    <font-awesome-icon
                        :icon="['fas', 'folder']"
                        class="menu-icon"
                    />
                    <span>分类</span>
                </template>
                <el-menu-item index="2-1">🎈 2022 年 1 月（2）</el-menu-item>
                <el-menu-item index="2-2">🎈 2022 年 2 月（3）</el-menu-item>
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
                <el-menu-item index="3-1">🔖 PyQt</el-menu-item>
                <el-menu-item index="3-2">🔖 深度学习</el-menu-item>
            </el-sub-menu>
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
}

.menu-icon{
    margin: 0 10px 0 0;
}

</style>

