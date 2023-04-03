import http from "../utils/http"

export function getCategoryList(){
    return http({
        'url':'/category/getCategoryList',
        'method':'get'
    })
}