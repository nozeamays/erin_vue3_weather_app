<template>
  <div
    class="flex py-6 px-3 bg-black bg-opacity-25 rounded-md shadow-md cursor-pointer hover:bg-opacity-36"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl" v-if="city.name === city.adm2">{{ city.name }}市</h2>
      <h2 class="text-3xl" v-else>{{ city.adm2 }}{{ city.name }}</h2>
      <h3>{{ city.weather.text }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">{{ Math.round(city.weather.temp) }}&deg;</p>
      <div class="flex gap-2">
        <span class="text-xs"> {{ city.weather.windDir }}</span>
        <span class="text-xs">
          空气污染指数
          {{ city.weather.humidity }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    define: () => {},
  },
});
</script>

<style lang="scss" scoped></style>
