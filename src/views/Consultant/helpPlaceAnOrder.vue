<template>
  <div class="page-wrapper">
    <section class="cont-w">
      <h2 class="title">确认用户信息</h2>
      <van-cell-group>
        <van-field
          v-model="phoneNumber"
          placeholder="请输入手机号"
          maxlength="11"
          clearable
          class="input-common"
        >
          <img slot="left-icon" class="lock-icon" src="@/assets/image/consultant/telephone.png">
          <van-button
            slot="button"
            size="small"
            type="primary"
            class="submit-btn"
            @click="onSearchUserName"
          >
            查询
          </van-button>
        </van-field>
        <van-field
          v-model="userName"
          placeholder="请查询用户名"
          disabled
          class="input-common"
        >
          <img slot="left-icon" class="lock-icon" src="@/assets/image/consultant/userName.png">
        </van-field>
      </van-cell-group>
    </section>
    
    <button
      class="next , btn"
      @click="onSubmit"
    >
      确认开单
    </button>
  </div>
</template>
<script>
  export default {
    name: 'HelpPlaceAnOrder',
    data() {
      return {
        phoneNumber: '',
        userName: '',
        memberId: ''
      }
    },
    methods: {
      onSearchUserName() {
        if (!(/^1[34578]\d{9}$/.test(this.phoneNumber))) {
          this.$toast('请输入正确的手机号');
          return;
        }
        this.$api.user.getUserInfoByMobile({
          mobile: this.phoneNumber
        }).then(res => {
          if (res.payload) {
            this.userName = res.payload.realName
            this.memberId = res.payload.id
          }
        })
      },
      onSubmit() {
        if (!(/^1[34578]\d{9}$/.test(this.phoneNumber))) {
          this.$toast('请输入正确的手机号');
          return;
        }
        if (!this.userName) {
          this.$toast('请查询用户名');
          return;
        }
        this.$store.commit('helpPlaceAnOrder/setUserInfo', {
          userName: this.userName,
          phoneNumber: this.phoneNumber,
          memberId: this.memberId
        })
        sessionStorage.setItem('customerInfo', JSON.stringify({
          userName: this.userName,
          phoneNumber: this.phoneNumber,
          memberId: this.memberId
        }))
        this.$router.replace({
          name: 'helpCustomerOrder'
        })
      }
    }
  }
</script>
<style lang="less" scoped="true">
  .page-wrapper {
    position: relative;
    .cont-w {
      padding: 0 1.013rem  /* 38/37.5 */;
    }
    .title {
      margin-top: 30vh;
      margin-bottom: 0.987rem  /* 37/37.5 */;
      font-size: 0.747rem  /* 28/37.5 */;
      text-align: center;
      font-weight: 400;
    }
  }
  .lock-icon {
    width: 0.48rem  /* 18/37.5 */;
  }
  .btn{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%
  }
  .input-common {
    margin-bottom: 0.267rem  /* 10/37.5 */;
    background-color: #FAFAFA;
    border-radius: 0.133rem  /* 5/37.5 */;
  }
  .submit-btn {
    color: #0BC5B1;
    background-color: #ffffff;
    border-radius: 0.4rem  /* 15/37.5 */;
  }
</style>
