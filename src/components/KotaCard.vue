<template>
    <div class="flex py-6 px-3 bg-cuaca-sekunder rounded-md shadow-md cursor-pointer">
        <div class="flex flex-col flex-1">
            <h2 class="text-3xl">{{ kota.kota }}</h2>
            <h3 class="">{{ kota.negara }}</h3>
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-3xl self-end">
                {{ Math.round(((kota.weather.main.temp) - 32) * 5 / 9) }}&deg; C
            </p>
            <div class="flex gap-2">
                <span class="text-xs">
                    max : {{ Math.round(((kota.weather.main.temp_max) - 32) * 5 / 9) }}&deg; C
                </span>
                <span class="text-xs">
                    min : {{ Math.round(((kota.weather.main.temp_min) - 32) * 5 / 9) }}&deg; C
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRoute, useRouter } from "vue-router";
    const route = useRoute();

    defineProps({
        kota: {
            type: Object,
            default: () => {},
        },
    });

</script>
