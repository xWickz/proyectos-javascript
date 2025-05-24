import { ref, computed } from 'vue';
import { preguntas } from '../../data/preguntas.js'; // JSON con preguntas

export function useQuiz() {

    const score = ref(0);
    const time = ref(0);
    const streak = ref(0);
    const gameType = ref('');
    const result = ref('');
    const snackbarMessage = ref('');
    const snackbarType = ref('');
    const puntuacion = computed(() => score.value);
    const tiempo = 60;
    const timeNoReset = ref(tiempo);
    
    let timer;
    let toastTimer;
    
    const currentQuestion = ref({});
    const shuffledResponses = ref([]);
    
    const comenzar = ref(null);
    const comenzar_02 = ref(null);
    const sticky = ref(null);
    const title = ref(null);
    
    const SCORE_REWARDS = {
        SHORT_TIME: 100,
        MEDIUM_TIME: 50,
        LONG_TIME: 25
    };
    
    function startGame(type) {
    
        resetGame();
        gameType.value = type;
        comenzar.value.disabled = true;
        sticky.value.hidden = false;
        nextQuestion();
    
        // Cada 1 segundo, aumentamos el valor del tiempo.
        timer = setInterval(() => {
            time.value++;
            timeNoReset.value--;
    
            if (timeNoReset.value <= 0) {
                toast("¡Se acabó el tiempo!", "info");
                clearInterval(timer)
                endGame()
            }
        }, 1000);
    
    
    }
    
    function nextQuestion() {
        const random = Math.floor(Math.random() * preguntas.length);
        currentQuestion.value = preguntas[random];
    
        // Sorteamos las preguntas, para que no sea tan obvio el patrón siempre.
        shuffledResponses.value = shuffle([
            currentQuestion.value.respuesta,
            ...currentQuestion.value.falsas
        ]);
    
    }
    
    function checkAnswer(selected) {
        const correct = currentQuestion.value.respuesta;
    
        // Validamos y verificamos por tiempos, luego se reinicia el tiempo y se suma puntos y racha
        if (selected === correct) {
            if (time.value < 10) {
                toast("¡Correcto! +100", "success");
                score.value += SCORE_REWARDS.SHORT_TIME;
            } else if (time.value < 20) {
                toast("¡Correcto! +50", "success");
                score.value += SCORE_REWARDS.MEDIUM_TIME;
            } else {
                toast("¡Correcto! +25", "success");
                score.value += SCORE_REWARDS.LONG_TIME;
            }
    
            streak.value++;
            time.value = 0;
            nextQuestion();
    
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
        //title.value.classList.remove('mt-15');
    
        shuffledResponses.value = [];
        currentQuestion.value = "";
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
    
    function resetGame() {
        clearInterval(timer);
        score.value = 0;
        streak.value = 0;
        time.value = 0;
        timeNoReset.value = tiempo;
        result.value = "";
    }
    
    function startTime() {
        // Cada 1 segundo, aumentamos el valor del tiempo.
        timer = setInterval(() => {
            time.value++;
            timeNoReset.value--;
    
            if (timeNoReset.value <= 0) {
                toast("¡Se acabó el tiempo!", "info");
                endGame()
            }
        }, 1000);
    }

    return {
        startGame,
        checkAnswer,
        resetGame,
        puntuacion,
        time,
        timeNoReset,
        comenzar,
        comenzar_02,
        sticky,
        title,
        currentQuestion,
        shuffledResponses,
        gameType,
        result,
        snackbarMessage,
        snackbarType,
        startTime,
    };
}
