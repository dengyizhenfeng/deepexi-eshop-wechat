import citylist from '@/assets/citylist'
export default {
  data() {
    return {
      sharePath: ''
    }
  },
  methods: {
    async shareRoute() {
      let shopId = this.$route.query.shopId;
      if (!shopId && !sessionStorage.getItem('shopId')) {
        return;
      }

      const { payload } = await this.$api.user.shopsScShopDto(shopId || sessionStorage.getItem('shopId'))
      if (payload.result === 'error') {
        this.$toast(payload.msg)
        return;
      }
      let provinceName = citylist.province_list[payload.cityCode];

      sessionStorage.setItem("tenantCode", payload.tenantCode)
      sessionStorage.setItem("shopId", payload.shopId)
      sessionStorage.setItem("cityCode", payload.cityCode)
      sessionStorage.setItem("cityName", provinceName.slice(0, provinceName.length - 1))
      sessionStorage.setItem("shopInfo", JSON.stringify({
        name: payload.name,
        detailAddress: payload.detailAddress
      }))
      return Promise.resolve(1)
    }
  }
}
