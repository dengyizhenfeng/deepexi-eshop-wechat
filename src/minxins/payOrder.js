export default {
  methods: {
    paynext(item) {
      if (+item === 1) {
        // 微信支付
        let wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d.]+)/i);
        let wechatVersion = wechatInfo[1]; // 获取微信版本号
        if (wechatVersion <= "5.0") {
          this.$toast("请升级微信版本至5.0以上");
          return;
        }
        if (typeof WeixinJSBridge === "undefined") {
          if (document.addEventListener) {
            document.addEventListener(
              "WeixinJSBridgeReady",
              this.onBridgeReady,
              false
            );
          } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady);
            document.attachEvent("onWeixinJSBridgeReady", this.onBridgeReady);
          }
        } else {
          this.onBridgeReady();
        }
      }
    }
  }
}
