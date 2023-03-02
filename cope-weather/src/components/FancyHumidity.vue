<template>
  <span v-if="hdityNum <= 50" class="rounded-lg bg-green-400 px-1 inline-block">
    优
  </span>
  <span
    v-else-if="50 < hdityNum && hdityNum < 100"
    class="rounded-lg bg-yellow-500 px-1 inline-block"
  >
    良
  </span>
  <span
    v-else-if="100 <= hdityNum && hdityNum < 150"
    class="rounded-lg bg-red-400 px-1 inline-block"
  >
    轻度
  </span>
  <span
    v-else-if="150 <= hdityNum && hdityNum < 200"
    class="rounded-lg bg-red-600 px-1 inline-block"
  >
    中度
  </span>
  <span
    v-else-if="hdityNum >= 200"
    class="rounded-lg bg-red-900 px-1 inline-block"
  >
    重度
  </span>
  <span v-else class="rounded-lg bg-green-900 px-1 inline-block">
    {{ props.hdity }}
  </span>
</template>

<script setup>
const props = defineProps({
  hdity: String,
});
// defineProps({
//   hdity: {
//     type: String,
//     default: "0",
//   },
// });
const hdityNum = parseInt(props.hdity);
</script>
