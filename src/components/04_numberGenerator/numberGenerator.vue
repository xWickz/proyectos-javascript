<template>
    <section class="p-5 h-screen bg-white dark:bg-gray-800 dark:text-white">

        <ProjectTitle id="3" />
        <ProjectInfo id="3" />

        <div class="mt-5 flex flex-col items-center justify-center h-96">

            <div class="flex">
                <label class="text-sm font-medium text-gray-900 dark:text-white w-6">
                    {{ rango }}
                </label>

                <input type="range" v-model="rango" min="1" max="100" value="50"
                    class="w-50 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

            </div>
            <br />

            <Button text="Generar" @click="generarNumero" />

            <br /> <br />

            <p @click="limpiar" class="text-2xl font-bold dark:text-white">{{ resultado }}</p>
        </div>

        <Footer />
    </section>
</template>

<script setup>
// Import Utils
import Button from '../common/Button.vue';
import ProjectTitle from '../common/ProjectTitle.vue';
import ProjectInfo from '../common/ProjectInfo.vue';
import Footer from '../common/Footer.vue';

import {
    rango,
    resultado,
    generarNumero,
    limpiar
} from './numberGenerator.js';


</script>