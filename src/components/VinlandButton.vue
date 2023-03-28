<template>
    <el-button color="#1890ff" style="color:white" class="vinland-button">
    <slot>按钮捏</slot>
    </el-button>
</template>

<script>
    export default{
        name: "VinlandButton"
    }
</script>

<style scoped>
.vinland-button{
    width: 400px;
    height: 40px;
}
</style>