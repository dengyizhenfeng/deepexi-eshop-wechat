import service from '../service'

export default {
  getSwitch: params => service.get('sgcc-wechat-application/api/v1/advertisements', params),
  getBrandList: () => service.get('car-deepexi-product-center/api/v1/pcBrands/brand/list?type=NEW_CARS'),
  login: params => service.post('car-deepexi-member-center/api/v1/mcMemberAccounts/loginByPwd', params),
  register: params => service.post(`car-deepexi-member-center/api/v1/mcMemberAccounts/register?openid=${params.openid}`, params),
  resetPassword: params => service.post(`car-deepexi-member-center/api/v1/mcMemberAccounts/reset`, params),
  sendSms: params => service.post('car-deepexi-member-center/api/v1/mcMemberAccounts/sendSms', params),
  sendSmsByResetPwd: params => service.post('car-deepexi-member-center/api/v1/mcMemberAccounts/sendSmsByResetPwd', params),
  getCarDetail: params => service.get(`car-deepexi-product-center/api/v1/buyer/pcItems/tenant/${params.id}`),
  getCarActivityList: params => service.get(`sgcc-wechat-application/api/v1/activity/activity/${params.id}`),
  focusCar: params => service.post(`car-deepexi-member-center/api/v1/mcItemCollects`, params),
  cancelFocusCar: params => service.delete(`car-deepexi-member-center/api/v1/mcItemCollects/cancel`, params),
  getConsultant: params => service.get('sgcc-wechat-application/api/v1/message/getConsultant', params),
  bindConsultant: params => service.post('sgcc-wechat-application/api/v1/scShop/bindConsultant', params),
  createMessage: (params) => service.post('sgcc-wechat-application/api/v1/message/create', params),
  getCarArticleList: (params) => service.get('sgcc-wechat-application/api/v1/advertisements/findInformation', params),
  getShops: (params) => service.get('car-deepexi-shop-center/api/v1/mobyShops', params),
  applyTryDriving: (params) => service.post(`sgcc-wechat-application/api/v1/mcMemberTestDrive`, params),
  getRecommendList: (params) => service.get('car-deepexi-product-center/api/v1/buyer/pcItems/recommend/cars', params),
  pickAll: (params) => service.get('car-deepexi-product-center/api/v1/buyer/pcItems/recommend/cars', params),
  // 专属顾问
  getConsultantLogin: params => service.post('sgcc-wechat-application/api/v1/loginUser/login', params),
  getConsultantRegister: params => service.post('sgcc-wechat-application/api/v1/loginUser/consultantAdd', params),
  getSendCode: params => service.get('sgcc-wechat-application/api/v1/loginUser/sendSms', params),
  getshopList: params => service.get('car-deepexi-shop-center/api/v1/shops/wechat/shopList', params),
  getprove: params => service.get('sgcc-wechat-application/api/v1/loginUser/prove', params),
  getzsgwApply: params => service.get('sgcc-wechat-application/api/v1/loginUser/zsgwApply/shopList', params),
  getupdateAvatar: params => service.post('sgcc-wechat-application/api/v1/userLogin/updateAvatar', params),
  logoutUser: id => service.get('sgcc-wechat-application/api/v1/userLogin/logoutUser/' + id),
  getupdatePassWord: params => service.post('sgcc-wechat-application/api/v1/userLogin/updatePassWord', params),
  getQrcode: () => service.get('sgcc-wechat-application/api/v1/userLogin/qrcode'),
  getconsultantAdd: params => service.get(`sgcc-wechat-application/api/v1/consultantAdd/${params.userId}`),
  // 大客户采购需求
  getinsertApplyTradeOrder: params => service.post(`sgcc-wechat-application/api/v1/purchase/insertApplyTradeOrder`, params),
  getbrandList: params => service.get(`car-deepexi-product-center/api/v2/pcBrands/brand/list?type=NEW_CARS`),
  getfindThree: brandId => service.get(`car-deepexi-product-center/api/v2/pcCarBrandSeries/findThree?brandId=${brandId}&type=NEW_CARS`)
}
