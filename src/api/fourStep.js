import service from '../service'

let orderCheck = params => params.memberId
  ? service.post(`sgcc-wechat-application/api/v1/order/orderCheck?memberId=${params.memberId}`)
  : service.post(`sgcc-wechat-application/api/v1/order/orderCheck`, params)
export default {
  getCarLists: params => service.get('car-deepexi-product-center/api/v1/buyer/pcItems', params),
  deleteShopCart: (params, userId) => service.delete(
    userId ? 'car-deepexi-member-center/api/v1/mcShopcart/delteShoppingCartByIds?userId=' + userId : 'car-deepexi-member-center/api/v1/mcShopcart/delteShoppingCartByIds',
    params),
  addShopCart: (params, userId) => service.post(
    userId ? 'car-deepexi-member-center/api/v1/mcShopcart/createShoppingCart?userId=' + userId : 'car-deepexi-member-center/api/v1/mcShopcart/createShoppingCart',
    params
  ),
  getShopCartList: params => service.get('car-deepexi-member-center/api/v1/mcShopcart/findListShoppingCarts', params),
  getOrderCarFirst: params => service.get(`car-deepexi-product-center/api/v1/buyer/pcItems/tenant/` + params),
  submitOrder: params => service.post('sgcc-wechat-application/api/v1/order/placeOrder', params),
  sendAddress: params => service.post('sgcc-wechat-application/api/v1/mcSendCar', params),
  payCar: params => service.post(`wx/api/v1/pay/wxPayMent?orderId=${params.orderId}`),
  orderCheck
}
