<template>
  <div class="container">
    <div class="search">
      <i class="iconfont icon-sousuo"></i>
      <input
        type="text"
        placeholder="请输入你所在的城市"
        v-model.trim="searchCity"
      />
    </div>
    <!-- 搜索列表 -->
    <div v-show="searchCity">
      <li v-show="!searchList.length">未搜索到该城市</li>
      <li
        v-show="searchList.length"
        @click="handelCity(item.name)"
        class="item"
        v-for="(item, index) of searchList"
        :key="index"
      >
        {{ item.name }}
      </li>
    </div>
    <div v-show="!searchCity.length">
      <h3>当前城市</h3>
      <button class="current">{{ $store.city }}</button>
      <h3>定位/最近访问</h3>
      <div>
        <button class="location">
          <i class="iconfont icon-weizhi"></i> 武汉市
        </button>
        <button @click="handelCity(item)" v-for="item of history">
          {{ item }}
        </button>
      </div>
      <h3>热门城市</h3>
      <div>
        <button @click="handelCity(item.name)" v-for="item of hotCities">
          {{ item.name }}
        </button>
      </div>
      <van-index-bar :index-list="allLetter">
        <template v-for="key of allLetter">
          <van-index-anchor :index="key"></van-index-anchor>
          <template
            v-for="(cities, key) in allCities"
            :key="key"
            @click="handelCity(city.name)"
          >
            <van-cell
              class="item"
              v-for="city in cities"
              :key="city.id"
              :title="city.name"
              @click="handelCity(city.name)"
            />
          </template>
        </template>
      </van-index-bar>

      <!-- <van-index-bar>
        <template
          v-for="(value, key, index) in allCities"
          :key="Math.floor(Math.random() * 1000000) + index"
        >
          <van-index-anchor :index="key" />
          <template v-for="item in value">
            <van-cell :title="item.name" @click="handelCity(item.name)" />
          </template>
        </template>
      </van-index-bar> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { getCityHttp } from "@/request/index.js";
import { useCityStore } from "@/stores/city";
// import  {useRouter} from "@/router/index"//错误写法
import { useRouter } from "vue-router";
const $store = useCityStore();
const $router = useRouter();
const hotCities = ref([]); //热门城市
const history = ref([]); //历史数组
const allCities = ref([]); //原始数组
const allLetter = ref([]); //所有字母
const Cities = ref([]); //按字母分的城市的数组
const searchCity = ref("");
const searchList = ref([]);
onMounted(async () => {
  let res = await getCityHttp();
  hotCities.value = res.data.hotCities;
  // console.log(hotCities.value)
  allCities.value = res.data.cities;
  // console.log(allCities.value,"所有城市数组")
  allLetter.value = Object.keys(allCities.value);
  // console.log(allLetter.value, "所有字母数组")
  Cities.value = Object.values(allCities.value);
  // console.log(Cities.value, "单个城市数组");
});
//点击热门城市渲染到  当前城市和最近城市
function handelCity(value) {
  $store.changeCity(value); //这里是传值,不是赋值
  if (history.value.indexOf(value) == -1) {
    // console.log(histroy.value.indexOf(value))
    history.value.unshift(value);
  } else {
    let index = history.value.indexOf(value);
    history.value.splice(index, 1);
    history.value.unshift(value);
  }
  history.value = history.value.slice(0, 3);
  $router.back();
}
//使用watch监听缓存
watch(history, (val) => {
  localStorage.setItem("history", JSON.stringify(val));
});
//在onMounted中获取缓存
onMounted(() => {
  let result = JSON.parse(localStorage.getItem("history"));
  if (result) {
    history.value = result;
  }
});
//搜索功能实现
watch(searchCity, (val) => {
  // if(val){
  searchList.value = [];
  Cities.value.flat(Infinity).forEach((city) => {
    // console.log(city)
    // city.forEach((item) => {
    // let arr = Object.values(item).slice(2);
    // console.log(arr[0])//可以拿到城市名字
    if (city.name.includes(val)) {
      return searchList.value.push(city);
    }
    // });
  });
  // }else{
  //   bool.value=false
  //   console.log( bool.value)
  //   searchList.value=[]
  // }
});
</script>

<style scoped>
.container {
  padding: 10px;
  width: 500px;
  height: 100vh;

  margin: 0 auto;
}

.container h3 {
  text-indent: 15px;
  line-height: 40px;
  color: #666;
  font-size: 16px;
  font-weight: lighter;
  background-color: #efeeee;
  margin-top: 6px;
}

.container button:hover {
  cursor: pointer;
  background-color: #cecccc;
}

.container button {
  width: 80px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  border: 1px solid #c2c0c0;
  border-radius: 10px;
  margin-top: 6px;
}

.icon-weizhi {
  color: #652e80 !important;
}

.container .current {
  background-color: #198754;
  color: #fff;
}

.search {
  position: relative;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block: 10px;
  padding: 1px 11px;
  background-color: #efefef;
  border: 1px solid #a2a2a2;
  border-radius: 4px;
}

.search i {
  color: #898989;
  font-size: 18px;
}

.search input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: #efefef;
  font-size: 14px;
  color: #898989;
  padding-left: 18px;
}

.item:hover {
  background-color: #c7c6c6;
}

/* 搜索框的样式 */
.container li {
  list-style: none;
  height: 30px;
  padding: 0 15px;
  font-size: 14px;
  line-height: 30px;
  border-bottom: 1px solid #efefef;
}
</style>
