<template>
  <div class="citySelect">
    <section>
      <mt-index-list class="all">
        <mt-index-section
          v-for="(item, index) in lists"
          :key="index"
          :index="item.title"
        >
          <div class="wrap">
            <div
              v-for="(child,indexs) in item.value"
              :key="indexs"
              @click.stop="getItems(child)"
            >
              <mt-cell
                class="item"
                :title="child.name"
                :class="child.id === carId ? 'active' : ''"
              />
            </div>
          </div>
        </mt-index-section>
      </mt-index-list>
    </section>
  </div>
</template>

<script>

export default {
  name: 'CitySelect',
  components: {

  },
  props: {
    lists: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      carId: ''
    }
  },
  methods: {
    getItems (item) {
      this.carId = item.id
      this.$emit('getCarId', item.id)
    }
  }
}

</script>

<style scoped>
.citySelect{
  margun-bottom: 1rem

}
.location{
  display: flex;
  flex-direction: column;
  height: 3.04rem;
  padding-left: .4rem;
  justify-content: space-around
}
.all{
  margin-bottom: 1.5rem
}
.txta{
  font-weight:500;
  color:rgba(101,101,101,1);
  margin-left: .2rem
}
.txtb{
  font-size: .586667rem;
  font-weight:bold;
  color:rgba(101,101,101,1);
}
.wrap{
  width: 100%;
  padding-top: .266667rem
}
.item{
  width: 2.666667rem;
  height: 1.066667rem;
  line-height: 1.066667rem;
  background:rgba(239,239,239,1);
  border-radius:5px;
  text-align: center;
  margin-bottom: .266667rem;
  margin-top: .266667rem;
  margin-left: .4rem;
  color:rgba(54,51,71,1);
}
.active{
  background:rgba(12,173,121,1);
  color: white;
}
</style>
