<template>
  <div class="page-wrapper">
    <div
      v-for="(item, index) in payArr"
      :key="index"
      class="pay-list"
    >
      <h3 class="item-title">
        {{ item.payType }}
      </h3>
      <div
        v-for="item2 in item.payList"
        :key="item2.title"
        class="item-cont"
      >
        <van-field
          v-if="item2.disabled"
          :disabled="item2.disabled"
          :label="item2.title"
          :value="item2.value"
        />
        <van-field
          v-else-if="item2.name === 'payBankName'"
          v-model="payBankName"
          clearable
          placeholder="请输入"
          :label="item2.title"
        />
        <van-field
          v-else-if="item2.name === 'bankNo'"
          v-model="bankNo"
          clearable
          placeholder="请输入"
          :label="item2.title"
        />
        <van-field
          v-else-if="item2.name === 'payOrderNo'"
          v-model="payOrderNo"
          clearable
          placeholder="请输入"
          :label="item2.title"
        />
      </div>
      <div
        v-if="index == 1"
        class="item-cont upload-wrapper"
      >
        <p class="upload-title">
          上传汇款凭证
        </p>
        <upload-file
          :file-url="payImage[0]"
          :enable-encrypt="2"
          @load="onUpLoadFile"
          @uploading="onUploading"
          @fail="onFail"
          @delete="onDelete($event, payImage)"
        />
      </div>
    </div>
    <div class="recommendCar-footer">
      <van-button
        size="large"
        class="next-btn"
        type="primary"
        style="background-color:#0BC5B1;"
        @click.native="handleSubmit"
      >
        确定提交
      </van-button>
    </div>
  </div>
</template>
<script>
import UploadFile from '@/components/upload-file'
import fileUploadMixin from '@/minxins/fileUploadMixin'
import encryptByAESMixin from '@/minxins/encryptByAES'

export default {
  name: 'Payment',
  mixins: [fileUploadMixin, encryptByAESMixin],
  components: {
    UploadFile
  },
  data () {
    return {
      chequeInfo: {},
      payBankName: '',
      bankNo: '',
      payOrderNo: '',
      payImage: []
    }
  },
  computed: {
    payArr () {
      if (this.chequeInfo) {
        return [{
          payType: '收款信息',
          payList: [
            {
              title: '银行名称',
              value: this.chequeInfo.bankName,
              disabled: true,
              name: 'receivBankName'
            }, {
              title: '银行账号',
              value: this.chequeInfo.bankNumber,
              disabled: true,
              name: 'receivBankNumber'
            }, {
              title: '账号名称',
              value: this.chequeInfo.numberName,
              disabled: true,
              name: 'receivCountName'
            }
          ]
        }, {
          payType: '用户汇款信息',
          payList: [
            {
              title: '银行名称',
              value: '',
              name: 'payBankName'
            }, {
              title: '付款账号',
              value: '',
              name: 'bankNo'
            }, {
              title: '流水号',
              value: '',
              name: 'payOrderNo'
            }
          ]
        }]
      } else {
        return []
      }
    }
  },
  created () {
    this.getChequeInfo().then(res => {
      this.chequeInfo = res.payload
    })
  },
  methods: {
    onUpLoadFile (file) {
      this.payImage = file
    },
    async getChequeInfo () {
      let res = await this.$api.user.getChequeInfo()
      return res
    },
    handleSubmit () {
      if (!this.validate()) {
        return
      }
      
      this.$api.user.addPayment({
        payBankName: this.payBankName,
        bankNo: this.bankNo,
        payOrderNo: this.payOrderNo,
        payImage: this.encryptByAES(this.payImage[0]),
        receivBankName: this.chequeInfo.bankName,
        receivBankNumber: this.chequeInfo.bankNumber,
        receivCountName: this.chequeInfo.numberName,
        tradeOrderId: this.$route.query.orderId
      }).then(res => {
        if (res.payload) {
          this.$toast('提交成功')
          this.$router.replace({
            name: 'orderDetail',
            query: {
              id: this.$route.query.orderId,
              orderType: this.$route.query.orderType
            }
          })
        } else {
          this.$toast('网络异常，请稍后重试')
        }
      })
    },
    validate () {
      let errorMsgArr = ['银行名称', '付款账号', '流水号', '上传汇款凭证']
      let eleArr = ['payBankName', 'bankNo', 'payOrderNo', 'payImage']
      let hasPass = eleArr.every((item, index) => {
        let errorMsg = ''
        if (index !== 3) {
          errorMsg = '请输入' + errorMsgArr[index]
        } else {
          errorMsg = '请' + errorMsgArr[index]
        }
        return this.validateItem(item, errorMsg)
      })
      if (!hasPass) {
        return false
      }
      return true
    },
    validateItem ($el, errorMsg, regex = /\S/ig) {
      if (!regex.test(this[$el])) {
        this.$toast(errorMsg)
        return false
      }
      return true
    }
  }
}
</script>
<style lang="less" scoped>
    .page-wrapper {
        padding: 0.693rem  /* 26/37.5 */ 0.4rem  /* 15/37.5 */ 2.133rem  /* 80/37.5 */;
        background-color: #FAFAFA;
        font-size: 0.373rem  /* 14/37.5 */;
        .pay-list {
            .item-title {
                margin: 0.693rem  /* 26/37.5 */ 0;
                padding-left: 0.347rem  /* 13/37.5 */;
                color: #363347;
                font-size: 0.48rem  /* 18/37.5 */;
                border-left: 0.107rem  /* 4/37.5 */ solid #0BC5B1;
                border-radius: 0.08rem  /* 3/37.5 */;
            }
            .item-cont {
                margin-bottom: 0.133rem  /* 5/37.5 */;
            }
            /deep/ .van-cell {
                border-radius: 0.267rem  /* 10/37.5 */;
            }
            /deep/ .van-field__control {
                text-align: right;
            }
            .upload-wrapper {
                padding: 0.4rem  /* 15/37.5 */ 0.267rem  /* 10/37.5 */;
                background-color: #ffffff;
                border-radius: 0.267rem  /* 10/37.5 */;
                .upload-title {
                    margin: 0 0 0.24rem  /* 9/37.5 */;
                    color: #323233;
                }
            }
            .upload-img {
                width: 2.16rem  /* 81/37.5 */;
              height: 2.16rem  /* 81/37.5 */;
              margin-left: 0.267rem  /* 10/37.5 */;
            }
        }
    }
</style>
