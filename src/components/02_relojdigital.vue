<template>
    <section class="bg-white dark:bg-gray-800 text-white h-screen p-5">
        <div class="font-bold text-3xl mb-3">
            Reloj Digital
        </div>

        <div class="flex justify-center">
            <p class="text-8xl font-semibold tracking-wider">{{ hora }}</p>
        </div>

        <Footer />
    </section>
</template>

<script setup>
import { ref } from 'vue';
import Footer from './Footer.vue';

const hora = ref("");

setInterval(() => {
    const ahora = new Date();
    let horas = ahora.getHours().toString().padStart(2, '0');
    let minutos = ahora.getMinutes().toString().padStart(2, '0');
    let segundos = ahora.getSeconds().toString().padStart(2, '0');
    hora.value = `${horas}:${minutos}:${segundos}`;
});

</script>