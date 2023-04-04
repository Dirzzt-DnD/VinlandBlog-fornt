import http from '../utils/http'

export function getTagCountList(){
    return http({
        'url':'/tag/tagCount',
        'method':'get'
    })
}