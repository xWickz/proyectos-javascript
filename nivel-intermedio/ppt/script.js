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
    switch(seleccion) {
        case 0: // Piedra
            if (botSeleccion === 0) {
                resultado.textContent = `Empate! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.`;
            } else if (botSeleccion === 1) {
                resultado.textContent =  `Pierdes! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.`;
            } else {
                resultado.textContent = `Ganaste! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.`;
            }
        break;

        case 1: // Papel
            if (botSeleccion === 0) {
                resultado.textContent = `Ganaste! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.`;
            } else if (botSeleccion === 1) {
                resultado.textContent = `Empate! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.`;
            } else {
                resultado.textContent = `Pierdes! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.`;
            }
        break;
            
        case 2: // Tijera
            if (botSeleccion === 0) {
                resultado.textContent = `Pierdes! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.`;
            } else if (botSeleccion === 1) {
                resultado.textContent = `Ganaste! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.`;
            } else {
                resultado.textContent = `Empate! Usted eligió ${seleccionesName[seleccion]} y el BOT eligió ${seleccionesName[botSeleccion]}.`;
            }
        break;

        default:
            break;
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