<template>
  <div class="page-wrapper">
    <ul class="order-list">
      <li
        v-for="(item, index) in orderTypeArr"
        :key="index"
        :class="{'active': curIndex==index}"
        @click="curIndex = index"
      >
        {{ item }}
      </li>
    </ul>
    <ul class="cont-list">
      <li
        v-for="item in pileArr"
        :key="item.id"
        @click="handleNavigate(item.id)"
      >
        <image-wrapper
          :img-url="item.productPhoto"
          :img-height="160"
          class="img"
        />
        <p class="title">
          {{ item.itemName }}
        </p>
        <p class="item-bottom">
          <!--<span class="overplus">{{ item.overplus }}</span>-->
          <span class="price">¥ {{ $handleMoney(item.preferentialPrice.toString()) }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import imageWrapper from '@/components/imageWrapper.vue'

export default {
  components: {
    imageWrapper
  },
  data () {
    return {
      curIndex: 0,
      orderTypeArr: ['默认排序'],
      pileArr: [],
      orderSingStam: ''
    }
  },
  mounted() {
    this.getPileList();
    this.orderSingStam = this.$route.query.orderSingStam
  },
  methods: {
    handleNavigate(id) {
      this.$router.push({
        name: 'pileDetail',
        query: {
          id,
          orderSingStam: this.orderSingStam
        }
      })
    },
    getPileList() {
      this.$api.user.getPileList().then(res => {
        this.pileArr = res.payload;
      })
    }
  }
}
</script>
<style lang="less" scoped>
    .page-wrapper {
        padding: 0.64rem  /* 24/37.5 */ 0.4rem  /* 15/37.5 */;
        .order-list {
            display: flex;
            margin-bottom: 0.267rem  /* 10/37.5 */;
            color: #656565;
            font-size: 0.4rem  /* 15/37.5 */;
            & > li{
                width: 1.333rem  /* 50/37.5 */;
                height: 0.8rem  /* 30/37.5 */;
                line-height: 0.8rem  /* 30/37.5 */;
                &.active {
                    color: #000000;
                    font-size: 0.48rem  /* 18/37.5 */;
                }
                &:first-child {
                    width: 2.133rem  /* 80/37.5 */;
                }
            }
        }
        .cont-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            font-size: 0.4rem  /* 15/37.5 */;
            & > li {
                width: 4.453rem  /* 167/37.5 */;
                margin-bottom: 0.267rem  /* 10/37.5 */;
                box-shadow: 0 0.027rem  /* 1/37.5 */ 0.187rem  /* 7/37.5 */ 0 rgba(204,204,204,0.5);
                border-radius: 0.213rem  /* 8/37.5 */;
                .title {
                    margin-top: 0;
                    margin-bottom: 0.187rem  /* 7/37.5 */;
                    padding: 0 0.267rem  /* 10/37.5 */;
                    line-height: 1.5;
                }
                .item-bottom {
                    margin: 0;
                    padding: 0 0.267rem  /* 10/37.5 */ 0.267rem  /* 10/37.5 */;
                    .overplus {
                        color: #0CAD79;
                        font-size: 0.373rem  /* 14/37.5 */;
                    }
                    .price {
                        color: #F4A31C;
                    }
                }
            }
        }
    }
</style>
