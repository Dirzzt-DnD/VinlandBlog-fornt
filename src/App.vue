<script setup>
import ArticleInfoTableView from './views/ArticleInfoTableView.vue'
import StartView from './views/StartView.vue'
</script>

<template>
  <router-view></router-view>
</template>
<style>
/* #app {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
} */

::-webkit-scrollbar{
  height: 14px;
  width: 4px;
}

::-webkit-scrollbar-thumb{
  background-color: rgba(130, 130, 130, 0.8);
}

::-webkit-scrollbar-track{
  border-radius: 10px;
}

body{
  overflow: overlay;
}

:root {
    --theme-color: #1892ff;
}

</style>
