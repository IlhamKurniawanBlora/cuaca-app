<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div v-show="modalActive" 
             class="fixed w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
                <Transition name="modal-inner">
                    <div v-if="modalActive" class="p-4 bg-white text-black self-start mt-32 max-w-screen-md">
                        <slot />
                        <button @click="$emit('close-modal')" class="text-white bg-cuaca-primer py-2 px-6">
                            Close
                        </button>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
    defineProps({
        modalActive: {
            type: Boolean,
            dafault: false,
        },
    });
    defineEmits(['close-modal']);
</script>

<style scoped>
/* modal outer transition */
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 2s cubic-bezier(0.52, 0.02, 0.29, 1.02);
}
.modal-outer-enter-from,
.modal-outer-leave-to {
opacity: 0;
}
/* modal inner transition */

.modal-inner-enter-active {
    transition: all 2s cubic-bezier(0.52, 0.02, 0.29, 1.02) 0,15s;
}
.modal-inner-leave-active {
    transition: all 2s cubic-bezier(0.52, 0.02, 0.29, 1.02);
}
.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}
.modal-inner-leave-to {
    transform: scale(0.8);
}
</style>