<template>
    <div class="edit">
        <vinland-header/>
        <vinland-wife-cover>
            <h1>{{ title }}</h1>
        </vinland-wife-cover>

        <div class="edit-card">
            <h1 class="vinland-blog-title">🗡VINLAND BLOG👑</h1>
            <el-form :model="ruleForm" ref="ruleFormRef" :rules="rules" label-width="60px" class="edit-ruleForm" >
              
                <el-form-item prop="title" label="标题">
                <el-input
                        v-model="ruleForm.title"
                        class="w-50 m-3"
                        size="large"
                        placeholder="标题还是很重要的"
                    ></el-input>
              </el-form-item>

              <el-form-item prop="summary" label="摘要">
                <el-input
                        v-model="ruleForm.summary"
                        class="w-50 m-3"
                        size="large"
                        type="textarea"
                        placeholder="简要也很重要哦"
                    ></el-input>
              </el-form-item>

              <div class="inline-form-row">
                
                <el-form-item label="分类" prop="category" inline style="width: 35%;">
                    <el-select-v2 v-model="ruleForm.category" :options="categories" 
                    placeholder="还有分类别忘了哦" style="width: 100%; vertical-align: middle" 
                    allow-create filterable clearable/>
                </el-form-item>

                <el-form-item label="标签" prop="tag" inline style="width: 60%;" >
                    <el-select-v2 v-model="ruleForm.tags" :options="tags" placeholder="再贴几个标签吧" style="width: 100%; vertical-align: middle;"
                    multiple allow-create filterable clearable/>
                </el-form-item>

             </div>

                <el-form-item prop="content" label="内容">
                    <v-md-editor v-model="ruleForm.content" id="mavon"
                    left-toolbar="undo redo clear | emoji h bold italic strikethrough quote | ul ol table hr | link image code | save"
                    :autofocus="true" :disabled-menus="[]" height="500px" width="100%" 
                    @upload-image="handeleUploadImage"></v-md-editor>
                </el-form-item>

                <el-form-item prop="thumbnail" label="缩略图">
                    <vinland-uploader 
                    @uploaded="handleThumbnailUploaded" 
                    @aboutToUpload="handleAboutToUploadThumbnail"
                    @remove = "handleRemoveThumbnail"
                    ref="uploaderRef"/>
                </el-form-item>

                <el-form-item>
                    <el-button
                        id="submit-button"
                        type="primary"
                        @click="submitForm(ruleFormRef, false)"
                        color="#1892ff"
                        class="el-button"
                        >立刻发布</el-button
                    >
                    <el-button
                        class="el-button"
                        id="draft-button"
                        @click="submitForm(ruleFormRef, true)"
                        >存为草稿</el-button
                    >
                    <el-button @click="cancelSubmit">取消</el-button>
                </el-form-item>
              </el-form>
        </div>
        
        <vinland-footer/>

    </div>
</template>


<script>
import { uploadImage } from "../api/image";
import { mapState } from "../store/map";
import { addArticle, editArticle, getArticleDetails } from "../api/articleInfo"
import { ElMessage, ElMessageBox } from "element-plus";
import router from "../router";
import bus from "../utils/bus";
import markdownIt from "../utils/markdown-it";

export default{

    setup(props) {

        let isInEditMode = props.id ? true : false;
        let content = ref("");
        let ruleFormRef = ref();
        let { categoryCounts } = mapState("categoryAbout");
        let { tagCounts } = mapState("tagAbout");
        let uploaderRef = ref()
        let title = computed(() => isInEditMode? "编辑博客" : "新随笔")
        let categories = computed(() => {
            return categoryCounts.value.map((i) => ({
                value: i.name,
                label: i.name,
            }));
        });
        let tags = computed(() => {
            return tagCounts.value.map((i) => ({
                value: i.name,
                label: i.name,
            }));
        });
        let ruleForm = reactive({
            id : undefined,
            title: "",
            summary: "",
            content: "",
            category: "",
            tags: [],
            thumbnail: "",
            isDraft: false
        });
        let rules = reactive({
            title: [
                {
                    required: true,
                    message: "文章标题不能为空",
                    trigger: "change",
                },
            ],
            content: [
                {
                    required: true,
                    message: "文章内容不能为空",
                    trigger: "change",
                },
            ],
            category: [
                {
                    required: true,
                    message: "分类不能为空",
                    trigger: "change",
                },
            ],
        });

        if(isInEditMode){
            getArticleDetails(props.id).then((data) =>{
                console.log(data)
                Object.assign(ruleForm, data)
                ruleForm.category = data.categoryName;
                if(data.tags){
                    ruleForm.tags = data.tags.map((t) => t.name);
                }
                if (data.thumbnail) {
                    uploaderRef.value.setImgUrl(data.thumbnail);
                    uploaderRef.value.isSuccessLabelVisible = true;
                }
            })
        }

        function handleAboutToUploadThumbnail() {
            document.getElementById("submit-button").disabled = true;
            document.getElementById("draft-button").disabled = true;
        }
        
        function handleRemoveThumbnail(file, fileList) {
            ruleForm.thumbnail = "";
        }

        function submitForm(form, isDraft){
            if(!validateForm(form)) return;

            ruleForm.isDraft = isDraft
            generateSummary()

            let name = isDraft? "草稿" : "博客"

            if(!isInEditMode){
                addArticle(ruleForm).then((id)=>{
                    ElMessage.success(name+"已发布");
                    bus.emit("articlePosted");
                    setTimeout(() => {
                        router.push("/article/" + id);
                    }, 1500);
                })
            }else{
                editArticle(ruleForm).then((id) => {
                    ElMessage.success(name+"已编辑")
                    bus.emit("articlePosted")
                    setTimeout(() => {
                        router.push("/article/" + id);
                    }, 1500);
                })
            }
        }

        function cancelSubmit(){
            ElMessageBox.confirm(
                "确定要取消博客的发表吗？开弓没有回头箭",
                "一条友善的提示",
                {
                    confirmButtonText: "我意已决",
                    cancelButtonText: "再等等",
                    type: "warning",
                }
            ).then(() => {
                router.push("/");
            });
        }

        function validateForm(form) {
            if(!form) return false;

            form.validate((valid)=>{
                if (!valid) {
                    ElMessage.error("必填字段不能为空哦");
                    return false;
                }
            })

            return true;
        }

        function generateSummary() {
            if (ruleForm.summary) {
                return;
            }
            let html = markdownIt.render(ruleForm.content);
            ruleForm.summary = html.replace(/<[^>]+>/g, "").slice(0, 150);
        }


        function handleThumbnailUploaded(url){
            ruleForm.thumbnail = url
            document.getElementById("submit-button").disabled = false;
            document.getElementById("draft-button").disabled = false;
        }

        function handeleUploadImage(event, insertImage, files){
            console.log(files)
            for(let i in files){
                uploadImage(files[i]).then((data) => {
                    console.log(data)
                    insertImage({
                        url : data
                    })
                })
            }
        }
        nextTick(() => {
            window.scrollTo({ top: 0 });
        });
        return {
            title,
            content,
            ruleForm,
            ruleFormRef,
            rules,
            categories,
            tags,
            handleThumbnailUploaded,
            handleAboutToUploadThumbnail,
            handleRemoveThumbnail,
            handeleUploadImage,
            submitForm,
            cancelSubmit,
            uploaderRef,
        };
    },
    props: ["id"],
}
</script>
<style lang="less" scoped>


.wife-cover {
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
        font-size: 35px;
        font-weight: normal;
        color: white;
        line-height: 1.5;
        margin-bottom: 15px;
        position: absolute;
        text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    }
}

.edit-card {
    background: white;
    border-radius: 8px;
    box-shadow: var(--card-box-shadow);
    padding: 10px 30px;
    width: 70%;
    margin: 50px auto 0;
    box-sizing: border-box;
    animation: fadeInUp 1s;

    .vinland-blog-title{
        text-align: center;
        font-size: 26px;
        font-family: "Kanit";
        color: #4679fa;
    }

    .inline-form-row {
        display: flex;
        justify-content: space-between;
    }

    #mavon {
        width: 100%;
        max-height: 600px;
    }
    .el-button {
        transition: all 0.4s;
    }
    
}

#submit-button:disabled,
#draft-button:disabled {
    cursor: not-allowed;
}

@keyframes fadeInUp {
    from {
        transform: translateY(50px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}


</style>