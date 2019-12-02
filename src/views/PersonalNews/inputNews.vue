<template>
  <div class="inputNews">
    <form-two @next="next" />
  </div>
</template>

<script>
import FormTwo from './formTwo.vue'

export default {
  name: 'InputNews',
  components: {
    FormTwo
  },
  data () {
    return {

    }
  },
  methods: {
    next (item) {
      this.$router.push({ name: 'InputCreateIndex', query: { data: JSON.stringify(item) } })
    }
  }
}

</script>

<style scoped>
.inputNews{}
</style>
