import axios from "axios";
import { ElMessage } from 'element-plus'


const service = axios.create({
    // baseURL: "http://150.158.164.173:443/vinlandblog/api/image/"
    baseURL: "http://localhost:8803/vinlandblog/api/image/"
})

service.interceptors.response.use(response => {
    const code = response.data.code || 200
    
    if(code === 200){
        return response.data.data
    } 

    let msg = response.data.code+" "+response.data.msg
    ElMessage.error(msg)

    return Promise.reject('上传图片失败:'+msg)
})


export function uploadImage(file, progress){
    let formData = new FormData()
    formData.append("file",file)
    return service({
        'url': "/upload",
        'method': "post",
        'headers': {'Content-Type': 'multipart/form-data'},
        'data': formData,
        onUploadProgress(event){
            let v = Math.round(event.loaded / event.total * 100)
            progress.value == 100? 80 : v
        }
    })
}