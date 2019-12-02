/* eslint-disable */
import api from '../api'
import { platform } from '@/const'

export default {
  watch: {
    $route(to) {
      if (!to.meta.onshare) {
        window.wx[this.$data.__wxFun]({
          title: `e车购-${to.meta.name}`, // 分享标题
          desc: '', // 分享描述
          // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          link: location.origin + location.pathname + location.search,
          imgUrl: location.origin + location.pathname + 'favicon.ico',
          success: () => {

          }
        })
      }
    }
  },
  data() {
    return {
      __wxConfig: false,
      __wxFun: 'onMenuShareAppMessage',
      wechatInfo: navigator.userAgent.match(/MicroMessenger\/([\d.]+)/i)
    }
  },
  methods: {
    plat() {
      if (window.__wxjs_is_wkwebview && platform() === 'isiOS') {
        this.$data.__wxFun = 'updateAppMessageShareData'
      }
    },
    async getWXConfig(domain) {
      this.plat();
      if (!this.wechatInfo) {
        return;
      }
      domain = location.origin + location.pathname + location.search;
      if (window.__wxjs_is_wkwebview && platform() === 'isiOS') {
        domain = window.iosSignUrl;
      }

      const { payload } = await api.find.wxGetLocation(encodeURIComponent(domain.split('#')[0]));

      if (String(payload.appId).length > 10) {
        window.wx.config({
          debug: process.env.NODE_ENV === "development", // 开启调试模式,在客户端alert出来
          ...payload,
          jsApiList: [
            "updateAppMessageShareData",
            "updateTimelineShareData",
            "onMenuShareAppMessage",
            "onMenuShareTimeline",
            "scanQRCode"
          ] // 必填，需要使用的JS接口列表
        });

      }
    },
    /*
    shareOptions = {title, desc, link}
     */
    async wxShare(shareOptions) {
      if (this.wechatInfo) {
        // 调用👆上面的
        this.getWXConfig(shareOptions.link);
        let prefix = shareOptions.link.indexOf('?') ? '&' : '?';

        if (shareOptions.link.indexOf('share=true') < 0) {
          shareOptions.link += prefix + 'share=true' +
            '&shopId=' + localStorage.getItem('shopId') + '&redirectFlag=true';
        } else {
          shareOptions.link.replace(/shopId=.+&/i, '')
          shareOptions.link += prefix + 'shopId=' + localStorage.getItem('shopId')
        }

        shareOptions.imgUrl = location.origin + '/sgcc-frontend-wechat/' + 'favicon.ico'

        // 自定义分享文案
        window.wx.ready(() => {
          window.wx[this.$data.__wxFun]({
            ...shareOptions,
            success: () => {
            }
          })
          this.$data.__wxConfig = true;
        });

      }
    }
  }
}

