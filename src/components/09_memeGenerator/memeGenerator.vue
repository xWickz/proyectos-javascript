<template>
  <section class="bg-white dark:bg-gray-800 dark:text-white min-h-screen p-5">

      <!-- Componente: Nombre del Proyecto, ¿Cómo funciona? -->
      <ProjectTitle id="8" />
      <ProjectInfo id="8" />

      <div class="flex flex-col items-center mb-20">
        <input type="text" placeholder="Escribe el texto superior" class="w-50 p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="textoSuperior" maxlength="40"/>
        <input type="text" placeholder="Escribe el texto inferior" class="w-50 p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="textoInferior" maxlength="40" v-if="secondaryText"/>

        <input type="checkbox" id="texto2" @click="toggleText"/>
        <label for="texto2" class="text-gray-300"> Texto Inferior </label>

        <canvas id="myCanvas" width="800" height="400" style="border:2px solid black;" ref="canvas">
          Tu navegador no soporta canva.
        </canvas>

        <label for="files" class="w-auto p-2 mb-5 mt-2 border border-blue-600 bg-blue-700 hover:bg-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Sube una imagen</label>
        <input type="file" id="files" style="display:none;" accept="image/png, image/jpeg" @change="handleImageUpload"/>

      </div>
      <!-- Componente: Footer -->
      <Footer />
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// Import Utils
import ProjectTitle from '../common/ProjectTitle.vue';
import ProjectInfo from '../common/ProjectInfo.vue';
import Footer from '../common/Footer.vue';

const textoSuperior = ref('');
const textoInferior = ref('');
const canvas = ref(null);
const imageSrc = ref("https://cdn.mos.cms.futurecdn.net/KHQb3Ny62YxXnCEon4mm43.jpg"); // URL de la imagen del meme

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();

  reader.onload = e => {
    imageSrc.value = e.target.result;
    drawCanvas();
  }

  reader.readAsDataURL(file); // Leer el archivo como URL de datos

}

function drawCanvas() {
  const c = canvas.value;
  if (!c) return;

  const ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height); // Limpiar el canvas

  const imagen = new Image();
  imagen.src = imageSrc.value;
  imagen.onload = function() {
    ctx.drawImage(imagen, 0, 0, c.width, c.height); // Dibujar la imagen
    ctx.font = `${Math.floor(c.height / 10)}px Impact`;
    ctx.strokeStyle = "black"; // Color del borde del texto
    ctx.lineWidth = 5; // Ancho del borde del texto
    ctx.fillStyle = "white"; // Color del texto

    ctx.textAlign = "center"; // Alinear el texto al centro

    ctx.textBaseline = "top"; // Alinear el texto desde la parte superior
    ctx.strokeText(textoSuperior.value, c.width / 2, 20); // Dibujar el borde del texto
    ctx.fillText(textoSuperior.value, c.width / 2, 20); // Dibujar el texto

    ctx.textBaseline = "bottom"; // Alinear el texto desde la parte inferior
    ctx.strokeText(textoInferior.value, c.width / 2, c.height - 20); // Dibujar el borde del texto
    ctx.fillText(textoInferior.value, c.width / 2, c.height - 20); // Dibujar el texto
  };

}

const secondaryText = ref(false); // Variable para mostrar/ocultar el segundo texto

function toggleText() {
  secondaryText.value = !secondaryText.value; // Cambiar el estado del segundo texto
  if (!secondaryText.value) {
    textoInferior.value = ''; // Limpiar el texto inferior si se oculta
  }
}

onMounted(() => {
  drawCanvas();
});


watch([textoSuperior, textoInferior, imageSrc], drawCanvas);

</script>