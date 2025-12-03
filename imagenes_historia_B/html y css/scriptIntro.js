function makeWindowDraggable(windowId, headerId) {
    const ventana = document.getElementById(windowId);
    const header = document.getElementById(headerId);

    // Solo se ejecuta si la ventana y la cabecera existen
    if (ventana && header) {
        let offsetX = 0;
        let offsetY = 0;
        let isDragging = false;

        // Claves únicas para guardar la posición de cada ventana
        const storageKeyX = windowId + "-X";
        const storageKeyY = windowId + "-Y";

        // Restaura la posición guardada al cargar
        const savedX = localStorage.getItem(storageKeyX);
        const savedY = localStorage.getItem(storageKeyY);

        if (savedX !== null && savedY !== null) {
            ventana.style.left = savedX;
            ventana.style.top = savedY;
        }

        // Hace visible la ventana después de colocarla para evitar parpadeos
        ventana.style.visibility = 'visible';

        header.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - ventana.offsetLeft;
            offsetY = e.clientY - ventana.offsetTop;
            document.body.style.cursor = "grabbing";
            
            // Pone la ventana clickada por delante de las demás
            document.querySelectorAll('.VentanaPrincipal').forEach(w => w.style.zIndex = '100');
            ventana.style.zIndex = '101';
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            ventana.style.left = `${e.clientX - offsetX}px`;
            ventana.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener("mouseup", () => {
            if (isDragging) {
                // Guarda la posición al soltar el ratón
                localStorage.setItem(storageKeyX, ventana.style.left);
                localStorage.setItem(storageKeyY, ventana.style.top);
            }
            isDragging = false;
            document.body.style.cursor = "default";
        });
    }
}

function actualizarHora() {
    const reloj = document.getElementById("reloj");
    if (!reloj) return;

    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');

    reloj.textContent = `${horas}:${minutos}:${segundos}`;
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', (event) => {
    // Activa las ventanas arrastrables
    makeWindowDraggable('ventana', 'header');
    makeWindowDraggable('ventana-exp', 'header-exp');
    makeWindowDraggable('ventana1', 'header1');
    makeWindowDraggable('ventana2', 'header2');
    makeWindowDraggable('ventana3', 'header3');

    // Inicia el reloj
    actualizarHora();
    setInterval(actualizarHora, 1000);
});