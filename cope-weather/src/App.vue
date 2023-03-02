<template>
  <div class="flex flex-col min-h-screen font-ali" :class="changeBgcolor()">
    <Navigitorview />
    <RouterView />
  </div>
</template>

<script setup>
import Navigitorview from "./components/Navigitorview.vue";
import { RouterView } from "vue-router";
const time = new Date().getHours();
const changeBgcolor = () => {
  if (time >= 18 || time <= 6) {
    return "bg-gray-900";
  }
  return "bg-weather-primary";
};

console.log(changeBgcolor);
</script>
