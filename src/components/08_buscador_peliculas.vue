<template>
  <section class="bg-white dark:bg-gray-800 dark:text-white min-h-screen p-5">
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
  
  <div class="max-w-5xl mx-auto container">
      <div class="mb-4">
        <div class="flex w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input
          type="text"
          placeholder="Buscar películas..."
          class="w-full outline-none"
          v-model="peliculaInput"
          @keyup.enter="buscarPelicula"
          />
            <button type="button" @click="buscarPelicula">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>
      </div>

      <!-- si no hay ninguna pelicula -->
      <p class="text-gray-400 mb-5 mt-5 text-center">{{ informacion }}</p>

      <div v-if="cargando" class="text-center">Cargando...</div>

      <div class="flex flex-wrap gap-4 mt-10">
      <div v-for="data in peliculasEncontradas" class="w-min flex flex-wrap border rounded-lg p-2 bg-gray-700 mb-2">
        <article class="flex flex-col w-54">
          <figure>
            <img class="rounded-xl w-full h-auto" :src="data.Poster" :alt="data.Title"> 
          </figure>

          <div class="p-2">
            <h2 class="text-lg font-semibold">{{ data.Title }} <span class="text-sm text-gray-400 font-normal">{{ data.Year }}</span></h2>
            
            <p class="text-sm text-gray-400">
              {{ data.Plot }}
            </p>
          </div>
        </article>
      </div>
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
import { ref } from 'vue';
import Footer from './Footer.vue';
import proyectos from '../data/proyectos';

const peliculaInput = ref('');
const peliculasEncontradas = ref([]);
const informacion = ref('');
const cargando = ref(false);

async function buscarPelicula() {

  // Borramos el contenido anterior
  peliculasEncontradas.value = [];
  const entrada = peliculaInput.value.trim();

  if(!entrada) {
    informacion.value = "Busca alguna película primero, no?"
    setTimeout(() => ( informacion.value = '' ), 3000);
    return;
  }

  cargando.value = true;

  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(entrada)}&apikey=c147a567`);
    const data = await response.json();

    // Si no encuentra una película, no hacemos nada
    if(data.Response === 'False') {
      informacion.value = "Pelicula no encontrada."
      setTimeout(() => ( informacion.value = '' ), 3000);
      return;
    }

    for(const pelicula of data.Search) {
      const detalleResponse = await fetch(`https://www.omdbapi.com/?i=${pelicula.imdbID}&apikey=c147a567`);
      const detalleData = await detalleResponse.json();
      peliculasEncontradas.value.push(detalleData);

    }

  } catch (error) {

    console.log('no se encontró')
    informacion.value = error

  } finally {

    peliculaInput.value = '';
    cargando.value = false;

  }

}

// info util
// data.Year
// data.Rated
// data.Released
// data.Runtime
// data.Plot
</script>
