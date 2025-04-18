<template>
    <section class="py-15 p-5 h-screen bg-white dark:bg-gray-800 dark:text-white">

        <span class="font-bold text-3xl">Generador de Numeros</span>

        <div class="mt-5">

            <div class="flex">
                <label class="text-sm font-medium text-gray-900 dark:text-white w-6">
                    {{ rango }}
                </label>

                <input type="range" v-model="rango" min="1" max="100" value="50" 
                class="w-50 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>

            </div>
            <br /> 
            
            <button type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            @click="generarNumero">
                Generar
            </button> <br /> <br />
            
            <p @click="limpiar" class="text-2xl font-bold dark:text-white">{{ resultado }}</p>
        </div>

        <Footer />
    </section>
</template>

<script setup>
import { ref } from 'vue'
import Footer from './Footer.vue';

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