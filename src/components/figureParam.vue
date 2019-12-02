<template>
  <ul class="figure-list">
    <li v-for="(item, index) in figureParam" :key="index">
      <p class="figure-item-title">
        {{ item.name }}
      </p>
      <p class="figure-item-value">
        {{ item.value }}
      </p>
    </li>
  </ul>
</template>
<script>
    export default {
      props: {
        figureParam: {
          type: Array,
          default: () => {
            return [{
              name: '',
              value: ''
            }]
          }
        }
      }
    }
</script>
<style lang="less" scoped>
    .figure-list {
        display: flex;
        flex-wrap: wrap;
        & > li {
            width: 33.3%;
            margin-bottom: 0.64rem  /* 24/37.5 */;
            text-align: center;
            .figure-item-title {
                margin: 0 0 0.133rem  /* 5/37.5 */;
                font-size: 0.293rem  /* 11/37.5 */;
                color: #666666;
            }
            .figure-item-value {
                margin: 0;
                font-size: 0.4rem  /* 15/37.5 */;
                color: #050508;
            }
        }
    }
</style>
