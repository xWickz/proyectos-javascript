import { ref } from 'vue';

export const hora = ref("");

export function iniciarReloj() {
    setInterval(() => {
        const ahora = new Date();
        let horas = ahora.getHours().toString().padStart(2, '0');
        let minutos = ahora.getMinutes().toString().padStart(2, '0');
        let segundos = ahora.getSeconds().toString().padStart(2, '0');
        hora.value = `${horas}:${minutos}:${segundos}`;
    });
}