<template>
  <div class="styleColor">
    <section
      v-for="(item,index) in styleColor"
      :key="index"
      class="wrap"
      :class=" styleId === item.id ? 'active' : ''"
      @click="getStyleId(item)"
    >
      <div
        class="left"
      >
        <p
          class="ft-15 , title"
          :style="{color: styleId === item.id ? 'white' : ''}"
        >
          外观颜色
        </p>
        <p
          class="ft-14 , color"
          :style="{color: styleId === item.id ? 'white' : ''}"
        >
          {{ item.outStyle }}
        </p>
      </div>
      <div class="line" />
      <div class="left">
        <p
          class="ft-15 , title"
          :style="{color: styleId === item.id ? 'white' : ''}"
        >
          内饰颜色
        </p>
        <p
          class="ft-14 , color"
          :style="{color: styleId === item.id ? 'white' : ''}"
        >
          {{ item.inStyle }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'StyleColor',
  components: {

  },
  props: {
    styleColor: {
      type: Array,
      default: () => []
    },
    styleColorId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      styleId: ''
    }
  },
  created () {
    this.styleId = this.styleColorId === '' ? '' : this.styleColorId
    if (this.styleId !== '') {
      this.$emit('getStyleId', this.styleColor.filter(item => item.id === this.styleColorId)[0])
    }
  },
  methods: {
    getStyleId (item) {
      this.styleId = item.id
      this.$emit('getStyleId', item)
    }
  }
}

</script>

<style scoped>
.styleColor{
  display: flex;
  flex-direction: column;
  justify-content: space-between
}
.wrap{
  width: 9.2rem;
  height: 2.133333rem;
  display: flex;
  box-shadow: 0px 0px 10px #ccc;
  margin-bottom: .4rem;
  border-radius: .1rem;
  position:relative;
  align-items: center;
}
.left{
  margin-left: .4rem
}
.left:nth-last-of-type(2){
  margin: 0;
}
.title{
  font-weight:600;
  color:rgba(0,0,0,1);
}
.color {
  font-weight:500;
  color:rgba(152,152,152,1);
}
.img{
    right: .4rem;
    top: .7rem;
    position: absolute;
}
.line{
  width: 1px;
  height: 80%;
  background: #E4E4E4;
  margin: 0 1.54rem;
}
img{
  height: .586667rem;
}
.active{
  background: #0BC5B1;
  color: #fff
}
</style>
