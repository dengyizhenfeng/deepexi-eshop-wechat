<template>
  <div class="carConfigurex">
    <ul class="list van-clearfix">
      <li
        v-for="(item, index) in configureParams"
        :key="index"
      >
        <h6
          class="configure-name"
        >
          {{ item.name }}
        </h6>
        <p
          class="configure-value"
        >
          {{ item.value }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CarConfigurex',
  components: {

  },
  props: {
    configureParams: {
      default: () => [],
      type: Array
    }
  },
  data () {
    return {

    }
  },
  computed: {},
  methods: {

  }
}

</script>

<style  lang="less" scoped>
.carConfigurex{
  // padding: 0 .4rem
}
.list{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between
}
.list li{
    width: 33%;
    &:nth-child(3n + 1) {
      text-align: left;
    }
  &:nth-child(3n + 2) {
    text-align: center;
  }
  &:nth-child(3n + 3) {
    text-align: right;
  }
    .configure-name {
      margin: 0;
      color: #989898;
      font-size: 0.373rem  /* 14/37.5 */;
    }
    .configure-value {
      margin-top: 0.267rem  /* 10/37.5 */;
      margin-bottom: 0.587rem  /* 22/37.5 */;
      font-size: 0.4rem  /* 15/37.5 */;
    }
  }

</style>
