import service from '../service'
const url = 'sgcc-wechat-application/api/v1/information/'
const groupUrl = 'sgcc-wechat-application/api/v1/activity/'

export default {
  getSwitch: params => service.get('sgcc-wechat-application/api/v1/advertisements', params),
  getShowList: params => service.get('sgcc-wechat-application/api/v1/activity', params),
  getRecommendList: params => service.get('sgcc-wechat-application/api/v1/advertisements', params),
  getInfoDetail: params => service.get(url + params),
  getVedio: params => service.get('sgcc-wechat-application/api/v1/advertisements', params),
  getVedioDetail: params => service.get(url + params),
  getGroupDetail: params => service.get(groupUrl + params),
  getShopList: params => service.get('car-deepexi-shop-center/api/v1/shops/wechat/shopList', params),
  advertisementsNewRelease: params => service.get('sgcc-wechat-application/api/v1/advertisements/newRelease', params),
  toSignUp: params => service.post('sgcc-wechat-application/api/v1/toSignUp', params),
  wxGetLocation: url => service.post(`wx/api/v1/jssdk/getLocation?url=${url}`),
  getCityList: params => service.get('car-deepexi-shop-center/api/v2/shops/shop/cityCode')
}
