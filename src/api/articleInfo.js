import http from '../utils/http'

export function getHotArticleList(){
    return http({
        'url': '/article/hotArticleList',
        'method': 'get'
    })
}

export function getArticleCount(){
    return http({
        'url':'/article/count',
        'method':'get'
    })
}