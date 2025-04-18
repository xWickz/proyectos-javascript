<template>
    <section class="bg-white dark:bg-gray-800 text-white p-5 h-screen">
        <div class="font-bold text-3xl mb-5">
            Piedra, Papel y Tijera
        </div>

        <div class="flex justify-center gap-2 mb-3">
            <button type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:hover:bg-blue-400"
            @click="usuario('0')"
            ref="piedra"
            id="piedra">
                Piedra
            </button>

            <button type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:hover:bg-blue-400"
            @click="usuario('1')"
            ref="papel"
            id="papel">
                Papel
            </button>

            <button type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:hover:bg-blue-400"
            @click="usuario('2')"
            ref="tijera"
            id="tijera">
                Tijera
            </button>
        </div>

        <div class="flex flex-col items-center justify-center">
            <span class="font-bold text-3xl">
                Resultado
            </span>
            <p class="text-2xl" v-html="resultado" @click="limpiar"></p>
        </div>

        <Footer />
    </section>
</template>

<script setup>
import { ref } from 'vue';
import Footer from './Footer.vue';

const resultado = ref("");
const seleccionesName = ["Piedra", "Papel", "Tijera"];

const piedra = ref(null);
const papel = ref(null);
const tijera = ref(null);

let botSeleccion;

function usuario(seleccion) {

    seleccion = Number(seleccion);
    botSeleccion = randomInt(0, 2);

    desactivarBotones();

    const resultados = [
        { user: 0, bot: 0, texto: `<span class="font-bold">Empate!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 0, bot: 1, texto: `<span class="font-bold">Pierdes!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 0, bot: 2, texto: `<span class="font-bold">Ganaste!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 1, bot: 0, texto: `<span class="font-bold">Ganaste!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 1, bot: 1, texto: `<span class="font-bold">Empate!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 1, bot: 2, texto: `<span class="font-bold">Pierdes!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 2, bot: 0, texto: `<span class="font-bold">Pierdes!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 2, bot: 1, texto: `<span class="font-bold">Ganaste!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 2, bot: 2, texto: `<span class="font-bold">Empate!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
    ];

    const resultadoActual = resultados.find(resultado => resultado.user === seleccion && resultado.bot === botSeleccion);

    if(resultadoActual) {
        resultado.value = resultadoActual.texto
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function desactivarBotones() {
    piedra.value.disabled = true;
    papel.value.disabled = true;
    tijera.value.disabled = true;
}

function limpiar() {
    resultado.value = "";
    piedra.value.disabled = false;
    papel.value.disabled = false;
    tijera.value.disabled = false;
}
</script>