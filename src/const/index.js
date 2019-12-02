export const orderProgress = {
  PAY_DEPOSIT: '支付订金',
  SEE_CONTRACT: '购车合同',
  SEE_RECEIPT: '订金收据',
  CAR_PARATION: '车辆整备',
  CAR_VEHICLE: '验车方式',
  CAR_RIAGE: '提车方式',
  PAY_TAIL_MONEY: '支付尾款',
  CAR_DELIVERY: '交车清单',
  ORDER_NICE: '订单完成'
}
export const orderProgressConsultant = {
  PAY_DEPOSIT: '订金支付',
  SEE_CONTRACT: '上传购车合同',
  SEE_RECEIPT: '上传订金收据',
  CAR_PARATION: '车辆整备',
  CAR_VEHICLE: '车辆验车',
  CAR_RIAGE: '车辆提车',
  PAY_TAIL_MONEY: '上传尾款凭证',
  CAR_DELIVERY: '上传交车清单',
  ORDER_NICE: '订单完成'
}

export const orderState = {
  to_be_paid: '待支付订金',
  paid: '已支付订金',
  balance_payment_commented: '已支付尾款',
  car_deliver_commented: '车辆交付完成',
  commented: '已评价',
  billing_confirm: '确认结算',
  NotHANDLED: '未办理'
}

export const pileOrderState = {
  to_be_paid: '待支付',
  paid: '已支付',
  NotHANDLED: '未办理',
  ALREADY: '已办理',
  INHANDLING: '办理中'
}

export const categaryItems = {
  carBaseParam: '基本参数',
  carBody: '车身',
  carEngine: '发动机',
  carSafetyEquipment: '主/被动安全装备',
  carControlConfiguration: '辅助/操控配置',
  carAntiTheftConfiguration: '外部/防盗配置',
  carInternalConfiguration: '内部配置',
  carSeatConfiguration: '座椅配置',
  carMultimediaConfiguration: '多媒体配置',
  carLightingConfiguration: '灯光配置',
  carAirConditioner: '空调/冰箱'
}

export const platform = function() {
  let agent = navigator.userAgent.toLowerCase();
  let bIsIpad = agent.match(/ipad/i) == "ipad";
  let bIsIphoneOs = agent.match(/iphone os/i) == "iphone os";
  let bIsAndroid = agent.match(/android/i) == "android";
  let adr = navigator.userAgent.indexOf("Adr") > -1;
  if (bIsIpad || bIsIphoneOs) {
    return 'isiOS';
  } else if (bIsAndroid || adr) {
    return 'isAndroid';
  } else {
    return 'isWeb';
  }
}
