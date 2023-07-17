<template>
<div class="flex flex-col flex-1">
    <!-- Overview -->
    <div class="flex flex-col py-12 items-center">
      <PlaceHolder class="max-w-[300px] w-full mb-2" />
      <PlaceHolder class="max-w-[300px] w-full mb-12" />
      <PlaceHolder
        class="max-w-[300px] h-[100px] w-full mb-12"
      />
      <PlaceHolder class="max-w-[300px] w-full mb-8" />
      <PlaceHolder
        class="max-w-[300px] h-[75px] w-full"
      />
    </div>
    <!-- placeholder card per jam -->
    <div class="flex flex-col py-12 px-8 items-center">
      <PlaceHolder
        class="max-w-screen-md h-[100px] w-full mb-12 "
      />
    </div>
    <!-- placeholder card Mingguan -->
    <div class="flex flex-col py-12 px-8 items-center">
      <PlaceHolder
        class="max-w-screen-md h-[100px] w-full mb-12"
      />
    </div>
  </div>
</template>

<script setup>
import PlaceHolder from "./PlaceHolder.vue";

</script>
