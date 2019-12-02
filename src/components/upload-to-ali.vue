<template>
  <div class="upload-to-ali">
    <div
      class="upload-area"
      :class="{disabled: disabled}"
      @click="selectFile"
    >
      <!--@slot 自定义上传内容-->
      <slot>
        <!--默认内容，实现展示图片-->
        <!--自定义slot需要自己实现图片展示和进度-->
        <div class="upload-default-box">
          <div
            v-if="type === 'img' && fileUrl"
            class="upload-img-box"
          >
            <div class="img-mask">
              <span
                v-if="showDel"
                class="icon-del"
                @click.stop.prevent="delImg(fileUrl)"
              >X</span>
            </div>
            <img
              :src="fileUrl"
              class="upload-img"
            >
          </div>
          <div
            v-else
            class="upload-placeholder"
          >
            +
          </div>
        </div>
      </slot>
    </div>

    <input
      ref="uploadInput"
      type="file"
      class="upload-input"
      hidden
      :accept="accept"
      :multiple="multiple"
      @change="upload"
    >
  </div>
</template>

<script>
import AliOSS from 'ali-oss'
import ImageCompressor from 'image-compressor.js'
import encryptByAES from '@/minxins/encryptByAES'
const imageCompressor = new ImageCompressor()

export default {
  name: 'UploadToAli',
  mixins: [
    encryptByAES
  ],
  props: {
    /**
     * 存储空间的名字
     */
    bucket: {
      type: String,
      default: process.env.VUE_APP_OSS_BUCKET
    },
    /**
     * 根据 存储空间 所在的存储区域, 相应的上传域名
     */
    region: {
      type: String,
      default: process.env.VUE_APP_OSS_REGION
    },
    /**
     * 目录名, 一定要/结尾
     */
    dir: {
      type: String,
      default: process.env.VUE_APP_OSS_DIR
    },
    /**
     * 自定义域名, 该字段有值时, 返回的文件url拼接规则为: customDomain + / + dir + filename
     * 即不需要/结尾, 也不需要指定协议
     */
    customDomain: {
      type: String,
      default: process.env.VUE_APP_OSS_CUSTOM_DOMAIN
    },
    /**
     * 是否多选
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * 上传文件大小限制, 默认1MB, 参考GitHub上传头像设置
     * @link https://github.com/settings/profile
     */
    limit: {
      type: Number,
      default: 1024 * 1024
    },
    /**
     * 接受上传的文件类型, 多个值逗号分隔, 默认只接受图片
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept
     */
    accept: {
      type: String,
      default: 'image/*'
    },
    /**
     * 超时时间, 单位毫秒, 大于0才生效
     */
    timeout: {
      type: Number,
      default: 0
    },
    /**
     * 默认文件的路径
     */
    fileUrl: {
      type: String,
      default: ''
    },
    /**
     * 上传文件类型
     * 默认 img
     * 可选 file
     */
    type: {
      type: String,
      default: 'img'
    },
    /**
     * 是否禁用上传组件的鼠标事件，
     * 若为true，不能上传
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 是否展示删除图标
     * 默认为false，不展示
     */
    showDel: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      client: {},
      uploading: false,
      files: [],
      accessKeyId: '',
      accessKeySecret: ''
    }
  },
  mounted () {
    this.getOSS().then(res => {
      if (
        !this.region ||
        !this.bucket ||
        !this.accessKeyId ||
        !this.accessKeySecret
      ) {
        console.error(
          '必要参数不能为空: region bucket accessKeyId accessKeySecret'
        )
        return
      }

      this.newClient()
    })
  },
  methods: {
    async getOSS () {
      let { payload } = await this.$api.user.getOSS();
      this.accessKeyId = this.decryptByAES(payload.OSS_KEY);
      this.accessKeySecret = this.decryptByAES(payload.OSS_SECRET);
      
      return new Promise((resolve) => {
        resolve()
      })
    },
    newClient () {
      // https://help.aliyun.com/document_detail/32069.html?spm=a2c4g.11186623.6.801.LllSVA
      this.client = new AliOSS({
        region: this.region,
        bucket: this.bucket,
        // FIXME danger!
        accessKeyId: this.accessKeyId,
        accessKeySecret: this.accessKeySecret
      })
    },
    delImg (fileUrl) {
      /**
       * 删除图片操作
       * @event delImg
       */
      this.$emit('delete', fileUrl)
    },
    selectFile () {
      this.$refs.uploadInput.click()
    },
    async upload (e) {
      let files = e.target.files
      const reset = () => (e.target.value = '')

      if (!files.length) return

      this.uploading = true

      for (let i = 0; i < files.length; i++) {
        let file = files[i]
        let name = file.name;
        let key = '';

        this.$emit('uploading', name)

        file = await imageCompressor.compress(file, { maxWidth: 750 })

        // 文件名-时间戳 作为上传文件key
        let pos = name.lastIndexOf('.')
        let suffix = ''
        if (pos !== -1) {
          suffix = name.substring(pos)
        }

        key = `${name.substring(0, pos)}-${new Date().getTime()}${suffix}`

        const options = {
          //          progress: this.progress,
          partSize: 100 * 1024,
          meta: {
            year: 2018,
            people: 'test'
          }
        }

        await this.client
          .multipartUpload(this.dir + key, file, options)
          .then(res => {
            // 协议无关
            let filename = `${location.protocol}//`

            if (this.customDomain) { filename += `${this.customDomain}/${res.name}` } else {
              filename += `${this.bucket}.${this.region}.aliyuncs.com/${
                res.name
              }`
            }
            this.files.push(filename)
          })
          .catch(err => {
            reset()
            this.uploading = false

            // 捕获超时异常
            if (e.code === 'ConnectionTimeoutError') {
              this.$emit('timeout', '网络请求超时')
            }
            if (this.client.isCancel()) {
              this.$emit('cancel', '上传文件中断')
            } else {
              this.$emit('fail', '上传文件失败')
            }
          })

        this.newClient()
      }

      // 上传多张 返回 Array
      let result = this.files;
      result && this.$emit('load', result)

      reset()
      this.uploading = false
      this.files = []
    }
  }
}
</script>
<style>
.disabled {
  pointer-events: none;
}
.upload-default-box {
  overflow: hidden;
  width: 2.16rem;
  height: 2.16rem;
  color: #707070;
}
.upload-img-box {
  position: relative;
  width: 2.16rem;
  height: 2.16rem;
  background-color: #E8E8E8;
  border-radius: 0.267rem  /* 10/37.5 */;
}
.upload-img-box .img-mask {
  position: absolute;
  height: 100%;
  width: 100%;
}

.upload-img-box .icon-del {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.107rem  /* 4/37.5 */;
  font-size: 0.533rem  /* 20/37.5 */;
  color: red;
}
.upload-placeholder {
  width: 2.16rem;
  height: 2.16rem;
  line-height: 2.16rem;
  text-align: center;
  font-weight: 100;
  font-size: 1rem;
  background-color: #E8E8E8;
  border-radius: 0.267rem  /* 10/37.5 */;
}
.upload-img {
  width: 100%;
  display: block;
}
.upload-input {
  display: none;
}
.upload-area {
  cursor: pointer;
}
</style>
