<template>
  <div class="comp-content">
    <div
      v-for="(item, index) in orderProgress"
      :key="index"
      class="progress-list"
      @click="handleClick(item)"
    >
      <van-icon
        v-if="item.state === '1'"
        name="checked"
        color="#0CAD79"
        class="icon"
      />
      <van-icon
        v-if="item.state === '0'"
        name="circle"
        color="#CCCCCC"
        class="icon"
      />
      <div class="item-center">
        <h6 class="name">
          {{ item.Schedule | filterOrderState }}
        </h6>
        <p
          v-if="item.Schedule !== 'CAR_VEHICLE' && item.Schedule !== 'CAR_RIAGE'"
          class="date"
        >
          {{ $formatTime(item.time/1000, 'yyyy-MM-dd HH:mm:SS') }}
        </p>
        <p
          v-if="item.Schedule === 'CAR_VEHICLE' || item.Schedule === 'CAR_RIAGE'"
          class="desc"
        >
          线下门店验车
        </p>
      </div>
      <div class="item-right">
        <van-button
          v-if="item.Schedule === 'PAY_TAIL_MONEY' && item.state !== '1' && orderProgress[index - 1].state === '1'"
          type="primary"
          size="mini"
          class="pay-btn"
          @click="handleNavigate('payment')"
        >
          支付
        </van-button>
        <div
          v-if="item.state==='1' && (item.Schedule==='SEE_CONTRACT' || item.Schedule==='SEE_RECEIPT' || item.Schedule==='CAR_DELIVERY')"
          class="link-btn"
        >
          <span>查看</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <div v-if="showDefault">
      <div
        v-for="item in orderProgressDefault"
        :key="item.name"
        class="progress-list"
      >
        <van-icon
          name="circle"
          color="#CCCCCC"
          class="icon"
        />
        <div class="item-center">
          <h6 class="name">
            {{ item.name }}
          </h6>
          <p
            v-if="item.desc"
            class="desc"
          >
            线下门店验车
          </p>
        </div>
      </div>
    </div>
  
    <van-image-preview
      v-model="showPop"
      :images="popImg"
      @change="onChange"
    />
  </div>
</template>
<script>
import { orderProgress } from '@/const'
import encryptByAESMixin from '@/minxins/encryptByAES'

export default {
  mixins: [encryptByAESMixin],
  filters: {
    filterOrderState (state) {
      return orderProgress[state]
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
      default: ''
    },
    orderType: {
      type: [String, Number],
      default: '1'
    }
  },
  data () {
    return {
      showPop: false,
      popImg: [],
      popText: '',
      showDefault: true,
      orderProgress: [],
      orderProgressDefault: [
        {
          name: '订金收据'
        }, {
          name: '购车合同'
        }, {
          name: '车辆整备'
        }, {
          name: '验车方式',
          desc: '线下门店验车'
        }, {
          name: '支付尾款'
        }, {
          name: '提车方式',
          desc: '线下门店验车'
        }, {
          name: '交车清单'
        }, {
          name: '订单完成'
        }
      ],
      orderProgressImgs: {}
    }
  },
  created () {
    this.orderProgress = this.callbackData.slice(1)
    if (this.orderProgress.length) {
      this.showDefault = false
    }
    this.getOrderProgressImg()
  },
  methods: {
    onChange(index) {
      this.index = index;
    },
    handleNavigate (page) {
      this.$router.push({
        name: page,
        query: {
          orderId: this.orderId,
          orderType: this.orderType
        }
      })
    },
    handleClosePop () {
      this.showPop = false
    },
    handleClick (item) {
      let ScheduleArr = ['SEE_CONTRACT', 'SEE_RECEIPT', 'CAR_DELIVERY']
      if (ScheduleArr.includes(item.Schedule) && item.state === '1') {
        this.showPop = true
        this.popImg = this.orderProgressImgs[item.Schedule].url
        this.popText = this.orderProgressImgs[item.Schedule].name
      }
    },
    getOrderProgressImg () {
      let decryptImgs = files => {
        if (!files) {
          return []
        }
        let fileArr = files.split(',')
        return fileArr.map(file => {
          return this.decryptByAES(file)
        })
      }
      
      this.$api.user.getOrderProgressImg({
        orderId: this.orderId
      }).then(res => {
        this.orderProgressImgs = {
          'SEE_CONTRACT': { url: decryptImgs(res.payload.imgContract), name: '购车合同' },
          'SEE_RECEIPT': { url: decryptImgs(res.payload.imgReceipt), name: '订金收据' },
          'CAR_DELIVERY': { url: decryptImgs(res.payload.imgList), name: '交车清单' }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
    .progress-list {
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        padding: 0.4rem  /* 15/37.5 */;
        margin-bottom: 0.533rem  /* 20/37.5 */;
        box-shadow: 0 0.053rem  /* 2/37.5 */ 0.213rem  /* 8/37.5 */ 0 rgba(204,204,204,0.5);
        border-radius: 0.133rem  /* 5/37.5 */;
        .item-center {
            flex: 1;
            margin-left: 0.533rem  /* 20/37.5 */;
            .name {
                font-size: 0.4rem  /* 15/37.5 */;
                margin: 0;
            }
            .date {
                margin: 0.24rem  /* 9/37.5 */ 0;
                color: #999999;
                font-size: 0.32rem  /* 12/37.5 */;
                 margin-bottom: 0;
            }
            .desc {
                margin: 0.24rem  /* 9/37.5 */ 0;
                color: #999999;
                font-size: 0.373rem  /* 14/37.5 */;
                margin-bottom: 0;
            }
        }
        .item-right {
            .link-btn {
                font-size: 0.373rem  /* 14/37.5 */;
                color: #999999;
            }
            .pay-btn {
                width: 2.133rem  /* 80/37.5 */;
                height: 0.907rem  /* 34/37.5 */;
                line-height: 0.8rem  /* 30/37.5 */;
                background: #0BC5B1;
                border-radius: 0.133rem  /* 5/37.5 */;
                font-size: 0.373rem  /* 14/37.5 */;
            }
        }
    }
    /deep/ .van-popup {
      text-align: center;
    }
    .popImg {
      max-width: 100%;
    }
    .popText {
      padding: 0 0.267rem  /* 10/37.5 */;
      font-size: 0.427rem  /* 16/37.5 */;
    }
  .icon {
    font-size: 0.533rem  /* 20/37.5 */;
  }
</style>
