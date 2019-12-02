/* eslint-disable no-unused-vars */
import api from '../api'
import store from '../store'
import { platform } from '@/const'

const dev = process.env.NODE_ENV === "development";

export const wxGetLocation = async () => {
  // 在可以获取定位的情况下，避免重复定位
  const search = location.search;
  if (search.indexOf('code=') > -1 && search.indexOf('state=') > -1) return;
  if (store.state.wxCoords.hasGetReq) return;
  if (location.origin.indexOf('https') > -1 && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude; // 纬度 
      const longitude = position.coords.longitude; // 经度 
      getCurrentCity(longitude, latitude)
    }, e => e,
      {
        enableHighAcuracy: true,
        timeout: 12000
      });
  } else {
    useWexinApi()
  }
};

const useWexinApi = async () => {
  let url = location.origin + location.pathname + location.search;
  if (url.indexOf("localhost") > -1) {
    url = dev ? "http://ecargouat.jiajues.com" : process.env.VUE_APP_API_URL
  }
  if (process.env.NODE_ENV === 'production' && platform() === 'isiOS') {
    url = window.iosSignUrl;
  }
  const { payload } = await api.find.wxGetLocation(encodeURIComponent(url.split('#')[0]));
  if (String(payload.appId).length > 10) {
    initWx(payload);
  }
}
const initWx = (payloadObj) => {
  window.wx.config({
    debug: process.env.NODE_ENV === "development", // 开启调试模式,在客户端alert出来
    ...payloadObj,
    jsApiList: [
      "getLocation"
    ] // 必填，需要使用的JS接口列表
  });
  window.wx.ready(() => {
    getLocation()
  });
};
const getLocation = () => {
  window.wx.getLocation({
    type: "wgs84",
    success: function (res) {
      let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      getCurrentCity(longitude, latitude)
    }
  });
};

const getCurrentCity = (longitude, latitude) => {
  const geocoder = new window.AMap.Geocoder({ radius: 500 });
  const marker = new window.AMap.Marker();
  geocoder.getAddress([longitude, latitude], (status, result) => {
    if (status === "complete" && result.regeocode) {
      const { addressComponent } = result.regeocode;
      store.commit('wxCoords/setHasGetRequest', true)
      store.commit('wxCoords/setCoords', addressComponent)
    }
  });
};
