import http from '../utils/http'

export function getCommentList(articleId, pageNum, pageSize){
    return http({
        'url':"/comment/commentList",
        params: {articleId, pageNum, pageSize}
    })
}

/**
 * 添加评论
 * @param {number} articleId 文章 id
 * @param {string} content 评论内容
 */
export function addComment(articleId, content) {
    return http({
        url: "/comment",
        method: "post",
        data: { articleId, content },
        needAuthentication: true
    })
}

export function updateComment(id, comment){
    return http({
        url: "/comment",
        method: "put",
        data: {id, comment},
        needAuthentication: true
    })
}

export function deleteComment(id){
    return http({
        url: `/comment/${id}`,
        method: "delete",
        needAuthentication: true
    })
}