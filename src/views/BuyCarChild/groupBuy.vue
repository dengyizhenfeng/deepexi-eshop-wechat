<template>
  <div class="page-wrapper">
    <div v-if="!isShow">
      <ImageW
        :img-url="detail.activityUrl"
        :img-height="225"
      />
      <div class="page-top">
        <h2 class="car-name">
          {{ detail.activityName }}
          <img src="@/assets/image/consultant/share.png" class="share-icon" @click="onShowPromptPage">
        </h2>
        <p class="car-desc">
          {{ detail.activityDescription }}
        </p>
        <p class="number-wrapper">
          <span class="time">
            <img src="@img/time.png">
            {{ $formatTime(detail.activityStartTime/1000) }}
          </span>
          <span class="number"><img src="@img/number.png"> {{ detail.views }}</span>
        </p>
      </div>
      <div
        class="order-cont , ft-15"
        v-html="detail.activityExplainUrl"
      >
        <h6 class="cont-desc">
          团购说明
        </h6>
        <img
          class="cont-img"
          src="@img/groupBuy/car.png"
        >
      </div>
      <div class="recommendCar-footer">
        <van-button
          v-if="!false"
          size="large"
          class="next-btn"
          type="primary"
          @click="goEnroll()"
        >
          加入团购
        </van-button>
      </div>
    </div>
  
    <transition name="fade">
      <article v-show="showPromptPage" class="share-page" @click="onShowPromptPage">
        <img src="@/assets/image/consultant/share-groupbuy.png" >
      </article>
    </transition>
  </div>
</template>
<script>
import ImageW from '@/components/imageWrapper.vue'
import shareRouteMixin from "@/minxins/shareRoute";

export default {
  mixins: [shareRouteMixin],
  components: {
    ImageW
  },
  data () {
    return {
      detail: {},
      isShow: true,
      showPromptPage: false
    }
  },
  async created () {
    await this.shareRoute();
    this.getGroupDetail()
  },
  methods: {
    async getGroupDetail () {
      let groupId = this.$route.query.groupId;
      const data = await this.$api.find.getGroupDetail(groupId)
      this.detail = data.payload
      this.isShow = false

      let shareOptions = {
        title: `"${this.detail.activityName}"活动分享`, // 分享标题
        desc: `您的好友 ${localStorage.nickName} 邀请您一起购车`, // 分享描述
        link: location.href
      }
      this.wxShare(shareOptions);
    },
    onShowPromptPage() {
      this.showPromptPage = !this.showPromptPage;
    },
    goEnroll() {
      // 前往团购报名
      let tmp = { ...this.detail };
      delete tmp.activityExplainUrl;
      this.$router.push({
        name: 'enroll',
        query: {
          carItem: JSON.stringify(tmp)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
    .page-wrapper {
        margin-bottom: 60px;
      .share-page {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 100;
        background:rgba(0,0,0,0.45);
        text-align: right;
        & > img {
          height: 6.72rem  /* 252/37.5 */;
        }
      }
    }
    .page-top {
        padding: 0.4rem  /* 15/37.5 */;
        .car-name {
            position: relative;
            margin-top: 0;
            margin-bottom: 0.267rem  /* 10/37.5 */;
            padding-right: 0.533rem;
            font-size: 0.48rem  /* 18/37.5 */;
            display: flex;
            align-items: center;
            line-height: .48rem;
            justify-content: space-between;
            .share-icon {
              position: absolute;
              right: 0;
              top: 0;
              width: 0.4rem  /* 15/37.5 */;
            }
        }
        .car-desc {
            margin: 0;
            font-size: 0.347rem  /* 13/37.5 */;
            color: #999999;
        }
        .number-wrapper {
            margin-top: 10px;
            margin-bottom: 0;
            font-size: 12px;
            line-height: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .time {
                color: #999999;
                & > img {
                    width: 13px;
                    vertical-align: bottom;
                }
            }
            .number {
                color: #989898;
                & > img {
                    width: 15px;
                    position: relative;
                    top: 1px;
                }
            }
        }
    }
    .order-cont {
        padding: 20px 15px;
        border-top: 5px solid #FAFAFA;
        .cont-desc {
            color: #363347;
            font-size: 18px;
            margin-top: 0;
            margin-bottom: 16px;
        }
        .cont-img {
            width: 100%;
        }
    }
</style>

<style scoped>
  .order-cont >>> img {
           width: 100% !important;
          height: 5.52rem;
          display: block
        }
</style>
