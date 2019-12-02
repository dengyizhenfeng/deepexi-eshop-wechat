<template>
  <van-dialog
    v-model="isShowDialog"
    show-cancel-button
    class="xxxxxx"
    @confirm="handleSendSMS"
    @cancel="onCancel"
  >
    <img :src="verifyCodeUrl" class="code-img">
    <van-field v-model="verifyCode" placeholder="请输入图片中的计算结果" class="verifyCode-input"/>
  </van-dialog>
</template>
<script>
export default {
  name: "VerifyCode",
  data() {
    return {
      uid: "",
      verifyCodeUrl: "",
      verifyCode: "",
      isShowDialog: false
    };
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showDialog(newVal, oldVal) {
      this.isShowDialog = newVal;
      this.verifyCode = "";
      this.generateVerifyCodeFun();
    }
  },
  methods: {
    handleSendSMS() {
      if (!this.verifyCode) {
        this.$toast("请输入图片中的计算结果");
        this.$emit("verifyCode", false);
        return;
      }
      this.$emit("verifyCode", {
        codeGuuid: this.uid,
        result: this.verifyCode
      });
    },
    onCancel() {
      this.$emit("onCancel");
    },
    generateVerifyCodeFun() {
      this.uid = this.randomWord(true, 18, 18);
      this.verifyCodeUrl =
        location.origin +
        "/car-deepexi-member-center/api/v1/wxAuthLogin/verifyImg?codeGuuid=" +
        this.uid;
    },
    randomWord(randomFlag, min, max) {
      let str = "";
      let range = min;
      let arr = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];

      // 随机产生
      if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
      }
      for (let i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }
      return str;
    }
  }
};
</script>
<style lang="less" scoped="true">
.code-img {
  width: 100%;
  height: 3.973rem /* 149/37.5 */;
}
.verifyCode-input {
  width: 100% !important;
  margin-top: 0.533rem /* 20/37.5 */;
  box-shadow: 0 0.053rem /* 2/37.5 */ 0.213rem /* 8/37.5 */ 0
    rgba(204, 204, 204, 0.5);
  background-color: #ffffff !important;
}
.xxxxxx {
  position: absolute !important;
}
</style>
