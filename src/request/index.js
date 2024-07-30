import axios  from "axios";
const env=import.meta.env
const key=env.VITE_TOKEN
// console.log(env)
//请求拦截
axios.interceptors.request.use((config)=>{
  let url=config.url;
  // console.log(url)
  if(url.startsWith("/map")&&url.includes("?")){
    config.url=`${url}&key=${key}`
  }else if(url.startsWith("/map")){
    config.url=`${url}?key=${key}`
  }
  // console.log(config)
  return config;
})
//响应拦截
axios.interceptors.response.use(response=>{
    return response.data
})
// 获取热门城市
function getCityHttp(){
   let url="/api/city"
    return axios.get(url)
}
// 获取当前ip城市
const getIpMapHttp=()=>{
    return axios({
        url:"/map/ip"
    })
}
// 获取当前城市天气
const getWeatherMapHttp=(city)=>{
    return axios({
        url:`/map/weather/weatherInfo?city=${city}`
    })
}
// 获取当前城市的编码和坐标
const getLocationByCityHttp = (city) => {
    return axios({
        url: `/map/geocode/geo?address=${city}`
    })
}
export {getCityHttp,getIpMapHttp,getWeatherMapHttp,getLocationByCityHttp}