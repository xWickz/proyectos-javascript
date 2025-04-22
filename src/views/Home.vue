<script setup>
import Proyects from '../components/Proyects.vue'

import { ref } from 'vue';

const name = ref('Wickz');
</script>

<template>
    <div class="w-full h-full absolute top-0 left-0 z-0 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
    <section class="py-15 dark:text-white h-full bg-neutral-950">
      <div class="mx-auto lg:px-8 sm:px-6 z-10 relative">
        <div class="text-center">
          <p class="font-extrabold text-5xl text-gray-50">Proyectos de <mark class="px-2 rounded-sm text-yellow-200 dark:text-yellow-700">JavaScript</mark></p>
          <br />
          <p class="text-2xl text-gray-400">Realizado por <span class="font-bold" @mouseover="name = 'Santiago Griman'" @mouseleave="name = 'Wickz'">{{ name }}</span></p>
        </div>

        <div class="mt-10">
          <Proyects />
        </div>
      </div>
    </section>
</template>
