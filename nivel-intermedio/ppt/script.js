const resultado = document.getElementById("resultado");
const boton = document.getElementById("boton");
const selecciones = [0, 1, 2];
const seleccionesName = ["Piedra", "Papel", "Tijera"];
let botSeleccion;
let seleccion;

function usuario(seleccion) {

    seleccion = Number(seleccion);
    botSeleccion = randomInt(0,2);

    desactivarBotones();

    const resultados = [
        { user: 0, bot: 0, texto: `Empate! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 0, bot: 1, texto: `Pierdes! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 0, bot: 2, texto: `Ganaste! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 1, bot: 0, texto: `Ganaste! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 1, bot: 1, texto: `Empate! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 1, bot: 2, texto: `Pierdes! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 2, bot: 0, texto: `Pierdes! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 2, bot: 1, texto: `Ganaste! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
        { user: 2, bot: 2, texto: `Empate! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.` },
    ];

    const resultadoActual = resultados.find(resultado => resultado.user === seleccion && resultado.bot === botSeleccion);

    if (resultadoActual) {
        resultado.textContent = resultadoActual.texto;
    }
}

function desactivarBotones() {
    document.getElementById("piedra").disabled = true;
    document.getElementById("papel").disabled = true;
    document.getElementById("tijera").disabled = true;
}

function limpiar() {
    resultado.textContent = "";
    document.getElementById("piedra").disabled = false;
    document.getElementById("papel").disabled = false;
    document.getElementById("tijera").disabled = false;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}