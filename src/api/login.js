import http from '../utils/http'
import { getRandomAvatar } from "../utils/avatar"

export function loginApi(userName, password){
    return http({
    'url': '/login',
    'method': 'post',
    data: { userName, password },
    })
}

export function logout(){
    return http({
        'url' : '/logout',
        'method' : 'post',
        needAuthentication: true
    })
}

export function registerApi(userName, nickName, email, password){
    return http({
        'url': '/user/register',
        'method': 'post',
        data: { userName, nickName, email, password, avatar: getRandomAvatar()}
        })
}

export function getAdminInfo(){
    return http({
        'url':'/user/adminInfo',
        'method':'get'
    })
}

export function getUserInfo(){
    return http({
        'url':'/user/userInfo'
    })
}

export function updateUserInfo(userInfo){
    return http({
        'url': "/user/userInfo",
        'method': "put",
        'data': userInfo,
        'needAuthentication': true
    })
}