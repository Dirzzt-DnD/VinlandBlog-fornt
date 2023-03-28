<template>
    <div class="common-layout">
      <el-container class="homeContainer" direcation="vertical">
        <el-header>
          <div class="headerDiv"><p>VINLAND <b style="font-size: 15px;">博客管理</b></p></div>
        </el-header>
        <el-container>
          <el-aside width="200px" style="height: 100%;">
              <el-menu :router="true" active-text-color="#ffd04b" background-color="#545c64" text-color="#fff" style="height: 100%;">
                <el-menu-item index="/uploadArticle">
                  <el-icon><Edit /></el-icon>
                  <span>上传文章</span>
                </el-menu-item>

                <el-menu-item index="/articleInfo">
                  <span>文章总集</span>
                </el-menu-item>

                <el-menu-item index="/login">
                  <span>登录</span>
                </el-menu-item>
              
              </el-menu>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>

<script>
</script>

<style scoped>
.common-layout,
.el-container{
  padding: 0px;
  margin: 0px;
  height: 100%;
  direction: vertical;
}

.el-aside{
  background-color: #545c64;
}
.el-header{
  background-color: #7fa8d0;
  height: 10%;
}
.headerDiv{
  display: flex;
  align-items:center;
  font-size: 25px;
  font-family:fantasy;
  color: #ffffff;
}
.el-main{
  overflow-y: scroll;
}
</style>