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
              <div class="mb-2">
                <a class="text-xs font-semibold text-gray-500 hover:text-blue-400" href="https://github.com/joseverdev" target="_blank" rel="noopener">@joseverdev</a>
              </div>
              <div class="w-96 mx-auto text-3xl bg-gray-600 text-right px-6 py-6 rounded-md h-20">
                {{ calculadora }}
              </div>
            </div>
            <!-- buttons -->
            <div class="flex-2 grid grid-cols-4 mt-1 text-2xl w-96 mx-auto gap-4 ">
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
import proyectos from '../data/proyectos';
import { ref } from 'vue';

// Import Utils
import Button from '../utils/Button.vue';
import ProjectTitle from '../utils/ProjectTitle.vue';
import ProjectInfo from '../utils/ProjectInfo.vue';
import Footer from '../utils/Footer.vue';

// Definamos los estados de la calculadora, usamos un JSON para que sea más sencillo de acceder

const state = {
  num1: "",
  num2: "",
  operador: ""
};

// Definimos los operadores, esto nos servirá para después
const operadores = ["+", "-", "x", "/"];
const calculadora = ref('');

/* Funciones Principales */
function calcular(num1, num2, operador) {

  // Si alguno de estos valores está vacío no hacemos nada, por lógica
  if (operador === "" || num1 === "" || num2 === "") return;

  //n1 = procesarFactorial(n1);
  //n2 = procesarFactorial(n2);

  if (calculadora.value == "Entrada inválida") {
    return;
  }

  if (isNaN(num1) || isNaN(num2)) {
    calculadora.value = "Entrada inválida";
    state.num1 = "";
    state.num2 = "";
    state.operador = "";
    return;
  }

  // Los números entran como una string porque -- agregarNumero('1').
  // Lo que hacemos es convertirlos a un flotante en este caso porque un float también incluye decimales

  const numero1 = parseFloat(num1);
  const numero2 = parseFloat(num2);

  // Comenzamos a operar, usamos un switch porque es más fácil y entendible que usar ifs y else

  let resultado;

  switch (operador) {
    case "+":
      resultado = numero1 + numero2;
      break;

    case "-":
      resultado = numero1 - numero2;
      break;

    case "x":
      resultado = numero1 * numero2;
      break;

    case "/":
      resultado = numero1 !== 0 ? numero1 / numero2 : "Indeterminación"; // Usamos ternarios
      // Aunque falta la validación del número 2 

      break;

    default:
      return;
  }

  return resultado;

}

function agregarNumero(numero) {

  // Validamos, si no hay operador aún, significa que es el primer número, caso contrario es el segundo número.

  if (state.operador === "") {
    state.num1 += numero;
    calculadora.value = state.num1;

  } else {

    state.num2 += numero;
    calculadora.value = `${state.num1} ${state.operador} ${state.num2}`;
  }

}

function agregarOperacion(operacion) {
  if (state.num1 === "") return;

  // Operación Automática
  if (state.operador !== "") {
    ejecutarCalculo();
  }

  if (!operadores.includes(calculadora.value.trim().slice(-1))) {
    state.operador = operacion;
    calculadora.value += " " + state.operador;
  }
}

function ejecutarCalculo() {
  const resultado = calcular(state.num1, state.num2, state.operador);
  if (resultado !== undefined) {

    // Estamos convirtiendo a string los resultados para que después se pueda manipular, en este caso 
    // Sirve para los operadores, específicamente para que puedas visualizar el operador que pusiste
    // Ejemplo: 15 + ...
    
    calculadora.value = resultado.toString();
    state.num1 = resultado.toString();
    state.num2 = "";
    state.operador = "";
  }
}

function limpiar() {
  state.num1 = "";
  state.num2 = "";
  state.operador = "";
  calculadora.value = "";
}

// Funciones Adicionales. No son necesarias.
function decimal() {
  if (state.operador === "") {
    if (!state.num1.includes(".")) {
      state.num1 += state.num1 === "" ? "0." : ".";
    }
  } else {
    if (!state.num2.includes(".")) {
      state.num2 += state.num2 === "" ? "0." : ".";
    }
  }
}


</script>