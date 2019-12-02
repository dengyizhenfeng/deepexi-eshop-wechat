<template>
  <div>
    <div v-if="step===1">
      <img :src="carItem.activityUrl" class="act_pic">
      <div class="por">
        <div class="snap_info">
          <p class="act_name">{{ carItem.activityName }}</p>
          <p class="act_des">{{ carItem.activityDescription }}</p>
        </div>
        <van-cell-group class="sub_form">
          <van-field
            v-model="username"
            label="姓名"
            type="text"
            placeholder="请输入您的姓名"
            border
            :error-message="usernameMes"
          />
          <van-field
            v-model="phone"
            label="手机号码"
            type="number"
            maxlength="11"
            placeholder="请输入您的手机"
            :error-message="phoneMes"
          />
          <van-field
            v-model="participate"
            label="参与人数"
            type="number"
            placeholder="请输入参与人数"
            :error-message="userCountMes"
          />
        </van-cell-group>
      </div>
      <button class="next btn confirm_btn" @click="confirm">确认</button>
    </div>
    <div v-if="step===2" class="complete_box">
      <img src="@img/find/jiaoyichenggong.png" class="completed">
      <p class="dark_tip">完成团购报名</p>
      <p class="light_tip">
        页面将在
        <span class="red">{{ timeLeft }}s</span>
        后跳转至首页
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carItem: null,
      step: 1,
      timer: -1,
      timeLeft: 10,
      username: "",
      phone: "",
      participate: "",
      usernameMes: "",
      phoneMes: "",
      userCountMes: ""
    };
  },
  methods: {
    confirm() {
      if (!this.username) {
        this.$toast("请输入姓名");
        return;
      }
      if (!/^1[34578]\d{9}$/.test(this.phone)) {
        this.$toast("请输入正确电话号码");
        return;
      }
      if (!/^([1-9]|([1-9][0-9]))$/.test(this.participate)) {
        this.$toast("请输入1-99之间的参与人数");
        return;
      }
      this.toSignUp();
    },
    async toSignUp() {
      this.$toast.loading({
        mask: true,
        message: "正在提交"
      });
      let params = {
        name: this.username,
        phone: this.phone,
        activityId: this.carItem.id,
        participate: this.participate
      };
      const { payload } = await this.$api.find.toSignUp(params);
      this.$toast.clear();
      if (JSON.stringify(payload).length > 10) {
        // 后台返回正确的数据格式
        this.step = 2;
        this.startTimeDown();
      }
    },
    startTimeDown() {
      this.timeLeft = 10;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        --this.timeLeft;
        if (this.timeLeft <= 0) {
          clearInterval(this.timer);
          this.$router.replace({ name: "findIndex" });
        }
      }, 1000);
    }
  },
  created() {
    this.carItem = JSON.parse(this.$route.query.carItem);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="scss" scoped>
.por {
  margin-top: -1rem;
}
.act_pic {
  width: 100%;
}
.snap_info {
  box-sizing: border-box;
  width: 9.17333rem;
  min-height: 2.26667rem;
  background: #fff;
  box-shadow: 0px 1px 0.21333rem 0px rgba(204, 204, 204, 0.5);
  border-radius: 0.05333rem;
  margin: 0 auto 0.53333rem;
  padding-left: 0.4rem;
  z-index: 3;
  position: relative;
  p {
    margin: 0;
  }
}
.act_name {
  padding-top: 0.45rem;
  font-size: 0.48rem;
  font-weight: bold;
  color: rgba(5, 5, 8, 1);
  line-height: 0.66666rem;
  letter-spacing: 1px;
}
.act_des {
  padding-top: 0.2rem;
  width: 6.8266rem;
  font-size: 0.34666rem;
  color: #999;
  line-height: 0.48rem;
  letter-spacing: 1px;
}
.sub_form {
  width: 9.17333rem;
  margin: 0 auto;
  .van-cell {
    margin-bottom: 0.53333rem;
    box-shadow: 0 0.0533rem 0.2133rem 0 rgba(204, 204, 204, 0.5);
  }
}
.confirm_btn {
  width: 7.7333rem;
  border-radius: 0.66666rem;
  margin: 1rem auto;
  display: block;
}
.complete_box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    margin: 0;
  }
}
.red {
  color: #e71919;
}
.completed {
  width: 1.2267rem;
  margin-top: 4rem;
}
.dark_tip {
  height: 0.6666rem;
  width: 100%;
  font-size: 0.48rem;
  text-align: center;
  color: #000;
  line-height: 0.6666rem;
  letter-spacing: 1px;
  padding-top: 0.56rem;
}
.light_tip {
  font-size: 0.4rem;
  color: #666;
  padding-top: 0.21333rem;
  line-height: 0.56rem;
  letter-spacing: 1px;
}
</style>
