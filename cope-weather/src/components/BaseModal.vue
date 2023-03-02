<template>
  <Transition name="fade">
    <div
      v-show="modalActive"
      class="absolute bg-black bg-opacity-50 h-screen flex justify-center top-0 left-0 w-full z-50"
    >
      <div
        v-if="modalActive"
        class="bg-white px-8 py-8 mt-32 max-w-screen-md self-start rounded-lg"
      >
        <slot />
        <button
          @click="$emit('close-md')"
          class="mt-2 text-white bg-weather-primary py-2 px-6 rounded-lg"
        >
          close
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineEmits(["close-md"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped></style>
