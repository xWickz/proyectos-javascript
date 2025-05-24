import { ref } from 'vue';

export const resultado = ref("");
export const seleccionesName = ["Piedra", "Papel", "Tijera"];

export const piedra = ref(null);
export const papel = ref(null);
export const tijera = ref(null);

let botSeleccion;

export function usuario(seleccion) {

    seleccion = Number(seleccion);
    botSeleccion = randomInt(0, 2);

    desactivarBotones();

    const resultados = [
        { user: 0, bot: 0, texto: `<span class="font-bold">Empate!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 0, bot: 1, texto: `<span class="font-bold">Pierdes!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 0, bot: 2, texto: `<span class="font-bold">Ganaste!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 1, bot: 0, texto: `<span class="font-bold">Ganaste!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 1, bot: 1, texto: `<span class="font-bold">Empate!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 1, bot: 2, texto: `<span class="font-bold">Pierdes!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 2, bot: 0, texto: `<span class="font-bold">Pierdes!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 2, bot: 1, texto: `<span class="font-bold">Ganaste!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 2, bot: 2, texto: `<span class="font-bold">Empate!</span> Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
    ];

    const resultadoActual = resultados.find(resultado => resultado.user === seleccion && resultado.bot === botSeleccion);

    if (resultadoActual) {
        resultado.value = resultadoActual.texto
    }
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function desactivarBotones() {
    piedra.value.disabled = true;
    papel.value.disabled = true;
    tijera.value.disabled = true;
}

export function limpiar() {
    resultado.value = "";
    piedra.value.disabled = false;
    papel.value.disabled = false;
    tijera.value.disabled = false;
}