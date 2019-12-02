<template>
  <div class="personalNews">
    <form-one
      @next="next"
    />
  </div>
</template>

<script>
import FormOne from './formOne.vue'

export default {
  name: 'PersonalNwws',
  components: {
    FormOne
  },
  data () {
    return {

    }
  },
  methods: {
    next () {
      this.$router.push({ name: 'InputExcelIndex' })
    }
  }
}

</script>

<style scoped>
.personalNews{}
</style>
