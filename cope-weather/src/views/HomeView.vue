<template>
  <main class="container text-white">
    <div class="relative py-8">
      <input
        placeholder="输入你要搜索的城市"
        class="py-2 px-1 w-full bg-transparent border rounded-md shadow-sm border-weather-secondary focus:outline-none focus:shadow-2xl"
        type="text"
        name="cityInput"
        v-model="searchQuery"
        @input="getSearchResults"
      />
      <ul
        v-if="geoCoding"
        class="absolute w-full p-2 top-[80px] bg-white text-gray-800 group hover:shadow-lg rounded-md"
      >
        <p v-if="searchError">something is wrong</p>
        <p v-if="!searchError && geoCoding.length === 0">havent ypur city</p>
        <template v-else>
          <li
            v-for="city in geoCoding"
            :key="city.id"
            class="py-2 cursor-pointer group-hover:bg-opacity-10 hover:bg-weather-primary"
            @click="showWeather(city)"
          >
            {{ city.name }}
          </li>
        </template>
      </ul>
    </div>

    <div class="flex flex-col gap-4 mt-8">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>
<script setup>
import CityList from "../components/CityList.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();
const showWeather = (a) => {
  router.push({
    name: "cityView",
    query: {
      lat: a.lat,
      lon: a.lon,
      citykey: a.id,
      adm2: a.adm2,
      name: a.name,
      preview: true,
    },
  });
};
const lbsmapAPIKey = "5f751258375168d0db979cba298dffec";
const qweatherAPIKey = "8d83ed69248c4ee3af3d8c7da1f70dab";
const searchQuery = ref("");
const queryTimeout = ref(null);
const geoCoding = ref(null);
const searchError = ref(null);
const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        /***墨迹天气，未成功，跨域 */
        // const result = await axios.get(`http://tianqi.moji.com/api/`);

        /**
         * 高德地图api
         */
        // const result = await axios.get(
        //   `https://restapi.amap.com/v3/config/district?key=${lbsmapAPIKey}&keywords=${searchQuery.value}&output=JSON`
        // );
        // const data = result.data.districts;
        // geoCoding.value = data;
        // console.log(data);
        /**
         * 和风天气API
         */
        const result = await axios.get(
          `https://geoapi.qweather.com/v2/city/lookup?location=${searchQuery.value}&key=${qweatherAPIKey}`
        );
        const data = result.data.location;
        geoCoding.value = data;
      } catch {
        searchError.value = true;
      }
      return;
    }
  }, 300);
  geoCoding.value = null;
};
</script>
<style scoped></style>
