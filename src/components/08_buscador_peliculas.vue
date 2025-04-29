<template>
  <section class="bg-white dark:bg-gray-800 dark:text-white min-h-screen p-5">

    <!-- Componente: Nombre del Proyecto, ¿Cómo funciona? -->
    <ProjectTitle id="7" />
    <ProjectInfo id="7" />

    <div class="max-w-5xl mx-auto container">
      <div class="mb-4">
        <div
          class="flex w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input type="text" placeholder="Buscar películas..." class="w-full outline-none" v-model="peliculaInput"
            @keyup.enter="buscarPelicula" />
          <button type="button" @click="buscarPelicula">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- si no hay ninguna pelicula -->
      <p class="text-gray-400 mb-5 mt-5 text-center">{{ informacion }}</p>

      <div v-if="cargando" class="text-center">Cargando...</div>

      <div class="flex flex-wrap gap-4 mt-10 justify-center">
        <div v-for="data in peliculasEncontradas"
          class="w-min flex flex-wrap border rounded-lg p-2 bg-gray-700 mb-2 transition duration-200 ease-in-out hover:-translate-y-2 border-gray-600">
          <article class="flex flex-col w-54">

            <!-- Imagen de la Pelicula -->
            <figure>
              <img class="rounded-md w-55 h-80" :src="data.Poster" :alt="data.Title">
            </figure>

            <div class="p-2">

              <!-- Titulo y Año de la Pelicula -->
              <h2 class="text-lg font-semibold">{{ data.Title }} <span class="text-sm text-gray-300 font-normal">{{
                  data.Year }}</span></h2>

              <p class="text-sm text-gray-400">
                {{ data.Plot }}
              </p>
            </div>
          </article>
        </div>
      </div>

    </div>

    <Footer />
  </section>
</template>

<script setup>
import { ref } from 'vue';

// Import Utils
import Button from '../utils/Button.vue';
import ProjectTitle from '../utils/ProjectTitle.vue';
import ProjectInfo from '../utils/ProjectInfo.vue';
import Footer from '../utils/Footer.vue';

const peliculaInput = ref('');
const peliculasEncontradas = ref([]);
const informacion = ref('');
const cargando = ref(false);

async function buscarPelicula() {

  // Borramos el contenido anterior
  peliculasEncontradas.value = [];
  const entrada = peliculaInput.value.trim();

  if (!entrada) {
    informacion.value = "Busca alguna película primero, no?"
    setTimeout(() => (informacion.value = ''), 3000);
    return;
  }

  cargando.value = true;

  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(entrada)}&apikey=c147a567`);
    const data = await response.json();

    // Si no encuentra una película, no hacemos nada
    if (data.Response === 'False') {
      informacion.value = "Pelicula no encontrada."
      setTimeout(() => (informacion.value = ''), 3000);
      return;
    }

    for (const pelicula of data.Search) {
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
// data.Year año de lanzamiento
// data.Rated su puntuación
// data.Released cuándo fue lanzado
// data.Runtime duración de la pelis
// data.Plot descripción
</script>
