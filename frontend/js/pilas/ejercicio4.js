// Ejercicio 4: Reemplazar valor en pila

let pila = [];

function agregarValor() {
    const input = document.getElementById('valorInput');
    const valor = parseInt(input.value);
    
    if (isNaN(valor)) {
        alert('⚠️ Por favor ingresa un número válido');
        return;
    }
    
    pila.push(valor);
    input.value = '';
    input.focus();
    
    mostrarPila();
}

function reemplazarValor() {
    const valorViejo = parseInt(document.getElementById('valorViejo').value);
    const valorNuevo = parseInt(document.getElementById('valorNuevo').value);
    
    if (isNaN(valorViejo) || isNaN(valorNuevo)) {
        alert('⚠️ Por favor ingresa valores válidos');
        return;
    }
    
    // Reemplazar todas las ocurrencias
    pila = pila.map(val => val === valorViejo ? valorNuevo : val);
    
    document.getElementById('valorViejo').value = '';
    document.getElementById('valorNuevo').value = '';
    
    mostrarPila();
    alert(`✓ Se reemplazaron todas las ocurrencias de ${valorViejo} por ${valorNuevo}`);
}

function limpiarPila() {
    if (confirm('¿Estás seguro de limpiar la pila?')) {
        pila = [];
        mostrarPila();
    }
}

function mostrarPila() {
    const container = document.getElementById('pilaDisplay');
    
    if (pila.length === 0) {
        container.innerHTML = '<p class="empty-message">La pila está vacía. Agrega algunos valores.</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="stack-items">
            ${[...pila].reverse().map((valor, index) => `
                <div class="stack-item" style="animation-delay: ${index * 0.05}s">
                    <span class="char-display">${valor}</span>
                </div>
            `).join('')}
        </div>
        <div class="stack-base">Base de la Pila (${pila.length} elementos)</div>
    `;
}

// Inicializar con algunos valores de ejemplo
function inicializar() {
    pila = [3, 5, 7, 5, 9, 5, 2];
    mostrarPila();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('valorInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarValor();
        }
    });
    
    inicializar();
});
