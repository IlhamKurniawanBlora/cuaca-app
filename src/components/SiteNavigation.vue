<template>
  <header class="sticky top-0 bg-cuaca-primer shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <div class="flex items-center gap-3 hover:shadow-lg ease-out duration-150 hover:scale-110">
        <RouterLink :to="{ name: 'home' }">
          <p class="text-2xl"><i class="fa-solid fa-sun text-2xl"></i> Cuaca App</p>
          </RouterLink>
      </div>
      <div class="flex gap-3 flex-1 justify-end ">
        <RouterLink :to="{ name: 'home' }">
          <div class="flex px-3 items-center hover:scale-110 hover:shadow-lg ease-out duration-150">
            <p class="text-xl">
              home
            </p>
          </div>
        </RouterLink>
        <i class="fa-solid fa-circle-info text-xl hove:text-cuaca-sekunder duration-150 cursor-pointer border-2 border-white rounded-full p-1 hover:scale-110"
          @click="toggleModal"></i>
        <i class="fa-solid fa-plus fa-circle-info text-xl hove:text-cuaca-sekunder duration-150 cursor-pointer border-2 border-white rounded-full p-1 hover:scale-110"
          @click="tambahKota" v-if="route.query.preview"></i>
      </div>
      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black mb-4">
          <h1 class="text-2xl mb-1">Tentang :</h1>
          <p class="mb-2">
            Cuaca App dapat kamu gunakan untuk mengecek Prakiraan cuaca sesuai lokasi yang kamu tentukan.
          </p>
          <h2 class="text-2xl">Cara Kerja :</h2>
          <ol class="list-decimal list-inside mb-2">
            <li>
              Masukan nama kotamu di kolom pencarian.
            </li>
            <li>
              Pilh hasil sesuai dengan kota yang kamu pilih.
            </li>
            <li>
              Tekan "+" untuk menambahkan kota di tampilan awal.
            </li>
          </ol>
          <h2 class="text-2xl">
            Menghapus nama kota :
          </h2>
          <p class="mb-2">
            jika kamu ingin menghapus kota yang tidak kamu ingin kan maka tekan tombol "Hapus".
          </p>
          <h2 class="text-2xl">Sumber Informasi :
          </h2>
          <p>
            APi Map Box : <a class="text-blue-600 underline" href="https://www.mapbox.com/">https://www.mapbox.com/</a>
          </p>
          <p>
            API Open Weather : <a class="text-blue-600 underline"
              href="https://openweathermap.org/api">https://openweathermap.org/api</a>
          </p>
          <p>
            Github Source Code : <a class="text-blue-600 underline"
              href="https://github.com/IlhamKurniawanBlora/cuaca_app">https://github.com/IlhamKurniawanBlora/cuaca_app</a>
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { uid } from "uid";
import BaseModal from "./BaseModal.vue";


const modalActive = ref(null);
const route = useRoute();
const router = useRouter();
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const kotaTersimpan = ref([])
// menambahkan kota ke halaman home
const tambahKota = () => {
  if (localStorage.getItem("kotaTersimpan")) {
    kotaTersimpan.value = JSON.parse(
      localStorage.getItem("kotaTersimpan")
    );
  }
  const lokasiObj = {
    id: uid(),
    negara: route.params.negara,
    kota: route.params.kota,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  kotaTersimpan.value.push(lokasiObj);
  localStorage.setItem('kotaTersimpan', JSON.stringify(kotaTersimpan.value))

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = lokasiObj.id;
  router.replace({ query });
};
</script>
