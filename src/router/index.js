import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';

import Calculadora from "../components/01_calculadora.vue";
import relojDigital from "../components/02_relojdigital.vue";
import ListaDeTareas from "../components/03_todolist.vue";
import GeneradorDeNumeros from "../components/04_numbergen.vue";
import PPT from "../components/05_ppt.vue";
import QuizApp from "../components/06_quizapp.vue";
import pomodoroTimer from "../components/07_pomodoroTimer.vue";
import buscadorPeliculas from "../components/08_buscador_peliculas.vue";

const routes = [
    { path: '/', name: 'Inicio', component: Home },
    { path: '/generador-numeros', name: 'Generador de Números', component: GeneradorDeNumeros},
    { path: '/lista-tareas', name: 'Lista de Tareas', component: ListaDeTareas },
    { path: '/reloj-digital', name: 'Reloj Digital', component: relojDigital },
    { path: '/ppt', name: 'Piedra Papel Tijera', component: PPT },
    { path: '/quizapp', name: 'Quiz App', component: QuizApp },
    { path: '/calculadora', name: 'Calculadora', component: Calculadora },
    { path: '/pomodoro', name: 'Pomodoro Timer', component: pomodoroTimer },
    { path: '/buscador-peliculas', name: 'Buscador Peliculas', component: buscadorPeliculas },


];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router