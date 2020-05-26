<template>
<div>
  <el-button style="margin: 50px 0;" @click="getShops">店を一覧取得</el-button>
  <el-button @click="changeCenter">センターを +10</el-button>
  <ul>
    <li @click="setShopInfo(s)" v-for="s in shops" :key="s.id">{{ s.name }}</li>
  </ul>
  <GmapMap
    :center="testPosi"
    :zoom="10"
    map-type-id="terrain"
    style="width: 600px; height: 600px"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m"
      :clickable="true"
      :draggable="false"
      @click="center=m.position"
    />
  </GmapMap>
</div>
</template>

<script>
const tokyo = {lat: 35.681167, lng: 139.767052}
export default {
  data() {
    return {
      markers: [
        tokyo,
      ],
      testPosi: tokyo,
      shops: []
    };
  },
  methods: {
    getShops(){
      this.$axios.$get('/api/', {
        params: {
          keyid: "cccd05138db6e13ac16bf8e63a21cd2d",
          name: "魚",
          pref: "PREF13"
        }
      }).then( res => {
        console.log(res)
        this.shops = res.rest
        // それぞれの店のマーカーを表示
        let newMarkersList = []
        res.rest.forEach(function(shop){
          newMarkersList.push({ lat: Number(shop.latitude), lng: Number(shop.longitude) })
        })
        this.markers = newMarkersList
        console.log(this.markers)
      }).catch( err => {
        console.log(err)
      })
    },
    setShopInfo(s){
      console.log(s)
      this.testPosi.lat = Number(s.latitude)
      this.testPosi.lng = Number(s.longitude)
    },
    changeCenter(){
      console.log('change!')
      this.testPosi.lat += 10
    },
  }
};
</script>