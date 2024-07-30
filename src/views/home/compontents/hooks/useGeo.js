import { setAreaStyle } from "@/ol-utils/index.js"
import { getLocationByCityHttp, getWeatherMapHttp } from "@/request/index.js"
import { useCityStore } from "@/stores/city"
import { ref } from "vue"
export const useGeo=async({
    map,
    
})=>{
    let weather=ref()
    let $store=useCityStore()
    const currentCity = $store.city
   
    //加载geo
        let res = await getLocationByCityHttp(currentCity + "市")
        let { adcode, location } = res.geocodes[0]
        let center = location.split(",")
        
        map.getView().animate({
            center,
            zoom: 8,
            duration: 2000
        })
        let url = `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`;
        const layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                url,
                format: new ol.format.GeoJSON()
            }),
            style: setAreaStyle({})
        })
        map.addLayer(layer); 
        getWeatherMapHttp(currentCity + "市").then(res => {
      weather.value = res.lives[0]
    })
    
    return {weather}
}