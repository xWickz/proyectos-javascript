import { ref } from 'vue';

export const tarea = ref('');
export const tareas = ref([]);
export const mensaje = ref('');

export function agregarTarea() {
    const entrada = tarea.value.trim();

    if (!entrada) {
        mensaje.value = "¡Agrega una tarea!"
        setTimeout(() => (mensaje.value = ''), 2000);
        return;
    }

    tareas.value.push(entrada);
    tarea.value = "";
    mensaje.value = "";
}

export function eliminarTarea(index) {
    tareas.value.splice(index, 1);
}