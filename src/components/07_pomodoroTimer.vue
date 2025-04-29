<!--
    [ POMODORO TIMER - 07 ]
    Lista que haceres:
    1. Temporizador
        * 25 minutos el inicial. LISTO
        * 5 minutos el descanso. LISTO
        * 15 minutos el descanso largo. LISTO
    2. UI
        * diseño limpio. LISTO
        * botón de comenzar y pausar. LISTO
        * botón de skip
    * que permita enviar notificaciones y sonidos
    por ahora eso y luego vamos. LISTO

    * Contador de Ciclos
    * localStorage para guardar: estado actual, ciclo completado
    * Modo oscuro/claro
    * historial de pomodoros
    * tiempo ajustable
    * nombre del proyecto o tarea
    

-->
<template>
    <section
        :class="['bg-white dark:text-white h-screen p-5', tipoActual == 'pomodoro' ? 'dark:bg-slate-800 transition-colors duration-400 ease-in-out' : tipoActual == 'shortBreak' ? 'dark:bg-zinc-800 transition-colors duration-400 ease-in-out' : 'dark:bg-stone-800 transition-colors duration-400 ease-in-out']">

        <!-- Componente: Nombre del Proyecto, ¿Cómo funciona? -->
        <ProjectTitle id="6" />
        <ProjectInfo id="6" />


        <div class="flex justify-center">
            <div
                :class="['mt-15 backdrop-blur-xl w-md block border border-gray-200 rounded-lg shadow-sm p-6 ', tipoActual == 'pomodoro' ? 'dark:bg-gray-700 dark:border-gray-600 transition-colors duration-400 ease-in-out' :tipoActual == 'shortBreak' ? 'dark:bg-gray-600 dark:border-gray-500 transition-colors duration-400 ease-in-out' : 'dark:bg-gray-500 dark:border-gray-400 transition-colors duration-400 ease-in-out']">
                <div class="grid grid-cols-3">
                    <button type="button" @click="pomodoroSwitch('pomodoro')" :class="[
                        'py-2.5 px-5 me-2 mb-2 text-sm font-medium rounded-lg border focus:outline-none',
                        'focus:z-10 focus:ring-2',
                        tipoActual === 'pomodoro'
                            ? 'bg-blue-700 text-white border-blue-700 ring-blue-200 dark:bg-blue-600 dark:border-blue-600 dark:text-white'
                            : 'text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                    ]">
                        Pomodoro
                    </button>
                    <button type="button" @click="pomodoroSwitch('shortBreak')" :class="[
                        'py-2.5 px-5 me-2 mb-2 text-sm font-medium rounded-lg border focus:outline-none',
                        'focus:z-10 focus:ring-2',
                        tipoActual === 'shortBreak'
                            ? 'bg-blue-700 text-white border-blue-700 ring-blue-200 dark:bg-blue-600 dark:border-blue-600 dark:text-white'
                            : 'text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                    ]">
                        Short Break
                    </button>
                    <button type="button" @click="pomodoroSwitch('longBreak')" :class="[
                        'py-2.5 px-5 me-2 mb-2 text-sm font-medium rounded-lg border focus:outline-none',
                        'focus:z-10 focus:ring-2',
                        tipoActual === 'longBreak'
                            ? 'bg-blue-700 text-white border-blue-700 ring-blue-200 dark:bg-blue-600 dark:border-blue-600 dark:text-white'
                            : 'text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                    ]">
                        Long Break
                    </button>

                </div>

                <div class="text-center mt-10 text-6xl font-semibold">
                    {{ formatoTiempo }}
                </div>

                <div class="justify-center flex mt-8">
                    <Button :text=buttonStatus
                    @click="manejarPomodoro" 
                    :class="buttonStatus === 'Comenzar' ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800' : 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:ring-red-200 dark:focus:ring-red-700'"/>
                </div>
            </div>
        </div>

        <Footer />
    </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

// Import Utils
import Button from '../utils/Button.vue';
import ProjectTitle from '../utils/ProjectTitle.vue';
import ProjectInfo from '../utils/ProjectInfo.vue';
import Footer from '../utils/Footer.vue';

// Definimos variables, el tiempo actual, estado del botón (Comenzar, Pausar) y el pomodoro actual
let tiempoActual = ref(0);
let buttonStatus = ref('');
const tipoActual = ref('');

// Relacionado a todo lo del tiempo
const intervalo = ref(null); // Guardamos el ID del Intervalo. Nos sirve para pararlo.
const corriendo = ref(false); // Para saber si está activo o pausado.

const minutos = computed(() => Math.trunc(tiempoActual.value / 60));
const segundos = computed(() => tiempoActual.value % 60);

const formatoTiempo = computed(() => {
    return `${minutos.value}:${segundos.value.toString().padStart(2, '0')}`;
});

// con los ciclos completados evaluamos cuando merece un descanso corto o largo
// en este caso son 4 pomodoros para 1 descanso largo :D
let ciclosCompletados = ref(1);

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

    // Si aún no ha activado las notificaciones
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
});

// Cambiamos el estado del Pomodoro
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

// Iniciamos el Pomodoro
function iniciarPomodoro() {

    if(corriendo.value) return; // Evitamos que se inicie varias veces.

    corriendo.value = true;

    intervalo.value = setInterval(() => {
        if(tiempoActual.value > 0) {
            tiempoActual.value--;
        } else {
            detenerPomodoro(); // Se detiene cuando llegue a 0 segundos
            manejarEstado(); // Cambio de estado automático
        }
    }, 1000);

    buttonStatus.value = "Parar"

}

// Detenemos el intervalo (contador)
function detenerPomodoro() {
    clearInterval(intervalo.value);
    corriendo.value = false;
    buttonStatus.value = "Comenzar"
}

// Manejamos el estado del botón, en una función para que sea más limpio
function manejarPomodoro() {
    if (buttonStatus.value === 'Comenzar') {
        iniciarPomodoro();
    } else {
        detenerPomodoro();
    }
}

function manejarEstado() {
    if (tipoActual.value === 'pomodoro') {
        ciclosCompletados.value++;
        if (ciclosCompletados.value % 4 === 0) {
            pomodoroSwitch('longBreak');
            new Notification("Pomodoro Timer", { body: '¡Terminaste 4 ciclos! Ahora toca un descanso largo.' });
            iniciarPomodoro();
        } else {
            pomodoroSwitch('shortBreak');
            new Notification("Pomodoro Timer", { body: '¡Buen trabajo! Ahora un descanso corto.' });
            iniciarPomodoro();
        }

    } else if (tipoActual.value === 'shortBreak') {
        pomodoroSwitch('pomodoro');
        new Notification("Pomodoro Timer", { body: 'Descanso corto terminado. ¡Vamos con otro Pomodoro!' });
        iniciarPomodoro();
    } else if (tipoActual.value === 'longBreak') {
        pomodoroSwitch('pomodoro');
        new Notification("Pomodoro Timer", { body: 'Descanso largo terminado. ¡Vamos a volver con el enfoque al Pomodoro!' });
        iniciarPomodoro();
    }

    console.log('CICLOS COMPLETADOS: ', ciclosCompletados.value);
}

// Solicitamos permiso para enviar notificaciones
Notification.requestPermission().then((result) => {
  console.log(result);
});
</script>