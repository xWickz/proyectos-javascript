<script setup lang="ts">
import proyectos from '../data/proyectos.js';
defineProps<{ id: float }>();
</script>

<template>
    <!-- Título -->
    <div class="font-bold text-4xl mb-3" ref="title">
        <mark class="px-2 text-white bg-blue-700 rounded-sm dark:bg-blue-700">
            {{ proyectos[id].nombre }}
        </mark><br />

        <button type="button"
            class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onclick="document.getElementById('dialogo').showModal()">
            ¿Cómo funciona?
        </button>
    </div>
</template>