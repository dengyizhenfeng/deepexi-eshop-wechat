<template>
  <div>
    <!-- 充电服务 -->
    <div
      v-if="name === 'serviceA'"
      class="seervicePage"
    >
      <section
        v-for="(item,index) in serviceInfo"
        :key="index"
        :class=" serviceAId === item.id ? 'active' : ''"
        class="wrap"
        @click="selectA(item)"
      >
        <div
          class="ft-17 , money"
          :style="{color: serviceAId === item.id ? 'white' : ''}"
        >
          ¥{{ $handleMoney(item.price.toString()) }}
        </div>
        <div
          class="ft-15 , scale"
          :style="{color: serviceAId === item.id ? 'white' : ''}"
        >
          {{ item.name }}
        </div>
        <div
          class="ft-14 , times, intercept-line-1"
          :style="{color: serviceAId === item.id ? 'white' : ''}"
        >
          {{ item.value }}{{ item.times }}次
        </div>
      </section>
    </div>

    <!-- 充电桩 -->
    <div
      v-if="name === 'serviceB'"
      class="seervicePage"
    >
      <section
        v-for="(item,index) in serviceInfo"
        :key="index"
        :class=" skuId === item.sku.id ? 'active' : ''"
        class="wrap"
        @click="selectB(item)"
      >
        <div
          class="ft-17 , money"
          :style="{color: skuId === item.sku.id ? 'white' : ''}"
        >
          ¥{{ $handleMoney(item.sku.preferentialPrice.toString()) }}
        </div>
        <div
          class="ft-15 , scale"
          :style="{color: skuId === item.sku.id ? 'white' : ''}"
        >
          {{ item.name }}
        </div>
      </section>
      <section
        v-if="showInstallService"
        class="service"
        :style="{color: installService ? 'white' : '',background: installService ? '#0BC5B1' : ''}"
        @click="selectService"
      >
        安装服务
      </section>
    </div>

    <!-- 金融方案 -->
    <div
      v-if="name === 'serviceC'"
      class="seervicePage"
    >
      <section
        v-for="(item,index) in serviceInfo"
        :key="index"
        :class=" serviceCId === item.bundleItemList[0].itemSku.id ? 'active' : ''"
        class="wrap"
        @click="selectC(item)"
      >
        <div
          class="ft-17 , money"
          :style="{color: serviceCId === item.bundleItemList[0].itemSku.id ? 'white' : ''}"
        >
          首付{{ item.bundleItemList[0].itemSku.downPaymentRatio }}
        </div>
        <div
          class="ft-15 , scale"
          :style="{color: serviceCId ===item.bundleItemList[0].itemSku.id ? 'white' : ''}"
        >
          {{ item.name }}
        </div>
        <div
          class="ft-14 , times, intercept-line-1"
          :style="{color: serviceCId === item.bundleItemList[0].itemSku.id ? 'white' : ''}"
        >
          {{ item.bundleItemList[0].itemSku.stagesNumber }},利率{{ item.bundleItemList[0].itemSku.propValues }},服务费 ¥{{ $handleMoney(item.bundleItemList[0].itemSku.preferentialPrice.toString()) }}
        </div>
      </section>
    </div>

    <!-- 保险服务 -->
    <div
      v-if="name === 'serviceD'"
      class="seervicePage"
    >
      <section
        v-for="(item,index) in serviceInfo"
        :key="index"
        :class=" serviceDId === item.id ? 'active' : ''"
        class="wrap"
        @click="selectD(item)"
      >
        <div
          class="ft-17 , money"
          :style="{color: serviceDId === item.id ? 'white' : ''}"
        >
          ¥{{ $handleMoney(item.price.toString()) }}
        </div>
        <div
          class="ft-15 , scale"
          :style="{color: serviceDId === item.id ? 'white' : ''}"
        >
          {{ item.name }}
        </div>
        <div
          class="ft-14 , times, intercept-line-1"
          :style="{color: serviceDId === item.id ? 'white' : ''}"
        >
          {{ item.info }}
        </div>
      </section>
    </div>

    <!-- 验车上牌 -->
    <div
      v-if="name === 'serviceE'"
      class="seervicePage"
    >
      <section
        v-for="(item,index) in serviceInfo"
        :key="index"
        :class=" serviceEId === item.id ? 'active' : ''"
        class="wrap"
        @click="selectE(item)"
      >
        <div
          class="ft-17 , money"
          :style="{color: serviceEId === item.id ? 'white' : ''}"
        >
          ¥{{ $handleMoney(item.preferentialPrice.toString()) }}
        </div>
        <div
          class="ft-15 , scale"
          :style="{color: serviceEId === item.id ? 'white' : ''}"
        >
          {{ item.name }}
        </div>
      </section>
    </div>

    <!-- 精品装饰 -->
    <div
      v-if="name === 'serviceF'"
      class="seervicePage"
    >
      <section
        v-for="(item,index) in serviceInfo"
        :key="index"
        :class=" serviceFId === item.id ? 'active' : ''"
        class="wrap"
        @click="selectF(item)"
      >
        <div
          class="ft-17 , money"
          :style="{color: serviceFId === item.id ? 'white' : ''}"
        >
          ¥{{ $handleMoney(item.bundlePrice.toString()) }}
        </div>
        <div
          class="ft-15 , scale"
          :style="{color: serviceFId === item.id ? 'white' : ''}"
        >
          {{ item.name }}
        </div>
        <div
          class="ft-14 , times, intercept-line-1"
          :style="{color: serviceFId === item.id ? 'white' : ''}"
        >
          {{ item.service.substr(9) }}
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SeervicePage',
  components: {

  },
  props: {
    serviceInfo: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: ''
    },
    serviceaCurrentId: {
      type: String,
      default: ''
    },
    servicebCurrentId: {
      type: String,
      default: ''
    },
    bIsInstall: {
      type: Boolean,
      default: true
    },
    servicecCurrentId: {
      type: String,
      default: ''
    },
    servicedCurrentId: {
      type: String,
      default: ''
    },
    serviceeCurrentId: {
      type: String,
      default: ''
    },
    servicefCurrentId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      serviceAId: '',
      serviceBId: '',
      skuId: '',
      serviceCId: '',
      serviceDId: '',
      serviceEId: '',
      serviceFId: '',
      installService: false,
      serviceB: {},
      showInstallService: false
    }
  },
  created () {
    const sc = sessionStorage.getItem('cityCode')
    if (
      sc
        ? sc.slice(0, 2) === "37"
        : localStorage.getItem("cityCode").slice(0, 2) === "37"
      ) { // 山东省门店显示安装服务
      this.showInstallService = true;
      this.installService = true;
    }
    this.serviceAId = this.serviceaCurrentId === '' ? '' : this.serviceaCurrentId
    this.skuId = this.servicebCurrentId === '' ? '' : this.servicebCurrentId
    this.serviceCId = this.servicecCurrentId === '' ? '' : this.servicecCurrentId
    this.serviceDId = this.servicedCurrentId === '' ? '' : this.servicedCurrentId
    this.serviceEId = this.serviceeCurrentId === '' ? '' : this.serviceeCurrentId
    this.serviceFId = this.servicefCurrentId === '' ? '' : this.servicefCurrentId
    if (this.serviceAId !== '') {
      this.$emit('getServiceAId', this.pick('serviceA', this.serviceAId))
    }
    if (this.skuId !== '') {
      this.$emit('getserviceBId', this.pick('serviceB', this.skuId))
    }
    if (this.serviceCId !== '') {
      this.$emit('getserviceCId', this.pick('serviceC', this.serviceCId))
    }
    if (this.serviceDId !== '') {
      this.$emit('getserviceDId', this.pick('serviceD', this.serviceDId))
    }
    if (this.serviceEId !== '') {
      this.$emit('getserviceEId', this.pick('serviceE', this.serviceEId))
    }
    if (this.serviceFId !== '') {
      this.$emit('serviceFId', this.pick('serviceF', this.serviceFId))
    }
  },
  methods: {
    pick (name, id) {
      if (name === 'serviceB') {
        return this.serviceInfo.filter(item => id === item.sku.id)[0]
      } else if (name === 'serviceC') {
        return this.serviceInfo.filter(item => id === item.bundleItemList[0].itemSku.id)[0]
      } else {
        return this.serviceInfo.filter(item => id === item.id)[0]
      }
    },
    selectA (item) {
      this.serviceAId = item.id
      this.$emit('getServiceAId', item)
    },
    selectB (item) {
      this.skuId = item.sku.id
      this.serviceB = item
      this.serviceB.installService = this.installService
      this.$emit('getserviceBId', this.serviceB)
    },
    selectC (item) {
      this.serviceCId = item.bundleItemList[0].itemSku.id
      this.$emit('getserviceCId', item)
    },
    selectD (item) {
      this.serviceDId = item.id
      this.$emit('getserviceDId', item)
    },
    selectE (item) {
      this.serviceEId = item.id
      this.$emit('getserviceEId', item)
    },
    selectF (item) {
      this.serviceFId = item.id
      this.$emit('serviceFId', item)
    },
    selectService () {
      this.installService = !this.installService
      if (this.skuId) {
        this.serviceB = this.pick('serviceB', this.skuId)
      }
      this.serviceB.installService = this.installService;
      this.$emit('getserviceBId', this.serviceB)
    }
  }
}

</script>

<style scoped>
.seervicePage{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap
}
.wrap{
  width: 4.4rem;
  height: 2.933333rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 0px 0px 10px #ccc;
  margin-bottom: .4rem;
  box-sizing: border-box;
  border-radius: .1rem;
  align-items: center;
  padding: .4rem 0;
}
.money{
  font-weight:600;
   color:#F4A31C;
}
.scale{
  font-weight:500;
  color:rgba(0,0,0,1);
  padding: 0 .2rem
}
.times{
  font-weight:500;
  color:rgba(153,153,153,1);
  text-align: center;
}
.active{
  background: #0BC5B1;
  color: #fff
}
.service{
  width: 4.4rem;
  height: 2.933333rem;
  box-shadow:0px 2px 8px 0px rgba(204,204,204,0.5);
  border-radius:5px;
  font-size:15px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  text-align: center;
  line-height:  2.933333rem;
}
.activeService{
  background:rgba(12,173,121,1);
  color: white
}
</style>
