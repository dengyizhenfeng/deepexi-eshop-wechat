<template>
  <section class="my_comment">
    <van-cell-group>
      <p class="title">内容</p>
      <van-field v-model="message" type="textarea" placeholder="请输入留言" rows="5" autosize/>
      <p class="title2">上传照片</p>
      <div class="img_box">
        <img v-for="(item, index) in images" :key="index" :src="item">
        <upload-file
          :file-url="url"
          :multiple="true"
          @load="onUpLoadFile"
          @uploading="onUploading"
          @fail="onFail"
          @delete="onDelete($event, images)"
        >
          <img src="@img/find/new-pic.png">
        </upload-file>
      </div>
    </van-cell-group>
  </section>
</template>
<script>
import UploadFile from '@/components/upload-file'
import fileUploadMixin from '@/minxins/fileUploadMixin'

export default {
  name: 'MyComment',
  mixins: [fileUploadMixin],
  components: {
    UploadFile
  },
  data() {
    return {
      url: "",
      message: "",
      images: []
    };
  },
  methods: {
    onUpLoadFile(res) {
      this.images = this.images.concat(res);
    }
  }
};
</script>
<style lang="scss" scoped>
.my_comment {
  background: #fafafa;
  font-size: 0.3733rem;
  line-height: 0.5333rem;
  height: calc(100vh - 1.30666rem);
  padding: 0 0.4rem;
}
.title {
  color: rgba(0, 0, 0, 1);
}
.title2 {
  font-weight: 400;
  background: #fafafa;
  margin: 0;
  padding: 0.47rem 0;
  color: rgba(153, 153, 153, 1);
}
.img_box {
  display: flex;
  background: #fafafa;
  flex-wrap: wrap;
  img {
    width: 1.333rem;
    max-height: 1.333rem;
    margin-right: 0.35rem;
  }
}
/deep/ {
  .van-cell {
    background: #fff;
  }
  .upload-placeholder {
    width: 1.333rem;
    height: 1.333rem;
  }
}
</style>
