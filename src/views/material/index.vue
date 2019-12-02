<template>
  <div>
    <van-tabs
      v-model="active"
      title-active-color="#000"
      class="find-tabs"
      type="line"
      :line-width="20"
      color="#0BC5B1"
      title-inactive-color="#999"
      @click="typeClick"
    >
      <van-tab title="类型">
        <van-popup v-model="downFlag1" :position="'bottom'">
          <!-- 类型列表.. -->
          <van-cell-group v-show="downFlag1" class="type-list">
            <van-cell
              v-for="(item) in typeList"
              :key="item.id"
              :value="item.labelName"
              @click="getTypeList(item.typeCode)"
            />
          </van-cell-group>
        </van-popup>
        <div v-for="(item, i) in arr" :key="i" class="item">
          <div class="item-title">{{ item.markName }}</div>
          <div class="item-details">
            <span class="vertical-line">{{ item.typeLabelNames }}</span>
            <span class="vertical-line">{{ item.themeLabelNames }}</span>
            {{ item.createdAt }}
          </div>
          <div class="item-content">
            <img :src="item.markUrl" alt @click="showShare(item.markUrl)">
          </div>
        </div>
        <van-cell v-if="nodata">暂无数据</van-cell>
      </van-tab>
      <van-tab title="主题">
        <van-popup v-model="downFlag2" position="bottom">
          <!-- 主题列表 -->
          <van-cell-group v-show="downFlag2" class="theme-list">
            <van-cell
              v-for="(item) in themeList"
              :key="item.id"
              :value="item.labelName"
              @click="getThemeList(item.themeCode)"
            />
          </van-cell-group>
        </van-popup>
        <div v-for="(item, i) in arr" :key="i" class="item">
          <div class="item-title">{{ item.markName }}</div>
          <div class="item-details">
            <span class="vertical-line">{{ item.typeLabelNames }}</span>
            <span class="vertical-line">{{ item.themeLabelNames }}</span>
            {{ item.createdAt }}
          </div>
          <div class="item-content">
            <img :src="item.markUrl" alt @click="showShare(item.markUrl)">
          </div>
        </div>
        <van-cell v-if="nodata">暂无数据</van-cell>
      </van-tab>
      <van-tab title="日期">
        <van-popup v-model="downFlag3" position="bottom">
          <!-- 日期列表 -->
          <van-datetime-picker
            v-show="downFlag3"
            v-model="currentDate"
            class="date-list"
            type="year-month"
            :max-date="maxDate"
            :min-date="minDate"
            :formatter="formatter"
            @confirm="confirm"
            @cancel="cancel"
          />
        </van-popup>
        <div v-for="(item, i) in arr" :key="i" class="item">
          <div class="item-title">{{ item.markName }}</div>
          <div class="item-details">
            <span class="vertical-line">{{ item.typeLabelNames }}</span>
            <span class="vertical-line">{{ item.themeLabelNames }}</span>
            {{ item.createdAt }}
          </div>
          <div class="item-content">
            <img :src="item.markUrl" alt @click="showShare(item.markUrl)">
          </div>
        </div>
        <van-cell v-if="nodata">暂无数据</van-cell>
      </van-tab>
    </van-tabs>
    <!-- <div class="mask" @touchmove.prevent> -->
    <van-dialog
      v-model="show"
      :show-confirm-button="false"
      :close-on-click-overlay="true"
      class="show-share"
    >
      <canvas id="avatar" ref="canvas"/>
      <img :src="uuuu" alt>
      <span v-show="show" class="show-share-span">长按图片保存或发送好友</span>
    </van-dialog>
  </div>
  <!-- </div> -->
</template>

<script>
import { setTimeout } from "timers";
const URL = "/sgcc-wechat-application/api/v1/userLogin/qrcode/";
export default {
  data() {
    return {
      nodata: false,
      minDate: new Date("2017-01"),
      maxDate: new Date(),
      currentDate: new Date(),
      formatDate: "",
      typeList: [{ labelName: "全部", id: "00000000000", typeCode: "全部" }],
      themeList: [{ labelName: "全部", id: "00000000000", typeCode: "全部" }],
      dateList: [{ labelName: "全部", id: "00000000000", typeCode: "全部" }],
      typeKey: "",
      themeKey: "",
      dateKey: "",
      downFlag1: false,
      downFlag2: false,
      downFlag3: false,
      active: 1,
      arr: [],
      show: false,
      activeSrc: require("../../../public/static/1.png"),
      uuuu: "",
      token:
        sessionStorage.getItem("token") || localStorage.getItem("token") || "",
      tenantCode:
        sessionStorage.getItem("tenantCode") ||
        localStorage.getItem("tenantCode") ||
        "",
      shopId:
        sessionStorage.getItem("shopId") || localStorage.getItem("shopId") || ""
    };
  },
  methods: {
    typeClick() {
      if (this.active == 0) {
        this.downFlag1 = !this.downFlag1;
      } else if (this.active == 1) {
        this.downFlag2 = !this.downFlag2;
      } else if (this.active == 2) {
        this.downFlag3 = !this.downFlag3;
      }
    },
    getList() {
      let obj = {};
      if (this.typeKey !== "" && this.typeKey !== "全部") {
        obj.typeCode = this.typeKey;
      }
      if (this.themeKey !== "" && this.themeKey !== "全部") {
        obj.themeCode = this.themeKey;
      }
      if (this.dateKey !== "" && this.dateKey !== "全部") {
        obj.month = this.dateKey;
      }
      this.$api.material.marketings(obj).then(res => {
        this.arr = [];
        const {
          payload: { content }
        } = res;
        if (content.length) {
          this.nodata = false;
          content.forEach(item => {
            let obj = {};
            obj.markName = item.markName;
            obj.markUrl = item.markUrl;
            obj.typeLabelNames = item.typeLabelNames;
            obj.themeLabelNames = item.themeLabelNames;
            let time = new Date(item.createdAt);
            let month = "";
            if (time.getMonth() + 1 < 10) {
              month = "0" + (time.getMonth() + 1);
            } else {
              month = "" + (time.getMonth() + 1);
            }
            obj.createdAt = time.getFullYear() + "-" + month;
            this.arr.push(obj);
          });
        } else {
          this.nodata = true;
        }
      });
    },
    // 根据类型查找
    getTypeList(typeCode) {
      this.downFlag1 = false;
      this.typeKey = typeCode;
      this.themeKey = "";
      this.dateKey = "";
      this.getList();
    },
    // 根据主题查找
    getThemeList(themeCode) {
      this.downFlag2 = false;
      this.typeKey = "";
      this.dateKey = "";
      this.themeKey = themeCode;
      this.getList();
    },
    // 选择日期确认
    confirm() {
      this.downFlag3 = false;
      let month = "";
      if (this.currentDate.getMonth() + 1 < 10) {
        month = "0" + (this.currentDate.getMonth() + 1);
      } else {
        month = this.currentDate.getMonth() + 1 + "";
      }
      this.formatDate = Number(this.currentDate.getFullYear() + month);
      this.dateKey = this.formatDate;
      this.themeKey = "";
      this.typeKey = "";
      this.getList();
    },
    // 选择日期取消
    cancel() {
      this.downFlag3 = false;
    },
    // 格式化日期样子
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    },
    // 遮罩层分享
    showShare(url) {
      let canvas = document.createElement("canvas");
      const fs = parseFloat(document.querySelector("html").style.fontSize);
      const width = (611 / 75) * fs;
      const height = (916 / 75) * fs;
      canvas.width = width;
      canvas.height = height;
      let context = canvas.getContext("2d");
      const _this = this;
        let myImage = new Image();
        myImage.setAttribute("crossOrigin", "anonymous");
        myImage.src = url;      
        myImage.onload = function() {
          let w = myImage.width;
          let h = myImage.height;
          let dw = width / w; // canvas与图片的宽高比
          let dh = width / h;
          let ratio;
          context.drawImage(
            myImage,
            0,
            0,
            width,
            height
          );
          // 裁剪图片中间部分
        let myImage2 = new Image();
        let userId = JSON.parse(sessionStorage.getItem("infoConsultant")).id;
        _this.url =
          process.env.VUE_APP_API_URL +
          URL +
          userId +
          `?token=${_this.token}&tenantCode=${_this.tenantCode}&shopId=${
            _this.shopId
          }`;
        myImage2.src = _this.url;
        const myImage2x = (20 / 75) * fs;
        const myImage2y = (720 / 75) * fs;
        const myImage2w = (170 / 75) * fs;
        const myImage2h = (170 / 75) * fs;
        myImage2.onload = function() {
          context.drawImage(myImage2, myImage2x, myImage2y, myImage2w, myImage2h);
          let myImage3 = new Image();
          myImage3.src = require("../../assets/image/c-logo.png");
          const myImage3x = (37 / 75) * fs;
          const myImage3y = (30 / 75) * fs;
          const myImage3w = (0 / 75) * fs;
          const myImage3h = (0 / 75) * fs;
          myImage3.onload = function() {
            context.drawImage(
              myImage3,
              myImage3x,
              myImage3y,
              myImage3w,
              myImage3h
            );
            // 绘制文字
            let tel = JSON.parse(sessionStorage.getItem("infoConsultant")).tel;
            context.fillStyle = "#fff";
            context.strokeStyle = "#fff";
            context.font = "0.32rem  /* 12/37.5 */";
            context.textBaseline = "hanging";
            const x1 = (240 / 75) * fs;
            const y1 = (760 / 75) * fs;
            context.fillText("电话:" + tel, x1, y1);
            const x2 = (240 / 75) * fs;
            const y2 = (796 / 75) * fs;
            context.fillText("关注国网e车购公众号", x2, y2);
            const x3 = (240 / 75) * fs;
            const y3 = (834 / 75) * fs;
            context.fillText("扫描二维码与专属顾问留言", x3, y3);
            // 绘制直线
            const x4 = (210 / 75) * fs;
            const y4 = (870 / 75) * fs;
            const x5 = (565 / 75) * fs;
            const y5 = (870 / 75) * fs;
            context.moveTo(x4, y4);
            context.lineTo(x5, y5);
            context.stroke();
            // 绘制直线
            const x6 = (210 / 75) * fs;
            const y6 = (750 / 75) * fs;
            const x7 = (565 / 75) * fs;
            const y7 = (750 / 75) * fs;
            context.moveTo(x6, y6);
            context.lineTo(x7, y7);
            context.stroke();
            let base64 = canvas.toDataURL("image/png");
            let img = document.createElement("img");
            img.setAttribute("src", base64);
            _this.uuuu = base64;
            _this.show = true;
          };
        };        
      };
    }
  },
  created() {
    // 类型
    this.$api.material.getLabel({ labelType: 1 }).then(res => {
      const { payload } = res;
      payload.forEach(item => {
        this.typeList.push({
          labelName: item.labelName,
          id: item.id,
          typeCode: item.labelCode
        });
      });
    });
    // 主题
    this.$api.material.getLabel({ labelType: 2 }).then(res => {
      const { payload } = res;
      payload.forEach(item => {
        this.themeList.push({
          labelName: item.labelName,
          id: item.id,
          themeCode: item.labelCode
        });
      });
    });
    this.getList();
  },
  watch: {
    active(newV, oldV) {
      this.dateKey = "";
      this.themeKey = "";
      this.typeKey = "";
      this.getList();
      this.downFlag1 = false;
      this.downFlag2 = false;
      this.downFlag3 = false;
      if (newV == 0) {
        this.downFlag1 = true;
      } else if (newV == 1) {
        this.downFlag2 = true;
      } else if (newV == 2) {
        this.downFlag3 = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.vertical-line::after {
  content: "";
  display: inline-block;
  width: 0.053rem /* 2/37.5 */;
  height: 0.3rem;
  background-color: #ccc;
  margin: 0 0.2rem;
  vertical-align: -1/75rem;
}
.type-down-flag {
  position: absolute;
  left: 170/75rem;
  top: 52/75rem;
  height: 1rem;
  z-index: 9999;
}
.type-list {
  width: 100%;
  z-index: 9999;
  border: 0.027rem /* 1/37.5 */ solid #ccc;
}
.theme-down-flag {
  position: absolute;
  left: 420/75rem;
  top: 52/75rem;
  height: 1rem;
  z-index: 9999;
}
.theme-list {
  width: 100%;
  z-index: 9999;
  border: 0.027rem /* 1/37.5 */ solid #ccc;
}
.date-down-flag {
  position: absolute;
  left: 660/75rem;
  top: 52/75rem;
  height: 1rem;
  z-index: 9999;
}
.date-list {
  width: 100%;
  z-index: 9999;
  border: 0.027rem /* 1/37.5 */ solid #ccc;
}
.item {
  padding: 0 0.3rem 0.3rem;
  .item-title {
    color: #333;
    font-size: 40/75rem;
  }
  .van-tab {
    padding: 0;
  }
  .item-details {
    color: #999;
    font-size: 24/75rem;
    margin: 0.2rem 0 0.1rem 0;
  }
  .item-content {
    height: 428/75rem;
    border-radius: 20/75rem;
    overflow: hidden;
    img {
      width: 100%;
      border-radius: 20/75rem;
    }
  }
}
.van-dialog {
  height: 911/75rem;
  width: 611/75rem;
  padding: 0;
}
.van-dialog img {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  width: 100%;
}

canvas {
  position: absolute;
  z-index: -999;
  overflow: hidden;
}

.van-overlay {
  padding-top: 2rem;
}
.van-ellipsis {
  text-align: center;
}
.van-ellipsis van-picker-column__item {
  height: 40/75rem;
}
.van-cell span {
  color: #00af78;
  text-align: center;
}
.van-picker-column__item {
  text-align: center;
}
.van-overlay {
  background-color: rgba(0, 0, 0, 0.7);
}
.van-picker-column__item {
  border-bottom: none;
}
.van-cell__value--alone {
  text-align: center;
}
</style>
