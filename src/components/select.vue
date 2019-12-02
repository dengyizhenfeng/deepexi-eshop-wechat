<template>
  <div>
    <div :class="$style.select">
      <section :class="$style.selectsort" class="ft-15 , head">
        <span
          :class="active === 0? 'active' : ''"
          style="margin-top:.4rem"
          @click="defaultSort"
        >默认排序</span>
        <span :class="active === 1? 'active' : ''" style="margin-top:.4rem" @click="pickBrand">品牌</span>
        <span :class="active === 2? 'active' : ''" style="margin-top:.4rem" @click="pickPrice">价格</span>
      </section>
      <section class="ft-15 , pick" :class="$style.picker">
        <span
          :class="active === 3? 'actives' : ''"
          style="margin-top:.34rem;margin-right:.2rem"
          @click="pickAll"
        >筛选</span>
        <van-icon name="more-o" :class="$style.more"/>
      </section>
    </div>
    <div style="margin-top:1.5rem">
      <section v-if="active === 1">
        <van-popup v-model="showBrand" position="top">
          <indexList :lists="barndList" style="margin-top:1.2rem" @getCarId="getCarId"/>
        </van-popup>
      </section>
      <section v-if="active === 2">
        <van-popup v-model="showPrice" position="top">
          <div style="margin-top:1.2rem">
            <picker class="picker" :price="price" @getPrice="getPrice"/>
            <section :class="$style.pickWrap">
              <p class="ft-15" :class="$style.pickTxt">自定义</p>
              <input v-model="lowSale" class="input" type="number" placeholder="最低价">
              <span class="line"/>
              <input v-model="highSale" class="input" type="number" placeholder="最高价">
              <span class="ft-15" :class="$style.pickTxt">元</span>
              <button class="btn-small" @click="salePick">确定</button>
            </section>
          </div>
        </van-popup>
      </section>
      <section v-if="active === 3">
        <van-popup v-model="showPick" position="top">
          <pickTags
            :tags="tags"
            style="margin:0 .4rem;margin-top:1.4rem;"
            @getTags="getTags"
            @getList="getList"
          />
        </van-popup>
      </section>
    </div>
  </div>
</template>

<script>
import picker from "@/components/picker.vue";
import pickTags from "@/components/pickTags.vue";
import indexList from "@/components/indexList.vue";
import letter from "@/assets/letter";

export default {
  name: "Select",
  components: {
    picker,
    pickTags,
    indexList
  },
  data() {
    return {
      barndList: [],
      active: 0,
      lowSale: null,
      highSale: null,
      letter,
      brandId: "",
      price: "",
      showBrand: false,
      showPrice: false,
      showPick: false,
      cyTags: [],
      tags: [
        {
          title: "价格",
          values: [
            "5万以下",
            "5万-10万",
            "10万-15万",
            "15万-20万",
            "20万-30万",
            "30万以上"
          ],
          active: ""
        },
        {
          title: "续航里程（公里）",
          values: ["100-200", "200-300", "300-400", "400以上"],
          active: ""
        },
        {
          title: "动力类型",
          values: ["纯电动", "插电式混合动力", "油电混动", "燃料电池"],
          active: ""
        }
      ]
    };
  },
  created() {
    this.getBrandList();
  },
  methods: {
    async getBrandList() {
      const data = await this.$api.recommend.getBrandList();
      const barndList = data.payload;
      this.barndList = this.fillterBrand(barndList, this.letter, "code");
    },
    defaultSort() {
      this.active = 0;
      this.$emit("defaultSort");
    },
    pickBrand() {
      this.active = 1;
      this.showBrand = true;
    },
    pickPrice() {
      this.active = 2;
      this.showPrice = true;
    },
    getTags(item) {
      this.tags = item;
    },
    pickAll() {
      this.active = 3;
      this.showPick = true;
    },
    getCarId(item) {
      this.showBrand = false;
      this.brandId = item;
      this.$emit("getBrandId", this.brandId);
    },
    getPrice(item) {
      this.showPrice = false;
      this.$emit("getPrice", item);
      this.lowSale = null;
      this.highSale = null;
    },
    getList(item) {
      this.$emit("getList", item);
      this.showPick = false;
    },
    salePick() {
      this.showPrice = false;
      this.price = this.highSale;
      this.$emit("getSelectPrice", this.lowSale + ":" + this.highSale);
    },
    fillterBrand(arr, lett, code) {
      let needArr = [];
      let letterArr = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < lett.length; j++) {
          let obj = {};
          let newArr = [];
          if (
            arr[i][code].startsWith(lett[j][0]) ||
            arr[i][code].startsWith(lett[j][1])
          ) {
            let letter = lett[j][0];
            if (!letterArr.includes(letter)) {
              letterArr.push(lett[j][0]);
              obj.title = lett[j][0];
              newArr.push(arr[i]);
              obj.value = newArr;
              needArr.push(obj);
            } else {
              needArr.forEach(item => {
                if (item.title === letter) {
                  item.value.push(arr[i])
                }
              })
            }
          }
        }
      }
      return needArr;
    }
  }
};
</script>

<style module lang="less">
.select {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #fff !important;
  position: fixed;
  right: 0;
  z-index: 3000;
  top: 0;
  height: 1.3rem;
  .selectsort {
    display: flex;
    justify-content: space-between;
    width: 4.333333rem;
    color: #676767;
    height: 0.666667rem;
    line-height: 0.856667rem;
  }
  .picker {
    display: none;
  }
  .more {
    margin-top: 0.45rem;
  }
}
.pickWrap {
  margin-left: 0.4rem;
  width: 9.2rem;
  display: flex;
  justify-content: space-around;
}
.pickTxt {
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-top: 0.09667rem;
}
</style>

<style lang="scss" scoped>
  /deep/ .wrap{
    display: flex;
    flex-wrap: wrap;
  }
.active {
  font-size: 0.48rem;
  color: #000;
  font-weight: 600;
  height: 0.666667rem;
  margin-top: 0.4rem;
  line-height: 0.666667rem;
  position: relative;
  top: 0.05rem;
}
.actives {
  font-size: 0.48rem;
  color: #000;
  position: relative;
  top: 0.07rem;
  font-weight: 600;
  height: 0.666667rem;
  line-height: 0.666667rem;
  margin-top: 0.3rem;
  & + .van-icon {
    position: relative;
    top: 0.07rem;
  }
}
.line {
  display: block;
  width: 0.933333rem;
  height: 1px;
  background: #bbb;
  margin-top: 0.333333rem;
}
.picker {
  margin-bottom: 0.4rem;
}
.brand {
  margin-top: 1.066667rem !important;
}
.head {
  margin-left: 0.4rem;
}
.pick {
  margin-right: 0.4rem;
}
</style>
