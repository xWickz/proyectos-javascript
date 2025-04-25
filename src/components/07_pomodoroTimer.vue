<!--
    [ POMODORO TIMER - 07 ]
    Lista que haceres:
    1. Temporizador
        * 25 minutos el inicial
        * 5 minutos el descanso
        * 15 minutos el descanso largo
    2. UI
        * diseño limpio
        * botón de comenzar y pausar
        * botón de skip
    * que permita enviar notificaciones y sonidos
    por ahora eso y luego vamos

-->
<template>
    <section :class="['bg-white dark:text-white h-screen p-5', tipoActual == 'pomodoro' ? 'dark:bg-slate-800 transition-colors duration-400 ease-in-out' : tipoActual == 'shortBreak' ? 'dark:bg-zinc-800 transition-colors duration-400 ease-in-out' : 'dark:bg-stone-800 transition-colors duration-400 ease-in-out']">

        <div class="font-bold text-4xl mb-3">
            <mark class="px-2 text-white bg-blue-700 rounded-sm dark:bg-blue-700">
                {{ proyectos[6].nombre }}
            </mark><br />

            <button type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onclick="document.getElementById('dialogo').showModal()">
                ¿Cómo funciona?
            </button>
        </div>


        <div class="flex justify-center">
            <div
                :class="['mt-15 backdrop-blur-xl w-md block border border-gray-200 rounded-lg shadow-sm p-6 ', tipoActual == 'pomodoro' ? 'dark:bg-gray-700 dark:border-gray-600 transition-colors duration-400 ease-in-out' :tipoActual == 'shortBreak' ? 'dark:bg-gray-600 dark:border-gray-500 transition-colors duration-400 ease-in-out' : 'dark:bg-gray-500 dark:border-gray-400 transition-colors duration-400 ease-in-out']">
                <div class="grid grid-cols-3">
                    <button type="button"
                        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        @click="pomodoroSwitch('pomodoro')">
                        Pomodoro
                    </button>
                    <button type="button"
                        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        @click="pomodoroSwitch('shortBreak')">
                        Short Break
                    </button>
                    <button type="button"
                        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        @click="pomodoroSwitch('longBreak')">
                        Long Break
                    </button>

                </div>

                <div class="text-center mt-10 text-6xl font-semibold">
                    {{ formatoTiempo }}
                </div>

                <div class="justify-center flex mt-8">
                    <button type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        @click="buttonStatus === 'Comenzar' ? iniciarPomodoro() : detenerPomodoro()">
                        {{ buttonStatus }}
                    </button>
                </div>
            </div>

            <div></div>
        </div>
    </section>
</template>

<script setup>
import proyectos from '../data/proyectos.js';
import { ref, onMounted, computed } from 'vue';

let tiempoActual = ref(0);
const tipoActual = ref('');

let buttonStatus = ref('');

// IA AYUDA
const intervalo = ref(null); // Guardamos el ID del Intervalo. Nos sirve para pararlo.
const corriendo = ref(false); // Para saber si está activo o pausado.

const minutos = computed(() => Math.trunc(tiempoActual.value / 60));
const segundos = computed(() => tiempoActual.value % 60);

const formatoTiempo = computed(() => {
    return `${minutos.value}:${segundos.value.toString().padStart(2, '0')}`;
});

// Al inicializar la página, en automático se pone en el primer estado.
onMounted(() => {
    
    // Asignar el Comenzar
    buttonStatus.value = "Comenzar";

    // Detenemos intervalos (si los hay)
    detenerPomodoro();
    
    // Ponemos en automático el modo pomodoro el 1
    pomodoroSwitch('pomodoro');

    // Cambiamos el valor del tipoActual a pomodoro, sirve para la función iniciarPomodoro().
    tipoActual.value = 'pomodoro';
});

function pomodoroSwitch(type) {
    
    tipoActual.value = type;

    if(type === 'pomodoro') {
        tiempoActual.value = 1500 // 1500 segundos = 25 minutos
    } else if(type === 'shortBreak') {
        tiempoActual.value = 300 // 300 segundos = 5 minutos
    } else {
        tiempoActual.value = 900 // 900 segundos = 15 minutos
    }

    detenerPomodoro();

}

function iniciarPomodoro() {

    if(corriendo.value) return; // Evitamos que se inicie varias veces.

    corriendo.value = true;

    intervalo.value = setInterval(() => {
        if(tiempoActual.value > 0) {
            tiempoActual.value--;
        } else {
            detenerPomodoro(); // Se detiene cuando llegue a 0 segundos
            // Aquí va la lógica
        }
    }, 1000);

    buttonStatus.value = "Parar"

}

function detenerPomodoro() {
    clearInterval(intervalo.value);
    corriendo.value = false;
    buttonStatus.value = "Comenzar"
}
</script>