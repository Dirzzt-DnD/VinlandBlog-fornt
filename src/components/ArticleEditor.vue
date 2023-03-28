<template>
    <div>
      <v-md-editor v-model="textContent" 
      left-toolbar="undo redo clear | emoji h bold italic strikethrough quote | ul ol table hr | link image code | save"
      :autofocus="true" :disabled-menus="[]" height="500px" width="100%" 
      @upload-image="handeleUploadImage" @change="getContent"></v-md-editor>
    </div>
  </template>
  
  <script>
  import {uploadArticleImg} from '../api/uploadArticle'
  export default {
    props: ['value'],
    data() {
      return {
        textContent: '',
      }
    },
    methods: {
      async handeleUploadImage(event, insertImage, files){
        for(let i in files){
          const formData = new formData()
          formData.append('file',file[i]);
          uploadArticleImg(data).then(
            res=>{
              insertImage({
                url:res.data,
                desc:'DESC'
              })
            },
            error=>{
              console.log('上传图片失败',error.mesage)
            }
          )
        }
      },
      getContent(text,html){
        this.$emit('injectContent',text)
        this.$emit('injectHtml',html)
      }
      }
    }
  </script>
