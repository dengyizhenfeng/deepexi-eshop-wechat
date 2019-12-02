<template>
  <div class="page-wrapper">
    <section v-if="!isShow" class="page-top">
      <div class="top-left">
        <div class="icon-wrapper left-width">
          <img src="@img/tabbar/pk-big.png">
        </div>
      </div>
      <div class="overflow-div">
        <div v-for="(item, index) in carList" :key="item.id">
          <div class="car-list-item cont-width">
            <h6>{{ item.name }}</h6>
            <p>{{ item.title }}</p>
            <van-icon name="clear" class="icon-close" @click="handleDeleteCar(index)"/>
          </div>
        </div>
      </div>
      <div v-show="carList.length != 3">
        <div class="car-list-item addPKCar" @click="handleAddPKCar">
          <van-icon name="plus"/>
        </div>
      </div>
    </section>

    <section v-if="!isShow">
      <div class="item-top">
        <h6>对比参数</h6>
        <p hidden>
          <span>
            <van-icon name="question"/>&nbsp;标配
          </span>
          <span>
            <van-icon name="circle"/>&nbsp;选配
          </span>
          <span>-&nbsp;无</span>
        </p>
      </div>
      <div class="item-cont">
        <dl v-if="carList[0]" class="cont-head">
          <dt
            v-for="item in carList[0].pkParam"
            :key="item.name"
            class="left-width flex_box"
          >
            {{ item.name }}
          </dt>
        </dl>
        <div class="overflow-div">
          <dl v-for="car in carList" :key="car.id" class="cont">
            <dd
              v-for="item in car.pkParam"
              :key="item.name"
              class="cont-width flex_box"
            >
              {{ item.value }}
            </dd>
          </dl>
        </div>
      </div>
      <div v-if="!carList.length" class="item-cont">
        <p class="no-data">请添加对比车辆</p>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carList: []
    };
  },
  computed: {
    isShow () {
      return this.$store.state.isLoading;
    }
  },
  created() {
    this.carList = this.$store.state.pkCar.carLists;
  },
  methods: {
    handleDeleteCar(index) {
      this.$store.commit("pkCar/deleteCarLists", index);
    },
    handleAddPKCar() {
      this.$router.push({ name: "car-recommend" });
    }
  }
};
</script>
<style lang="less" scoped>
.page-wrapper {
  margin-bottom: 0.533rem /* 20/37.5 */;
}
.left-width {
  width: 3.333rem /* 125/37.5 */;
  padding: 0.267rem /* 10/37.5 */;
  box-sizing: border-box;
  text-align: center;
}
.cont-width {
  width: 2.933rem /* 110/37.5 */;
  box-sizing: border-box;
  text-align: center;
}
.overflow-div {
  display: flex;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.flex_box {
  height: 0.9711rem;
  display: flex;
  padding: 0;
  justify-content: center;
  align-items: center;
}
.page-top {
  display: flex;
  align-items: center;
  padding: 0.267rem /* 10/37.5 */ 0;
  .top-left {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon-wrapper {
    & > img {
      width: 1.867rem /* 70/37.5 */;
    }
  }
  .car-list-item {
    position: relative;
    padding: 0.533rem /* 20/37.5 */ 0.267rem /* 10/37.5 */;
    margin: 0.267rem /* 10/37.5 */ 0.267rem /* 10/37.5 */ 0.267rem /* 10/37.5 */
      0;
    box-shadow: 0 0.053rem /* 2/37.5 */ 0.213rem /* 8/37.5 */ 0
      rgba(204, 204, 204, 0.5);
    & h6 {
      margin: 0;
      color: #363347;
      font-size: 0.32rem /* 12/37.5 */;
    }
    & p {
      margin-top: 0.267rem /* 10/37.5 */;
      margin-bottom: 0;
      color: #999999;
      font-size: 0.267rem /* 10/37.5 */;
      line-height: 1.3;
    }
    .icon-close {
      position: absolute;
      right: -0.16rem /* -6/37.5 */;
      top: -0.16rem /* -6/37.5 */;
      font-size: 0.373rem /* 14/37.5 */;
      color: #9a9a9a;
    }
  }
  .addPKCar {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0.053rem /* 2/37.5 */ 0.213rem /* 8/37.5 */ 0 #fff;
    font-size: 0.533rem /* 20/37.5 */;
    color: #999999;
  }
}
.item-top {
  display: flex;
  height: 1.173rem /* 44/37.5 */;
  line-height: 1.173rem /* 44/37.5 */;
  padding: 0 0.4rem /* 15/37.5 */;
  box-sizing: border-box;
  background-color: #f8f8f8;
  & h6 {
    flex: 1;
    margin: 0;
    color: #363347;
    font-size: 0.48rem /* 18/37.5 */;
  }
  & p {
    margin: 0;
    font-size: 0.32rem /* 12/37.5 */;
    & > span {
      margin-left: 0.267rem /* 10/37.5 */;
    }
  }
}
.item-cont {
  display: flex;
  & dl {
    margin: 0;
    font-size: 0.293rem /* 11/37.5 */;
    text-align: center;
    border-collapse: collapse;
    & dt {
      color: #676767;
      border-bottom: 0.027rem /* 1/37.5 */ solid #f1f1f1;
      border-right: 0.027rem /* 1/37.5 */ solid #f1f1f1;
    }
    & dd {
      margin: 0;
      color: #363347;
      border-bottom: 0.027rem /* 1/37.5 */ solid #f1f1f1;
      border-right: 0.027rem /* 1/37.5 */ solid #f1f1f1;
    }
  }
}
.no-data {
  width: 100%;
}
</style>
