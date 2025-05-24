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

        <!-- Componente: Nombre del Proyecto, ¿Cómo funciona? -->
        <div :class="[]">
            <ProjectTitle id="5" ref="title"/>
            <ProjectInfo id="5"/>
        </div>

        <!-- Botones para comenzar el juego -->
        <div class="flex justify-center mb-7">
            <Button text="Comenzar" @click="startGame('normal')" ref="comenzar" id="comenzar"/>
            <Button text="Comenzar (con Respuestas)" @click="startGame('responses')" ref="comenzar_02" id="comenzar_02"/>
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
            <p class="text-lg font-medium" v-if="!result">Puntuación: {{ puntuacion }}</p>
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

        <!-- Componente: Footer -->
        <Footer />
    </section>
</template>

<script setup>
// Usaremos 'computed' para los cambios | Puntuación
import { ref, computed } from 'vue';
import { useQuiz } from './quizApp.js';
import './quizApp.css';

// Importamos la lógica del juego
const {
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
} = useQuiz();

// Import Utils
import Button from '../common/Button.vue';
import ProjectTitle from '../common/ProjectTitle.vue';
import ProjectInfo from '../common/ProjectInfo.vue';
import Footer from '../common/Footer.vue';


</script>