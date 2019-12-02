<template>
  <div class="page-wrapper">
    <div class="bg"/>
    <div class="main">
      <section class="section-item flex-item section-userInfo">
        <img
          :src="img ? img : '@img/touxiang.png'"
          alt=""
          class="head-img"
        >
        <div class="cont">
          <h6 class="fullName">{{ consultantInfo.fullname }}</h6>
          <p class="number">工号：{{ consultantInfo.usernumber }}</p>
          <p class="service-hall">{{ consultantInfo.shopName }}</p>
        </div>
        <div class="imgRight">
          <img src="@/assets/image/consultant/right.png" alt="" @click="toinfoDetail">
          <img
            src="@/assets/image/consultant/qr-code.png"
            class="QR-code"
            @click="toinfoQR"
          >          
        </div>
      </section>
      <section class="section-item section-link">
        <ul class="flex-item link-list">
          <li @click="onNavigateTo('helpPlaceAnOrder')">
            <img
              src="@/assets/image/consultant/1.png"
            >
            <p>代Ta下单</p>
          </li>
          <li @click="onNavigateTo('consultantOrder')">
            <img
              src="@/assets/image/consultant/2.png"
            >
            <p>我的订单</p>
          </li>
          <li @click="myReward">
            <img
              src="@/assets/image/consultant/3.png"
            >
            <p>我的奖励</p>
          </li>
          <li @click="toClient">
            <img
              src="@/assets/image/consultant/4.png"
            >
            <p>我的客户</p>
          </li>
        </ul>
        <ul class="flex-item link-list market">
          <li class="market" @click="toMaterial">
            <img
              src="@/assets/image/consultant/material.png"
            >
            <p>营销素材</p>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ConsultantNew',
    data() {
      return {
        consultantInfo: {},
        img: ''
      }
    },
    mounted () {
      // if (!this.hasLogin('findIndex')) {
      //   return
      // }
      // if(sessionStorage.getItem('loginOut') == '2') {
      //     if (confirm("您确定要关闭本页吗？")){
      //       window.opener=null;
      //       window.open('','_self');
      //       window.close();
      //     }
      // }
      this.consultantInfo = { ...JSON.parse(sessionStorage.getItem('infoConsultant')) };
      this.img = JSON.parse(sessionStorage.getItem('avatar'));
    },
    beforeRouteEnter(to, from, next) {
      if (from.path == '/consultant/consultantLogin' && sessionStorage.getItem('loginOut') == '2') {
        next({
          name: 'consultantLogin',
          replace: true
        });
      } else {
        sessionStorage.setItem('loginOut', '1')
        next();
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.path == '/consultant/consultantLogin') {
        next({ path: '/personal/consultant_new' })
      } else {
        next();
      }
    },
    methods: {
      toMaterial() {
        this.$router.push({
          name: 'material'
        })
      },
      myReward() {
        this.$router.push({
          name: 'enjoy'
        })
      },
      toClient() {
        this.$router.push({
          name: 'myClient'
        });
      },
      toinfoDetail() {
        this.$router.push({
          name: 'setting'
        })
      },
      toinfoQR() {
        this.$router.push({
          name: 'QRcodePage'
        });
      },
      async getConsultant () {
        this.$api.recommend.getConsultant().then(res => {
          this.consultantInfo = res.payload
        }).catch(err => {
          this.$toast(err.payload);
        })
      },
      onNavigateTo(page) {
        this.$router.push({
          name: page,
          query: {
            id: this.consultantInfo.id
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped="true">
  .page-wrapper {
    position: relative;
    .section-link {
      padding: 0.453rem  /* 17/37.5 */ 0;
    }
    .section-userInfo {
      height: 3.733rem  /* 140/37.5 */;
      padding: 0 0.4rem  /* 15/37.5 */;
    }
    .cont {
      flex: 1;
      .fullName {
        margin: 0;
        font-size:.586667rem;
        font-weight:bold;
        color:rgba(54,51,71,1);
      }
      .number {
        margin: 0.267rem  /* 10/37.5 */ 0;
        font-size:.4rem;
        font-weight:500;
        color:#0BC5B1;
      }
      .service-hall {
        margin: 0;
        font-size: 0.4rem  /* 15/37.5 */;
      }
    }
    .imgRight {
      display: flex;
      flex-direction: column;
      height: 60%;
      align-items: flex-end;
      justify-content: space-between;
      img:nth-child(1) {
        width: 16/37.5rem;
        height: 22/37.5rem;
      }
    }
    .bg {
      height: 4.533rem  /* 170/37.5 */;
      background-color: #19C4B2;
      border-radius: 0 0 50% 50%;
    }
    .main {
      position: absolute;
      top: 0.8rem  /* 30/37.5 */;
      left: 0.4rem  /* 15/37.5 */;
      right: 0.4rem  /* 15/37.5 */;
      background-color: #ffffff;
      border-radius: 0.187rem  /* 7/37.5 */;
    }
    
    .head-img {
      width: 2.187rem  /* 82/37.5 */;
      height: 2.187rem;
      margin-right: 0.267rem  /* 10/37.5 */;
      border-radius: 50%;
    }
    .QR-code {
      width: 31/37.5rem  /* 31/37.5 */;
      margin-top: -1.067rem  /* -40/37.5 */;
    }
    .section-item {
      box-shadow:0 0.027rem  /* 1/37.5 */ 0.213rem  /* 8/37.5 */ 0 rgba(204,204,204,0.5);
      border-radius:0.187rem  /* 7/37.5 */;
    }
    .flex-item {
      display: flex;
      align-items: center;
      margin-bottom: 0.533rem  /* 20/37.5 */;
    }
    .link-list {
      justify-content: space-between;
      text-align: center;
      &:last-child {
        margin-bottom: 0;
      }
      & li {
        flex: 1;
      }
      & img {
        width: 1.307rem  /* 49/37.5 */;
      }
      & p {
        margin: 0;
        color: #4D4D4D;
        font-size: 0.347rem  /* 13/37.5 */;
      }
    }
  }
  /deep/.market {
    width: 172.7/75rem;
  }

</style>
