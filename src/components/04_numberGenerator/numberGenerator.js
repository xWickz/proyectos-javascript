import { ref } from 'vue';

export const rango = ref(1);
export const resultado = ref("");

export function generarNumero() {
    const numero = Math.floor(Math.random() * rango.value) + 1
    resultado.value = `El número aleatorio es: ${numero}`;
}

export function limpiar() {
    resultado.value = "";
}