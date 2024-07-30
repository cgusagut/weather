import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCityStore = defineStore('city', () => {
const getDefaultCity = () => {
  let city = ref("北京");
  let currentCity = localStorage.getItem("currentCity");
  if (currentCity) {
    city.value = currentCity;
  }
  return city;
}
const city = getDefaultCity();
function changeCity(val){
    city.value=val
     /*  设置缓存*/
     localStorage.setItem("currentCity", val);
}
  return { city,changeCity}
})
