let hora = document.getElementById("mostrarHora");

setInterval(() => {
    const ahora = new Date();
    let horas = ahora.getHours().toString().padStart(2, '0');
    let minutos = ahora.getMinutes().toString().padStart(2, '0');
    let segundos = ahora.getSeconds().toString().padStart(2, '0');

    let horaReal = `${horas}:${minutos}:${segundos}`;

    hora.textContent = horaReal;
    
}, 1000);
