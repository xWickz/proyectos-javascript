<!--
  [ CALCULADORA APP - 01 ]
  Aplicación básica, en la cuál cumple
  con sus funciones pertinentes:
  Suma, Resta, Multiplicación, División

  Adicionalmente al proyecto se le agregó
  la función de poder poner decimales y 
  factoriales. (Esto es adicional)

  Más adelante en el script se estará explicando
  el funcionamiento del código.

  Se dejará al final del script un enlace con
  el código de la Calculadora pero en JavaScript
  puro, ya que cambia un poco en Vue.
-->

<template>
  <section class="p-5 h-screen bg-white dark:bg-gray-800 dark:text-white">
    
        <ProjectTitle id="0" />
        <ProjectInfo id="0" />
        
        <div class="h-auto w-auto">
          <div class="rounded-2xl p-6 h-120 w-110 mx-auto bg-gray-700 flex flex-col justify-center items-center">
            <!-- display -->
            <div class="flex-1">
              <div class="w-96 mx-auto text-3xl bg-gray-600 text-right px-6 py-6 rounded-md h-20">
                {{ calculadora }}
              </div>
            </div>
            <!-- buttons -->
            <div class="flex-2 grid grid-cols-4 text-2xl w-96 mx-auto gap-4 ">
              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="agregarNumero('7')">7</button>
              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="agregarNumero('8')">8</button>
              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="agregarNumero('9')">9</button>
              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="agregarOperacion('x')">x</button>
             
              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="agregarNumero('4')">4</button>
              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="agregarNumero('5')">5</button>
              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="agregarNumero('6')">6</button>
              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="agregarOperacion('-')">-</button>

              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="agregarNumero('1')">1</button>
              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="agregarNumero('2')">2</button>
              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="agregarNumero('3')">3</button>
              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="agregarOperacion('+')">+</button>
              
              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="limpiar()">C</button>
              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="agregarNumero('0')">0</button>
              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="decimal()">,</button>
              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="ejecutarCalculo()">=</button>

              <button class="bg-gray-600 rounded-lg py-2 hover:bg-gray-500" @click="agregarOperacion('/')">÷</button>
            </div>
          </div>
        </div>

        <Footer />
  </section>

</template>

<script setup>
import { ref } from 'vue';
import { useCalculator } from './calculadora.js';

const { calculadora, agregarNumero, agregarOperacion, ejecutarCalculo, limpiar, decimal } = useCalculator();

// Import Utils
import ProjectTitle from '../common/ProjectTitle.vue';
import ProjectInfo from '../common/ProjectInfo.vue';
import Footer from '../common/Footer.vue';


</script>