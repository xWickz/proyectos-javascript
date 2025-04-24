<template>
    <section class="bg-white dark:bg-gray-800 text-white p-5 h-screen">

        <!-- Sticky Banner: Tiempo Restante -->
        <div id="sticky" ref="sticky" tabindex="-1"
            class="fixed top-0 start-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            hidden>
            <div class="flex items-center mx-auto">
                <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                    <span
                        class="inline-flex p-1 me-3 bg-gray-200 rounded-full dark:bg-gray-600 w-6 h-6 items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>

                    </span>
                    <span class="font-semibold text-lg">Tiempo Restante <span class="text-slate-100">{{ timeNoReset > 1
                        ? timeNoReset + " segundos" : timeNoReset+" segundo" }}</span> </span>
                </p>
            </div>
        </div>

        <!-- Título -->
        <div class="font-bold text-4xl mb-3" ref="title">
            <mark class="px-2 text-white bg-blue-700 rounded-sm dark:bg-blue-700">
                {{ proyectos[5].nombre }}
            </mark><br />

            <button type="button"
                class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onclick="document.getElementById('dialogo').showModal()">
                ¿Cómo funciona?
            </button>
        </div>

        <!-- Botones para comenzar el juego -->
        <div class="flex justify-center mb-7">
            <button type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:hover:bg-blue-400"
                @click="startGame('normal')" ref="comenzar" id="comenzar">
                Comenzar
            </button>

            <button type="button"
                class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:hover:bg-blue-400"
                @click="startGame('responses')" ref="comenzar_02" id="comenzar_02">
                Comenzar <p class="font-bold">(con Respuestas)</p>
            </button>
        </div>

        <!-- Pregunta Actual -->
        <p class="text-center text-3xl mb-3">
            {{ currentQuestion.pregunta }}
        </p>

        <!--  Respuestas. Mapeo de respuestas -->
        <div class="flex justify-center">
            <div v-for="response in shuffledResponses" :key="response">

                <button type="button" :class="['text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2',
                    gameType === 'responses' && response === currentQuestion.respuesta
                        ? 'bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800'
                        : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                ]" @click="checkAnswer(response)">
                    {{ response }}
                </button>
            </div>

        </div>

        <!-- Información Adicional. Puntuación, Mensaje Final al Perder -->
        <div class="mt-4 text-center">
            <p class="text-lg font-medium">{{ puntuacion }}</p>
            <p v-if="result" class="mt-2 text-2xl text-gray-200" v-html="result" />
        </div>

        <!-- Toast Notification -->
        <transition name="fade">
            <div v-if="snackbarMessage"
                :class="['fixed bottom-6 right-6 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in', snackbarType === 'success' ? 'dark:bg-green-500' : snackbarType === 'error' ? 'dark:bg-red-500' : 'dark:bg-gray-700']">
                <svg v-if="snackbarType === 'success'" class="w-5 h-5" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <svg v-else-if="snackbarType === 'error'" class="w-5 h-5" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>{{ snackbarMessage }}</span>
            </div>
        </transition>

        <!-- Funcionamiento del proyecto -->
        <dialog id="dialogo" class="dialog-custom bg-transparent p-0">
            <div class="p-6 rounded-xl bg-white dark:bg-gray-800 text-center w-120">
                <span class="text-white text-xl">¿Cómo funciona <span class="font-bold">{{ proyectos[5].nombre
                        }}</span>?</span>
                <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                <p class="mb-4 text-gray-800 dark:text-white" v-html="proyectos[5].funcionamiento"></p>
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
import { preguntas } from '../data/preguntas.js';
import proyectos from '../data/proyectos.js';

const score = ref(0);
const time = ref(0); // Este se reinicia para los puntos
const timeNoReset = ref(tiempo); // Este no se reinicia
const streak = ref(0);
const gameType = ref('');
const result = ref('');
const snackbarMessage = ref('');
const snackbarType = ref('');
const puntuacion = ref('');

let timer;
let toastTimer;

const currentQuestion = ref({});
const shuffledResponses = ref([]);

const comenzar = ref(null);
const comenzar_02 = ref(null);
const sticky = ref(null);
const title = ref(null);

const tiempo = 60;

function startGame(type) {

    // Borramos y restablecemos algunos datos.
    clearInterval(timer);
    result.value = "";
    gameType.value = type;
    time.value = 0;

    const random = Math.floor(Math.random() * preguntas.length);
    currentQuestion.value = preguntas[random];

    // Desactivamos el botón de 'Comenzar'
    comenzar.value.disabled = true;
    comenzar_02.value.disabled = true;

    // Mostrar el temporizador, ajustar el título para que no lo oculte
    sticky.value.hidden = false;
    title.value.classList.add('mt-15');

    // Sorteamos las preguntas, para que no sea tan obvio el patrón siempre.
    shuffledResponses.value = shuffle([
        currentQuestion.value.respuesta,
        ...currentQuestion.value.falsas
    ]);

    puntuacion.value = `Puntuación: ${score.value}`

    // Cada 1 segundo, aumentamos el valor del tiempo.
    timer = setInterval(() => {
        time.value++;
        timeNoReset.value--;

        puntuacion.value = `Puntuación: ${score.value}`

        if (timeNoReset.value <= 0) {
            toast("¡Se acabó el tiempo!", "info");
            clearInterval(timer)
            endGame()
        }
    }, 1000);


}

function checkAnswer(selected) {
    const correct = currentQuestion.value.respuesta;

    // Validamos y verificamos por tiempos, luego se reinicia el tiempo y se suma puntos y racha
    if (selected === correct) {
        if (time.value < 10) {
            toast("¡Correcto! +100", "success");
            score.value += 100;
        } else if (time.value < 20) {
            toast("¡Correcto! +50", "success");
            score.value += 50;
        } else {
            toast("¡Correcto! +25", "success");
            score.value += 25;
        }

        streak.value++;
        time.value = 0;
        startGame(gameType.value);

    } else {

        toast("¡Incorrecto!", "error");
        endGame(); // Podria cambiar luego para que simplemente siga el juego

    }
}

function endGame() {

    clearInterval(timer);

    comenzar.value.disabled = false;
    comenzar_02.value.disabled = false;

    sticky.value.hidden = true;
    title.value.classList.remove('mt-15');

    shuffledResponses.value = [];
    currentQuestion.value = "";
    puntuacion.value = "";
    gameType.value = "";

    result.value = `<span class="font-semibold">JUEGO FINALIZADO</span> <br/><br/> Puntuación Final: <span class="font-bold">${score.value}</span><br>Mayor Racha: <span class="font-bold">${streak.value}</span>`;

    score.value = 0;
    streak.value = 0;
    timeNoReset.value = tiempo; // 1 segundo


}

function toast(message, type) {

    snackbarMessage.value = message;
    snackbarType.value = type;

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        snackbarMessage.value = "";
    }, 3000);
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@keyframes slide-in {
    0% {
        transform: translateY(20px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

.animate-slide-in {
    animation: slide-in 0.3s ease-out;
}
</style>