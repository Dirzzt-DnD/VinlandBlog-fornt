<template>
    <div>
        <el-form :model="articleForm" :rules="rules" ref="articleForm">
            <el-form-item label="标题" prop="title" class="inputBox">
                <el-input type="primary" v-model="articleForm.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="category" class="inputBox">
                <el-input v-model="articleForm.category" autocomplete="off"></el-input>
            </el-form-item>
            <ArticleEditor class="editor"  @injectContent="SaveContent" @injectHtml="saveHtml"/>
            <el-form-item>
                <el-button type="primary" class="button" @click="saveWholeContent('articleForm')">上传</el-button>
            </el-form-item>
        </el-form>
        <p>{{contentText}}</p>
        <p>{{contentHtml}}</p>
    </div>
</template>
<script>
import ArticleEditor from '../components/ArticleEditor.vue';
import {uploadArticleContent} from '../api/uploadArticle'
export default{

    components:{
        ArticleEditor,
    },

    data(){
        var inputCheck=(rule,value,callback)=>{
            if(value===''){
                callback(new Error('请输入！'));
            }else{
                callback()
            }
        }

        return{
            articleForm: {
                title:'',
                category:'',
            },
            contentText:'hello world',
            contentHtml:'fuxk html',
            rules: {
                title:[
                    {validator:inputCheck, trigger:'blur'}
                ],
                category:[
                    {validator:inputCheck, trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        SaveContent(content){
            this.contentText=content
        },
        saveHtml(html){
            this.contentHtml=html
        },
        saveWholeContent(articleForm){
            this.$refs[articleForm].validate((valid)=>{
                if(valid){
                    alert("正确")
                    //uploadArticleContent(this.article)
                }else{
                    alert("请输入")
                }
            })
        }
    }
}
</script>
<style scoped>
.editor{
    width: 90%;
    height: 500px;
    margin: auto;
}
.inputBox{
    width: 90%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
}
.button{
margin: auto;
margin-top: 20px;
font-weight: bold;
width: 90%;
}
</style>