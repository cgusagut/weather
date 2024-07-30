<template>
    <div id="map">

    </div>
</template>

<script setup>
import {ref,onMounted} from "vue";
import { app } from "@/main";
const gaode = new ol.layer.Tile({
  title: "高德地图",
  source: new ol.source.XYZ({
    url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
    wrapX: false,
  }),
});
onMounted(()=>{
    const map = new ol.Map({
    target: "map",
    layers: [gaode],
    view: new ol.View({
      center: [114.3, 30.5],
      zoom: 4,
      projection: "EPSG:4326",
    }),
  });
  //把map挂载到全图上
  app.config.globalProperties.$map=map
})

</script>

<style  scoped>
#map{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>