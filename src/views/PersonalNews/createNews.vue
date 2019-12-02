<template>
  <div class="createNews">
    <div class="formWrap">
      <section>
        <div class="wrap">
          <div class="type">
            <span class="ft-14 , txta">所在地区</span>
            <span
              class="ft-14 , txtb"
              @click="selctCity"
            >{{ currentCity === '' ? '请选择省市区' : currentCity }}</span>
          </div>
          <van-area
            v-if="isShow"
            :area-list="areaList"
            value="110101"
            style="margin-bottom: .4rem;margin-top:-.4rem"
            @confirm="getCity"
            @cancel="cancelEvent"
          />
        </div>
      </section>

      <section class="wrap">
        <div class="type , txtarea">
          <van-field
            v-model="address"
            label="详细地址"
            type="textarea"
            placeholder="请输入详细地址"
            rows="6"
            border
          />
        </div>
      </section>

      <section class="wrap">
        <div class="type arrow">
          <van-field
            v-model="deviceName"
            label="设备名称"
            input-align="right"
            placeholder="请填写设备名称"
            disabled
          />
          <van-icon name="arrow" class="arrowRight" />
        </div>
      </section>

      <section class="wrap">
        <div class="type arrow">
          <van-field
            v-model="deviceType"
            label="设备类型"
            input-align="right"
            placeholder="请填写设备类型"
            disabled
          />
          <van-icon name="arrow" class="arrowRight" />
        </div>
      </section>

      <section class="wrap">
        <div class="type">
          <van-field
            v-model="deviceModel"
            label="设备型号"
            input-align="right"
            placeholder="不需填写设备型号"
            disabled
          />
        </div>
      </section>

      <section class="wrap">
        <div class="type arrow">
          <van-field
            v-model="voltage"
            label="额定电压"
            input-align="right"
            placeholder="请填写额定电压"
          />
          <p class="word">
            V
          </p>
        </div>
      </section>

      <section class="wrap">
        <div class="type arrow">
          <van-field
            v-model="current"
            label="额定电流"
            input-align="right"
            placeholder="请填写额定电流"
          />
          <p class="word">
            A
          </p>
        </div>
      </section>

      <section class="wrap">
        <div class="type arrow">
          <van-field
            v-model="power"
            label="最大功率"
            input-align="right"
            placeholder="请填写最大功率"
          />
          <p class="word">
            W
          </p>
        </div>
      </section>

      <div class="tryDriving-cont-wrapper">
        <van-checkbox
          v-model="checked"
          checked-color="#07c160"
          class="checkbox-news"
          :label-disabled="true"
        >
          我已阅读并同意
          <span class="link" @click="handleChange('protocol1', '居民新装办理须知')">《居民新装办理须知》</span>、
          <span class="link" @click="handleChange('protocol2', '一证受理承诺书')">《一证受理承诺书》</span>、
          <span class="link" @click="handleChange('protocol3', '低压供用电合同')">《低压供用电合同》</span>
        </van-checkbox>
      </div>
    </div>

    <button
      class="next , btn"
      @click="next"
    >
      确定提交
    </button>

    <van-dialog
      v-model="showModel"
      :title="modelTitle"
    >
      <component :is="protocol"/>
    </van-dialog>
  </div>
</template>

<script>
import citylist from '@/assets/citylist.js'
import { setTimeout } from 'timers'
import protocol1 from './protocol-1'
import protocol2 from './protocol-2'
import protocol3 from './protocol-3'

export default {
  name: 'CreateNews',
  components: {
    protocol1,
    protocol2,
    protocol3
  },
  data () {
    return {
      webState: '',
      address: '',
      checked: false,
      areaList: citylist,
      isShow: false,
      currentCity: '',
      proCode: '',
      cityCode: '',
      countyCode: '',
      deviceName: '',
      deviceType: '交流充电桩',
      deviceModel: '',
      voltage: '',
      current: '',
      power: '',
      formObj: {},
      protocol: protocol1,
      modelTitle: '居民新装办理须知',
      showModel: false
    }
  },
  created () {
    this.deviceName = this.$store.state.fourstep.charging.name
    this.formObj = JSON.parse(this.$route.query.data)
  },
  methods: {
    handleChange (component, modelTitle) {
      this.protocol = component;
      this.showModel = true;
      this.modelTitle = modelTitle;
    },
    getCity (data) {
      this.isShow = false
      this.currentCity = ''
      data.map(item => {
        this.currentCity += item.name
      })
      this.formObj.proCode = data[0].code
      this.formObj.cityCode = data[1].code
      this.formObj.countyCode = data[2].code
    },
    cancelEvent () {
      this.isShow = false
    },
    selctCity () {
      this.isShow = true
    },
    async next () {
      if (this.currentCity === '') {
        this.$toast('请选择省市区')
        return
      }
      if (this.address === '') {
        this.$toast('请输入详细地址')
        return
      }
      if (this.voltage === '') {
        this.$toast('请输入额定电压')
        return
      }
      if (this.current === '') {
        this.$toast('请输入额定电流')
        return
      }
      if (this.power === '') {
        this.$toast('请输入最大功率')
        return
      }
      if (!this.checked) {
        this.$toast('请同意电动汽车充电桩用电协议')
        return
      }
      this.formObj.elecAddr = this.address
      this.formObj.itemName = this.deviceName
      this.formObj.typeCode = '016'
      this.formObj.rvCode = this.voltage
      this.formObj.rcCode = this.current
      this.formObj.maxPower = this.power
      this.formObj.modelCode = ''
      this.formObj.itemId = this.$store.state.fourstep.charging.id
      this.formObj.orderId = this.$store.state.fourstep.order
      this.$toast.loading({
        mask: true,
        message: '提交中...'
      })
      setTimeout(async () => {
        const data = await this.$api.personalNews.submitForm(this.formObj)
        this.$emit('next', data.payload)
        this.$toast.clear()
      }, 500)
    }
  }
}

</script>

<style lang="scss" scoped>
/deep/ {
  .van-picker-column__item {
    box-sizing: border-box;
  }
}
.checkbox-news {
  display: flex;
  padding: 0 0.533rem  /* 20/37.5 */;
  margin-top: 0.533rem  /* 20/37.5 */;
  font-size: 0.32rem  /* 12/37.5 */;
  /deep/ .van-checkbox__label {
    text-align: left;
  }
}
.link {
  color:#189AFF
}
.createNews{
  background:rgba(250,250,250,1);
  padding-top: .4rem;
  box-sizing: border-box;
}
.formWrap{
  padding-bottom: 1.867rem  /* 70/37.5 */;
}
.createNews .van-cell{
  padding: 0.133rem  /* 5/37.5 */ 0;
  line-height: .373rem;
  font-size: .373rem;
}
.createNews .van-cell::after{
  content: none;
}
.wrap{
   padding: 0 .4rem;
}
.type{
  background: white;
  border-radius: 0.107rem  /* 4/37.5 */;
  margin-bottom: .4rem;
  display: flex;
  justify-content: space-between;
  padding:.38rem;
  box-sizing: border-box;
  line-height: .373333rem;
  align-items: center;
  position: relative;
}
.type .arrowRight{
  font-size: 0.373rem  /* 14/37.5 */;
  color: #999999;
}
.type .word{
  margin: 0 0 0 0.133rem  /* 5/37.5 */;
  font-size: .373rem;
  font-weight: bold;
}
.txtarea{
  margin-bottom: .4rem;
}
.txtarea .van-cell{
  display: flex;
  flex-direction: column;
}
.txta{
  color:rgba(54,51,71,1);
  width: 2.4rem  /* 90/37.5 */;
}
.txtb{
  color:#999;
  flex: 1;
  text-align: end;
}
.txtc{
  display: block;
  height: 1.5rem;
  line-height: 1.5rem;
  font-weight:bold;
  color:rgba(54,51,71,1);
}
.btn{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%
}
.upload{
  width:9.2rem;
  height:3.933333rem;
  background:rgba(255,255,255,1);
  border-radius:0.267rem  /* 10/37.5 */;
   padding: 0 .4rem;
   box-sizing: border-box;
   margin-left: .4rem;
   margin-bottom: .4rem
}
.uploadWrap{
  width: 2.16rem;
  height: 2.16rem;
  background:rgba(232,232,232,1);
  border-radius:0.267rem  /* 10/37.5 */;

}
.icon{
  margin: .6rem
}
.tryDriving-cont-wrapper {
  text-align: center;
  font-size:0.373rem  /* 14/37.5 */;
  color: #999999;
  height: 2rem;
  line-height: 2rem
}
</style>
