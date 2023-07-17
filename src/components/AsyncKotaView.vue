<template>
    <div class="flex flex-col flex-1 items-center">
        <!-- Banner -->
        <div v-if="route.query.preview" class="text-white bg-cuaca-sekunder p-4 w-full text-center">
            <p>
                untuk menambahkan kota ke halaman depan klik "+" di pojok atas.
            </p>
        </div>
        <!-- tampilan cuaca  -->
        <div class="flex flex-col items-center text-white py-20">
            <h1 class="text-4xl mb-4">
                {{ route.params.kota }}
            </h1>
            <p class="text-base">
                {{
                    new Date(DataCuaca.currentTime).toLocaleDateString(
                        "id-ID",
                        {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        }
                    )
                }}
            </p>
            <p class="text-center mb-10 font-bold">
                {{
                    new Date(DataCuaca.currentTime).toLocaleTimeString("id-ID", {
                        timeStyle: "short",
                    })
                }}
            </p>
            <p class="text-8xl mb-8">
                {{ Math.round(((DataCuaca.current.temp) - 32) * 5 / 9) }}&deg;C
            </p>
            <p>
                Suhu Rata-Rata {{ Math.round(((DataCuaca.current.feels_like) - 32) * 5 / 9) }}&deg;C
            </p>
            <p class="capitalize">
                {{ DataCuaca.current.weather[0].description }}
            </p>
            <img :src="`https://openweathermap.org/img/wn/${DataCuaca.current.weather[0].icon}@2x.png`" alt="icon cuaca"
                class="m-auto w-[150px] h-auto" />
        </div>
    </div>
    <hr class="border border-white opacity-20 w-full" />
    <!-- detail cuaca per Jam -->
    <div class="w-max-screen-md w-full py-10 container">
        <div class="mx-8 text-white mb-12">
            <h2 class="mb-4 text-xl">
                Prakiraan Cuaca Per Jam
            </h2>
            <div class="flex gap-10 overflow-x-scroll">
                <div v-for="DataperJam in DataCuaca.hourly" :key="DataperJam.dt" class="flex flex-col gap-4 items-center">
                    <p class="whitespace-nowrap text-md">
                        {{ new Date(DataperJam.currentTime).toLocaleTimeString("en-us", {
                            hour: "numeric"
                        }) }}
                    </p>
                    <img :src="`https://openweathermap.org/img/wn/${DataperJam.weather[0].icon}@2x.png`" alt="icon cuaca"
                        class="m-auto w-[50px] h-auto" />
                    <p>
                        {{ Math.round(((DataperJam.temp) - 32) * 5 / 9) }}&deg;C
                    </p>
                </div>
            </div>
        </div>
    </div>
    <hr class="border border-white opacity-20 w-full" />
    <!-- detail cuaca Harian -->
    <div class="w-max-screen-md w-full py-10 container">
        <div class="mx-8 text-white mb-6">
            <h2 class="mb-4 text-xl">
                Prakiraan Cuaca Harian
            </h2>
            <div v-for="DataHarian in DataCuaca.daily" :key="DataHarian.dt" class="flex items-center">
                <p class="flex-1">
                    {{ new Date(DataHarian.dt * 1000).toLocaleDateString("id-ID" , {
                        weekday: "long",
                    }) }}
                </p>
                <img :src="`https://openweathermap.org/img/wn/${DataHarian.weather[0].icon}@2x.png`" alt="icon cuaca"
                class="m-auto w-[50px] h-auto object-cover" />
                <div class="flex gap-2 flex-1 justify-end">
                    <p>
                        Max : {{ Math.round(((DataHarian.temp.max) - 32) * 5 / 9) }}&deg; C
                    </p>
                    <p>
                        Min : {{ Math.round(((DataHarian.temp.min) - 32) * 5 / 9) }}&deg; C
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- delete button  -->
    <div class="flex items-center gap-2 pt-6 pb-12 text-white cursor-pointer " @click="hapusKota">
        <button  class="m-auto border-white border-2 px-6 p-3 rounded-md hover:text-red-500 text-center duration-200 ease-in-out">
            <p><i class="fa-solid fa-trash mr-2"></i>Hapus Kota</p>
        </button>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";
import HomeView from '../views/HomeView.vue';

const route = useRoute();
const getDataCuaca = async () => {
    try {
        const DataCuaca = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
        );

        // menghitung hari dan waktu
        const localOffset = new Date().getTimezoneOffset() * 60000;
        const utc = DataCuaca.data.current.dt * 1000 + localOffset;
        DataCuaca.data.currentTime =
            utc + 1000 * DataCuaca.data.timezone_offset;

        // menghitung cuaca perjam
        DataCuaca.data.hourly.forEach((hour) => {
            const utc = hour.dt * 1000 + localOffset;
            hour.currentTime =
                utc + 1000 * DataCuaca.data.timezone_offset;
        });

        // delay 
        await new Promise((res) => setTimeout(res, 1000));
        return DataCuaca.data;

    } catch (err) {
        console.log(err);
    }
};
const DataCuaca = await getDataCuaca();
console.log(DataCuaca);

// hapus kota tersimpan
const router = useRouter();
const hapusKota = () => {
    const kota = JSON.parse(localStorage.getItem("kotaTersimpan"));
    const updatekota = kota.filter(
        (kota) => kota.id !== route.query.id);
    localStorage.setItem("kotaTersimpan", 
    JSON.stringify(updatekota));
    router.push({
        name: 'home',
    });
};
</script>
