<template>
  <div class="orderDetail">
    <section v-if="!orderDetails.userName">
      <div class="txt">
        <span class="ft-15 , name">外观内饰</span>
        <span class="ft-15 , content">{{ orderDetails.styleColor0bj.styleColor }}</span>
      </div>
      <div v-if="orderDetails.serviceBObj.price" class="txts">
        <span class="ft-15 , name">充电桩</span>
        <span class="ft-15 , content">¥{{ $handleMoney(orderDetails.serviceBObj.price.toString()) }}</span>
        <span class="ft-15 , add">{{ orderDetails.serviceBObj.name }}</span>
      </div>
      <div v-if="orderDetails.serviceBObj.installService" class="txt">
        <span class="ft-15 , name">安装服务</span>
        <span class="ft-15 , content">需要安装服务</span>
      </div>
      <div v-if="orderDetails.serviceAObj.price" class="txts">
        <span class="ft-15 , name">充电服务套餐</span>
        <span class="ft-15 , content">¥{{ $handleMoney(orderDetails.serviceAObj.price.toString()) }}</span>
        <span class="ft-15 , add">{{ orderDetails.serviceAObj.value }}{{ orderDetails.serviceAObj.name }}{{ orderDetails.serviceAObj.times }}次</span>
      </div>
      <div v-if="orderDetails.serviceCObj.price" class="txts">
        <span class="ft-15 , name">金融方案</span>
        <span class="ft-15 , content">首付{{ orderDetails.serviceCObj.downPaymentRatio }} {{ orderDetails.serviceCObj.stagesNumber }} 利率{{ orderDetails.serviceCObj.propValues }}%</span>
        <span class="ft-15 , add">{{ orderDetails.serviceCObj.name }} 服务费¥{{ $handleMoney(orderDetails.serviceCObj.price .toString()) }}</span>
      </div>
      <div v-if="orderDetails.serviceDObj.price" class="txts">
        <span class="ft-15 , name">保险服务</span>
        <span class="ft-15 , content">¥{{ $handleMoney(orderDetails.serviceDObj.price.toString()) }}</span>
        <span class="ft-15 , add">{{ orderDetails.serviceDObj.name }}</span>
        <span class="ft-15 , add">{{ orderDetails.serviceDObj.info }}</span>
      </div>
      <div v-if="orderDetails.serviceEObj.bundlePrice" class="txts">
        <span class="ft-15 , name">验车上牌</span>
        <span class="ft-15 , content">¥{{ $handleMoney(orderDetails.serviceEObj.bundlePrice.toString()) }}</span>
        <span class="ft-15 , add">{{ orderDetails.serviceEObj.name }}</span>
      </div>
      <div v-if="orderDetails.serviceFObj.bundlePrice" class="txts">
        <span class="ft-15 , name">精品装饰</span>
        <span class="ft-15 , content">¥{{ $handleMoney(orderDetails.serviceFObj.bundlePrice.toString()) }}</span>
        <span class="ft-15 , add">{{ orderDetails.serviceFObj.name }}</span>
      </div>
    </section>
    
    <section v-else>
      <div class="txt">
        <span class="ft-15 , name">客户姓名</span>
        <span class="ft-15 , content">{{ orderDetails.userName }}</span>
      </div>
      <div class="txt">
        <span class="ft-15 , name">客户电话</span>
        <span class="ft-15 , content">{{ orderDetails.phoneNumber }}</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  components: {

  },
  props: {
    orderDetails: {
      default: () => ({}),
      type: Object
    }
  }
}

</script>

<style scoped>
.orderDetail{
  background: #fafafa;
  padding: 0 .4rem;
}
.txt{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-bottom: .16rem;
    background: #fff;
    padding:.4rem;
    border-radius: .1rem;
}
.txts{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: .16rem;
  background: #fff;
  padding: .4rem;
  border-radius: .1rem;
}
.name{
  width: 40%;
  display: block;
  font-weight:500;
  color:rgba(0,0,0,1);
}
.content{
   width: 60%;
  display: block;
  font-weight:500;
  color:rgba(102,102,102,1);
  text-align: right
}
.add{
  font-weight:400;
  color:rgba(153,153,153,1);
  margin-top: .24rem;
}
</style>
