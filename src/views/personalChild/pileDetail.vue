<template>
  <div v-if="pileDetail.eo" class="page-wrapper">
    <ImageW :img-url="pileDetail.eo.productPhoto" />
    <section class="border-bottom section-padding page-top">
      <div class="top-cont">
        <h6 class="pile-name">
          {{ pileDetail.eo.name }}
        </h6>
        <div class="pile-param">
          <span>¥ {{ $handleMoney(pileDetail.preferentialPrice.toString()) }}</span>
          <span>型号：{{ pileModel }}</span>
        </div>
      </div>
      <figure class="top-img-wrapper" @click="handleNavigate('consultantIndex')">
        <img src="@img/tabbar/cs.png">
        <figcaption>顾问</figcaption>
      </figure>
    </section>
    <section class="border-bottom section-padding no-padding-bottom">
      <h5 class="title">
        配置
      </h5>
      <figure-param :figure-param="pileDetail.basePropList" />
    </section>
    <section class="section-padding">
      <h5 class="title">
        商品信息
      </h5>
      <div>
        <ImageW :img-url="pileDetail.eo.productPhoto" />
      </div>
    </section>
    <button
      class="next , btn fixed-bottom"
      @click="handleSubmit"
    >
      立即购买
    </button>
  </div>
</template>
<script>
    import ImageW from '@/components/imageWrapper';
    import figureParam from '@/components/figureParam';

    export default {
      components: {
        ImageW,
        figureParam
      },
      data() {
        return {
          pileDetail: {},
          pileModel: ''
        }
      },
      mounted() {
        this.getPileDetail();
      },
      methods: {
        async handleSubmit() {
          this.$toast.loading({
            mask: true,
            message: '生成订单中...'
          });
          
          let orderState = await this.submitOrder();
          if (orderState['order-2']) {
            let { eo } = this.pileDetail;
            this.$router.push({
              name: 'payOrderCommon',
              query: {
                orderDetail: JSON.stringify({
                  payOrderId: orderState['order-2'],
                  productPhoto: eo.productPhoto,
                  name: eo.name,
                  prompt: '总金额',
                  depositPercent: this.pileDetail.preferentialPrice,
                  navigatePage: {
                    name: 'buyProgressFinish',
                    query: {
                      finishMsg: '电桩购买完成'
                    }
                  }
                })
              }
            })
          } else {
            this.$toast('网络异常，请稍后重试');
          }

          this.$toast.clear()
        },
        submitOrder() {
          const orderSingStam = this.$route.query.orderSingStam
          return new Promise((resolve, reject) => {
            this.$api.fourStep.submitOrder(
              {
                'orderSingStam': orderSingStam,
                'giftFlag': false,
                'remark': '3',
                'isReplace': false,
                'isDeposit': true,
                'orderType': 'NEW_VEHICLE_PILE_TYPE',
                'skuAndQtyList': [
                  {
                    'productType': 'PILE',
                    'skuId': this.pileDetail.skuList[0].skuId,
                    'quantity': 1
                  }
                ],
                'audit': true
              }
            ).then(res => {
              resolve(res.payload)
            })
          })
        },
        handleNavigate(page) {
          this.$router.push({
            name: page
          })
        },
        getPileDetail() {
          this.$api.recommend.getCarDetail({
            id: this.$route.query.id
          }).then(res => {
            this.pileDetail = res.payload;
            this.pileDetail.basePropList.forEach((item, index) => {
              if (item.name === '型号') {
                this.pileModel = item.value;
                this.pileDetail.basePropList.splice(index, 1);
              }
            });
          })
        }
      }
    }
</script>
<style lang="less" scoped>
    .page-wrapper {
        padding-bottom: 1.6rem  /* 60/37.5 */;
    }
    .title {
        margin-bottom: 0.373rem  /* 14/37.5 */;
        margin-top: 0;
        font-size: 0.48rem  /* 18/37.5 */;
        color: #050508;
    }
    .page-top {
        display: flex;
        align-items: center;
        .top-cont {
            flex: 1;
            .pile-name {
                margin-bottom: 0.427rem  /* 16/37.5 */;
                margin-top: 0;
                font-size: 0.48rem  /* 18/37.5 */;
                color: #050508;
            }
            .pile-param {
                & > span {
                    &:first-child {
                        font-size: 0.48rem  /* 18/37.5 */;
                        color: #F4A31C;
                    }
                    &:last-child {
                        padding: 0.133rem  /* 5/37.5 */ 0.267rem  /* 10/37.5 */;
                        margin-left: 0.48rem  /* 18/37.5 */;
                        font-size: 0.347rem  /* 13/37.5 */;
                        color: #0BC5B1;
                        background-color: #EEF9F5;
                        border-radius:0.107rem  /* 4/37.5 */;
                    }
                }
            }
        }
        .top-img-wrapper {
            width: 1.36rem  /* 51/37.5 */;
            margin: 0;
            text-align: center;
            border-left: 0.027rem  /* 1/37.5 */ solid #E5E5E5;
            & > img {
                width: 0.507rem  /* 19/37.5 */;
            }
            & > figcaption {
                font-size: 0.267rem  /* 10/37.5 */;
                color: #666666;
            }
        }
    }

</style>
