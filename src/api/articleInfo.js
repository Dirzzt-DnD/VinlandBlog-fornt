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

export function getArticleDetails(id){
    return http({
        'url':'/article/'+id,
        'method':'get'
    })
}

export function updateViewCount(id){
    return http({
        'url':'/article/updateViewCount/'+id,
        'method':'put'
    })
}

export function getPreviousNextArticle(id){
    return http.get("/article/previousNextArticle/"+id)
}

export function addArticle(article) {
    return http({
        'url': "/article",
        'method': "post",
        'data': article,
        'needAuthentication': true
    })
}