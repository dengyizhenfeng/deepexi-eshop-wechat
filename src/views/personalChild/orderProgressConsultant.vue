<template>
  <div class="comp-content">
    <div
      v-for="(item, index) in orderProgress"
      :key="index"
      :class="{disabled: index > activeStepIdx}"
      class="progress-list"
    >
      <div class="progressList-ct">
        <van-icon v-if="item.state == '1'" name="checked" color="#0BC5B1" class="icon"/>
        <van-icon v-if="item.state == '0'" name="circle" color="#CCCCCC" class="icon"/>
        <div class="item-center">
          <h6 class="name">{{ item.Schedule | filterOrderState }}</h6>
          <p
            v-if="item.Schedule !== 'CAR_VEHICLE' && item.Schedule !== 'CAR_RIAGE'"
            class="date"
          >
            {{ $formatTime(item.time/1000, 'yyyy-MM-dd HH:mm:SS') }}
          </p>
          <p v-if="item.Schedule === 'CAR_VEHICLE'" class="desc">线下门店验车</p>
          <p v-else-if="item.Schedule === 'CAR_RIAGE'" class="desc">线下门店提车</p>
          <p v-else style="margin:0;"/>
        </div>
        <div class="item-right">
          <van-button
            v-if="(item.Schedule == 'CAR_VEHICLE' || item.Schedule == 'CAR_RIAGE' || item.Schedule == 'ORDER_NICE' || item.Schedule == 'PAY_TAIL_MONEY') && item.state == 0"
            type="primary"
            size="mini"
            class="pay-btn"
            @click="stepDone(item.Schedule)"
          >
            完成
          </van-button>
          <van-button
            v-else-if="item.Schedule == 'CAR_PARATION' && item.state == 0"
            type="primary"
            size="mini"
            class="pay-btn"
            @click="bindCarID(item.Schedule)"
          >
            绑定车架号
          </van-button>
          <van-button
            v-else-if="item.Schedule == 'SEE_RECEIPT' || item.Schedule == 'SEE_CONTRACT' || item.Schedule == 'CAR_DELIVERY'"
            type="primary"
            size="mini"
            class="pay-btn"
            @click="upLoadImgs(item.Schedule)"
          >
            上传
          </van-button>
        </div>
      </div>
      <div
        v-if="item.Schedule == 'SEE_RECEIPT' || item.Schedule == 'SEE_CONTRACT' || item.Schedule == 'CAR_DELIVERY'"
        class="imgBox"
      >
        <div v-for="(imgItem, idx) in orderProgressImgs" :key="idx" class="imgListView">
          <div v-if="imgItem.key == item.Schedule && imgItem.url != null" class="imgListView">
            <div v-for="(urlItem, i) in imgItem.url" :key="i" class>
              <div
                class="imgView hasImg"
                :style="'background-image:url('+ urlItem +')'"
                @click="handleClick(urlItem)"
              >
                <div class="del" @click.stop="removeImg(i,item.Schedule)">+</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="item.Schedule == 'SEE_RECEIPT'" class="imgView">
          <upload-file
            :ref="item.Schedule"
            class="fileUpload"
            :file-url="LoadImage[0]"
            :enable-encrypt="2"
            @load="onUpLoadFile_RECEIPT"
            @uploading="onUploading"
            @fail="onFail"
            @delete="onDelete($event, payImage)"
          />
        </div>
        <div v-else-if="item.Schedule == 'SEE_CONTRACT'" class="imgView">
          <upload-file
            :ref="item.Schedule"
            class="fileUpload"
            :file-url="LoadImage[0]"
            :enable-encrypt="2"
            @load="onUpLoadFile_CONTRACT"
            @uploading="onUploading"
            @fail="onFail"
            @delete="onDelete($event, payImage)"
          />
        </div>
        <div v-else-if="item.Schedule == 'CAR_DELIVERY'" class="imgView">
          <upload-file
            :ref="item.Schedule"
            class="fileUpload"
            :file-url="LoadImage[0]"
            :enable-encrypt="2"
            @load="onUpLoadFile_DELIVERY"
            @uploading="onUploading"
            @fail="onFail"
            @delete="onDelete($event, payImage)"
          />
        </div>
      </div>
      <div v-if="item.Schedule == 'PAY_TAIL_MONEY' && payimg != ''" class="imgBox">
        <div class="imgListView">
          <div class="imgListView">
            <div
              class="imgView hasImg"
              :style="'background-image:url('+ payimg +')'"
              @click="handleClick(payimg)"
            />
          </div>
        </div>
      </div>
    </div>

    <van-popup v-model="showPop" :overlay="true">
      <p class="popText">
        <van-icon name="cross" style="float: right" @click="handleClosePop"/>
      </p>
      <img :src="popImg" class="popImg">
    </van-popup>
  </div>
</template>
<script>
import { orderProgressConsultant } from "@/const";
import encryptByAESMixin from "@/minxins/encryptByAES";
import fileUploadMixin from "@/minxins/fileUploadMixin";
import { Notify } from "vant";
import { MessageBox } from "mint-ui";
import UploadFile from "@/components/upload-file";
import { constants } from 'crypto';

export default {
  mixins: [fileUploadMixin, encryptByAESMixin],
  components: {
    UploadFile
  },
  filters: {
    filterOrderState(state) {
      return orderProgressConsultant[state];
    }
  },
  props: {
    callbackData: {
      type: Array,
      require: true,
      default: () => []
    },
    orderId: {
      type: String,
      default: ""
    },
    orderType: {
      type: [String, Number],
      default: "1"
    },
    orderPayid: {
      type: String,
      default: ""
    },
    orderPayimg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      LoadImage: [],
      showPop: false,
      popImg: "",
      popText: "",
      payimg: "",
      memberName: "",
      orderProgress: [],
      orderProgressImgs: {},
      orderProgressDefault: [
        {
          Schedule: "SEE_RECEIPT",
          state: "0"
        },
        {
          Schedule: "SEE_CONTRACT",
          state: "0"
        },
        {
          Schedule: "CAR_PARATION",
          state: "0"
        },
        {
          Schedule: "CAR_VEHICLE",
          state: "0"
        },
        {
          Schedule: "PAY_TAIL_MONEY",
          state: "0"
        },
        {
          Schedule: "CAR_RIAGE",
          state: "0"
        },
        {
          Schedule: "CAR_DELIVERY",
          state: "0"
        },
        {
          Schedule: "ORDER_NICE",
          state: "0"
        }
      ]
    };
  },
  computed: {
    activeStepIdx() {
      return this.orderProgress.findIndex(item => {
        return item.state == 0;
      });
    }
  },
  created() {
    this.orderProgress = this.callbackData.slice(1);
    if (this.orderProgress.length == 0) {
      this.orderProgress = this.orderProgressDefault;
    }
    this.getOrderProgressImg();
    this.payimg = this.decryptByAES(this.orderPayimg);
  },
  methods: {
    handleClosePop() {
      this.showPop = false;
    },
    handleClick(item) {
      this.showPop = true;
      this.popImg = item;
    },
    getOrderProgressImg() {
      this.$api.user
        .getOrderProgressImg({
          orderId: this.orderId
        })
        .then(res => {
          this.memberName = res.payload.memberName;
          this.orderProgressImgs = [
            {
              key: "SEE_CONTRACT",
              url: [],
              name: "购车合同"
            },
            {
              key: "SEE_RECEIPT",
              url: [],
              name: "订金收据"
            },
            {
              key: "CAR_DELIVERY",
              url: [],
              name: "交车清单"
            }
          ];
          // let imgsArry = this.orderProgressImgs
          if (res.payload.imgContract != null) {
            let imgsArry = res.payload.imgContract.split(",");
            imgsArry.forEach(item => {
              this.orderProgressImgs[0].url.push(this.decryptByAES(item));
            });
          }
          if (res.payload.imgReceipt != null) {
            let imgsArry = res.payload.imgReceipt.split(",");
            imgsArry.forEach(item => {
              this.orderProgressImgs[1].url.push(this.decryptByAES(item));
            });
          }
          if (res.payload.imgList != null) {
            let imgsArry = res.payload.imgList.split(",");
            imgsArry.forEach(item => {
              this.orderProgressImgs[2].url.push(this.decryptByAES(item));
            });
          }
        });
    },
    bindCarID(key) {
      // 绑定VIN码
      MessageBox.prompt("车辆识别代码", "").then(({ value, action }) => {
        // const ENGLISH_NUMBERPattern = /^[A-Za-z0-9]+$/;
        const ENGLISH_NUMBERPATTERN = /^[A-Za-z0-9]+$/;
        // if (!ENGLISH_NUMBERPattern.test(value)) {
        if (!ENGLISH_NUMBERPATTERN.test(value)) {
          this.$toast('请输入正确的车辆识别代码：英文字母 + 数字组合');
          return;
        }
        this.$api.user
          .changeStepState({
            id: this.orderId,
            imgType: key,
            name: this.memberName,
            value: value
          })
          .then(res => {
            Notify({
              message: "VIN码绑定成功!",
              duration: 2000,
              background: "#0bc5b1"
            });
            this.changeState(key)
          });
      });
    },
    stepDone(key) {
      // 完成该步骤 key:步骤标识
      if (key == "PAY_TAIL_MONEY") {
        if (this.orderPayid == "") {
          Notify("客户尚未上传尾款凭证!");
        } else {
          this.$api.user
            .addPayment({
              tradeOrderId: this.orderId,
              id: this.orderPayid
            })
            .then(res => {
              Notify({
                message: "操作成功!",
                duration: 2000,
                background: "#0bc5b1"
              });
              this.changeState(key)
            });
        }
      } else {
        this.$api.user
          .changeStepState({
            id: this.orderId,
            imgType: key,
            name: this.memberName
          })
          .then(res => {
            Notify({
              message: "操作成功!",
              duration: 2000,
              background: "#0bc5b1"
            });
            this.changeState(key)
          });
      }
    },
    upLoadImgs(key) {
      let imgs = [];
      let thisArry = this.orderProgressImgs;
      thisArry.forEach(item => {
        if (item.key == key) {
          item.url.forEach(src => {
            imgs.push(this.encryptByAES(src));
          });
          imgs = imgs.join(",");
        }
      });
      if (imgs != "") {
        this.$api.user
          .changeStepState({
            id: this.orderId,
            imgType: key,
            name: this.memberName,
            value: imgs
          })
          .then(res => {
            this.getOrderProgressImg();
            Notify({
              message: "上传成功!",
              duration: 2000,
              background: "#0bc5b1"
            });
            this.changeState(key)
          });
      } else {
        Notify({
          message: "您至少上传一张图片!",
          duration: 2000,
          background: "#0bc5b1"
        });
      }
    },
    onUpLoadFile_RECEIPT(file) {
      if (this.orderProgressImgs[1].url.length < 5) {
        this.orderProgressImgs[1].url.push(file[0]);
      } else {
        Notify({
          message: "你最多只能上传5张图片",
          duration: 2000,
          background: "#0bc5b1"
        });
      }
    },
    onUpLoadFile_CONTRACT(file) {
      if (this.orderProgressImgs[0].url.length < 5) {
        this.orderProgressImgs[0].url.push(file[0]);
      } else {
        Notify({
          message: "你最多只能上传5张图片",
          duration: 2000,
          background: "#0bc5b1"
        });
      }
    },
    onUpLoadFile_DELIVERY(file) {
      if (this.orderProgressImgs[2].url.length < 5) {
        this.orderProgressImgs[2].url.push(file[0]);
      } else {
        Notify({
          message: "你最多只能上传5张图片",
          duration: 2000,
          background: "#0bc5b1"
        });
      }
    },
    removeImg(idx, thisKey) {
      let thisArry = this.orderProgressImgs;
      thisArry.forEach(item => {
        if (item.key == thisKey) {
          item.url.splice(idx, 1);
        }
      });
    },
    changeState(key) {
      this.orderProgress.forEach(item => {
        if (item.Schedule == key) {
          item.state = 1
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.progress-list {
  position: relative;
  z-index: 10;
  padding: 0.4rem /* 15/37.5 */;
  margin-bottom: 0.533rem /* 20/37.5 */;
  box-shadow: 0 0.053rem /* 2/37.5 */ 0.213rem /* 8/37.5 */ 0
    rgba(204, 204, 204, 0.5);
  border-radius: 0.133rem /* 5/37.5 */;
  .progressList-ct {
    display: flex;
    align-items: center;
  }
  .item-center {
    flex: 1;
    margin-left: 0.533rem /* 20/37.5 */;
    .name {
      font-size: 0.4rem /* 15/37.5 */;
      margin: 0;
    }
    .date {
      margin: 0.24rem /* 9/37.5 */ 0;
      color: #999999;
      font-size: 0.32rem /* 12/37.5 */;
      margin-bottom: 0;
    }
    .desc {
      margin: 0.24rem /* 9/37.5 */ 0;
      color: #999999;
      font-size: 0.373rem /* 14/37.5 */;
      margin-bottom: 0;
    }
  }
  .item-right {
    .link-btn {
      font-size: 0.373rem /* 14/37.5 */;
      color: #999999;
    }
    .pay-btn {
      width: 2.133rem /* 80/37.5 */;
      height: 0.907rem /* 34/37.5 */;
      line-height: 0.8rem /* 30/37.5 */;
      background: #0bc5b1;
      border-radius: 0.133rem /* 5/37.5 */;
      font-size: 0.373rem /* 14/37.5 */;
    }
  }
  .imgBox {
    padding-left: 1rem;
    display: flex;
    flex-wrap: wrap;
    .imgView {
      color: #d8d8d8;
      margin-top: 0.26rem;
      width: 2.16rem;
      height: 2.16rem;
      text-align: center;
      line-height: 1.5rem;
      font-size: 1rem;
      border-radius: 0.1rem;
      margin-right: 0.27rem;
      position: relative;
      .fileUpload {
        position: absolute;
        top: 0;
      }
      .del {
        background: #bbb;
        width: 0.5rem;
        height: 0.5rem;
        font-size: 0.64rem;
        line-height: 0.55rem;
        color: #fff;
        border-radius: 50%;
        transform: rotate(45deg);
        position: absolute;
        right: -0.2rem;
        top: -0.15rem;
      }
    }
    .imgListView {
      display: flex;
      flex-wrap: wrap;
    }
    .imgView.hasImg {
      border: none;
      background-size: cover;
      background-position: center center;
    }
  }
}
/deep/ .van-popup {
  background: rgba(0, 0, 0, 0);
  text-align: center;
  overflow: inherit;
  .van-icon {
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    right: 0;
  }
}
.popImg {
  max-width: 100%;
}
.popText {
  margin: 0;
}
.icon {
  font-size: 0.533rem /* 20/37.5 */;
}
.disabled {
  opacity: 0.5;
}
</style>
