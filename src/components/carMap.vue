<template>
  <div class="carMap">
    <baidu-map
      id="bd-map"
      class="map"
      :scroll-wheel-zoom="true"
      :center="mapCenter"
      :zoom="mapZoom"
      ak="f50fLPR5InIfVqjV1me3ChM3VBvLqynu"
      @ready="renderMap"
      @click="handleClickMap"
    >
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :show-address-bar="true"
        :auto-location="true"
        @locationSuccess="getLoctionSuccess"
      />
      <bm-navigation
        anchor="BMAP_ANCHOR_TOP_RIGHT"
      />
      <bm-overview-map
        anchor="BMAP_ANCHOR_TOP_LEFT"
        :is-open="true"
      />
      <bm-marker :position="mapCenter" />
    </baidu-map>
    <slot />
  </div>
</template>

<script>
import { BaiduMap, BmNavigation, BmMarker, BmGeolocation, BmOverviewMap } from 'vue-baidu-map'

export default {
  name: 'Map',
  components: {
    BaiduMap,
    BmNavigation,
    BmMarker,
    BmGeolocation,
    BmOverviewMap
  },
  data () {
    return {
      mapCenter: { lng: 116, lat: 39 },
      autoLocationPoint: { lng: 0, lat: 0 },
      mapZoom: 13,
      initLocation: false
    }
  },
  methods: {
    renderMap ({ BMap, map }) {
      let geolocation = new BMap.Geolocation()
      this.geolocation = geolocation
      this.getCurrentPosition()
    },
    getCurrentPosition () {
      this.geolocation.getCurrentPosition(r => {
        this.mapCenter = { lng: r.longitude, lat: r.latitude } // 设置center属性值
        this.autoLocationPoint = { lng: r.longitude, lat: r.latitude } // 自定义覆盖物
        this.initLocation = true
        this.address = r.address
      }, { enableHighAccuracy: true })
    },
    getLoctionSuccess (point, AddressComponent, marker) {
      this.mapCenter.lng = point.point.lng
      this.mapCenter.lat = point.point.lat
    },
    handleClickMap (e) {
      this.getCurrentPosition()
    }
  }
}

</script>

<style scoped>
.map {
  width: 100%;
  height: calc(100vh);
}

</style>
