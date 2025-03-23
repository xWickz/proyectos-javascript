const entrada = document.getElementById('tarea');
const boton = document.getElementById('agregarTarea');
const tabla = document.getElementById('lista-tareas');

boton.addEventListener("click", function() {

    const entradaTexto = entrada.value.trim();
    if(entradaTexto === '') {
        alert('Por favor, ingresa algo.');
        return;
    }

    const li = document.createElement('li');
    li.textContent = entradaTexto;

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", function() {
        tabla.removeChild(li);
    });

    li.appendChild(botonEliminar);
    tabla.appendChild(li);

    entrada.value = '';
    
});