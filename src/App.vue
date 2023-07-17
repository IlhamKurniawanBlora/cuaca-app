<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-cuaca-primer">
    <SiteNavigation />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component"/>
      </Transition>
    </RouterView>
    <div class="flex items-center w-full container text-white py-12">
        <h3 class="text-sm m-auto">
          Ilham Kurniawan | kairav
        </h3>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
</script>

<style >
.page-enter-active {
  transition: 600ms ease all;
}

.page-enter-from {
  opacity: 0;
}
</style>