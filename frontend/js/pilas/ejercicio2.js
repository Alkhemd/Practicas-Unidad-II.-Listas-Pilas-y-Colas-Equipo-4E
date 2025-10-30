// Ejercicio 2: Verificar si una palabra es palíndromo

function verificarPalindromo() {
    const input = document.getElementById('palabraInput');
    const palabra = input.value.trim();
    
    if (!palabra) {
        alert('⚠️ Por favor ingresa una palabra o frase');
        return;
    }
    
    // Limpiar: solo letras y números, en minúsculas
    const limpia = palabra.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const pilaIzquierda = [];
    const pilaDerecha = [];
    
    const n = limpia.length;
    const mitad = Math.floor(n / 2);
    
    // Llenar pilas
    for (let i = 0; i < n; i++) {
        if (i < mitad) {
            pilaIzquierda.push(limpia[i]);
        } else if (n % 2 === 0 || i > mitad) {
            pilaDerecha.push(limpia[i]);
        }
    }
    
    // Mostrar pilas
    mostrarPila('pilaIzquierda', pilaIzquierda);
    mostrarPila('pilaDerecha', pilaDerecha);
    
    // Comparar
    let esPalindromo = true;
    const comparaciones = [];
    
    while (pilaIzquierda.length > 0 && pilaDerecha.length > 0) {
        const izq = pilaIzquierda.pop();
        const der = pilaDerecha.pop();
        comparaciones.push({ izq, der, igual: izq === der });
        if (izq !== der) {
            esPalindromo = false;
        }
    }
    
    esPalindromo = esPalindromo && pilaIzquierda.length === 0 && pilaDerecha.length === 0;
    
    // Mostrar resultado
    mostrarResultado(palabra, limpia, esPalindromo, comparaciones);
}

function mostrarPila(containerId, pila) {
    const container = document.getElementById(containerId);
    
    if (pila.length === 0) {
        container.innerHTML = '<p class="empty-message">Vacía</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="stack-items">
            ${[...pila].reverse().map((char, index) => `
                <div class="stack-item" style="animation-delay: ${index * 0.1}s">
                    <span class="char-display">${char}</span>
                </div>
            `).join('')}
        </div>
        <div class="stack-base">Base</div>
    `;
}

function mostrarResultado(original, limpia, esPalindromo, comparaciones) {
    const resultadoDiv = document.getElementById('resultado');
    const comparacionDiv = document.getElementById('comparacion');
    
    resultadoDiv.innerHTML = `
        <div class="palindrome-card ${esPalindromo ? 'is-palindrome' : 'not-palindrome'}">
            <div class="palindrome-icon">${esPalindromo ? '✓' : '✗'}</div>
            <h3>${esPalindromo ? '¡Es un palíndromo!' : 'No es un palíndromo'}</h3>
            <p class="original-word">"${original}"</p>
            <p class="clean-word">Limpia: "${limpia}"</p>
        </div>
    `;
    
    if (comparaciones.length > 0) {
        comparacionDiv.innerHTML = `
            <div class="comparisons">
                ${comparaciones.map(c => `
                    <div class="comparison-item ${c.igual ? 'match' : 'no-match'}">
                        <span class="comp-char">${c.izq}</span>
                        <span class="comp-symbol">${c.igual ? '=' : '≠'}</span>
                        <span class="comp-char">${c.der}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

function limpiar() {
    document.getElementById('palabraInput').value = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('pilaIzquierda').innerHTML = '<p class="empty-message">Ingresa una palabra</p>';
    document.getElementById('pilaDerecha').innerHTML = '<p class="empty-message">Ingresa una palabra</p>';
    document.getElementById('comparacion').innerHTML = '';
    document.getElementById('palabraInput').focus();
}

// Permitir verificar con Enter
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('palabraInput');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verificarPalindromo();
        }
    });
    
    limpiar();
});
