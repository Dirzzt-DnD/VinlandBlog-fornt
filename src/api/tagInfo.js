import http from '../utils/http'

export function getTagList(){
    return http({
        'url':'/tag',
        'method':'get'
    })
}