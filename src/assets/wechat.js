// service
import service from '../service'
// store
import store from '../store'
import axios from 'axios'
async function geturl() {
  if (location.search.indexOf('redirectFlag') < 0) return;
  const url = '/sgcc-wechat-application/api/v1/loginUser/shareEncode'
  // const url = '/sgcc-wechat-application/api/v1/loginUser/shareCode'
  // "http://ecargouat.jiajues.com/sgcc-frontend-wechat/carDetail/?id=8d9b1e46c66b4689ab832fc06e127746&helpOrder=false&share=true&shopId=d1a96b07e54f4cd1a05306629a6a530f&redirectFlag=true"
  const { data } = await axios.get(url, {
    params: {
      shareUrl: location.href
    }
  })
  const str = decodeURIComponent(data).split('%2526redirectFlag%253Dtrue')[0].split('&redirectFlag=true')[0]
  location.replace(str);
}

// 截取code
function GetUrlParame(parameName) {
  // 获取地址栏指定参数的值
  const arr = location.href.match(new RegExp(`${parameName}=(.{1,50})(&[a-zA-Z]{1,})?`, 'i'));
  if (arr && arr.length > 1) {
    return arr[1].split('&')[0];
  }
  return ''
}

async function getUserInfo(url, code, state) {
  const { payload } = await service.get(`${url}/car-deepexi-member-center/api/v1/wxAuthLogin/wxAuth?code=${code}&state=${state}`)

  if (payload.result !== 'failed') {
    store.commit('user/setUserInfo', payload)
    store.commit('wxCoords/setAbleToLocation', true)
    localStorage.setItem('userId', payload.userId)
    localStorage.setItem('avatarUrl', payload.avatarUrl)
    localStorage.setItem('nickName', payload.nickName)
    localStorage.setItem('token', payload.token)
    localStorage.setItem('openid', payload.openid)
    localStorage.setItem('unionId', payload.unionId)
  }

  return Promise.resolve(1)
}

// 2019-04-29后 文件下新增方法也要写到顺序执行里
export async function wechatUrlFn() {
  geturl()
  if (process.env.VUE_APP_MODE !== 'development') {
    // 获取URL参数

    const url = process.env.VUE_APP_API_URL

    let code = GetUrlParame('code') // 截取url上的code ,可能没有,则返回''空字符串
    let state = GetUrlParame('state') // 截取url上的code ,可能没有,则返回''空字符串

    let doGetUserInfo = async function () {
      await getUserInfo(url, code, state)
      return Promise.resolve(1)
    }

    if (code) {
      await doGetUserInfo()
    } else {
      let token = sessionStorage.getItem('token') || localStorage.getItem('token')
      if (!token || token === 'undefined') {
        await doGetUserInfo()
      }
    }
  }
  return Promise.resolve(1)
}
