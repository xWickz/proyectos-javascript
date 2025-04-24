<template>
    <section class="p-5 h-screen bg-white dark:bg-gray-800 dark:text-white">

        <div class="font-bold text-4xl mb-3">
            <mark class="px-2 text-white bg-blue-700 rounded-sm dark:bg-blue-700">
                {{ proyectos[3].nombre }}
            </mark><br />

            <button type="button"
                class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onclick="document.getElementById('dialogo').showModal()">
                ¿Cómo funciona?
            </button>
        </div>


        <div class="mt-5 flex flex-col items-center justify-center h-96">

            <div class="flex">
                <label class="text-sm font-medium text-gray-900 dark:text-white w-6">
                    {{ rango }}
                </label>

                <input type="range" v-model="rango" min="1" max="100" value="50"
                    class="w-50 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

            </div>
            <br />

            <button type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                @click="generarNumero">
                Generar
            </button> <br /> <br />

            <p @click="limpiar" class="text-2xl font-bold dark:text-white">{{ resultado }}</p>
        </div>

        <!-- Funcionamiento del proyecto -->
        <dialog id="dialogo" class="dialog-custom bg-transparent p-0">
            <div class="p-6 rounded-xl bg-white dark:bg-gray-800 text-center w-120">
                <span class="text-white text-xl">¿Cómo funciona <span class="font-bold">{{ proyectos[3].nombre
                        }}</span>?</span>
                <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                <p class="mb-4 text-gray-800 dark:text-white" v-html="proyectos[3].funcionamiento"></p>
                <form method="dialog">
                    <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Cerrar</button>
                </form>
            </div>
        </dialog>

        <Footer />
    </section>
</template>

<script setup>
import { ref } from 'vue'
import Footer from './Footer.vue';
import proyectos from '../data/proyectos.js';

const rango = ref(1);
const resultado = ref("");

function generarNumero() {
    const numero = Math.floor(Math.random() * rango.value) + 1
    resultado.value = `El número aleatorio es: ${numero}`;
}

function limpiar() {
    resultado.value = "";
}
</script>