import http from '../utils/http'

export function uploadArticleImg(data) {
    return http({
        url:'/vinlandBlog/api/Article/uploadImg',
        method:'POST',
        data
    })
}

export function uploadArticleContent(data){
    return http({
        url:'/vinlandBlog/api/Article/uploadArticle',
        method:'POST',
        data
    })
}