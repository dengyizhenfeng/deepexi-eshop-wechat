<template>
  <div class="upload-file">
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
              >+</span>
            </div>
            <img v-if="!isVideo" :src="fileUrl" class="upload-img">
            <video v-if="isVideo" :src="fileUrl" controls class="upload-img"/>
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
      name="file_upload"
      hidden
      :accept="accept"
      :multiple="multiple"
      @change="upload"
    >
  </div>
</template>

<script>
  export default {
    name: 'UploadToAli',
    props: {
      /**
       * 文件路径，返回接口是否需要加密。1：不加密，2：加密
       */
      enableEncrypt: {
        type: Number,
        default: 1
      },
      /**
       * 是否多选
       */
      multiple: {
        type: Boolean,
        default: false
      },
      /**
       * 上传文件大小限制, 默认10MB, 参考GitHub上传头像设置
       * @link https://github.com/settings/profile
       */
      limit: {
        type: Number,
        default: 1024 * 1024 * 10
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
    computed: {
      isVideo() {
        return this.judgeVideo(this.fileUrl)
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
    methods: {
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

        if (!files.length) return

        this.uploading = true

        this.uploadFile(e).then(res => {
          // 上传多张 返回 Array
          res && this.$emit('load', res)
          e.target.value = ''
          this.uploading = false
          this.files = []
        })
      },
      uploadFile (e) {
        let files = e.target.files

        return new Promise((resolve, reject) => {
          for (let i = 0; i < files.length; i++) {
            let file = files[i]
            let name = file.name;
            let formData = new FormData();
            let isVideo = this.judgeVideo(name)
            if (file.size > this.limit) {
              let msg = '图片大小限制10M以内'
              if (isVideo) {
                msg = '视频大小限制50M以内,支持mp4格式'
              }
              this.$emit('fail', msg)
              if (typeof files.splice == 'function') {
                files.splice(i, 1)
              }
              continue
            }

            this.$emit('uploading', name)
            formData.append('file_upload', file);

            this.$api.user.uploadImg({
              type: this.enableEncrypt,
              data: formData
            }).then(res => {
              if (res.payload) {
                let resourceUrl = res.payload

                this.files.push(resourceUrl)
              }
              if (i === files.length - 1) {
                resolve(this.files);
              }
            }).catch(err => {
              e.target.value = ''
              this.uploading = false
              this.$emit('fail', err.payload || '上传图片失败，请稍后重试')
            })
          }
        })
      },
      judgeVideo(fileUrl) {
        let start = fileUrl.lastIndexOf('.')
        let imgSup = fileUrl.slice(start + 1)
        let videoArr = ['mp4']
        let bool = videoArr.includes(imgSup)
        if (bool) {
          this.limit = 1024 * 1024 * 50
        }
        return bool
      }
    }
  }
</script>
<style>
  .disabled {
    pointer-events: none;
  }
  .upload-default-box {
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
    top: -.125rem;
    right: -.225rem;
    width: .45rem;
    height: .45rem;
    background: #999999;
    border-radius: 50%;
    color: #fff;
    font-size: .5rem;
    line-height: .46rem;
    transform: rotate(45deg);
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
  .disabled {
    pointer-events: none;
  }
</style>
