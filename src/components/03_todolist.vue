<template>
    <section class="bg-white dark:bg-gray-800 dark:text-white h-screen p-5">

        <div class="justify-center">
            <div class="font-bold text-4xl mb-3">
                Lista de Tareas
            </div>

            <div class="flex justify-center gap-2 mb-1">
                <input type="text" 
                placeholder="¿Qué harás hoy?" 
                v-model="tarea"
                @keyup.enter="agregarTarea"
                class="block w-60 p-2 h-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />

                <button type="button" 
                @click="agregarTarea"
                class="text-white bg-blue-700 h-10 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Agregar
                </button>
                
                <br/>
                <p v-if="mensaje" class="text-red-400 font-semibold mb-4">{{ mensaje }}</p>
            </div>

             

             <div class="flex flex-wrap justify-center gap-4 mt-10">
                <div
                v-for="(t, index) in tareas"
                :key="index"
                class="w-64 bg-gray-700 text-white p-4 rounded-lg shadow">

                <div class="flex justify-between items-center mb-2">
                    <p class="font-bold">Tarea {{ index + 1 }}</p>
                    <button @click="eliminarTarea(index)" class="text-red-500 hover:text-red-300">X</button>
                </div>
                <p class="break-words max-h-32 overflow-auto">{{ t }}</p>
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
import { ref } from 'vue';
import Footer from './Footer.vue';

const tarea = ref('');
const tareas = ref([]);
const mensaje = ref('');

function agregarTarea() { 
    const entrada = tarea.value.trim();

    if(!entrada) {
        mensaje.value = "¡Agrega una tarea!"
        setTimeout(() => (mensaje.value = ''), 2000);
        return;
    }

    tareas.value.push(entrada);
    tarea.value = "";
    mensaje.value = "";
}

function eliminarTarea(index) {
    tareas.value.splice(index, 1)
}
</script>