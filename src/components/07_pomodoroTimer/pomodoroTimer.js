import { ref, computed, onMounted } from 'vue';

// Definimos variables, el tiempo actual, estado del botón (Comenzar, Pausar) y el pomodoro actual
export let tiempoActual = ref(0);
export let buttonStatus = ref('');
export const tipoActual = ref('');

// Relacionado a todo lo del tiempo
export const intervalo = ref(null); // Guardamos el ID del Intervalo. Nos sirve para pararlo.
export const corriendo = ref(false); // Para saber si está activo o pausado.

export const minutos = computed(() => Math.trunc(tiempoActual.value / 60));
export const segundos = computed(() => tiempoActual.value % 60);

export const formatoTiempo = computed(() => {
    return `${minutos.value}:${segundos.value.toString().padStart(2, '0')}`;
});

// con los ciclos completados evaluamos cuando merece un descanso corto o largo
// en este caso son 4 pomodoros para 1 descanso largo :D
export let ciclosCompletados = ref(1);

// Cambiamos el estado del Pomodoro

export function pomodoroTimer() {
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

    return {
        tiempoActual,
        buttonStatus,
        intervalo,
        corriendo,
        minutos,
        segundos,
        formatoTiempo,
        ciclosCompletados,
        tipoActual,
        pomodoroSwitch,
        iniciarPomodoro,
        detenerPomodoro,
        manejarPomodoro,
        manejarEstado
    };
}
