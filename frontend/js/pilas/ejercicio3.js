// Ejercicio 3: Suma de números grandes

function sumarNumeros() {
    const num1 = document.getElementById('numero1').value.trim();
    const num2 = document.getElementById('numero2').value.trim();
    
    if (!num1 || !num2) {
        alert('⚠️ Por favor ingresa ambos números');
        return;
    }
    
    if (!/^\d+$/.test(num1) || !/^\d+$/.test(num2)) {
        alert('⚠️ Solo se permiten números enteros positivos');
        return;
    }
    
    // Convertir a pilas (arrays invertidos)
    const pila1 = num1.split('').map(Number).reverse();
    const pila2 = num2.split('').map(Number).reverse();
    const resultado = [];
    
    let acarreo = 0;
    const maxLength = Math.max(pila1.length, pila2.length);
    
    for (let i = 0; i < maxLength || acarreo > 0; i++) {
        const digito1 = pila1[i] || 0;
        const digito2 = pila2[i] || 0;
        
        const suma = digito1 + digito2 + acarreo;
        resultado.push(suma % 10);
        acarreo = Math.floor(suma / 10);
    }
    
    const resultadoFinal = resultado.reverse().join('');
    
    mostrarResultado(num1, num2, resultadoFinal);
}

function mostrarResultado(num1, num2, resultado) {
    const div = document.getElementById('resultado');
    
    // Crear pilas para visualización
    const pila1 = num1.split('').reverse();
    const pila2 = num2.split('').reverse();
    const pilaResultado = resultado.split('').reverse();
    
    div.innerHTML = `
        <div class="sum-result">
            <div class="sum-operation">
                <div class="sum-number">${num1}</div>
                <div class="sum-operator">+</div>
                <div class="sum-number">${num2}</div>
                <div class="sum-equals">=</div>
                <div class="sum-answer">${resultado}</div>
            </div>
            
            <div class="stacks-visualization">
                <h4>📚 Visualización de Pilas (LIFO - Last In, First Out)</h4>
                <div class="stacks-container">
                    <div class="stack-column">
                        <h5>Pila 1 (${num1})</h5>
                        <div class="stack-display">
                            ${pila1.map((digit, index) => `
                                <div class="stack-item" style="animation-delay: ${index * 0.1}s">
                                    ${digit}
                                </div>
                            `).join('')}
                        </div>
                        <div class="stack-label">↑ Top</div>
                    </div>
                    
                    <div class="stack-operator">+</div>
                    
                    <div class="stack-column">
                        <h5>Pila 2 (${num2})</h5>
                        <div class="stack-display">
                            ${pila2.map((digit, index) => `
                                <div class="stack-item" style="animation-delay: ${index * 0.1}s">
                                    ${digit}
                                </div>
                            `).join('')}
                        </div>
                        <div class="stack-label">↑ Top</div>
                    </div>
                    
                    <div class="stack-operator">=</div>
                    
                    <div class="stack-column result-stack">
                        <h5>Pila Resultado</h5>
                        <div class="stack-display">
                            ${pilaResultado.map((digit, index) => `
                                <div class="stack-item result-item" style="animation-delay: ${index * 0.1}s">
                                    ${digit}
                                </div>
                            `).join('')}
                        </div>
                        <div class="stack-label">↑ Top</div>
                    </div>
                </div>
            </div>
            
            <div class="sum-info">
                <p>✓ Suma realizada correctamente usando pilas</p>
                <p>📊 Proceso: Se suman los dígitos de derecha a izquierda (LIFO)</p>
                <p>📏 Longitud del resultado: ${resultado.length} dígitos</p>
            </div>
        </div>
    `;
}

function limpiar() {
    document.getElementById('numero1').value = '';
    document.getElementById('numero2').value = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('numero1').focus();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('numero1').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('numero2').focus();
        }
    });
    
    document.getElementById('numero2').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sumarNumeros();
        }
    });
});
