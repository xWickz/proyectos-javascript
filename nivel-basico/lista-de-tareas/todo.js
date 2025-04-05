const input = document.getElementById("tarea");
const lista = document.getElementById("tareas");
const boton = document.getElementById("agregar");
const notify = document.getElementById("notifier");
let contador = 1;

boton.addEventListener("click", function () {
  const container = document.getElementById("tareas");
  const entrada = input.value.trim();
  if (!entrada) {
    mensajeImportante.style.display = "block";
    mensajeImportante.innerText = "¡Agrega una tarea!";
    setTimeout(() => {
      mensajeImportante.innerText = "";
      mensajeImportante.style.display = "none";
    }, 2000);
    return;
  }if (!entrada) {
  mostrarMensajeError("¡Agrega una tarea!");
  return;
}if (!entrada) {
  mostrarMensajeError("¡Agrega una tarea!");
  return;
}

function mostrarMensajeError(mensaje) {
  mensajeImportante.style.display = "block";
  mensajeImportante.innerText = mensaje;
  setTimeout(() => {
    mensajeImportante.innerText = "";
    mensajeImportante.style.display = "none";
  }, 2000);
}

  const columna = document.createElement("div");
  columna.classList.add("column", "is-3");

  const title = document.createElement("p");
  const titleText = document.createTextNode("Tarea " + contador);
  title.appendChild(titleText);

  const articulo = document.createElement("article");
  articulo.classList.add("message");

  const div = document.createElement("div");
  div.classList.add("message-header");

  const borrar = document.createElement("button");
  borrar.classList.add("delete");
  borrar.setAttribute("arial-label", "Delete");

  borrar.addEventListener("click", function () {
    columna.remove();
    contador--

    if(contador === 1) {
        notify.textContent = "¡No hay nada! Aún... 😅";
    }
  });

  div.appendChild(title);
  div.appendChild(borrar);
  

  const texto = document.createTextNode(entrada);
  const text = document.createElement("div");
  text.classList.add("message-body");
  text.appendChild(texto);

  articulo.appendChild(div);
  articulo.appendChild(text);

  columna.appendChild(articulo);

  container.appendChild(columna);
  input.value = "";
  notify.textContent = "";
  contador++
});
