// Ejercicio 3: Estacionamiento para autos

class Auto {
    constructor(placa, propietario) {
        this.placa = placa;
        this.propietario = propietario;
        this.horaEntrada = new Date();
        this.espacio = null;
    }
}

// Estacionamiento tipo callejón - capacidad ilimitada (usamos 20 espacios visuales)
const CAPACIDAD_VISUAL = 20;
let espacios = new Array(CAPACIDAD_VISUAL).fill(null);
let colaEspera = [];
const TARIFA_POR_SEGUNDO = 2.00; // $2.00 MXN por segundo

function registrarEntrada() {
    const placaInput = document.getElementById('placaAuto');
    const propietarioInput = document.getElementById('propietario');
    
    const placa = placaInput.value.trim().toUpperCase();
    const propietario = propietarioInput.value.trim();
    
    if (!placa || !propietario) {
        alert('⚠️ Por favor completa todos los campos');
        return;
    }
    
    // Verificar si la placa ya está registrada
    if (espacios.some(auto => auto && auto.placa === placa)) {
        alert('⚠️ Este auto ya está en el estacionamiento');
        return;
    }
    
    const auto = new Auto(placa, propietario);
    
    // Buscar espacio disponible
    const espacioLibre = espacios.findIndex(e => e === null);
    
    if (espacioLibre !== -1) {
        // Hay espacio disponible
        espacios[espacioLibre] = auto;
        auto.espacio = espacioLibre + 1;
        alert(`✓ Auto registrado en espacio #${auto.espacio}`);
    } else {
        // No hay espacio, agregar a cola de espera
        colaEspera.push(auto);
        alert(`⏳ Estacionamiento lleno. Auto agregado a cola de espera (posición ${colaEspera.length})`);
    }
    
    placaInput.value = '';
    propietarioInput.value = '';
    placaInput.focus();
    
    actualizarVista();
}

function registrarSalida() {
    const placa = prompt('Ingresa la placa del auto que sale:');
    if (!placa) return;
    
    const placaUpper = placa.trim().toUpperCase();
    const index = espacios.findIndex(auto => auto && auto.placa === placaUpper);
    
    if (index === -1) {
        alert('⚠️ Auto no encontrado en el estacionamiento');
        return;
    }
    
    const auto = espacios[index];
    const horaSalida = new Date();
    
    // Calcular tiempo en segundos
    const tiempoMs = horaSalida - auto.horaEntrada;
    const tiempoSegundos = Math.ceil(tiempoMs / 1000);
    const tiempoMinutos = Math.floor(tiempoSegundos / 60);
    const segundosRestantes = tiempoSegundos % 60;
    
    // Calcular costo: $2.00 por segundo
    const costo = tiempoSegundos * TARIFA_POR_SEGUNDO;
    
    const horaEntradaStr = auto.horaEntrada.toLocaleTimeString();
    const horaSalidaStr = horaSalida.toLocaleTimeString();
    
    alert(`✓ Salida registrada:\n\nPlaca: ${auto.placa}\nPropietario: ${auto.propietario}\n\nHora de entrada: ${horaEntradaStr}\nHora de salida: ${horaSalidaStr}\n\nTiempo: ${tiempoMinutos} min ${segundosRestantes} seg (${tiempoSegundos} segundos)\n\nCosto: $${costo.toFixed(2)} MXN\n(${tiempoSegundos} seg × $2.00/seg)`);
    
    // Liberar espacio
    espacios[index] = null;
    
    // Si hay autos en espera, asignar el espacio al primero
    if (colaEspera.length > 0) {
        const siguienteAuto = colaEspera.shift();
        espacios[index] = siguienteAuto;
        siguienteAuto.espacio = index + 1;
        alert(`🚗 Auto de la cola asignado al espacio #${siguienteAuto.espacio}\nPlaca: ${siguienteAuto.placa}`);
    }
    
    actualizarVista();
}

function limpiar() {
    if (confirm('¿Estás seguro de limpiar el estacionamiento?')) {
        espacios = new Array(CAPACIDAD_VISUAL).fill(null);
        colaEspera = [];
        actualizarVista();
    }
}

function actualizarVista() {
    const ocupados = espacios.filter(e => e !== null).length;
    const disponibles = CAPACIDAD_VISUAL - ocupados;
    
    // Actualizar estadísticas
    document.getElementById('espaciosOcupados').textContent = ocupados;
    document.getElementById('autosEspera').textContent = colaEspera.length;
    document.getElementById('espaciosDisponibles').textContent = disponibles;
    
    // Actualizar espacios del estacionamiento
    const display = document.getElementById('espaciosDisplay');
    display.innerHTML = espacios.map((auto, index) => `
        <div class="parking-space ${auto ? 'occupied' : 'available'}">
            <div class="space-number">#${index + 1}</div>
            ${auto ? `
                <div class="space-info">
                    <strong>${auto.placa}</strong>
                    <span>${auto.propietario}</span>
                </div>
            ` : '<div class="space-empty">Disponible</div>'}
        </div>
    `).join('');
    
    // Actualizar cola de espera
    const colaDiv = document.getElementById('colaEspera');
    if (colaEspera.length === 0) {
        colaDiv.innerHTML = '<p class="empty-message">No hay autos en espera</p>';
    } else {
        colaDiv.innerHTML = colaEspera.map((auto, index) => `
            <div class="queue-item" style="animation-delay: ${index * 0.1}s">
                <div class="queue-position">#${index + 1}</div>
                <div class="queue-info">
                    <strong>${auto.placa}</strong>
                    <span>${auto.propietario}</span>
                </div>
            </div>
        `).join('');
    }
}

// Inicializar con algunos autos de ejemplo
function inicializar() {
    const ejemplos = [
        { placa: 'ABC-123', propietario: 'Juan Pérez' },
        { placa: 'XYZ-789', propietario: 'María García' },
        { placa: 'DEF-456', propietario: 'Carlos López' }
    ];
    
    ejemplos.forEach((ej, index) => {
        const auto = new Auto(ej.placa, ej.propietario);
        espacios[index] = auto;
        auto.espacio = index + 1;
    });
    
    actualizarVista();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('placaAuto').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('propietario').focus();
        }
    });
    
    document.getElementById('propietario').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            registrarEntrada();
        }
    });
    
    inicializar();
});
