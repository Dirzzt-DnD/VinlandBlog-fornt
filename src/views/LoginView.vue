<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="userAccount">
            <el-input  v-model="ruleForm.userAccount" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
            <el-input type="password" v-model="ruleForm.userPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" style="background: #409EFF">
            <span v-if="!loading">登录</span>
            <span v-else>登录中...</span>
            </el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default{
        data() {
            var checkUserInput=(rule,value,callback)=>{
                callback(new Error('请输入账号'));
            }

            var checkPasswordInput=(rule,value,callback)=>{
                callback(new Error('请输入密码'));
            }

            return{
                ruleForm: {
                    userAccount: '',
                    userPassword: ''
                },
                loading: false,
                rules: {
                    userAccount: [
                        {validator:checkUserInput, trigger:'blur'}
                    ],
                    userPassword: [
                        {validator:checkPasswordInput,trigger:'blur'}
                    ]
                }
            };
        },

        methods: {
            submitForm(formName){
                this.$refs[formName].validate((valid)=>{
                    if (valid) {
                      alert("登录成功")
                      this.loading=true
                      //let data = loginApi(this.formName)
                      alert("登录失败")
                    } else {
                        this.loading=false
                        alert("登录失败")
                    }
                })
            },        
        }

    }
</script>

<style scoped>
.el-input{
    width: 200px;
}
.el-form{
    text-align: center;
}
</style>


