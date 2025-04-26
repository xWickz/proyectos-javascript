<template>
  <section class=" h-screen w-full p-4 bg-gray-800 text-white">
    <div class="max-w-3xl mx-auto">
      <div class="font-bold text-4xl mb-3">
            <mark class="px-2 text-white bg-blue-700 rounded-sm dark:bg-blue-700">
                {{ proyectos[7].nombre }}
            </mark><br />

            <button type="button"
                class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onclick="document.getElementById('dialogo').showModal()">
                ¿Cómo funciona?
            </button>
            
        </div>
      <div class="mb-4">
        <div class="flex w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input
          type="text"
          placeholder="Buscar películas..."
          class="w-full outline-none"
          />
            <button>
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-zoom"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3.072a8 8 0 0 1 2.617 11.424l4.944 4.943a1.5 1.5 0 0 1 -2.008 2.225l-.114 -.103l-4.943 -4.944a8 8 0 0 1 -12.49 -6.332l-.006 -.285l.005 -.285a8 8 0 0 1 11.995 -6.643z" /></svg>
            </button>
          </div>
      </div>
      <div class="w-full flex gap-8 flex-wrap">
        <article class="flex flex-col w-54">
          <figure class="">
            <img class="rounded-xl" src="https://goauctionomega.blob.core.windows.net/stock/47044-2-small.jpg?v=63849549625803" alt="">
            
          </figure>
          <div
              class="p-4 "
            >
            <h2 class="text-lg font-semibold">Goodfellas</h2>
            <p class="text-sm text-gray-600">
              Goodfellas is a 1990 American biographical crime film directed by Martin Scorsese. It narrates the rise and fall of mob associate Henry Hill and his life in the mob.
            </p>
          </div>
        </article>
        <!-- si no hay ninguna pelicula -->
        <p class="text-gray-500">No se encontraron películas.</p>
      </div>

    </div>
    <!-- Funcionamiento del proyecto -->
    <dialog id="dialogo" class="dialog-custom bg-transparent p-0">
            <div class="p-6 rounded-xl bg-white dark:bg-gray-800 text-center w-120">
                <span class="text-white text-xl">¿Cómo funciona <span class="font-bold">{{ proyectos[0].nombre
                        }}</span>?</span>
                <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                <p class="mb-4 text-gray-800 dark:text-white" v-html="proyectos[0].funcionamiento"></p>
                <form method="dialog">
                    <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Cerrar</button>
                </form>
            </div>
        </dialog>

    <Footer />
  </section>
</template>

<script setup>
import Footer from './Footer.vue';
import proyectos from '../data/proyectos';

</script>
