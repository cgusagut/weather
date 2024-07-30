<template>
    <!-- 引入组件才可以使用全局$map -->
    <Open-Map></Open-Map>
    <div class="nav">
        <div class="location" @click="goCity()">
            {{ $store.city }}
            <i class="iconfont icon-weizhi"></i>
        </div>
        <div class="search">
            <i  class="iconfont icon-sousuo"></i>
            <input 
            type="text" 
            placeholder="请输入你所在的城市" 
            @keyup.enter="searchCityWeath()" 
            v-model="searchCity"
            >
        </div>
        <div class="weather">
            <table>
                <tr>
                    <td>城市</td>
                    <td>{{ currentWeather.city }}</td>
                </tr>
                <tr>
                    <td>天气</td>
                    <td>{{ currentWeather.weather }}</td>
                </tr>
                <tr>
                    <td>温度</td>
                    <td>{{ currentWeather.temperature }}</td>
                </tr>
                <tr>
                    <td>风向</td>
                    <td>{{ currentWeather.winddirection }}</td>
                </tr>
                <tr>
                    <td>风力</td>
                    <td>{{ currentWeather.windpower }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance,watch } from "vue"
import { useRouter } from "vue-router"
import OpenMap from "./OpenMap.vue";
import { getLocationByCityHttp, getWeatherMapHttp } from "@/request/index.js"
import { useCityStore } from "@/stores/city"
import {useGeo} from "@/views/home/compontents/hooks/useGeo.js"
let $store = useCityStore()
let $router = useRouter()
let currentWeather = ref([])
let searchCity = $store.city
let $map = null
onMounted(async () => {
    const { proxy } = getCurrentInstance()
    $map = proxy.$map
    let {weather}=await useGeo({
        map:$map, 
    })
watch(weather,(val)=>{
    currentWeather.value=val
})
})
//跳转到城市界面
function goCity() {
    $router.push("/city")
}
//点击回车搜索天气
const searchCityWeath=async()=> {
    $store.changeCity(searchCity)
    let {weather}=await useGeo({
        map:$map,
    })
    watch(weather,(val)=>{
    currentWeather.value=val
})
}
</script>

<style scoped>
.nav {
    width: 100%;
    height: 58px;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    background-color: #4264fb;
    color: #fff;
    z-index: 10;
}

.location {
    font-family: "iconfont" !important;
    width: 88px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #ffd04b;
    cursor: pointer;
    transition: all .3s;
}

.location i {
    color: #ff2d51;
    font-weight: 600;
    font-size: 13px;
}

.search {
    position: relative;
    width: 300px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    padding: 1px 11px;
    background-color: #fff;
    border-radius: 4px;
}
.search i {
    width: 30px;
    height: 30px;
    color: #a8abb2;
    font-size: 18px;
    line-height: 30px;
    cursor: pointer;
}

.search input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: #fff;
    font-size: 14px;
    color: #a8abb2;
    padding-left: 18px;
}

input,
button,
textarea {
    color: inherit;
    font: inherit;
}

.weather {
    position: fixed;
    right: 20px;
    top: 70px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 0 3px 2px #333;
    background: #2193b0a1;
    background: -webkit-linear-gradient(to top, #6dd5ed, #2193b0);
    background: linear-gradient(to top, #6dd5edb0, #2193b0);
    z-index: 100;
}

table {
    color: #fff;
    text-align: center;
    width: 200px;
    line-height: 30px;
    border-radius: 15px;
    font-size: 15px;
}

table,
td {
    border-collapse: collapse;
}

td {
    border: 1px solid #eeeeee79;
}
</style>