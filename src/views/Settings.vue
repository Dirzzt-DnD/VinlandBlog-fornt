<template>
    <div id="setting">
        <vinland-header/>
        <vinland-wife-cover>
            <h1>个人中心</h1>
        </vinland-wife-cover>
        <div class="user-info-card">
            <div class="user-cover">
                <img src="../assets/image/login-background.jpg" alt="封面"/>
            </div>

            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="0px" class="login-ruleForm">
                <div class="user-avatar">
                    <img :src="avatar" alt="头像" id="avatar"/>
                    <div class="user-avatar-editor" v-show="isInEditMode && isProgressVisible">
                        <div class="camera-icon">
                            <font-awesome-icon :icon="['fas', 'camera']" />
                        </div>
                        <div>编辑头像</div>
                    </div>

                    <input
                        type="file"
                        id="file-input"
                        style="display: none"
                        accept="image/*"
                        @change="uploadAvatar"
                    />
                    <!-- 进度条 -->
                    <el-progress
                        type="circle"
                        :percentage="progress"
                        v-show="isProgressVisible"
                        :width="100"
                        id="progress"
                    />
                </div>

                  <!-- 用户信息 -->
                  <div class="user-info">
                    <div class="user-info-item">
                        <span class="user-info-label">用户名</span>
                        <span class="user-info-value">{{ userName }}</span>
                    </div>

                    <div class="user-info-item">
                        <span class="user-info-label">昵称</span>
                        <span class="user-info-value" v-show="!isInEditMode">{{
                            nickName
                        }}</span>
                        <el-form-item prop="nickName">
                            <el-input
                                v-model="ruleForm.nickName"
                                class="w-50 m-3"
                                size="large"
                                placeholder="请输入前辈的昵称"
                                v-show="isInEditMode"
                            />
                        </el-form-item>
                    </div>

                    <div class="user-info-item">
                        <span class="user-info-label">性别</span>
                        <span class="user-info-value" v-show="!isInEditMode">{{
                            gender == "0" ? "男" : "女"
                        }}</span>
                        <el-form-item prop="gender">
                            <el-radio-group
                                v-model="ruleForm.gender"
                                v-show="isInEditMode"
                            >
                                <el-radio label="男" />
                                <el-radio label="女" />
                            </el-radio-group>
                        </el-form-item>
                    </div>

                    <div class="user-info-item">
                        <span class="user-info-label">个性签名</span>
                        <span class="user-info-value" v-show="!isInEditMode">{{
                            motto
                        }}</span>
                        <el-form-item prop="motto">
                            <el-input
                                v-model="ruleForm.motto"
                                class="w-50 m-3"
                                size="large"
                                placeholder="用一句话来介绍下自己吧"
                                v-show="isInEditMode"
                            />
                        </el-form-item>
                    </div>

                    <div class="user-info-item">
                        <span class="user-info-label">电子邮箱</span>
                        <span class="user-info-value" v-show="!isInEditMode">{{
                            email
                        }}</span>
                        <el-form-item prop="email">
                            <el-input
                                v-model="ruleForm.email"
                                type="email"
                                class="w-50 m-3"
                                size="large"
                                placeholder="请输入前辈的电子邮箱"
                                v-show="isInEditMode"
                            />
                        </el-form-item>
                    </div>

                    <div class="user-info-item">
                        <span class="user-info-label">手机号码</span>
                        <span class="user-info-value" v-show="!isInEditMode">{{
                            phonenumber || "未知"
                        }}</span>
                        <el-form-item prop="phonenumber">
                            <el-input
                                v-model="ruleForm.phonenumber"
                                class="w-50 m-3"
                                size="large"
                                placeholder="请输入前辈的手机号码"
                                v-show="isInEditMode"
                            />
                        </el-form-item>
                    </div>
                </div>
            </el-form>

            <div class="card-footer">
                <el-button
                    type="primary"
                    color="#1892ff"
                    @click="isInEditMode = true"
                    v-show="!isInEditMode"
                    >编辑信息</el-button
                >
                <el-button
                    type="primary"
                    color="#1892ff"
                    @click="saveEditInfo(ruleFormRef)"
                    v-show="isInEditMode"
                    >保存</el-button
                >
                <el-button @click="cancelEditInfo" v-show="isInEditMode"
                    >取消</el-button
                >
                <el-button type="danger" @click="handleLogout"
                    >退出登录</el-button
                >
            </div>
        </div>
        <vinland-footer/>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { getUserInfo, setUserInfo } from '../utils/storage';
import { logout } from '../api/login'
import router from '../router';
import { updateUserInfo } from '../api/login'

export default {
    name: "Settings",
    setup(){
        let userInfo = reactive(getUserInfo())
        let isInEditMode = ref(false)
        let ruleFormRef = ref()
        let progress = ref(0)
        let isProgressVisible = ref(false)

        let ruleForm = reactive({
            nickName: userInfo.nickName,
            gender: userInfo.gender == "0"? "男" : "女",
            email: userInfo.email,
            motto: userInfo.motto,
            phonenumber: userInfo.phonenumber,
            avatar: userInfo.avatar,
        })

        let rules = reactive({
            nickName: [{
                required: true,
                message: "昵称不能为空",
                trigger:"blur"
            }],
            
            email:[{
                type: "email",
                    required: true,
                    message: "邮箱格式错误",
                    trigger: "blur",
            }],

            phonenumber: [{
                required: true,
                message:"手机号码错误",
                trigger: "blur",
                pattern: /(^((\+86)|(86))?(1[3-9])\d{9}$)|(^(0\d{2,3})-?(\d{7,8})$)/,
            }]
        })
        
        function handleLogout(){
            logout().then(()=>{
                router.replace('/login')
            })
        }

        function openFileDialog(){
            document.getElementById("file-input").click()
        }

        function uploadAvatar(){
            let fileInput = document.getElementById("file-input");
            if(fileInput.files.length == 0){
                return
            }

            isProgressVisible = true

            let file = fileInput.files[0];
            document.getElementById("avatar").src = URL.createObjectURL(file);

            uploadImage(file, progress).then(
                (url) => {
                    ruleForm.avatar = url;
                    isProgressVisible.value = false;
                },
                () => {
                    ElMessage.error("哎呀，头像上传出错啦~");
                    isProgressVisible.value = false;
                    document.getElementById("avatar").src = ruleForm.avatar;
                }
            );
        }

        function saveEditInfo(form) {
            if (!form) return;
            form.validate((valid) => {
                if (!valid) {
                    ElMessage.error("前辈填写的个人信息有点小问题哦~");
                    return;
                }
                Object.assign(userInfo, ruleForm);
                userInfo.sex = ruleForm.sex == "男" ? "0" : "1";
                updateUserInfo(userInfo).then((data) => {
                    setUserInfo(userInfo);
                    isInEditMode.value = false;
                    ElMessage.success("更新前辈个人信息成功啦");
                    if (store.state.adminAbout.isAdmin) {
                        store.commit("adminAbout/updateAdminInfo", userInfo);
                    }
                });
            });
        }


        function cancelEditInfo() {
            Object.assign(ruleForm, userInfo);
            ruleForm.sex = userInfo.sex == "0" ? "男" : "女";
            document.getElementById("avatar").src = ruleForm.avatar;
            ruleFormRef.value.clearValidate();
            isInEditMode.value = false;
        }


            return {...toRefs(userInfo),
            handleLogout, 
            saveEditInfo,
            cancelEditInfo,
            openFileDialog,
            uploadAvatar,
            isProgressVisible,
            isInEditMode,
            ruleFormRef,
            progress,
            ruleForm,
            rules,}
        }
    }

</script>


<style lang="less" scoped>
.wife-cover {
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
        text-align: center;
        position: absolute;
        width: 100%;
        text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
        font-size: 40px;
        color: white;
        line-height: 1.5;
        margin-bottom: 15px;
        padding: 0 30px;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        box-sizing: border-box;
    }
}
.user-info-card {
    background: white;
    border-radius: 8px;
    box-shadow: var(--card-box-shadow);
    padding: 20px 24px;
    box-sizing: border-box;
    width: 60%;
    margin: 30px auto 20px;
    position: relative;

    .user-cover{
        height: 240px;
        overflow: hidden;

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
    }

    .container{
        display: flex;
    }

    .user-avatar{
        height: 130px;
        width: 130px;
        margin-left: 35px;
        padding: 5px;
        transform: translateY(-50%);
        background: white;
        border: transparent;
        border-radius: 50%;

        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            transition: 0.5s ease-out;
            &:hover {
                transform: rotate(360deg);
            }
        }
            object-fit: cover;
        }

        .user-avatar-editor {
            width: 130px;
            height: 130px;
            color: white;
            background: rgba(0, 0, 0, 0.4);
            opacity: 1;
            transition: all 0.4s ease;
            position: absolute;
            top: 5px;
            left: 5px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:hover {
                opacity: 1;
            }
            .camera-icon {
                margin-right: 5px;
            }
        }
        #progress {
            width: 130px;
            height: 130px;
            position: absolute;
            top: 5px;
            left: 5px;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            :deep(.el-progress-circle) {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
    }

    .user-info{
        border-radius: 15px;
        margin: -50px 8% 20px;

        .user-info-item{
            border-bottom: 1px solid #ebebeb;
            padding: 15px 0;
            line-height: 36px;
            margin-left: 5%;

            .user-info-label{
                position: absolute;
                font-size: 17px;
                font-weight: bold;
                color: var(--text-color)
            }

            .user-info-value{
                padding: 0 64px 0 180px;
                font-size: 16px;
                overflow: hidden;
                display: -webkit-box;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }

            .el-form-item {
                margin-bottom: 0;
                padding-left: 180px;
            }
        }
    }

    .card-footer {
        padding: 1rem 2rem;
        background-color: rgba(0, 0, 0, 0.02);
        border-top: 1px solid rgba(0, 0, 0, 0);
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        background-color: rgba(0, 0, 0, 0.03);
        text-align: end;
    }
}
</style>