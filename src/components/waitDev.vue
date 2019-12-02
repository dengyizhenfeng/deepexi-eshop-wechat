<template>
  <div class="waiDev">
    <section>
      <div class="img">
        <img
          src="@img/waitDev.png"
          alt=""
        >
        <span class="ft-18 , txt">敬请期待</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'WaiDev',
  components: {

  },
  data () {
    return {

    }
  },
  methods: {

  }
}

</script>

<style scoped>
.waiDev{
    transform: translate3d(-50%,-50%,0);
    position: absolute;
    top: 30%;
    left: 50%;
}
.img{
  width: 3.093333rem;
  height: 4.613333rem;
  margin: 0 auto;
}
img{
 width: 3.093333rem;
  height: 4.613333rem;
}
.txt{
  font-weight:bold;
color:rgba(54,51,71,1);
display: block;
width: 100%;
text-align: center;
margin-top: .4rem
}
</style>
