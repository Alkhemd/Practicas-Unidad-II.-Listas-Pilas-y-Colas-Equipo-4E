// Ejercicio 1: Ventanilla de un banco

class Cliente {
    constructor(turno, nombre, movimiento) {
        this.turno = turno;
        this.nombre = nombre;
        this.movimiento = movimiento;
        this.horaLlegada = new Date(); // Guardar como objeto Date para cálculos
        this.horaLlegadaStr = this.horaLlegada.toLocaleTimeString(); // String para mostrar
    }
}

let cola = [];
let nextTurn = 1;
let totalAtendidos = 0;
const CAPACIDAD_MAXIMA = 10;

function agregarCliente() {
    const nombreInput = document.getElementById('nombreCliente');
    const movimientoSelect = document.getElementById('movimiento');
    
    const nombre = nombreInput.value.trim();
    const movimiento = movimientoSelect.value;
    
    if (!nombre) {
        alert('⚠️ Por favor ingresa el nombre del cliente');
        return;
    }
    
    if (cola.length >= CAPACIDAD_MAXIMA) {
        alert('⚠️ La cola está llena. Capacidad máxima: ' + CAPACIDAD_MAXIMA);
        return;
    }
    
    const cliente = new Cliente(nextTurn++, nombre, movimiento);
    cola.push(cliente);
    
    nombreInput.value = '';
    nombreInput.focus();
    
    actualizarVista();
}

function atenderCliente() {
    if (cola.length === 0) {
        alert('⚠️ No hay clientes en la cola');
        return;
    }
    
    const cliente = cola.shift(); // Dequeue (FIFO)
    totalAtendidos++;
    
    // Calcular tiempo de espera
    const horaActual = new Date();
    const horaLlegada = new Date(cliente.horaLlegada);
    const tiempoEsperaMs = horaActual - horaLlegada;
    
    // Convertir a minutos y segundos
    const minutos = Math.floor(tiempoEsperaMs / (1000 * 60));
    const segundos = Math.floor((tiempoEsperaMs % (1000 * 60)) / 1000);
    
    alert(`✓ Cliente atendido:\nTurno: ${cliente.turno}\nNombre: ${cliente.nombre}\nMovimiento: ${cliente.movimiento}\nHora de llegada: ${cliente.horaLlegadaStr}\nTiempo de espera: ${minutos} minuto(s) y ${segundos} segundo(s)`);
    
    actualizarVista();
}

function limpiarCola() {
    if (confirm('¿Estás seguro de limpiar la cola?')) {
        cola = [];
        actualizarVista();
    }
}

function actualizarVista() {
    // Actualizar estadísticas
    document.getElementById('totalCola').textContent = cola.length;
    document.getElementById('totalAtendidos').textContent = totalAtendidos;
    
    // Actualizar visualización de la cola
    const display = document.getElementById('colaDisplay');
    
    if (cola.length === 0) {
        display.innerHTML = '<p class="empty-message">No hay clientes en la cola</p>';
        return;
    }
    
    display.innerHTML = `
        <div class="queue-items">
            ${cola.map((cliente, index) => `
                <div class="queue-item ${index === 0 ? 'first-in-queue' : ''}" style="animation-delay: ${index * 0.1}s">
                    <div class="queue-badge">
                        <span class="turn-number">#${cliente.turno}</span>
                    </div>
                    <div class="queue-info">
                        <strong>${cliente.nombre}</strong>
                        <span class="queue-movement">${cliente.movimiento}</span>
                        <span class="queue-time">⏰ ${cliente.horaLlegadaStr}</span>
                    </div>
                    ${index === 0 ? '<div class="next-label">⬅️ Siguiente</div>' : ''}
                </div>
            `).join('')}
        </div>
    `;
}

// Inicializar con algunos clientes de ejemplo
function inicializar() {
    const ejemplos = [
        { nombre: 'María García', movimiento: 'Depósito' },
        { nombre: 'Carlos López', movimiento: 'Retiro' },
        { nombre: 'Ana Martínez', movimiento: 'Pago' }
    ];
    
    ejemplos.forEach(ej => {
        cola.push(new Cliente(nextTurn++, ej.nombre, ej.movimiento));
    });
    
    actualizarVista();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('nombreCliente').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarCliente();
        }
    });
    
    inicializar();
});
