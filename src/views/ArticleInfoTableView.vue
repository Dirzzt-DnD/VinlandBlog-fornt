<template>
    <el-table ref="table" border :data="tableData" style="width: 100%" >
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button :type="primary" @click="deleteArticle(scope.$index)">删除</el-button>
          <el-button :type="primary" @click="checkArticle(scope.$index)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="category" label="分类"/>
      <el-table-column prop="creatTime" label="创建时间"/>
    </el-table>
  </template>
<script>
import{checkArticleApi,deleteArticleApi,articleInfoListApi} from '../api/articleInfo'
export default{
  data(){
    return{
      tableData:[],
    }
  },

  methods:{
    async init(){
      this.tableData = await articleInfoListApi()
    },
    checkArticle(index){
    },
    async deleteArticle(index){
      let res = await deleteArticleApi(index)
      if(res===1){
        this.init()
      }else{
        alert("删除失败")
      }
    },
  },
  created(){
    this.init()
  }
}
</script>
