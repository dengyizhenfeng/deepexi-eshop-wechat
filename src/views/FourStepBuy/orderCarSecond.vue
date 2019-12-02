<template>
  <div class="OrderCarSecond">
    <div v-if="!loading">
      <Header v-if="!helpOrder" :carlist="carInfo" />
      <section>
        <h3 class="ft-18 , con">
          外观内饰
        </h3>
        <style-color
          :style-color="styleColor"
          :style-color-id="Object.keys(finishedOrder).length === 0 ? '' : finishedOrder.styleColor0bj.id"
          @getStyleId="getStyleId"
        />
      </section>
      <section v-if="serviceInfo_a.length">
        <h3 class="ft-18 , con">
          充电服务
        </h3>
        <service-page
          :service-info="serviceInfo_a"
          name="serviceA"
          :servicea-current-id="Object.keys(finishedOrder).length === 0 ? '' : finishedOrder.serviceAObj.id"
          @getServiceAId="getServiceAId"
        />
      </section>
      <section v-if="serviceInfo_b.length">
        <h3 class="ft-18 , con">
          充电桩
        </h3>
        <service-page
          :service-info="serviceInfo_b"
          name="serviceB"
          :serviceb-current-id="Object.keys(finishedOrder).length === 0 ? '' : finishedOrder.serviceBObj.id"
          :b-is-install="Object.keys(finishedOrder).length === 0 ? true : finishedOrder.serviceBObj.installService"
          @getserviceBId="getserviceBId"
        />
      </section>
      <section v-if="serviceInfo_c.length">
        <h3 class="ft-18 , con">
          金融方案
        </h3>
        <service-page
          :service-info="serviceInfo_c"
          name="serviceC"
          :servicec-current-id="Object.keys(finishedOrder).length === 0 ? '' : finishedOrder.serviceCObj.id"
          @getserviceCId="getserviceCId"
        />
      </section>
      <section v-if="serviceInfo_d.length">
        <h3 class="ft-18 , con">
          保险服务
        </h3>
        <service-page
          :service-info="serviceInfo_d"
          name="serviceD"
          :serviced-current-id="Object.keys(finishedOrder).length === 0 ? '' : finishedOrder.serviceDObj.id"
          @getserviceDId="getserviceDId"
        />
      </section>
      <section v-if="serviceInfo_e.length">
        <h3 class="ft-18 , con">
          验车上牌
        </h3>
        <service-page
          :service-info="serviceInfo_e"
          name="serviceE"
          :servicee-current-id="Object.keys(finishedOrder).length === 0 ? '' : finishedOrder.serviceEObj.id"
          @getserviceEId="getserviceEId"
        />
      </section>
      <section v-if="serviceInfo_f.length">
        <h3 class="ft-18 , con">
          精品装饰
        </h3>
        <service-page
          :service-info="serviceInfo_f"
          name="serviceF"
          :servicef-current-id="Object.keys(finishedOrder).length === 0 ? '' : finishedOrder.serviceFObj.id"
          @serviceFId="selectServiceFId"
        />
      </section>
      <section class="allWrap">
        <div class="txtWrap">
          <p class="ft-15 , word">
            购车总价
          </p>
          <p class="ft-15 , money">
            ¥{{ $handleMoney(allPrice.toString()) }}
          </p>
        </div>
        <div
          class="txtWrap"
          style="border-top: 1px solid #ccc"
        >
          <div class="ft-15 , word">
            购车定金
          </div>
          <div class="ft-15 , money">
            ¥{{ $handleMoney(depositPercent.toString()) }}
          </div>
        </div>
      </section>
    </div>
    <button
      class="next , btn"
      @click="next"
    >
      下一步
    </button>
  </div>
</template>

<script>
import Header from './orderHeader.vue'
import styleColor from './styleColor.vue'
import servicePage from './servicePage.vue'

export default {
  name: 'OrderCarSecond',
  components: {
    Header,
    styleColor,
    servicePage
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    finishedOrder: {
      type: Object,
      default: () => ({})
    },
    helpOrder: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      carInfo: {},
      styleColor: [],
      loading: true,
      serviceAId: '',
      serviceBId: '',
      serviceCId: '',
      serviceDId: '',
      serviceEId: '',
      serviceFId: '',
      serviceAPrice: 0,
      serviceBPrice: 0,
      serviceCPrice: 0,
      serviceDPrice: 0,
      serviceEPrice: 0,
      serviceFPrice: 0,
      serviceInfo_a: [],
      serviceInfo_b: [],
      serviceInfo_c: [],
      serviceInfo_d: [],
      serviceInfo_e: [],
      serviceInfo_f: [],
      allPrice: 0,
      depositPercent: 0,
      styleColor0bj: {},
      serviceAObj: {},
      serviceBObj: {},
      serviceCObj: {},
      serviceDObj: {},
      serviceEObj: {},
      serviceFObj: {},
      userInfo: JSON.parse(sessionStorage.getItem('customerInfo')) || {}
    }
  },
  watch: {
    serviceAPrice (newVal, oldVal) {
      this.allPrice = this.allPrice + newVal - oldVal
    },
    serviceBPrice (newVal, oldVal) {
      this.allPrice = this.allPrice + newVal - oldVal
    },
    serviceCPrice (newVal, oldVal) {
      this.allPrice = this.allPrice + newVal - oldVal
    },
    serviceDPrice (newVal, oldVal) {
      this.allPrice = this.allPrice + newVal - oldVal
    },
    serviceEPrice (newVal, oldVal) {
      this.allPrice = this.allPrice + newVal - oldVal
    },
    serviceFPrice (newVal, oldVal) {
      this.allPrice = this.allPrice + newVal - oldVal
    }
  },
  created () {
    this.getOrderCarFirst()
  },
  methods: {
    next () {
      if (Object.keys(this.styleColor0bj).length === 0) {
        this.$toast('请选择外观内饰')
        return
      }

      this.$emit('next', {
        allPrice: this.allPrice,
        depositPercent: this.depositPercent,
        styleColor0bj: this.styleColor0bj,
        serviceAObj: this.serviceAObj,
        serviceBObj: this.serviceBObj,
        serviceCObj: this.serviceCObj,
        serviceDObj: this.serviceDObj,
        serviceEObj: this.serviceEObj,
        serviceFObj: this.serviceFObj
      })
    },
    async getOrderCarFirst () {
      const data = await this.$api.fourStep.getOrderCarFirst(this.id)
      this.list = data.payload
      this.carInfo = [{
        guidePrice: this.list.guidePrice,
        id: this.list.id,
        name: this.list.name,
        productPhoto: this.list.eo.productPhoto,
        sellCount: this.list.sellCount,
        sellPrice: this.list.preferentialPrice,
        shopId: this.list.eo.shopId,
        shopName: this.list.eo.shopName,
        subsidy: this.list.eo.subsidy
      }]
      
      this.depositPercent = this.list.eo.depositPercent
      this.allPrice = this.list.preferentialPrice
      this.styleColor = this.selectStyleColor(this.list.skuList, '外观', '内饰') // 外观内饰
      this.serviceInfo_a = this.selectA(this.list.charges) // 充电服务
      this.serviceInfo_b = this.selectB(this.list.piles) // 充电桩
      this.serviceInfo_c = this.selectType(this.list.bundle, 'finance') // 金融方案
      this.serviceInfo_d = this.selectD(this.selectType(this.list.bundle, 'insurance')) // 保险
      this.serviceInfo_e = this.selectType(this.list.bundle, 'service') // 套餐
      this.serviceInfo_f = this.selectF(this.selectType(this.list.bundle, 'boutique'), 'bundleItemList') // 精品
      this.loading = false
    },
    getStyleId (item) {
      this.styleId = item.id
      this.styleColor0bj = { styleColor: item.outStyle + '/' + item.inStyle, id: item.id }
    },
    getServiceAId (item) {
      this.serviceAId = item.id
      this.serviceAPrice = item.price - 0
      this.serviceAObj = { ...item }
    },
    getserviceBId (item) {
      item.sku = item.sku ? item.sku : {
        preferentialPrice: 0,
        id: ''
      }
      this.serviceBId = item.sku.id
      this.serviceBPrice = item.sku.preferentialPrice - 0
      this.serviceBObj = { name: item.name, id: item.sku.id, price: this.serviceBPrice, installService: item.installService }
    },
    getserviceCId (item) {
      this.serviceCId = item.bundleItemList[0].itemSku.id
      this.serviceCPrice = item.bundleItemList[0].itemSku.preferentialPrice
      this.serviceCObj = { name: item.name, price: item.bundleItemList[0].itemSku.preferentialPrice, id: this.serviceCId, downPaymentRatio: item.bundleItemList[0].itemSku.downPaymentRatio, stagesNumber: item.bundleItemList[0].itemSku.stagesNumber, propValues: item.bundleItemList[0].itemSku.propValues }
    },
    getserviceDId (item) {
      this.serviceDId = item.id
      this.serviceDPrice = item.price - 0
      this.serviceDObj = { name: item.name, id: item.id, info: item.info, price: item.price }
    },
    getserviceEId (item) {
      this.serviceEId = item.id
      this.serviceEPrice = item.preferentialPrice - 0
      this.serviceEObj = { id: item.id, bundlePrice: item.preferentialPrice, name: item.name }
    },
    selectServiceFId (item) {
      this.serviceFId = item.id
      this.serviceFPrice = item.bundlePrice - 0
      this.serviceFObj = { id: item.id, bundlePrice: item.bundlePrice, name: item.name, serviec: item.service.substr(9) }
    },
    selectD (arr) {
      arr = arr.length ? arr : [{ bundleItemList: [] }];
      
      let needArr = []
      for (let i = 0; i < arr[0].bundleItemList.length; i++) {
        let obj = {}
        obj.id = arr[0].bundleItemList[i].itemSku.id
        obj.name = arr[0].bundleItemList[i].itemSku.value.split(',')[0].substr(2).slice(0, -1)
        obj.info = arr[0].bundleItemList[i].itemSku.value.split(',')[1].substr(1).slice(0, -1)
        obj.price = arr[0].bundleItemList[i].itemSku.preferentialPrice
        needArr.push(obj)
      }
      return needArr
    },
    selectB (arr) {
      let needArr = []
      for (let i = 0; i < arr.length; i++) {
        needArr.push({
          sku: {
            id: arr[i].sku[0].sku.id,
            preferentialPrice: arr[i].sku[0].sku.preferentialPrice
          },
          name: arr[i].item.name
        })
      }
      return needArr
    },
    selectStyleColor (arr, stra, strb) {
      let needArr = []
      for (let i = 0; i < arr.length; i++) {
        let obj = {}
        for (let j = 0; j < arr[i].skuAttr.length; j++) {
          if (arr[i].skuAttr[j].name.indexOf(stra) > -1) {
            obj.outStyle = arr[i].skuAttr[j].value
          }
          if (arr[i].skuAttr[j].name.indexOf(strb) > -1) {
            obj.inStyle = arr[i].skuAttr[j].value
          }
          obj.id = arr[i].skuId
        }
        needArr.push(obj)
      }
      return needArr
    },
    selectA (arr) {
      let needArr = []
      for (let i = 0; i < arr.length; i++) {
        let obj = {}
        let skuAttr = arr[i].sku[0].skuAttr;

        if (skuAttr && skuAttr.length) {
          obj.name = skuAttr[0].name
          obj.value = skuAttr[0].value
        } else {
          obj.name = arr[i].item.name
          obj.value = ''
        }
        
        obj.times = arr[i].item.times
        obj.id = arr[i].sku[0].sku.id
        obj.price = arr[i].sku[0].sku.preferentialPrice
        needArr.push(obj)
      }
      return needArr
    },
    selectType (arr, name) {
      let needArr = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].type.indexOf(name) > -1) {
          needArr.push(arr[i])
        }
      }
      return needArr
    },
    selectF (arr, carr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i][carr].length; j++) {
          arr[i].service += arr[i][carr][j].itemSku.itemName + ' '
        }
      }
      return arr
    }
  }
}

</script>

<style scoped>
.OrderCarSecond{
  padding: 0 .4rem;
}
.con{
  font-weight:600;
  color:rgba(0,0,0,1);
}
.txtWrap{
  width: 100%;
  height: 1.386667rem;
  display: flex;
  justify-content: space-between;
  line-height: 1.086667rem;

}
.allWrap{
 margin-bottom: 1.5rem
}
.word{
  font-weight:500;
  color:rgba(0,0,0,1);
}
.money{
  font-weight:500;
  color:rgba(244,163,28,1);
}
.btn{
    position: fixed;
    bottom: 0rem;
    left: 0;
    width: 100%
  }
</style>
