<template>
  <section class="enjoy">
    <div v-show="show">
      <div class="post_comment" @click.stop="goJudge">
        <img src="@img/find/post-comment.png">
      </div>
      <div v-for="(item, index) in listGroup" :key="index" class="list_item">
        <div class="just_between">
          <span class="flex_start">
            <img :src="item.url" class="user_pic">
            <span class="user_name">陈凤年</span>
          </span>
          <span class="flex_start">
            <img src="@img/find/green.png" class="thumb">
            <img src="@img/find/green_thumb.png" class="thumb">
            <em class="thumb_text">12</em>
          </span>
        </div>
        <div class="question">
          <span>A级销量担当卡罗拉推出插电版，可谓是3月份最具话题性的车型之一。本期的小白课堂就通过介绍3款车，聊聊混动车型都有哪些？</span>
          <div class="flex_center">
            <div class="snap_pic_box">
              <img src="1.png" class="snap_pic">
            </div>
            <div class="snap_pic_box">
              <img src="1.png" class="snap_pic">
            </div>
            <div class="snap_pic_box">
              <img src="1.png" class="snap_pic">
            </div>
            <div class="snap_pic_box">
              <img src="1.png" class="snap_pic">
            </div>
          </div>
        </div>
        <p class="middle_info just_between">
          <span>今天 14:23</span>
          <img src="@img/find/by-group.png" class="by_group">
        </p>
        <div class="comments">
          <p>李纯罡：很期待哦！</p>
          <div class="comment_sum">共12条评论 点击查看</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Enjoy",
  components: {},
  data() {
    return {
      listGroup: [],
      show: false
    };
  },
  methods: {
    goJudge() {
      this.$router.push({
        name: "myComment"
      });
    },
    async getData() {
      // 首页 0 推荐 1 资讯· 2 课堂 3
      const { payload } = await this.$api.find.getSwitch({
        programa: "0",
        size: 3
      });
      this.listGroup = payload.content;
      this.show = true;
    }
  },
  created() {
    this.getData();
  },
  activated() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
.enjoy {
  height: calc(100vh - 1.30666rem);
  padding: 0 0.4rem;
  top: 1.867rem;
  position: absolute;
  left: 0;
  right: 0;
}
.post_comment {
  position: fixed;
  top: 80%;
  width: 1.33333rem;
  height: 1.33333rem;
  background: rgba(11, 197, 177, 1);
  box-shadow: 0px 2px 4px 0px rgba(162, 228, 221, 1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  right: 0.4rem;
  justify-content: center;
  img {
    height: 0.48rem;
    width: 0.48rem;
  }
}
.list_item {
  margin: 0.53333rem 0;
}
.flex_start {
  display: flex;
  align-items: flex-start;
}
.user_pic {
  width: 0.53333rem;
  height: 0.53333rem;
  border-radius: 50%;
  margin-right: 0.26rem;
}
.user_name {
  font-size: 0.3733rem;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 0.53333rem;
}
.thumb {
  width: 0.37333rem;
  height: 0.37333rem;
  margin-right: 0.26rem;
}
.thumb_text {
  font-size: 0.34666rem;
  color: rgba(101, 101, 101, 1);
  line-height: 0.48rem;
  font-style: normal;
}
.question {
  font-size: 0.4rem;
  margin-top: 0.2966rem;
  color: rgba(5, 5, 8, 1);
  line-height: 0.61333rem;
}
.just_between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex_center {
  display: flex;
  justify-content: space-between;
  padding: 0.26666rem 0.49333rem 0;
  flex-wrap: wrap;
}
.snap_pic_box {
  width: 33.333%;
  height: 2.4rem;
  margin-bottom: 0.26666rem;
}
.snap_pic {
  width: 2.4rem;
  height: 100%;
}
.comments {
  min-height: 1.84rem;
  box-sizing: border-box;
  padding: 0.3466rem 0.333rem;
  background: rgba(239, 240, 239, 1);
  border-radius: 0.13333rem;
  p {
    margin: 0;
    font-size: 0.37333rem;
    color: rgba(5, 5, 8, 1);
    line-height: 0.53333rem;
  }
  .comment_sum {
    font-size: 0.29333rem;
    margin-top: 0.283rem;
    color: rgba(11, 197, 177, 1);
    line-height: 0.4266rem;
  }
}
.middle_info {
  font-size: 0.3033rem;
  color: rgba(153, 153, 153, 1);
  line-height: 0.4533rem;
  margin: 0;
  margin-bottom: 0.3033rem;
}
.by_group {
  width: 0.6933rem;
  height: 0.3736rem;
}
</style>
