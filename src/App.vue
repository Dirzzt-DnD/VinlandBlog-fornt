<template>
  <router-view :key="$route.fullPath" />
</template>

<script>
import store from './store';
export default{
  name:"App",
  setup(){
      store.dispatch("adminAbout/getAdminInfo");
      store.dispatch("adminAbout/getArticleCount");
      store.dispatch("categoryAbout/getCategoryCounts");
      store.dispatch("tagAbout/getTagCounts");
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Kanit:900);
@import url(https://fonts.googleapis.com/css?family=Long+Cang&display=swap);

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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

:root {
    --theme-color: #1892ff;
    --card-box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
    --text-color: #4c4948;
}

</style>
