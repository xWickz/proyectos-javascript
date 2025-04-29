<template>
    <section class="bg-white dark:bg-gray-800 text-white h-screen p-5">

        <ProjectTitle id="2" />
        <ProjectInfo id="2" />

        <div class="flex justify-center">
            <p class="text-8xl font-semibold tracking-wider" v-html="hora"/>
        </div>

        <Footer />

    </section>
</template>

<script setup>
import { ref } from 'vue';

// Import Utils
import ProjectTitle from '../utils/ProjectTitle.vue';
import ProjectInfo from '../utils/ProjectInfo.vue';
import Footer from '../utils/Footer.vue';

const hora = ref("");

setInterval(() => {
    const ahora = new Date();
    let horas = ahora.getHours().toString().padStart(2, '0');
    let minutos = ahora.getMinutes().toString().padStart(2, '0');
    let segundos = ahora.getSeconds().toString().padStart(2, '0');
    hora.value = `${horas}:${minutos}:${segundos}`;
});

</script>

<style>

dialog::backdrop {
    background: rgba(0, 0, 0, 0.6);
}

.dialog-custom {
    border: none;
    padding: 0;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
}
</style>