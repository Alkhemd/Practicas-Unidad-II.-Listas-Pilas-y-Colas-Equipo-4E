// Ejercicio 1: Invertir palabra usando pila

function invertirPalabra() {
    const input = document.getElementById('palabraInput');
    const palabra = input.value.trim();
    
    if (!palabra) {
        alert('⚠️ Por favor ingresa una palabra o frase');
        return;
    }
    
    // Mostrar palabra original
    document.getElementById('palabraOriginal').innerHTML = `
        <div class="word-display">${palabra}</div>
    `;
    
    // Simular la pila
    const pila = [];
    
    // Push: agregar cada carácter a la pila
    for (let char of palabra) {
        pila.push(char);
    }
    
    // Visualizar la pila
    mostrarPila(pila);
    
    // Pop: sacar caracteres en orden inverso
    let resultado = '';
    while (pila.length > 0) {
        resultado += pila.pop();
    }
    
    // Mostrar resultado
    document.getElementById('palabraInvertida').innerHTML = `
        <div class="word-display inverted">${resultado}</div>
    `;
}

function mostrarPila(pila) {
    const container = document.getElementById('pilaVisualizacion');
    
    if (pila.length === 0) {
        container.innerHTML = '<p class="empty-message">Pila vacía</p>';
        return;
    }
    
    // Mostrar la pila de arriba hacia abajo (último elemento arriba)
    container.innerHTML = `
        <div class="stack-items">
            ${[...pila].reverse().map((char, index) => `
                <div class="stack-item" style="animation-delay: ${index * 0.1}s">
                    <span class="char-display">${char === ' ' ? '␣' : char}</span>
                </div>
            `).join('')}
        </div>
        <div class="stack-base">Base de la Pila</div>
    `;
}

function limpiar() {
    document.getElementById('palabraInput').value = '';
    document.getElementById('palabraOriginal').innerHTML = '';
    document.getElementById('pilaVisualizacion').innerHTML = '<p class="empty-message">Ingresa una palabra para ver la pila</p>';
    document.getElementById('palabraInvertida').innerHTML = '';
    document.getElementById('palabraInput').focus();
}

// Permitir invertir con Enter
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('palabraInput');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            invertirPalabra();
        }
    });
    
    limpiar();
});
