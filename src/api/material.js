import service from '../service'
export default {
    getList: params => service.get('路径', params),
    marketings: params => service.get('sgcc-wechat-application/api/v1/pcLabel/marketings', params),
    getLabel: params => service.get('sgcc-wechat-application/api/v1/pcLabel/label', params),
    getDiDiOrderCount: (starTiime, endTime, range) => service.get(`sgcc-console-application/api/v1/inspect/getDiDiOrderCount?starTiime=${starTiime}&endTime=${endTime}&range=${range}`),
    getOrderCount: (starTiime, endTime, range) => service.get(`sgcc-console-application/api/v1/inspect/getOrderCount?starTiime=${starTiime}&endTime=${endTime}&range=${range}`),
    getOrderCount2: (starTiime, endTime, range, tenantCode) => service.get(`sgcc-console-application/api/v1/inspect/getOrderCount?starTiime=${starTiime}&endTime=${endTime}&range=${range}&tenantCode=${tenantCode}`),
    getShopCars: (starTiime, endTime, orderby, shopId) => service.get(`sgcc-console-application/api/v1/inspect/getShopCars?starTiime=${starTiime}&endTime=${endTime}&orderby=${orderby}&shopId=${shopId}`)
}
