import http from '../utils/http'

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
        'url': '/register',
        'method': 'post',
        data: { userName, nickName, email, password }
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