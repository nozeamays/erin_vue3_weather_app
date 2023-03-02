<template>
  <div v-for="city in savedCities" :key="city.uid">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";
const savedCities = ref([]);
const qweatherAPIKey = "8d83ed69248c4ee3af3d8c7da1f70dab";
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          // `https://geoapi.qweather.com/v2/city/lookup?location=${searchQuery.value}&key=${qweatherAPIKey}`
          `https://devapi.qweather.com/v7/weather/now?location=${city.citykey}&key=${qweatherAPIKey}`
        )
      );
    });

    const weatherData = await Promise.all(requests);
    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data.now;
    });
  }
};
await getCities();
const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    // params: { state: city.state, city: city.city },
    query: {
      name: city.name,
      adm2: city.adm2,
      citykey: city.citykey,
      uid: city.uid,
    },
  });
};
</script>

<style scoped>
* {
  color: antiquewhite;
}
</style>
