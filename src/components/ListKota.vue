<template>
    <div v-for="kota in kotaTersimpan" :key="kota.id">

        <KotaCard :kota="kota" @click="goToCityView(kota)"/>

    </div>
    <p v-if="kotaTersimpan.length === 0">
        Tidak Ada Riwayat Pencarian
    </p>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import KotaCard from "./KotaCard.vue";

const kotaTersimpan = ref([]);
const getKota = async () => {
    if (localStorage.getItem("kotaTersimpan")) {
        kotaTersimpan.value = JSON.parse(
            localStorage.getItem("kotaTersimpan")
        );
        const requests = [];
        kotaTersimpan.value.forEach((kota) => {
            requests.push(
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${kota.coords.lat}&lon=${kota.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`)
            );
        });
        const dataCuaca = await Promise.all(requests);

        // delay load animate 
        await new Promise((res) => setTimeout(res, 1000));
        
        dataCuaca.forEach((value, index) => {
            kotaTersimpan.value[index].weather = value.data;
        })
    }
};
await getKota();

const router = useRouter();
// push router + params
const goToCityView = (kota) => {
    router.push({
        name: "kotaView",
        params: { 
            negara: kota.negara, 
            kota: kota.kota 
        },
        query: { 
            id: kota.id, 
            lat: kota.coords.lat, 
            lng: kota.coords.lng
        },
    })
};
</script>
