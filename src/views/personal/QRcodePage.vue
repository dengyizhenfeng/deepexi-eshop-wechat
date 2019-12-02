<template>
  <div class="code">
    <div class="nu"/>
    <div class="wrap">
      <div class="headImg">
        <img :src="img ? img: '@img/touxiang.png'">
      </div>
      <h2>
        {{ info.fullname }}
      </h2>
      <p>您的专属顾问</p>
      <p>
        工号：{{ info.usernumber }}
      </p>
      <div class="qr">
        <img id="img" :src="url" >
      </div>
    </div>
  </div>
</template>
<script>
const URL = '/sgcc-wechat-application/api/v1/userLogin/qrcode/';
export default {
    name: 'QRCODE',
    data() {
        return {
          info: JSON.parse(sessionStorage.getItem('infoConsultant')),
          img: '',
          token: sessionStorage.getItem('token') || localStorage.getItem('token') || '',
          tenantCode: sessionStorage.getItem('tenantCode') || localStorage.getItem('tenantCode') || '',
          shopId: sessionStorage.getItem('shopId') || localStorage.getItem('shopId') || '',
          url: ''
        };
    },
    created() {
      this.url = process.env.VUE_APP_API_URL + URL + this.info.id + `?token=${this.token}&tenantCode=${this.tenantCode}&shopId=${this.shopId}`;
      this.img = JSON.parse(sessionStorage.getItem('avatar'));
    }
}
</script>
<style lang="less" scoped>
.code {
    width: 100%;
    height: 100vh;
    background: url('./../../assets/image/consultant/bgQw.png') no-repeat;
    background-size: 100% 145/37.5rem;
    overflow: hidden;
    .nu {
      height: 70/37.5rem;
    }
    .wrap {
      margin: 0 26/37.5rem 31/37.5rem 28/37.5rem;
      border-radius: 9px;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
      height: 499/37.5rem;
      background-color: #fff;
      text-align: center;
      box-sizing: border-box;
      border: 1px solid #fff;
      .headImg {
        width: 80/37.5rem;
        height: 80/37.5rem;
        box-sizing: border-box;
        border: 2px solid #fff;
        border-radius: 50%;
        background-color: #fff;
        margin: -40/37.5rem auto 0 auto;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        overflow: hidden;
      }
      h2 {
        margin-top: 10/37.5rem;
        font-family: "Helvetica";
        color:#363347;
        font-size: 22/37.5rem;
      }
      p:nth-of-type(1) {
        margin-top: 12/37.5rem;
        font-size: 15/37.5rem;
        color: #999;
        font-family: "苹方";
      }
      p:nth-of-type(2) {
        margin-top: 6/37.5rem;
        font-size: 15/37.5rem;
        color: #0BC5B1;
        font-family: "苹方";
      }
      .qr {
        margin: 0 auto;
        margin-top: 47/37.5rem;
        width: 256/37.5rem;
        img {
          width: 256/37.5rem;
          height: 256/37.5rem;
        }
      }
    }
}
</style>
