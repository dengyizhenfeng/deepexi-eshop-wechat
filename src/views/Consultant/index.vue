<template>
  <div class="consultant">
    <div class="wraps">
      <div class="img">
        <img
          :src="consultantInfo.avatar"
          alt=""
          class="pic"
        >
      </div>
      <div class="wrap">
        <div class="txtwrap">
          <span class="txta">{{ consultantInfo.fullname }}</span>
          <span class="txtb">我的专属顾问</span>
          <span class="txtc">工号：{{ consultantInfo.usernumber }}</span>
          <button
            v-if="consultantInfo.id"
            class="btn"
            @click="goMessage"
          >
            留言
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import judgeLoginMinxin from '@/minxins/judgeLogin'

export default {
  mixins: [judgeLoginMinxin],
  data () {
    return {
      consultantInfo: {}
    }
  },
  created () {
    if (!this.hasLogin('findIndex')) {
      return
    }
    this.getConsultant()
  },
  methods: {
    goMessage () {
      this.$router.push({
        name: 'leaveMessage',
        query: {
          userId: this.consultantInfo.id
        }
      })
    },
    getConsultant () {
      this.$api.recommend.getConsultant().then(res => {
        this.consultantInfo = res.payload
        if (!this.consultantInfo.avatar) {
          this.consultantInfo.avatar = '@img/touxiang.png'
        }
      }).catch(err => {
        this.$toast(err.payload);
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .consultant{
    width: 100%;
    height: calc(100vh - 2.06667rem);
   background:rgba(249,250,250,1);
   position:relative
  }
  .wraps{
    position: relative;
    top: 20%
  }
  .img{
    position: absolute;
    left: 3.693333rem;
    top: -1.44rem
  }
  .pic{
    width: 2.88rem;
    height: 2.88rem;
    border-radius: 50%
  }
  .wrap{
    width: 8.56rem;
    height:9.653333rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 9px 0px rgba(204,204,204,0.5);
    margin: 0 auto;
    border-radius: .1rem;
  }
  .txtwrap{
    padding-top: 2rem
  }
  .txta{
    font-size:.586667rem;
    font-weight:bold;
    color:rgba(54,51,71,1);
    display: block;
    width: 100%;
    text-align: center;
     padding-bottom: .2rem
  }
  .txtb{
    font-size:.4rem;
    font-weight:500;
    color:rgba(153,153,153,1);
    display: block;
    width: 100%;
    text-align: center;
    padding-bottom: .6rem
  }
  .txtc{
    font-size:.4rem;
    font-weight:500;
    color:#0BC5B1;
    display: block;
    width:4.8rem;
    height:.693333rem;
    text-align: center;
    background:#EEF9F5;
    border-radius:13px;
    opacity:0.3464;
    margin: 0 auto;
     margin-bottom: 1rem
  }
  .btn{
    width:4.106667rem;
    height:1.12rem;
    background:#0BC5B1;
    box-shadow:0px 2px 7px 0px rgba(16,151,93,0.3);
    border-radius:.56rem;
    font-size:.48rem;
    font-weight:bold;
    line-height:.666667rem;
    border: none;
    letter-spacing: 2px;
    color: #fff;
    margin: 0 auto;
    display: block;
  }
</style>
