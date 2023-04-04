import http from "../utils/http"

export function getCategoryCountList(){
    return http({
        'url':'/category/getCategoryCount',
        'method':'get'
    })
}