import service from '../service'

export default {
  getChargPage: params => service.post('wx/api/v1/mp/eCharge', params)
}
