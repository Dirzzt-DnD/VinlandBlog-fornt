import http from '../utils/http'

export function loginApi(userName, password){
    return http({
    'url': '/login',
    'method': 'post',
    data: { userName, password }
    })
}

export function registerApi(userName, nickName, email, password){
    return http({
        'url': '/register',
        'method': 'post',
        data: { userName, nickName, email, password }
        })
}