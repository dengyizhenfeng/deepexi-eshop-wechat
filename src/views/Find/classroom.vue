<template>
  <div class="classroom">
    <div v-if="!isShow">
      <section class="section-a">
        <div v-if="/.[png|jpeg|jpg]$/.test($route.query.url)" class="vedioView">
          <img :src="$route.query.url" style="width:100%">
        </div>
        <Vedio-com v-else :url="$route.query.url"/>
        <span class="ft-18 , txta">{{ detail.informationTitle }}</span>
        <div class="wrap">
          <div>
            <img src="@img/find/time.png" alt class="img">
            <span class="ft-12 , txtb">{{ $formatTime(detail.createdAt/1000) }}</span>
          </div>
          <div>
            <img src="@img/find/eye.png" alt class="imgb">
            <span class="ft-12 , txtb">{{ detail.pageView }}</span>
          </div>
        </div>
      </section>
      <section class="section-b">
        <p class="Tit , ft-18">内容介绍</p>
        <div>
          <div class="ft-15 , txt , content" v-html="detail.informationContent"/>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import VedioCom from "./vedioCom.vue";

export default {
  name: "Classroom",
  components: {
    VedioCom
  },
  data() {
    return {
      detail: {},
      isShow: true
    };
  },
  created() {
    this.getVedioDetail();
  },
  methods: {
    async getVedioDetail() {
      const data = await this.$api.find.getVedioDetail(
        this.$route.query.vedioId
      );
      this.detail = data.payload;
      this.isShow = false;
    }
  }
};
</script>

<style scoped>
.classroom {
  background: rgba(242, 242, 242, 1);
  height: 100%;
}

.section-a {
  background: #fff;
  margin-bottom: 0.4rem;
}
.section-b {
  background: #fff;
  width: 9.2rem;
  padding: 0 0.4rem;
  margin-bottom: 0.4rem;
}

.txta {
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  padding: 0 0.4rem;
  display: block;
  margin-top: 0.4rem;
}
.txtb {
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.img {
  height: 0.346667rem;
  width: 0.346667rem;
  margin-right: 0.2rem;
  margin-bottom: -0.05rem;
}
.imgb {
  height: 0.346667rem;
  width: 0.446667rem;
  margin-right: 0.2rem;
  margin-bottom: -0.05rem;
}
.wrap {
  width: 9.2rem;
  display: flex;
  justify-content: space-between;
  padding: 0 0.4rem;
  padding-bottom: 0.4rem;
}
.txt {
  text-indent: 0em;
  font-weight: 500;
  color: rgba(50, 50, 50, 1);
  line-height: 0.746667rem;
}

.txt-img {
  width: 9.2rem;
  height: 5.52rem;
  margin: 0.3rem 0;
}
.content >>> img {
  width: 100% !important;
  height: 5.52rem;
  display: block;
}
.Tit {
  padding-top: 0.58666rem;
  font-weight: bold;
}
</style>
