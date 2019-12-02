import service from '../service'

export default {
  getSms: (params) => service.get('sgcc-wechat-application/api/v1/mcChargingPileService/sendSms', params),
  checkSms: (params) => service.get('sgcc-wechat-application/api/v1/mcChargingPileService/prove', params),
  submitForm: (params) => service.post('sgcc-wechat-application/api/v1/mcChargingPileService', params)
}
