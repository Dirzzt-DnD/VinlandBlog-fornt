<template>
    <div class="login">
        <vinland-form-card title="欢迎回归约尔战士团">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="0px" class="login-ruleForm">
                <el-form-item prop="userName">
                    <el-input v-model="ruleForm.userName" class="w-50 m-3" size="large" placeholder="用户名">
                    <template #prefix>
                        <el-icon><User /></el-icon>
                    </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" class="w-50 m-2" size="large" type="password" placeholder="密码">
                        <template #prefix>
                            <el-icon><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-checkbox label="记住密码" name="type"></el-checkbox>
                </el-form-item>

                <el-form-item>
                    <vinland-button @click="submitForm(ruleFormRef)">登录</vinland-button>
                </el-form-item>
            </el-form>
            <p id="signup-hint">
                想当战士？
                <router-link to="/register">加入约尔战士团吧</router-link>
            </p>
        </vinland-form-card>
    </div>
</template>

<script>
import { ref,reactive } from 'vue';
import VinlandButton from '../components/VinlandButton.vue'
import VinlandFormCard from '../components/VinlandFormCard.vue'
import { setToken, setUserInfo,removeToken } from "../utils/storage";
import {loginApi} from '../api/login'
import { md5Encryption } from "../utils/encrypt";
import { ElMessage } from "element-plus";
import router from "../router/index";

export default{
    name: "Login",
    components: {
        VinlandButton,
        VinlandFormCard
    },
    setup(){
        removeToken();
        let ruleFormRef = ref();
        let ruleForm = reactive({
            userName: "",
            password: "",
        })

        let rules = reactive({
            userName: [{
                require: true,
                message: "用户名不能为空",
                trigger: "change"
            }],

            password: [{
                require: true,message: "密码不能为空", trigger:"change"
            }]
        })

        function submitForm(form){
            if(!form) return;

            form.validate((valid)=>{
                if(!valid){
                    ElMessage.error("用户名和密码不能为空")
                    return
                }
                loginApi(ruleForm.userName,md5Encryption(ruleForm.password)).then(
                    (data)=>{
                        setToken(data.token)
                        setUserInfo(data.setUserInfo)
                        router.push("/")
                    }
                )
            })
        }
    
        return{
            rules,
            ruleForm,
            ruleFormRef,
            submitForm
        }
    
    }
    
}

</script>
<style>

.login{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: url("../assets/image/login-background.jpg");
    background-size: cover;
    text-align: center;
}

#signup-hint{
    font-size: 14px;
}

#signup-hint a{
    font-size: 14px;
    color: #1890ff;
    text-decoration: none;
}

#signup-hint a:hover {
    text-decoration: underline;
}
</style>