const input = document.getElementById("tarea");
const lista = document.getElementById("tareas");
const boton = document.getElementById("agregar");
const mensajeImportante = document.getElementById("mensajeImportante");

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
  }

  const li = document.createElement("li");
  const texto = document.createTextNode(entrada);

  const borrar = document.createElement("button");
  borrar.textContent = "Borrar";
  borrar.classList.add("buttontodo");

  borrar.addEventListener("click", function () {
    li.remove();
  });

  li.appendChild(texto);
  li.appendChild(borrar);

  container.appendChild(li);

  input.value = "";
});
