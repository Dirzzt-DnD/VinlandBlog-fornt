import http from '../utils/http'

export function checkArticleApi(articleId){
    return http({
        'url':'/article/{articleId}',
        'method':'get',
        articleId
    })
}

export function deleteArticleApi(articleId){
    return http({
        'url':'/article/{articleId}',
        'method':'delete',
        articleId
    })
}

export function articleInfoListApi(){
    return http({
        'url':'/article',
        'method':'get'
    })
}