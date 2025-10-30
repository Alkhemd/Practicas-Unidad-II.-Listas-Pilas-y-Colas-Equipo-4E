// Ejercicio 5: Listar palabras por letra

let palabrasPorLetra = {};

function agregarPalabra() {
    const input = document.getElementById('palabraInput');
    const palabra = input.value.trim();
    
    if (!palabra) {
        alert('⚠️ Por favor ingresa una palabra');
        return;
    }
    
    // Obtener la primera letra en mayúscula
    const primeraLetra = palabra.charAt(0).toUpperCase();
    
    // Validar que sea una letra
    if (!/[A-ZÑ]/.test(primeraLetra)) {
        alert('⚠️ La palabra debe comenzar con una letra');
        return;
    }
    
    // Inicializar el array si no existe
    if (!palabrasPorLetra[primeraLetra]) {
        palabrasPorLetra[primeraLetra] = [];
    }
    
    // Agregar la palabra (capitalizada)
    const palabraCapitalizada = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    palabrasPorLetra[primeraLetra].push(palabraCapitalizada);
    
    input.value = '';
    input.focus();
    
    actualizarVista();
}

function eliminarPalabra(letra, index) {
    palabrasPorLetra[letra].splice(index, 1);
    
    // Si no quedan palabras con esa letra, eliminar la letra
    if (palabrasPorLetra[letra].length === 0) {
        delete palabrasPorLetra[letra];
    }
    
    actualizarVista();
}

function limpiarPalabras() {
    if (confirm('¿Estás seguro de eliminar todas las palabras?')) {
        palabrasPorLetra = {};
        actualizarVista();
    }
}

function actualizarVista() {
    // Actualizar estadísticas
    let totalPalabras = 0;
    Object.values(palabrasPorLetra).forEach(palabras => {
        totalPalabras += palabras.length;
    });
    
    document.getElementById('totalPalabras').textContent = totalPalabras;
    document.getElementById('totalLetras').textContent = Object.keys(palabrasPorLetra).length;
    
    // Actualizar display de palabras
    const display = document.getElementById('palabrasDisplay');
    
    if (Object.keys(palabrasPorLetra).length === 0) {
        display.innerHTML = '<p class="empty-message">No hay palabras agregadas. ¡Comienza agregando algunas!</p>';
        return;
    }
    
    // Ordenar las letras alfabéticamente
    const letrasOrdenadas = Object.keys(palabrasPorLetra).sort();
    
    display.innerHTML = letrasOrdenadas.map(letra => {
        const palabras = palabrasPorLetra[letra];
        return `
            <div class="letter-group">
                <div class="letter-header">${letra}</div>
                <ul class="word-list">
                    ${palabras.map((palabra, index) => `
                        <li class="word-item">
                            <span class="word-text">${palabra}</span>
                            <button onclick="eliminarPalabra('${letra}', ${index})" class="btn-small btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
                                🗑️
                            </button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }).join('');
}

// Inicializar con algunas palabras de ejemplo
function inicializarEjemplo() {
    const ejemplos = ['Manzana', 'Banana', 'Cereza', 'Mango', 'Naranja', 'Pera', 'Uva', 'Kiwi'];
    ejemplos.forEach(palabra => {
        const primeraLetra = palabra.charAt(0).toUpperCase();
        if (!palabrasPorLetra[primeraLetra]) {
            palabrasPorLetra[primeraLetra] = [];
        }
        palabrasPorLetra[primeraLetra].push(palabra);
    });
    actualizarVista();
}

// Permitir agregar con Enter
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('palabraInput');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarPalabra();
        }
    });
    
    // Inicializar con ejemplos
    inicializarEjemplo();
});
