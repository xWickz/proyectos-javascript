<template>
    <section class="bg-white dark:bg-gray-800 text-white p-5 h-screen">
        <div class="font-bold text-3xl mb-5">
            Quiz App
        </div>

        <div class="flex justify-center mb-7">
            <button type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:hover:bg-blue-400"
            @click="startGame('normal')"
            ref="comenzar"
            id="comenzar">
                Comenzar
            </button>

            <button type="button"
            class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:hover:bg-blue-400"
            @click="startGame('responses')"
            ref="comenzar_02"
            id="comenzar_02">
                Comenzar (con Respuestas)
            </button>
        </div>

        <p class="text-center text-3xl mb-3">
            {{ currentQuestion.pregunta }}
        </p>

        <div class="flex justify-center">
            <div
            v-for="response in shuffledResponses"
            :key="response">   

                <button type="button"
                :class="['text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2',
                    gameType === 'responses' && response === currentQuestion.respuesta
                    ? 'bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800'
                    : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                ]"  
                @click="checkAnswer(response)">
                    {{ response }}
                </button>
            </div>

        </div>

        <div class="mt-4 text-center">
            <p class="text-lg font-medium">{{ puntuacion }}</p>
            <p v-if="result" class="mt-2 text-2xl text-gray-200" v-html="result" />
        </div>

        <!-- Toast Notification -->
        <transition name="fade">
        <div
            v-if="snackbarMessage"
            :class="['fixed bottom-6 right-6 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in', snackbarType === 'success' ? 'dark:bg-green-500' : 'dark:bg-red-500']"
        >
        <svg v-if="snackbarType === 'success'" class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <svg v-else class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
            <span>{{ snackbarMessage }}</span>
        </div>
        </transition>

        <Footer />
    </section>
</template>

<script setup>
import { ref } from 'vue';
import Footer from './Footer.vue';

const preguntas = [
  { pregunta: "¿Cuál es el planeta más cercano al Sol?", respuesta: "Mercurio", falsas: ["Venus", "Marte"] },
  { pregunta: "¿En qué continente se encuentra Egipto?", respuesta: "África", falsas: ["Asia", "Europa"] },
  { pregunta: "¿Cuántos colores tiene la bandera de México?", respuesta: "Tres", falsas: ["Cuatro", "Dos"] },
  { pregunta: "¿Quién escribió 'Cien años de soledad'?", respuesta: "Gabriel García Márquez", falsas: ["Pablo Neruda", "Mario Vargas Llosa"] },
  { pregunta: "¿Cuál es el océano más grande del mundo?", respuesta: "Océano Pacífico", falsas: ["Océano Atlántico", "Océano Índico"] },
  { pregunta: "¿Cuánto es 9 x 8?", respuesta: "72", falsas: ["81", "64"] },
  { pregunta: "¿Cuál es el símbolo químico del oro?", respuesta: "Au", falsas: ["Ag", "Pb"] },
  { pregunta: "¿Quién pintó la Mona Lisa?", respuesta: "Leonardo da Vinci", falsas: ["Miguel Ángel", "Vincent van Gogh"] },
  { pregunta: "¿Qué país ganó el Mundial de Fútbol en 2010?", respuesta: "España", falsas: ["Brasil", "Alemania"] },
  { pregunta: "¿Qué gas respiramos para vivir?", respuesta: "Oxígeno", falsas: ["Hidrógeno", "Dióxido de carbono"] }
];

const score = ref(0);
const time = ref(0);
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

    // Sorteamos las preguntas, para que no sea tan obvio el patrón siempre.
    shuffledResponses.value = shuffle([
        currentQuestion.value.respuesta,
        ...currentQuestion.value.falsas
    ]);

    puntuacion.value = `Puntuación: ${score.value}`

    // Cada 1 segundo, aumentamos el valor del tiempo.
    timer = setInterval(() => {
        time.value++;
        puntuacion.value = `Puntuación: ${score.value}`
    }, 1000);

}

function checkAnswer(selected) {
    const correct = currentQuestion.value.respuesta;

    // Validamos y verificamos por tiempos, luego se reinicia el tiempo y se suma puntos y racha
    if(selected === correct) {
        if(time.value < 10) {
            toast("¡Correcto! +100", "success");
            score.value += 100;
        } else if(time.value < 20) {
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

    shuffledResponses.value = [];
    currentQuestion.value = "";
    puntuacion.value = "";
    gameType.value = "";
    
    result.value = `<span class="font-semibold">JUEGO FINALIZADO</span> <br/><br/> Puntuación Final: <span class="font-bold">${score.value}</span><br>Mayor Racha: <span class="font-bold">${streak.value}</span>`;
    
    score.value = 0;
    streak.value = 0;


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