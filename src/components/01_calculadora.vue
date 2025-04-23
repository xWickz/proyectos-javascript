<template>

  <section class="p-5 h-screen bg-white dark:bg-gray-800 dark:text-white">
    <div class="font-bold text-4xl mb-3">
            <mark class="px-2 text-white bg-blue-700 rounded-sm dark:bg-blue-700">
                {{ proyectos[0].nombre }}
            </mark><br />

            <button type="button"
                class="text-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onclick="document.getElementById('dialogo').showModal()">
                ¿Cómo funciona?
            </button>
            
        </div>
        <div class="h-auto w-auto">
          <div class="rounded-2xl p-6 h-156 w-128 mx-auto bg-gray-700 flex flex-col justify-center items-center">
            <!-- display -->
            <div class="flex-1">
              <div class="mb-2">
                <a class="text-xs font-bold hover:text-blue-400" href="https://github.com/joseverdev" target="_blank" rel="noopener">@joseverdev</a>
              </div>
              <div class="w-96 mx-auto text-3xl bg-gray-600 text-right px-6 py-6 rounded-md">
                4 + 5
              </div>
            </div>
            <!-- buttons -->
            <div class="flex-2 grid grid-cols-4 mt-8 text-2xl w-96 mx-auto gap-4">
              <button class="bg-gray-600 rounded-lg py-2">7</button>
              <button class="bg-gray-600 rounded-lg py-2">8</button>
              <button class="bg-gray-600 rounded-lg py-2">9</button>
              <button class="bg-gray-600 rounded-lg py-2">/</button>
             
              <button class="bg-gray-600 rounded-lg py-2">7</button>
              <button class="bg-gray-600 rounded-lg py-2">8</button>
              <button class="bg-gray-600 rounded-lg py-2">9</button>
              <button class="bg-gray-600 rounded-lg py-2">/</button>

              <button class="bg-gray-600 rounded-lg py-2">7</button>
              <button class="bg-gray-600 rounded-lg py-2">8</button>
              <button class="bg-gray-600 rounded-lg py-2">9</button>
              <button class="bg-gray-600 rounded-lg py-2">/</button>
              
              <button class="bg-gray-600 rounded-lg py-2">7</button>
              <button class="bg-gray-600 rounded-lg py-2">8</button>
              <button class="bg-gray-600 rounded-lg py-2">9</button>
              <button class="bg-gray-600 rounded-lg py-2">/</button>
            
            </div>
          </div>
        </div>
        <Footer />
  </section>

</template>

<script setup>

  import proyectos from '../data/proyectos';
  import Footer from './Footer.vue';

</script>