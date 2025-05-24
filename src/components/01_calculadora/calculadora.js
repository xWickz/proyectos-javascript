import { ref } from 'vue';

export const operadores = ["+", "-", "x", "/"];

// Definamos los estados de la calculadora, usamos un JSON para que sea más sencillo de acceder
export function useCalculator() {
  const state = {
    num1: "",
    num2: "",
    operador: ""
  };
  
  // Definimos los operadores, esto nos servirá para después
  
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

  return {
    calculadora,
    agregarNumero,
    agregarOperacion,
    ejecutarCalculo,
    limpiar,
    decimal
  };
}
