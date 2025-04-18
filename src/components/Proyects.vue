<script setup>
import proyectos from '../data/proyectos.js';
</script>

<template>
    <section class="py-1 bg-white dark:bg-gray-800 dark:text-white flex justify-center">

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">

        <div v-for="proyecto in proyectos" :key="proyecto.nombre" 
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-700 ">

        <!-- Imagen del proyecto -->
        <router-link :to="`/${proyecto.url}`">
            <img class="rounded-t-lg" :src="`./public/images/${proyecto.imagen}`" :alt="proyecto.nombre"/>
        </router-link>

        <!-- Información del proyecto -->
        <div class="p-5">
            <a href="#" >
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                    {{ proyecto.nombre }}
                </h5>
            </a>
            
            <div class="flex justify-center">
                <span class="text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-gray-200 dark:text-gray-800 justify-center mt-2 ">
                    {{ proyecto.nivel }}
                </span>
            </div>

            <p class="mb-2 mt-3 font-normal text-gray-700 dark:text-gray-400 text-center">
                    {{ proyecto.descripcion }}
            </p>
        </div>

        </div>
        </div>
    </section>
</template>

