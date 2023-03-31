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


export function getPostArticleList(pageNum, pageSize, categoryId) {
    let params = { pageNum, pageSize }
    if (categoryId) {
        params.categoryId = categoryId
    }

    return http({
        'url': '/article/articleList',
        'method':'get',
        params
    })
}