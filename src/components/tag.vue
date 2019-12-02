<template>
  <div>
    <section
      class="tag"
      @click="handleClick"
    >
      <img
        v-lazy="tag.img"
      >
      <p class="ft-12">
        {{ tag.content }}
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  components: {

  },
  props: {
    tag: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleClick () {
      this.$emit('eventClick')
    }
  }
}

</script>

<style scoped>
.tag{
  display: flex;
  flex-direction: column;
  align-items: center;
}
img{
  width:40px;
  height: 40px;
}
p{
  margin-bottom: 0;
  padding: 0;
  width: 100%;
  text-align: center;
  line-height: .32rem;
}
</style>
