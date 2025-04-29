<script setup lang="ts">
import proyectos from '../data/proyectos.js';
defineProps<{ id: float }>();
</script>

<template>
    <!-- Funcionamiento del proyecto -->
    <dialog id="dialogo" class="dialog-custom bg-transparent p-0">
        <div class="p-6 rounded-xl bg-white dark:bg-gray-800 text-center w-120">
            <span class="text-white text-xl">¿Cómo funciona
                <span class="font-bold" v-html="proyectos[id].nombre" />?</span>
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
            <p class="mb-4 text-gray-800 dark:text-white" v-html="proyectos[id].funcionamiento" />
            <form method="dialog">
                <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Cerrar</button>
            </form>
        </div>
    </dialog>
</template>