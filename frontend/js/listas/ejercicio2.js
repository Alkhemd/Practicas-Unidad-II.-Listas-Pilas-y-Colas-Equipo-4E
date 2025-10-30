// Ejercicio 2: Pares e Impares

let numerosPares = [];
let numerosImpares = [];

function generarNumeros() {
    const cantidadInput = document.getElementById('cantidadNumeros');
    const cantidad = parseInt(cantidadInput.value);
    
    if (isNaN(cantidad) || cantidad <= 0) {
        alert('⚠️ Por favor ingresa un número válido mayor a 0');
        return;
    }
    
    if (cantidad > 100) {
        alert('⚠️ El máximo es 100 números');
        return;
    }
    
    // Limpiar listas anteriores
    numerosPares = [];
    numerosImpares = [];
    
    // Generar y clasificar números
    for (let i = 0; i < cantidad; i++) {
        const numero = Math.floor(Math.random() * 100) + 1;
        if (numero % 2 === 0) {
            numerosPares.push(numero);
        } else {
            numerosImpares.push(numero);
        }
    }
    
    actualizarVista();
}

function limpiarListas() {
    if (confirm('¿Estás seguro de que deseas limpiar todas las listas?')) {
        numerosPares = [];
        numerosImpares = [];
        document.getElementById('cantidadNumeros').value = 10;
        actualizarVista();
    }
}

function actualizarVista() {
    // Actualizar números pares
    const divPares = document.getElementById('numerosPares');
    const totalPares = document.getElementById('totalPares');
    
    if (numerosPares.length === 0) {
        divPares.innerHTML = '<p class="empty-message">No hay números pares</p>';
    } else {
        divPares.innerHTML = `
            <div class="number-grid">
                ${numerosPares.map(num => `<span class="number-badge even">${num}</span>`).join('')}
            </div>
        `;
    }
    totalPares.textContent = `Total: ${numerosPares.length} números`;
    
    // Actualizar números impares
    const divImpares = document.getElementById('numerosImpares');
    const totalImpares = document.getElementById('totalImpares');
    
    if (numerosImpares.length === 0) {
        divImpares.innerHTML = '<p class="empty-message">No hay números impares</p>';
    } else {
        divImpares.innerHTML = `
            <div class="number-grid">
                ${numerosImpares.map(num => `<span class="number-badge odd">${num}</span>`).join('')}
            </div>
        `;
    }
    totalImpares.textContent = `Total: ${numerosImpares.length} números`;
}

// Permitir generar con Enter
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('cantidadNumeros');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generarNumeros();
        }
    });
    
    actualizarVista();
});
