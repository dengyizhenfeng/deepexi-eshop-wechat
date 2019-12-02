<template>
  <div class="myClient">
    <div class="myClient_left">
      <div>
        <img :src="item.avatarUrl? item.avatarUrl: '@/assets/image/consultant/user.png'" alt>
      </div>
      <div>
        <h2>{{ item.memberName }}</h2>
      </div>
    </div>
    <!--<div class="myClient_right">
      <p>232:33</p>
      <span>3</span>
    </div>-->
  </div>
</template>
<script>
export default {
  name: "MYCLIENTChILD",
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default: null
    }
  }
};
</script>
<style lang="less" scoped>
.myClient {
  margin-left: 22/37.5rem;
  padding: 20/37.5rem;
  padding-left: 0rem;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &_left {
    display: flex;
    height: 52/37.5rem;
    div:nth-child(1) {
      img {
        width: 52/37.5rem;
        height: 52/37.5rem;
        border-radius: 50%;
      }
    }
    div:nth-child(2) {
      display: flex;
      align-items: center;
      margin-left: 14/37.5rem;
      h2 {
        font-family: "平方";
        font-size: 19/37.5rem;
        color: #4f4f4f;
        margin: 0;
        line-height: 19/37.5rem;
      }
      p {
        font-size: 14/37.5rem;
        color: #a1a1a1;
        font-family: "平方";
        margin-top: 8/37.5rem;
      }
    }
  }
  &_right {
    display: flex;
    flex-direction: column;
    height: 52/37.5rem;
    justify-content: space-around;
    align-items: center;
    margin-top: -4px;
    p {
      font-size: 13/37.5rem;
      color: #d6d6d6;
    }
    span {
      font-size: 13/37.5rem;
      color: #d6d6d6;
      display: inline-block;
      padding: 5/37.5rem;
      border-radius: 50%;
      background-color: #0bc5b1;
      font-family: "平方";
      line-height: 13/37.5rem;
      text-align: center;
    }
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .myClient {
    border-bottom: 0.333333px solid #e6e6e6;
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .myClient {
    border-bottom: 0.333333px solid #e6e6e6;
  }
}
</style>
