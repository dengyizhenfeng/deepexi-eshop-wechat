import service from '../service'
import { getConsultants } from '@/api/storage.js';

let consultantInfo = JSON.parse(getConsultants()) || {}
let addPaymentUrl = consultantInfo.id  ? 'sgcc-wechat-application/api/v1/order/addPayment?userId=' + consultantInfo.id : 'sgcc-wechat-application/api/v1/order/addPayment';

export default {
  users: params => service.get('statistics/series/list', params),
  getUser: params => service.get('sgcc-wechat-application/api/v1/memberInfo/getInfo', params),
  getOrderList: params => service.get('sgcc-wechat-application/api/v1/order/getListOrder', params),
  getOrderDetail: params => service.get('sgcc-wechat-application/api/v1/order/carOrderDetail', params),
  getOrderProgress: params => service.get('sgcc-wechat-application/api/v1/order/tradeScheduleAll', params),
  getChequeInfo: params => service.get('sgcc-wechat-application/api/v1/order/receiv', params),
  addPayment: params => service.post(addPaymentUrl, params),
  getTryDrivingList: params => service.get('sgcc-wechat-application/api/v1/mcMemberTestDrive', params),
  getOrderProgressImg: params => service.get('sgcc-wechat-application/api/v1/order/getImageOrder', params),
  getFocusCarList: params => service.get('car-deepexi-member-center/api/v1/mcItemCollects/findListItemCollect', params),
  getMyFootprintList: params => service.get('sgcc-console-application/api/v1/behaviorRecords/findListTourRecords', params),
  getPileList: params => service.get('car-deepexi-product-center/api/v1/buyer/pcItems/pile/list', params),
  getOSS: params => service.get('sgcc-console-application/api/v1/oss/getOss', params),
  getUserInfoByMobile: params => service.get('sgcc-wechat-application/api/v1/memberInfo/mobile', params),
  scanConsultantQRCode: params => service.get('sgcc-wechat-application/api/v1/userLogin/queueInfo', params),
  shopsScShopDto: shopId => service.get(`car-deepexi-shop-center/api/v1/shops/ScShopDto/${shopId}`),
  queueCode: params => service.get('sgcc-wechat-application/api/v1/userLogin/queueCode', params),
  sendOrderToCustomer: params => service.post('sgcc-wechat-application/api/v1/order/sendMsg?orderId=' + params.orderId),
  uploadImg: params => service.postFile(
    'car-deepexi-product-center/api/v1/img/headImgUpload?type=' + params.type,
    params.data
  ),
  changeStepState: params => service.post('sgcc-console-application/api/v1/carOrder/addRucsh', params)
}
