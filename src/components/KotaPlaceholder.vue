<template>
    <!-- skeleton load kota -->
    <div class="flex py-6 px-3 bg-cuaca-sekunder rounded-md shadow-md">
        <div class="flex flex-col flex-1 gap-1">
            <PlaceHolder class="max-w-[50%]"/>
            <PlaceHolder class="max-w-[40%]"/>
        </div>
        <div class="flex flex-col items-end flex-1 gap-2">
            <PlaceHolder class="max-w-[50px] w-full"/>
            <PlaceHolder class="max-w-[75px] w-full"/>
        </div>
    </div>
</template>

<script setup>
import PlaceHolder from "./PlaceHolder.vue";


</script>
