<template>
    <section class="bg-white dark:bg-gray-800 dark:text-white h-screen p-5">

        <div class="justify-center">

            <ProjectTitle id="1" />
            <ProjectInfo id="1" />

            <div class="flex justify-center gap-2 mb-1">
                <input type="text" placeholder="¿Qué harás hoy?" v-model="tarea" @keyup.enter="agregarTarea"
                    class="block w-60 p-2 h-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />

                <Button text="Agregar" @click="agregarTarea" />

                <p v-if="mensaje" class="text-red-400 font-semibold mb-4">{{ mensaje }}</p>
            </div>

            <div class="flex flex-wrap justify-center gap-4 mt-10">
                <div v-for="(tarea, index) in tareas" :key="index"
                    class="w-64 bg-gray-700 text-white p-4 rounded-lg shadow">

                    <div class="flex justify-between items-center mb-2">
                        <p class="font-bold text-xl">Tarea {{ index + 1 }}</p>


                        <button @click="eliminarTarea(index)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="#ff3c3c" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M3 3h18v18H3zM15 9l-6 6m0-6l6 6" />
                            </svg>
                        </button>

                    </div>
                    <p class="break-words max-h-32 overflow-auto">{{ tarea }}</p>
                </div>
            </div>

            <p v-if="tareas.length === 0" class="mt-8 text-xl font-bold text-center">
                ¡No hay nada! Aún... 😅
            </p>
        </div>

        <Footer />
    </section>
</template>

<script setup>
import { onMounted, watch } from 'vue';

// Import Utils
import Button from '../common/Button.vue';
import ProjectTitle from '../common/ProjectTitle.vue';
import ProjectInfo from '../common/ProjectInfo.vue';
import Footer from '../common/Footer.vue';

import {
    tarea,
    tareas,
    mensaje,
    agregarTarea,
    eliminarTarea
} from './todoList.js';

// Cargar tareas desde localStorage al cargar el componente
onMounted(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
        tareas.value = JSON.parse(tareasGuardadas);
    }
});

// Observar cambios y guardar en automático
watch(tareas, (nuevasTareas) => {
    localStorage.setItem('tareas', JSON.stringify(nuevasTareas));

}, { deep: true });


</script>