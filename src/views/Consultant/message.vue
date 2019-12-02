<template>
  <div class="message ">
    <section class="wrap">
      <van-cell-group>
        <van-field
          ref="field"
          v-model="message"
          type="textarea"
          placeholder="请输入留言内容"
          rows="6"
          :autosize="{ maxHeight: 200, minHeight: 100 }"
        />
      </van-cell-group>
    </section>
    <button
      class="next , btn"
      @click="submit"
    >
      提交
    </button>
  </div>
</template>

<script>
export default {
  name: 'Message',
  components: {

  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    submit () {
      if (!this.message) {
        this.$toast('请输入留言内容')
        this.$refs.field.focus()
        return
      }

      this.createMessage().then(res => {
        this.$router.push({ name: 'messageFinish' })
      })
    },
    async createMessage () {
      let msg = await this.$api.recommend.createMessage(
        {
          message: this.message,
          userId: this.$route.query.userId
        }
      )
      return msg
    }
  }
}

</script>

<style scoped>
.message {
    width: 100%;
    height: calc(100vh - 1.3333rem);
   background:rgba(249,250,250,1);
}
.wrap{
  padding-top: .4rem;
}
.btn{
  position: fixed;
  bottom: 0;
}
</style>
