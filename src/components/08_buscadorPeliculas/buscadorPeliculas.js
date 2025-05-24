import { ref } from 'vue';

export const peliculaInput = ref('');
export const peliculasEncontradas = ref([]);
export const informacion = ref('');
export const cargando = ref(false);

export function peliculas() {

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

      return {
        peliculaInput,
        peliculasEncontradas,
        buscarPelicula,
        informacion,
        cargando
      };

}
