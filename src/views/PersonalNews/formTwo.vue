<template>
  <div class="formTwo">
    <section class="wrap">
      <div class="type">
        <span class="ft-14 , txta" style="flex:1;">车主使用证明类型</span>
        <span
          v-if="type === '-1'"
          class="ft-14 , txtb"
          @click="openSelect"
        >请选择类型</span>
        <span
          v-else
          class="ft-14 , txtb"
          @click="openSelect"
        >{{ type === '0' ? '身份证': '其他' }}</span>
        <van-icon name="arrow" class="arrowRight" />
      </div>
    </section>

    <section class="upload">
      <p class="ft-14 , txtc">
        <span>身份证明</span><span class="info">最多6张</span>
      </p>
      <div class="imgWrap">
        <div
          v-if="userImage.length === 0 || userImage.length < 6"
          class="item-cont upload-wrapper"
        >
          <upload-file
            :file-url="iurl"
            :multiple="true"
            :enable-encrypt="2"
            @load="onUpLoadFile($event)"
            @uploading="onUploading"
            @fail="onFail"
            @delete="onDelete($event, userImage)"
          />
        </div>
        <div
          v-if="userImage.length > 0 || userImage.length <= 6"
          class="uploadimg"
        >
          <div
            v-for="(item,index) in userImage"
            :key="index"
            class="item-cont upload-wrapper"
          >
            <upload-file
              :file-url="item"
              :multiple="true"
              :enable-encrypt="2"
              @load="onUpLoadFile($event)"
              @uploading="onUploading"
              @fail="onFail"
              @delete="onDelete($event, userImage)"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="wrap">
      <div class="type">
        <span class="ft-14 , txta">申请人身份</span>
        <van-radio-group
          v-model="identity"
          style="display:flex"
        >
          <van-radio
            name="0"
            class="ft-14"
            style="margin-right: .4rem"
            checked-color="#0BC5B1"
          >
            车主
          </van-radio>
          <van-radio
            name="1"
            class="ft-14"
            checked-color="#0BC5B1"
          >
            经办人
          </van-radio>
        </van-radio-group>
      </div>
    </section>
    <section class="wrap">
      <div class="type">
        <van-field
          v-model="username"
          input-align="right"
          label="车主姓名"
          placeholder="请输入您的姓名"
          @blur="onBlur"
        />
      </div>
    </section>
    <section class="wrap">
      <div class="type">
        <van-field
          v-model="phone"
          type="number"
          input-align="right"
          label="手机号码"
          placeholder="请输入手机号码"
          @blur="onBlur"
        />
      </div>
    </section>
    <section class="wrap">
      <div class="type">
        <van-field
          v-model="sms"
          type="number"
          clearable
          placeholder="请输入验证码"
          @blur="onBlur"
        >
          <van-button
            slot="button"
            size="small"
            type="primary"
            :style="{width: isSend ? '2rem' : '1rem'}"
            :disabled="disabled"
            @click="onJudgeSendSMS"
          >
            {{ isSend ? `已发送${second}s`:'发送' }}
          </van-button>
        </van-field>
      </div>
    </section>

    <section class="upload">
      <p class="ft-14 , txtc">
        <span>产权证明(可选)</span><span class="info">最多6张</span>
      </p>
      <div class="imgWrap">
        <div
          v-if="assetsImage.length === 0 || assetsImage.length < 6"
          class="item-cont upload-wrapper"
        >
          <upload-file
            :file-url="iurl"
            :multiple="true"
            :enable-encrypt="2"
            @load="onUpLoadAssets($event)"
            @uploading="onUploading"
            @fail="onFail"
            @delete="onDelete($event, assetsImage)"
          />
        </div>
        <div
          v-if="assetsImage.length > 0 || assetsImage.length <= 6"
          class="uploadimg"
        >
          <div
            v-for="(item,index) in assetsImage"
            :key="index"
            class="item-cont upload-wrapper"
          >
            <upload-file
              :file-url="item"
              :multiple="true"
              :enable-encrypt="2"
              @load="onUpLoadAssets($event, assetsImage)"
              @uploading="onUploading"
              @fail="onFail"
              @delete="onDelete($event, assetsImage)"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="upload">
      <p class="ft-14 , txtc">
        <span>物业证明(可选)</span><span class="info">最多6张</span>
      </p>
      <div class="imgWrap">
        <div
          v-if="propertyImage.length === 0 || propertyImage.length < 6"
          class="item-cont upload-wrapper"
        >
          <upload-file
            :file-url="iurl"
            :multiple="true"
            :enable-encrypt="2"
            @load="onUpLoadProperty($event)"
            @uploading="onUploading"
            @fail="onFail"
            @delete="onDelete($event, propertyImage)"
          />
        </div>
        <div
          v-if="propertyImage.length > 0 || propertyImage.length <= 6"
          class="uploadimg"
        >
          <div
            v-for="(item,index) in propertyImage"
            :key="index"
            class="item-cont upload-wrapper"
          >
            <upload-file
              :file-url="item"
              :multiple="true"
              :enable-encrypt="2"
              @load="onUpLoadProperty($event)"
              @uploading="onUploading"
              @fail="onFail"
              @delete="onDelete($event, propertyImage)"
            />
          </div>
        </div>
      </div>
    </section>

    <button
      class="next , btn"
      @click="next"
    >
      确定提交
    </button>

    <van-actionsheet
      v-model="showActionSheet"
      :actions="actions"
      @select="onSelect"
    />
  
    <verify-code :show-dialog="showDialog" @verifyCode="onSendSMS" @onCancel="onCancel"/>
  </div>
</template>

<script>
import { clearInterval } from 'timers'
import fileUploadMixin from '@/minxins/fileUploadMixin'
import encryptByAESMixin from '@/minxins/encryptByAES'
import UploadFile from '@/components/upload-file'
import VerifyCode from '@/components/verifyCode.vue'

export default {
  name: 'FormTwo',
  mixins: [fileUploadMixin, encryptByAESMixin],
  components: {
    UploadFile,
    VerifyCode
  },
  data () {
    return {
      identity: '0',
      username: '',
      phone: '',
      sms: '',
      remarks: '',
      checked: true,
      showActionSheet: false,
      disabled: true,
      actions: [
        {
          name: '身份证'
        },
        {
          name: '其他'
        }
      ],
      type: '-1',
      timer: null,
      second: 60,
      isSend: false,
      userImage: [],
      iurl: '',
      propertyImage: [],
      assetsImage: [],
      showDialog: false
    }
  },
  watch: {
    phone (newVal) {
      if (newVal.length === 11) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  },
  methods: {
    onBlur() {
      window.scroll(0, 0)
    },
    openSelect () {
      this.showActionSheet = true
    },
    onSelect (item) {
      this.showActionSheet = false
      this.type = item.name === '身份证' ? '0' : '1'
    },
    onUpLoadFile (file) {
      this.userImage = this.judgeLength(this.userImage.concat(file))
    },
    onUpLoadAssets (file) {
      this.assetsImage = this.judgeLength(this.assetsImage.concat(file))
    },
    onUpLoadProperty (file) {
      this.propertyImage = this.judgeLength(this.propertyImage.concat(file))
    },
    onJudgeSendSMS() {
      this.showDialog = true;
    },
    onCancel() {
      this.showDialog = false;
    },
    async onSendSMS (verifyCodeObj) {
      this.showDialog = false;
      if (!verifyCodeObj) {
        return;
      }
      
      this.isSend = true
      this.disabled = true
      const data = await this.$api.personalNews.getSms({
        phone: this.phone,
        ...verifyCodeObj
      })
      if (data.payload.result !== 'success') {
        this.$toast(data.payload.msg);
        this.disabled = false
        this.isSend = false
        return
      }
      this.timer = setInterval(() => {
        this.second--
        if (this.second === 0) {
          this.isSend = false
          this.disabled = false
          clearInterval()
          this.second = 60
        }
      }, 1000)
    },
    async next () {
      if (this.type === '-1') {
        this.$toast('请选择车主使用证明类型')
        return
      }
      if (this.userImage.length < 1) {
        this.$toast('请上传车主使用证明照片')
        return
      }
      if (this.username === '') {
        this.$toast('请填写用户名')
        return
      }
      if (this.phone === '') {
        this.$toast('请填写手机号码')
        return
      }
      if (this.sms === '') {
        this.$toast('请填写验证码')
        return
      }
      if (!this.checked) {
        this.$toast('请同意国网电动车试驾条款')
        return
      }
      this.$toast.loading({
        mask: true,
        message: '提交中...'
      })
      const data = await this.$api.personalNews.checkSms({
        phone: this.phone,
        code: this.sms
      })

      if (data.payload.result !== 'success') {
        this.$toast('验证码不正确')
        return
      }
      
      const obj = {
        ownerProveType: this.type,
        ownerProveUrl: this.getUrl(this.userImage),
        applicantType: this.identity,
        consName: this.username,
        mobile: this.phone,
        identificationUrl: this.getUrl(this.assetsImage),
        propertyProveUrl: this.getUrl(this.propertyImage)
      }
      this.$emit('next', obj)
      this.$toast.clear()
    },
    getUrl (arr) {
      let assetsUrl = ''
      if (arr.length === 0) {
        assetsUrl = ''
      } else if (arr.length === 1) {
        assetsUrl = this.encryptByAES(arr[0])
      } else if (arr.length > 1) {
        arr = arr.map(item => {
          return this.encryptByAES(item)
        });
        assetsUrl = arr.join(',')
      }
      return assetsUrl
    }
  }
}

</script>

<style scoped lang="less">
.formTwo{
  background:rgba(250,250,250,1);
  height: 100%;
  padding: 0 .4rem;
  padding-top: .4rem;
  box-sizing: border-box;
  margin-bottom: 1.867rem  /* 70/37.5 */;
}
.formTwo .van-cell{
  padding: 0;
  line-height: .373rem;
  font-size: .373rem;
}
.arrowRight{
  font-size: 0.373rem  /* 14/37.5 */;
  color: #999999;
}
.formTwo .van-button--small{
  background-color: #0BC5B1;
  border-color: #0BC5B1;
}
.wrap{
   box-shadow:0rem  /* 0/37.5 */ 0.027rem  /* 1/37.5 */ 0.213rem  /* 8/37.5 */ 0rem  /* 0/37.5 */ rgba(204,204,204,0.5);
   background: #fff;
   border-radius: .1rem;
}
.type{
  background: white;
  border-radius: 0.107rem  /* 4/37.5 */;
  margin-bottom: .4rem;
  display: flex;
  justify-content: space-between;
  padding:.4rem;
  box-sizing: border-box;
  line-height: .373333rem;
  align-items: center;
  position: relative;
}
.txtarea{
  height: 2.933333rem;
    margin-bottom: 2.4rem;
}
.txta{
// font-weight:bold;
color:rgba(54,51,71,1);
}
.txtb{
// font-weight:900;
}
.txtc{
// font-weight:bold;
color:rgba(54,51,71,1);
margin: 0;
display: flex;
align-items: center;
justify-content: space-between;
}
.txtc .info{
  font-size: .32rem;
  color: #656565;
}
.btn{
  position: fixed;
  bottom: 0;
  left: 0;
  width:100%;
}
.upload{
  height:100%;
  background:rgba(255,255,255,1);
  border-radius:0.267rem  /* 10/37.5 */;
   padding:.4rem;
   box-sizing: border-box;
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
    margin-bottom: 3rem;
}
.upload-wrapper {
  margin: 0.2666rem 0.2666rem 0.2666rem 0;
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

.imgWrap{
  display: flex;
  flex-wrap: wrap;
}
.uploadimg{
  display: flex;
  flex-wrap: wrap;
}

</style>
