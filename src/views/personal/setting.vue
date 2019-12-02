<template>
  <div class="setting">
    <upload-file
      :file-url="url"
      :multiple="false"
      
      @uploading="onUploading"
      @fail="onFail"
      @load="onUpLoadFile"
    >
      <div class="changeHead">
        <span>
          修改头像
        </span>
        <div v-if="loading" class="loading">
          <van-loading type="spinner" color="rgb(201, 201, 201)" size="20px"/>
        </div>
        <img v-if="!loading" :src="url ? url : '@img/touxiang.png'" alt="">
      </div>
    </upload-file>
    <router-link tag="div" to="/personal/changePassword">
      <span>修改密码</span>
      <img src="@/assets/image/consultant/right.png" alt="">
    </router-link>
    <p @click="loginOut">
      退出登录
    </p>
  </div>
</template>
<script>
import { removeAvatar, getConsultants, setAvatar, getAvatar } from '@/api/storage.js'
import uploadFile from '@/components/upload-file.vue';
export default {
    name: 'SETTING',
    components: {
      uploadFile: uploadFile
    },
    data() {
      return {
        url: JSON.parse(getAvatar()),
        id: JSON.parse(getConsultants()).id,
        loading: false
      };
    },
    mounted() {
      window.close();
    },
    methods: {
      onUpLoadFile(img) {
        this.upLoadImage(img[0]);
        removeAvatar();
        setAvatar(img[0])
      },
      onUploading(d) {
        this.loading = true;
      },
      async upLoadImage(img) {
        await this.$api.recommend.getupdateAvatar(
          {
            id: this.id,
            avatar: img
          }
        )
        .then(res => {
          this.loading = false;
          this.url = res.payload.avatar;
          if (img) this.$toast("修改成功");
        })
      },
      onFail(fail) {
        this.$toast('图片大小限制200k以内');
      },
      loginOut() {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定退出登录吗？',
          confirmButtonText: '退出'
        }).then(() => {
          this.$api.recommend.logoutUser(this.id).then(res => {
            removeAvatar('avatar');
            
            sessionStorage.removeItem('infoConsultant');
            // localStorage.removeItem('tenantCode')
            // localStorage.removeItem('shopId')
            // localStorage.removeItem('token')
            sessionStorage.setItem('loginOut', '2');
            removeAvatar('avatar');        
            this.$router.replace({
              name: 'consultantLogin'
            });
            // this.$router.push(`/personal/consultantLogin?redirect=/personal/consultantLogin`)
          })
        }).catch(() => {})
      }
    }
}
</script>
<style lang="less" scoped>
.setting {
   height: 100vh;
   background-color: #FAFAFA;
   padding: 14/37.5rem;
   box-sizing: border-box;
   .changeHead {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      padding: 12/37.5rem 10/37.5rem 12/37.5rem 18/37.5rem;
      border-radius: 10px;
      span {
          color: #050508;
          font-family: "平方";
          font-size: 14/37.5rem;

      }
      img {
          width: 40/37.5rem;
          height: 40/37.5rem;
          border-radius: 50%;
      }
      .loading {
          width: 40/37.5rem;
          height: 40/37.5rem;
          display: flex;
          align-items: center;
      }
   }
   div:nth-of-type(2) {
      display: flex;
      align-items: center;
      padding: 12/37.5rem 10/37.5rem 12/37.5rem 18/37.5rem;
      border-radius: 10px;
      margin-top: 7/37.5rem;
      background-color: #fff;
      justify-content: space-between;
      span {
          color: #050508;
          font-family: "平方";
          font-size: 14/37.5rem;
      }
      img {
          width: 8/37.5rem;
          height: 14/37.5rem;
          border-radius: 50%;
      }
   }
   p {
       width: 290/37.5rem;
       height: 49/37.5rem;
       text-align: center;
       color:#fff;
       line-height: 49/37.5rem;
       font-family: "平方";
       background-color: #0BC5B1;
       border-radius: 24.5px;
       margin: 20/37.5rem auto auto auto;
       font-size: 18/37.5rem;
   }
}
</style>
