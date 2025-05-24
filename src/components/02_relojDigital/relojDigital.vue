<template>
    <section class="bg-white dark:bg-gray-800 text-white h-screen p-5">

        <ProjectTitle id="2" />
        <ProjectInfo id="2" />

        <div class="flex justify-center">
            <p class="text-8xl font-semibold tracking-wider" v-html="hora"/>
        </div>

        <Footer />

    </section>
</template>

<script setup>
import { onMounted } from 'vue';
import './relojDigital.css';

// Import Utils
import ProjectTitle from '../common/ProjectTitle.vue';
import ProjectInfo from '../common/ProjectInfo.vue';
import Footer from '../common/Footer.vue';

import { hora, iniciarReloj } from './relojDigital.js';

onMounted(() => {
    iniciarReloj();
});

</script>
