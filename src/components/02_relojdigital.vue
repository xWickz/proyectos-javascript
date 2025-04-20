<template>
    <section class="bg-white dark:bg-gray-800 text-white h-screen p-5">

        <div class="font-bold text-4xl mb-3">
            <mark class="px-2 text-white bg-blue-700 rounded-sm dark:bg-blue-700">
                {{ proyectos[2].nombre }}
            </mark><br />

            <button type="button"
                class="text-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onclick="document.getElementById('dialogo').showModal()">
                ¿Cómo funciona?
            </button>
        </div>

        <div class="flex justify-center">
            <p class="text-8xl font-semibold tracking-wider">{{ hora }}</p>
        </div>

        <!-- Funcionamiento del proyecto -->
        <dialog id="dialogo" class="dialog-custom bg-transparent p-0">
            <div class="p-6 rounded-xl bg-white dark:bg-gray-800 text-center w-120">
                <span class="text-white text-xl">¿Cómo funciona <span class="font-bold">{{ proyectos[2].nombre
                        }}</span>?</span>
                <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                <p class="mb-4 text-gray-800 dark:text-white" v-html="proyectos[2].funcionamiento"></p>
                <form method="dialog">
                    <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Cerrar</button>
                </form>
            </div>
        </dialog>

        <Footer />
    </section>
</template>

<script setup>
import { ref } from 'vue';
import Footer from './Footer.vue';
import proyectos from '../data/proyectos.js';

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