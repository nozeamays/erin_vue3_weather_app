<template>
  <header class="sticky bg-blue-900 shadow-lg top-0 filter bg-opacity-20">
    <nav
      class="container flex flex-col justify-between sm:flex-row items-center gap-4 text-white py-4"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex-1 flex item-center justify-items-center gap-1">
          <i class="fa-sharp fa-solid fa-snowflake text-2xl"></i>
          <p class="text-2xl">天气预报 <span class="text-xs"> by erin</span></p>
        </div>
      </RouterLink>
      <div class="flex-1 flex flex-row gap-2 justify-end">
        <i
          @click="toggleModal"
          class="fa-solid fa-circle-question block cursor-pointer text-2xl"
        ></i>
        <i
          class="fa-solid fa-plus text-2xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query"
        ></i>
      </div>
    </nav>
    <BaseModal :modalActive="modalActive" v-on:close-md="toggleModal">
      <h1>hello</h1>
    </BaseModal>
  </header>
</template>
<script setup>
import { ref } from "vue";
import { uid } from "uid";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const addCity = () => {
  if (route.query.citykey == undefined) {
    return;
  }
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }
  const locationObj = {
    uid: uid(),
    name: route.query.name,
    adm2: route.query.adm2,
    citykey: route.query.citykey,
  };

  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.uid = locationObj.uid;
  router.replace({ query });
};

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<style lang="scss" scoped></style>
