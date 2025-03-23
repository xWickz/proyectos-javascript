let resultado = document.getElementById('resultado');
let operacion = '';
let numero1 = '';
let numero2 = '';
let resultadoMostrado = false;

function agregarNumero(num) {

    if(resultadoMostrado === true && operacion === '') limpiar();
    
    if(operacion === '') {

    numero1 += num;
    resultado.value = numero1;

    } else {

        numero2 += num;
        resultado.value = numero1 + " " + operacion + " " + numero2;

    }

}

function setOperacion(op) {
    if(numero1 === '') return;
    operacion = op;
}

function calcular() {
    if(numero1 === '' || numero2 === '' || operacion === '') return;
    let res; 
    const n1 = parseFloat(numero1);
    const n2 = parseFloat(numero2);

    switch(operacion) {
        case '+':
            res = n1 + n2;
            break;
        case '-':
            res = n1 - n2;
            break;
        case '/':
            res = n2 !== 0 ? n1 / n2 : 'Indeterminado';
            break;
        case '*':
            res = n1 * n2;
            break;
        default:
            return;
    }

    resultado.value = res; 

    numero1 = res.toString();
    numero2 = '';
    operacion = '';
    resultadoMostrado = true;

}

function limpiar() {
    resultado.value = 'Hola :)';
    numero1 = '';
    numero2 = '';
    operacion = '';
    resultadoMostrado = false;

}

setInterval(() => {
    document.getElementById("test").innerHTML = "RESULTADO: <strong>" + resultadoMostrado + "</strong> // VALOR: <strong>" + resultado.value + "</strong>";
}, 1000);
