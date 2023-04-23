<template>
    <div id="side-bar">
        <slot>
            <vinland-admin-card/>
            <vinland-hot-article-card/>
            <vinland-category-card/>
            <vinland-tag-card/>
            <vinland-archive-card/>
        </slot>
    </div>
</template>
<script>
export default{
    name: "SideBar"
}
</script>

<style lang="less" scoped>
#side-bar {
    width: 26%;
    margin-right: 20px;
}
@media screen and (max-width: 900px) {
    #side-bar {
        display: none;
    }
}
</style>