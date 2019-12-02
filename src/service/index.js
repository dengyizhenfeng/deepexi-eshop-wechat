/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import router from '@/router'
import { Toast } from 'vant'
import Store from '../store';

const axiosUtil = {
  baseUrl: process.env.VUE_APP_API_URL + '/'
}
var instance = axios.create({
  timeout: 30000,
});

const showLoadingUrlArr = [
  'scShop/shops'
]

// *********添加request拦截器****************************************
instance.interceptors.request.use(
  config => {
    showLoadingUrlArr.forEach(url => {
      if (config.url.includes(url)) {
        Store.commit('setLoading', true);
      }
    })
    return config;
  },
  err => {
    Store.commit('setLoading', true);
    return Promise.reject(err);
  }
);

// *********添加response拦截器****************************************
instance.interceptors.response.use(function (response) {
  Store.commit('setLoading', false);
  if (9999 === response.data.code) {
    router.replace({
      name: 'login'
    })
  }
  return response;
}, function (error) {
  Store.commit('setLoading', false);
  if (error.response) {
    const status = error.response.status
    if (/^4/.test(status)) {
      Toast(`账户验证超时${status}`)
    }
    if (/^5/.test(status)) {
      Toast(`网络延迟，请稍后再试!${status}`)
    }
  }
  if (error.response) {
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
});

// 处理url
function correctUrl(url) {
  if (url.startsWith('https') || url.startsWith('http') || url.startsWith('www')) {
    return true
  } else {
    return false
  }
}

//url添加参数
function addUrlParams(url) {
  // 特殊处理
  if(url.split("&")[2] == "range=6" || url.split("&")[2] == "range=5" || url.indexOf("orderby") !== -1){
    let arr = [];
    if (url.indexOf('?') > -1) {
      arr = url.split('?');
      url = arr[0];
    }
    let token = sessionStorage.getItem('token') || localStorage.getItem('token') || 'EzgmgocKwcgk6Lbk7JRU3xifJE9MrT60';
    // let tenantCode = sessionStorage.getItem('tenantCode') || localStorage.getItem('tenantCode') || '';
    // let shopId = sessionStorage.getItem('shopId') || localStorage.getItem('shopId') || '';

    if (!token || token === 'undefined') {
      token = ''
    }
    // if (!tenantCode || tenantCode === 'undefined') {
    //   tenantCode = ''
    // }
    // if (!shopId || shopId === 'undefined') {
    //   shopId = ''
    // }

    let newUrl = '';
    if (arr.length) {
      newUrl = url + '?' + arr[1] + '&token=' + token ;
    } else {
      newUrl = url + '?token=' + token ;
    }
    return newUrl;

  }else if(url.split("&")[2] == "range=7" || url.split("&")[2] == "range=8"){
    let arr = [];
    if (url.indexOf('?') > -1) {
      arr = url.split('?');
      url = arr[0];
    }
    let token = sessionStorage.getItem('token') || localStorage.getItem('token') || 'EzgmgocKwcgk6Lbk7JRU3xifJE9MrT60';
    // let tenantCode = sessionStorage.getItem('tenantCode') || localStorage.getItem('tenantCode') || '';
    // let shopId = sessionStorage.getItem('shopId') || localStorage.getItem('shopId') || '';

    if (!token || token === 'undefined') {
      token = ''
    }
    // if (!tenantCode || tenantCode === 'undefined') {
    //   tenantCode = ''
    // }
    // if (!shopId || shopId === 'undefined') {
    //   shopId = ''
    // }

    let newUrl = '';
    if (arr.length) {
      newUrl = url + '?' + arr[1] + '&token=' + token ;
    } else {
      newUrl = url + '?token=' + token ;
    }
    return newUrl;
  }else {
    let arr = [];
    if (url.indexOf('?') > -1) {
      arr = url.split('?');
      url = arr[0];
    }
    let token = sessionStorage.getItem('token') || localStorage.getItem('token') || 'EzgmgocKwcgk6Lbk7JRU3xifJE9MrT60';
    let tenantCode = sessionStorage.getItem('tenantCode') || localStorage.getItem('tenantCode') || '';
    let shopId = sessionStorage.getItem('shopId') || localStorage.getItem('shopId') || '';

    if (!token || token === 'undefined') {
      token = ''
    }
    if (!tenantCode || tenantCode === 'undefined') {
      tenantCode = ''
    }
    if (!shopId || shopId === 'undefined') {
      shopId = ''
    }

    let newUrl = '';
    if (arr.length) {
      newUrl = url + '?' + arr[1] + '&token=' + token + '&tenantCode=' + tenantCode + '&shopId=' + shopId;
    } else {
      newUrl = url + '?token=' + token + '&tenantCode=' + tenantCode + '&shopId=' + shopId;
    }
    return newUrl;
  }

}

// 处理form-data请求方式
function formEncode(data, encodeKeys) {
  let body = ''
  for (let key in data) {
    if (!encodeKeys) {
      body += `${key}=${data[key]}&`
    } else if (encodeKeys[key]) {
      body += `${key}=${encodeURIComponent(data[key])}&`
    } else {
      body += `${key}=${data[key]}&`
    }
  }
  return body.slice(0, -1)
}

const Delete = (url, params) => {
  return new Promise((resolve, reject) => {
    instance({
      url: correctUrl(url) ? addUrlParams(url) : axiosUtil.baseUrl + addUrlParams(url),
      method: 'delete',
      data: params
    }).then(res => {
      if (res.status === 200) {
        //axiosUtil.noticeRes(res, noticeParams);
        resolve(res.data);
      } else {
        throw res;
      }
    }).catch(err => {
      //axiosUtil.noticeErr(err, noticeParams);
      reject(err);
    })
  })
};

/**[]
 * *get 方法
 */

const Get = (url, params) => {
  return new Promise((resolve, reject) => {
    instance({
      url: correctUrl(url) ? addUrlParams(url) : axiosUtil.baseUrl + addUrlParams(url),
      method: 'get',
      params
    }).then(res => {
      if (res && res.status === 200) {
        //axiosUtil.noticeRes(res, noticeParams);
        resolve(res.data);
      } else {
        throw res;
      }
    }).catch(err => {
      //axiosUtil.noticeErr(err, noticeParams);
      reject(err);
    })
  })
};

/**
 * *post 方法 入参是json格式
 */
const Post = (url, params) => {
  let currenturl = url === 'wx/api/v1/mp/eCharge' ? axiosUtil.baseUrl + url : axiosUtil.baseUrl + addUrlParams(url)
  return new Promise((resolve, reject) => {
    instance({
      url: correctUrl(url) ? addUrlParams(url) : currenturl,
      method: 'post',
      data: params
    }).then(res => {
      if (res.status === 200) {
        resolve(res.data);
      } else {
        throw res;
      }
    }).catch(err => {
      reject(err);
    })
  })
};
/**
 * *post 方法 入参是string格式
 */
const PostString = (url, params) => {
  //	url = apiUtil.changeUrl(url);
  return new Promise((resolve, reject) => {
    instance({
      url: correctUrl(url) ? url : axiosUtil.baseUrl + url,
      method: 'post',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: qs.stringify(params),
    }).then(res => {
      if (res.status === 200) {
        resolve(res.data);
      } else {
        throw res;
      }
    }).catch(err => {
      reject(err);
    })
  })
};

/**
 * *post 方法 入参是form-data格式
 */
const PostFile = (url, params, encodeKeys) => {
  //	url = apiUtil.changeUrl(url);
  return new Promise((resolve, reject) => {
    instance({
      url: correctUrl(url) ? addUrlParams(url) : axiosUtil.baseUrl + addUrlParams(url),
      method: 'post',
      headers: { 'Content-Type': 'application/form-data' },
      data: params,
      timeout: 60000
    }).then(res => {
      if (res.status === 200) {
        resolve(res.data);
      } else {
        throw res;
      }
    }).catch(err => {
      reject(err);
    })
  });
};

export default {
  get: Get,
  post: Post,
  postString: PostString,
  postFile: PostFile,
  delete: Delete
};
