<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Masukan Nama Kota "
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        class="absolute bg-cuaca-primer text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
        <p class="py-2" v-if="searchError">
          Maaf, Terjadi Kesalahan Sistem
        </p>
        <p
          class="py-2"
          v-if="!searchError && mapboxSearchResults.length === 0"
        >
          Tidak Ada Kota Yang ditemukan 
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 px-6 cursor-pointer border-b-[1px] border-white hover:bg-cuaca-sekunder duration-200 ease-out"
            @click="tampilKota(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <ListKota />
        <template #fallback>
          <KotaPlaceholder />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import ListKota from "../components/ListKota.vue";
import KotaPlaceholder from "../components/KotaPlaceholder.vue";

const router = useRouter();

// pencarian menampilkan list kota
const tampilKota = (searchResult) => {
  // console.log(searchResult);
  const [kota, provinsi, negara] = searchResult.place_name.split(",");
  // console.log(kota, provinsi, negara);
  router.push({
    name: "kotaView",
    params: {negara: negara, provinsi: provinsi, kota: kota},
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true, 
    },
  })
};
// API token map box
const mapboxAPIToken = "pk.eyJ1IjoiaWxoYW1ibG9yYSIsImEiOiJjbGp2NHZ5YmwxZGZuM21vN2J2N2lrMTJxIn0.ElRkJ-GUzMcU0-IPW-y8OA";
const searchQuery = ref("");
const queryTimeout = ref(null);
const searchError = ref(null);
const mapboxSearchResults = ref(null);


// pencarian kota with map box
const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIToken}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
        // console.log(mapboxSearchResults.value);
        return; 
      } catch {
        searchError.value = true;
      }

      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};
</script>

