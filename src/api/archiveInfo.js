import http from '../utils/http'

export function getArchiveCountList(pageNum, pageSize){
    return http({
        url: "/archive/archiveCountList",
        params: {
            pageNum, pageSize
        }
    })
}