const rango = document.getElementById("numero");
const cantidad = document.getElementById("cantidad");
const boton = document.getElementById("generar");
const texto = document.getElementById("genn");

cantidad.textContent = rango.value

rango.addEventListener("input", (event) => {
    cantidad.textContent = event.target.value;
});

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

boton.addEventListener("click", function() {

    const numero = randomInt(1, parseInt(rango.value));
    texto.textContent = "El número aleatorio es: " + numero;
    
});

function limpiar() {
    texto.textContent = "";
}
