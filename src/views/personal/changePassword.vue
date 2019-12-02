<template>
  <div class="changePassword">
    <h1>
      修改密码
    </h1>
    <section>
      <van-cell-group>
        <van-field
          v-model="oldPassword"
          placeholder="请输入您的密码"
          type="password"
          clearable
        />
        <van-field
          v-model="newPassword"
          placeholder="请输入您的密码"
          type="password"
          clearable
        />
        <van-field
          v-model="comfirePassword"
          placeholder="请确认您的密码"
          type="password"
          clearable
        />
      </van-cell-group>
    </section>
    <!-- <ul>
      <li>
        <input v-model="oldPassword" type="password" placeholder="请输入您的旧密码">  
      </li>
      <li>
        <input v-model="newPassword" type="password" placeholder="请输入您的新密码">
      </li>
      <li>
        <input v-model="comfirePassword " type="password" placeholder="请再次确认您的新密码">
      </li>
    </ul> -->
    <p @click="comfire">
      确定
    </p>
  </div>
</template>
<script>
import encryptByAES from "@/minxins/encryptByAES";
import loginMixin from "@/minxins/login";
import buttonBig from "@/components/buttonBig.vue";
export default {
    name: 'ChangePassword',
    components: {
      buttonBig
    },
    data() {
        return {
          oldPassword: '',
          comfirePassword: '',
          newPassword: '',
          id: ''
        };
    },
    mixins: [
      loginMixin
    ],
    methods: {
      async getPassword() {
        this.id = JSON.parse(sessionStorage.getItem('infoConsultant')).id;
        await this.$api.recommend.getupdatePassWord({
          oldPassword: this.encryptByAES(this.oldPassword),
          newPassword: this.encryptByAES(this.comfirePassword),
          id: this.id
        })
        .then(res => {
          this.$router.push({
            name: 'consultantLogin'
          });
        }, err => {
          this.$toast(err.payload);
        })
      },
      comfire() {
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
        let _this = this;
        if (!this.oldPassword) {
          this.$toast("请输入旧密码");
        } else if (!this.newPassword) {
          this.$toast("请输入新密码");
        } else if (!this.comfirePassword) {
          this.$toast("确认密码不能为空");
        } else if (!reg.test(_this.newPassword) || !reg.test(_this.comfirePassword)) {
          this.$toast("密码必须由8-20个大小写英文字母和数字的字符串组成");
        } else if (this.newPassword !== this.comfirePassword) {
          this.$toast("确认密码不一致");
        } else {
          this.getPassword();
        }
      }
    }
}
</script>
<style lang="less" scoped>
.changePassword {
  width: 100%;
  height: 100vh;
  .van-cell {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0.266667rem 0.4rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    background-color: #F2F2F2;
    border-radius: 5/37.5rem;
    font-size: 0.373rem /* 14/37.5 */;
    overflow: hidden;
    width: 8rem;
    height: 1.146667rem;
    margin: 0 auto;
    line-height: 0.6rem;
    margin-top: 0.64rem;
  }
  h1 {
    margin-top: 85/37.5rem;
    text-align: center;
    color: #000;
    font-size: 24/37.5rem;
    font-family: "平方";
  }
  ul {
    margin: 30/37.5rem 38/375rem 0 38/37.5rem;
    li {
      margin-bottom: 10/37.5rem;
      margin-right: 38/37.5rem;
      background-color: #F2F2F2;
      border-radius: 5/37.5rem;
      height: 44/37.5rem;
      line-height: 42/37.5rem;
      input {
        border: none;
        background-color: transparent;
        width: 228/37.5rem;
        padding-left: 15/37.5rem;
        height: 20/37.5rem;
      }
      ::-webkit-input-placeholder {
        color: #333333;
        font-family: "平方";
        font-size: 15/37.5rem;
      }
    }
  }
  p {
    margin: 40/37.5rem auto 0 auto;
    width: 240/37.5rem;
    height: 38/37.5rem;
    background-color: #0BC5B1;
    border-radius: 22/37.5rem;
    text-align: center;
    color: #fff;
    line-height: 38/37.5rem;
    font-family: "平方";
    font-size: 18/37.5rem;
  }
}
</style>
