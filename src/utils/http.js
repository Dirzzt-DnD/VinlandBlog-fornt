import axios from "axios";
import { ElMessageBox, ElMessage } from 'element-plus'
import errorCode from "./error-code";
import { getToken } from "./storage";


axios.defaults.headers['Content-Type'] = "application/json;charset=utf-8"

var configOptions = {
    baseURL: 'http://localhost:8803/vinlandblog/api/',
    timeout: 600000,
}

var httpClient = axios.create(configOptions)

httpClient.interceptors.request.use(config =>{

	let needAuthentication = config.needAuthentication
	if(needAuthentication && getToken()){
		config.headers['token'] = getToken()
	}
	return config
},
	(error) => {
		console.error(error)
    	Promise.reject(error);
	}
)

httpClient.interceptors.response.use(response =>{
	const code = response.data.code || 200
	if(code === 200)return response.data.data
	
	const msg = errorCode.get(code)
	if(code === 401) {
		ElMessageBox.confirm('只有真正的战士才能执行此操作,是否立马登录','来约尔战士团吧',{
			confirmButtonText: '真正的战士',
			cancelButtonText: '放弃',
			type: 'warning',
		}).then(()=>{
			router.push('/login')
		})
	}else if(msg){
		ElMessage.error(msg)
	}else{
		ElMessage.warning(response.data.msg||'天有不测')
	}
},error => {
    const { status } = error.response
    if (status === 401) {
        ElMessage.warning('前辈需要登录后才能继续当前操作哦')
    } else if (status === 403) {
        ElMessage.warning('前辈权限不足，无法执行当前操作')
    } else if (status === 404) {
        ElMessage.warning('请求的资源不存在哦')
    } else if (status >= 500) {
        ElMessage.warning('服务器出现异常啦')
    }

    return Promise.reject(error);
})

export default httpClient