<template>
  <div class="flex flex-col flex-1 bg-gray-200">
    <div
      class="bg-weather-primary bg-no-repeat bg-cover bg-center"
      :class="fancyImg(weatherData.now.icon)"
    >
      <div class="absolute">
        <video
          width="100%"
          src="https://search-operate.cdn.bcebos.com/5b8fa41e5c92ea8793a99c5081a7a9d8.mp4"
          poster="https://search-operate.cdn.bcebos.com/9669cac22a5833622982ecfdf38f4694.png"
          muted="true"
          autoplay="true"
          auto-rotate="false"
          playsinline="true"
          x5-playsinline="true"
          webkit-playsinline="true"
          t7-video-player-type="inline"
          crossorigin="anonymous"
          loop="true"
        ></video>
      </div>
      <!-- Banner -->
      <div
        v-if="route.query.preview"
        class="text-white p-4 bg-black bg-opacity-20 w-full text-center"
      >
        <p class="text-sm">已显示 “百度天气” 的搜索结果</p>
      </div>
      <!-- weather data -->
      <div
        class="flex flex-col items-center py-12 text-white bg-gradient-to-b from-transparent via-transparent to-weather-primary bg-opacity-10"
      >
        <h1 class="text-4xl mb-2" v-if="route.query.name === route.query.adm2">
          {{ route.query.name }}市
        </h1>
        <h1 class="text-4xl mb-2" v-else>
          {{ route.query.adm2 }}{{ route.query.name }}
        </h1>
        <p class="text-sm mb-12">
          {{
            new Date(weatherData.updateTime).toLocaleTimeString("en-us", {
              timeStyle: "short",
            })
          }}
          更新
        </p>
        <p class="text-8xl mb-12">
          {{ Math.round(weatherData.now.temp) }}&deg;
        </p>
        <p class="text-center">
          <span class="text-md px-5">{{ weatherData.now.text }} </span>
          <span class="capitalize">
            {{ weatherData.now.windDir }}
            {{ weatherData.now.windScale }}级
          </span>
        </p>
        <div class="flex flex-row gap-2">
          <span class="text-lg px-5"
            >空气指数 {{ Math.round(weatherData.now.humidity) }}
          </span>
          <FancyHumidity :hdity="weatherData.now.humidity"> </FancyHumidity>
        </div>
        <img
          class="h-auto w-[100px] object-cover pt-12"
          :src="`../../public/icon/${weatherData.now.icon}@2x.png`"
          alt="myicon"
        />
      </div>
    </div>
    <section class="px-1 pb-9">
      <!-- Hourly Weather -->
      <div
        class="max-w-screen-md w-full py-4 -mt-3.5 bg-white text-gray-900 rounded-2xl shadow-md"
      >
        <div class="mx-3">
          <h2 class="mb-4 font-bold">24小时预报</h2>
          <hr class="border-gray-200 border border-solid w-full" />
          <div class="flex gap-10 overflow-x-scroll mt-6">
            <div
              v-for="(hourData, i) in hourlyData.hourly"
              :key="i"
              class="flex flex-col gap-4 items-center"
            >
              <p class="whitespace-nowrap text-md">
                {{
                  new Date(hourData.fxTime).toLocaleTimeString("zh", {
                    hour: "2-digit",
                  })
                }}
              </p>
              <img
                class="w-auto h-[40px] object-cover"
                :src="`../../public/icon/${hourData.icon}.webp`"
                alt=""
              />
              <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Weekly Weather -->
      <div
        class="max-w-screen-md w-full py-4 text-gray-800 bg-white mt-2 shadow-md rounded-2xl"
      >
        <div class="mx-3">
          <h2 class="mb-4 font-bold">7天预报</h2>
          <hr class="border-gray-200 border border-solid w-full my-4" />
          <div
            v-for="(day, i) in weeklyData.daily"
            :key="i"
            class="flex items-center mb-5 justify-between text-sm sm:text-md"
          >
            <div class="w-1/4">
              <span>
                {{
                  new Date(day.fxDate).toLocaleDateString("zh", {
                    weekday: "short",
                    day: "2-digit",
                    month: "long",
                  })
                }}
                <!-- {{ new Date(day.fxDate).getDate() }}/{{
                  new Date(day.fxDate).getMonth()
                }} -->
              </span>
              <!-- <span class="px-2">
                {{ toWeekDay(day.fxDate) }}
              </span> -->
            </div>
            <div class="flex-1 flex items-center gap-1">
              <img
                class="w-[28px] h-[28px] object-cover"
                :src="`../../public/icon/${day.iconDay}.webp`"
                alt=""
              />
              <span>{{ day.textDay }}</span>
            </div>
            <div class="basis-16">
              {{ Math.round(day.tempMin) }}&deg;~
              {{ Math.round(day.tempMax) }}&deg;
            </div>
            <div class="w-1/4 flex gap-1 justify-end">
              <p>{{ day.windDirDay }}</p>
              <p>{{ day.windScaleDay }}级</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import FancyHumidity from "./FancyHumidity.vue";
const fancyImg = (icon) => {
  if (icon === undefined) {
    return;
  }
  const n = parseInt(icon);
  if (n === 100) {
    return "bg-sun";
  }
  if (n === 104) {
    return "bg-ying";
  }
  if (n >= 150 && n <= 153) {
    return "bg-night";
  }
  if (n >= 101 && n <= 103) {
    return "bg-cloud";
  }
  if (n >= 300 && n <= 399) {
    return "bg-rain";
  }
};
const toWeekDay = (date) => {
  let week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const num = new Date(date).getDay();
  return week[num] ? week[num] : "日期错误";
};
const route = useRoute();
const lbsmapAPIKey = "5f751258375168d0db979cba298dffec";
const qweatherAPIKey = "8d83ed69248c4ee3af3d8c7da1f70dab";
// const refHdirty = ref("");
const getWeatherData = async () => {
  try {
    const result = await axios.get(
      `https://devapi.qweather.com/v7/weather/now?location=${route.query.citykey}&key=${qweatherAPIKey}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
const weatherData = await getWeatherData();
console.log(weatherData);
const getHourlyData = async () => {
  try {
    const result = await axios.get(
      `https://devapi.qweather.com/v7/weather/24h?location=${route.query.citykey}&key=${qweatherAPIKey}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
const hourlyData = await getHourlyData();

const getWeeklyData = async () => {
  try {
    const result = await axios.get(
      `https://devapi.qweather.com/v7/weather/7d?location=${route.query.citykey}&key=${qweatherAPIKey}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
const weeklyData = await getWeeklyData();
</script>

<style scoped></style>
