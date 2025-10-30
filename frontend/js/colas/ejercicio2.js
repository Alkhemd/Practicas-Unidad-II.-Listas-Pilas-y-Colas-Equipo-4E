// Ejercicio 2: JUEGO - Pintar Coches

class Coche {
    constructor(id, colorRequerido) {
        this.id = id;
        this.colorRequerido = colorRequerido;
        this.fechaEntrada = new Date();
    }
}

// Variables del juego
let colaEspera = [];
let cochesPintadosArray = [];
let contadorCoches = 1;
let juegoActivo = false;
let juegoPausado = false;
let tiempoInicio = null;
let tiempoTranscurrido = 0;
let intervalTiempo = null;
let intervalCoches = null;
let velocidadActual = 20000; // 20 segundos inicial
const VELOCIDAD_INICIAL = 20000;
const MAX_COLA = 5;

// Paleta de 16 colores
const colores = [
    { nombre: 'rojo', hex: '#ef4444', emoji: '🔴' },
    { nombre: 'azul', hex: '#3b82f6', emoji: '🔵' },
    { nombre: 'verde', hex: '#10b981', emoji: '🟢' },
    { nombre: 'amarillo', hex: '#fbbf24', emoji: '🟡' },
    { nombre: 'naranja', hex: '#f97316', emoji: '🟠' },
    { nombre: 'morado', hex: '#a855f7', emoji: '🟣' },
    { nombre: 'rosa', hex: '#ec4899', emoji: '🌸' },
    { nombre: 'cyan', hex: '#06b6d4', emoji: '💠' },
    { nombre: 'lima', hex: '#84cc16', emoji: '🍏' },
    { nombre: 'indigo', hex: '#6366f1', emoji: '💜' },
    { nombre: 'marron', hex: '#92400e', emoji: '🟤' },
    { nombre: 'gris', hex: '#6b7280', emoji: '⚫' },
    { nombre: 'negro', hex: '#1f2937', emoji: '⬛' },
    { nombre: 'blanco', hex: '#f3f4f6', emoji: '⚪' },
    { nombre: 'turquesa', hex: '#14b8a6', emoji: '🔷' },
    { nombre: 'coral', hex: '#fb7185', emoji: '🪸' }
];

function iniciarJuego() {
    juegoActivo = true;
    juegoPausado = false;
    tiempoInicio = Date.now();
    velocidadActual = VELOCIDAD_INICIAL;
    colaEspera = [];
    cochesPintadosArray = [];
    contadorCoches = 1;
    tiempoTranscurrido = 0;
    
    // Actualizar UI
    document.getElementById('btnIniciar').style.display = 'none';
    document.getElementById('btnPausar').style.display = 'inline-block';
    document.getElementById('btnReiniciar').style.display = 'inline-block';
    document.getElementById('gameOverModal').style.display = 'none';
    
    // Agregar primer coche inmediatamente
    agregarCocheAleatorio();
    
    // Iniciar timers
    iniciarTimerTiempo();
    iniciarTimerCoches();
    
    actualizarVista();
}

function pausarJuego() {
    if (juegoPausado) {
        // Reanudar
        juegoPausado = false;
        tiempoInicio = Date.now() - tiempoTranscurrido;
        iniciarTimerTiempo();
        iniciarTimerCoches();
        document.getElementById('btnPausar').textContent = '⏸️ PAUSAR';
    } else {
        // Pausar
        juegoPausado = true;
        clearInterval(intervalTiempo);
        clearInterval(intervalCoches);
        document.getElementById('btnPausar').textContent = '▶️ REANUDAR';
    }
}

function reiniciarJuego() {
    detenerJuego();
    iniciarJuego();
}

function detenerJuego() {
    juegoActivo = false;
    juegoPausado = false;
    clearInterval(intervalTiempo);
    clearInterval(intervalCoches);
}

function iniciarTimerTiempo() {
    intervalTiempo = setInterval(() => {
        if (!juegoPausado) {
            tiempoTranscurrido = Date.now() - tiempoInicio;
            actualizarTiempo();
        }
    }, 100);
}

function iniciarTimerCoches() {
    intervalCoches = setInterval(() => {
        if (!juegoPausado && juegoActivo) {
            agregarCocheAleatorio();
        }
    }, velocidadActual);
}

function agregarCocheAleatorio() {
    if (!juegoActivo) return;
    
    // Verificar game over
    if (colaEspera.length >= MAX_COLA) {
        gameOver();
        return;
    }
    
    // Generar color aleatorio
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    const coche = new Coche(contadorCoches++, colorAleatorio.nombre);
    colaEspera.push(coche);
    
    actualizarVista();
}

function seleccionarColor(colorNombre) {
    if (!juegoActivo || juegoPausado || colaEspera.length === 0) {
        return;
    }
    
    const primerCoche = colaEspera[0];
    
    if (colorNombre === primerCoche.colorRequerido) {
        // ✅ Correcto!
        const coche = colaEspera.shift(); // Dequeue
        cochesPintadosArray.push(coche);
        
        // Aumentar velocidad cada 3 coches
        if (cochesPintadosArray.length % 3 === 0 && velocidadActual > 5000) {
            velocidadActual -= 5000; // Reducir 5 segundos
            clearInterval(intervalCoches);
            iniciarTimerCoches();
        }
        
        actualizarVista();
        mostrarFeedback(true);
    } else {
        // ❌ Incorrecto
        mostrarFeedback(false);
    }
}

function mostrarFeedback(correcto) {
    const feedback = document.createElement('div');
    feedback.className = correcto ? 'feedback-correct' : 'feedback-wrong';
    feedback.textContent = correcto ? '✅ ¡CORRECTO!' : '❌ Color incorrecto';
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2rem 3rem;
        font-size: 2rem;
        font-weight: bold;
        border-radius: 1rem;
        z-index: 10000;
        animation: fadeInOut 1s ease-in-out;
    `;
    
    if (correcto) {
        feedback.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        feedback.style.color = 'white';
    } else {
        feedback.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        feedback.style.color = 'white';
    }
    
    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 1000);
}

function gameOver() {
    detenerJuego();
    
    const modal = document.getElementById('gameOverModal');
    const resultado = document.getElementById('resultadoFinal');
    
    const tiempoFinal = formatearTiempo(tiempoTranscurrido);
    
    resultado.innerHTML = `
        <div class="game-over-stats">
            <p class="game-over-title">¡La cola llegó a ${MAX_COLA} coches!</p>
            <div class="final-stats">
                <div class="final-stat">
                    <span class="stat-label">🎨 Coches Pintados:</span>
                    <span class="stat-value">${cochesPintadosArray.length}</span>
                </div>
                <div class="final-stat">
                    <span class="stat-label">⏱️ Tiempo Total:</span>
                    <span class="stat-value">${tiempoFinal}</span>
                </div>
                <div class="final-stat">
                    <span class="stat-label">⚡ Velocidad Final:</span>
                    <span class="stat-value">${velocidadActual / 1000}s</span>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    
    // Resetear botones
    document.getElementById('btnIniciar').style.display = 'inline-block';
    document.getElementById('btnPausar').style.display = 'none';
    document.getElementById('btnReiniciar').style.display = 'none';
}

function actualizarTiempo() {
    const tiempo = formatearTiempo(tiempoTranscurrido);
    document.getElementById('tiempoJuego').textContent = tiempo;
}

function formatearTiempo(ms) {
    const segundos = Math.floor(ms / 1000);
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
}

function actualizarVista() {
    // Actualizar estadísticas
    document.getElementById('cochesPintados').textContent = cochesPintadosArray.length;
    document.getElementById('cochesEnCola').textContent = colaEspera.length;
    document.getElementById('velocidadActual').textContent = `${velocidadActual / 1000}s`;
    
    // Crear paleta de colores
    const paleta = document.getElementById('paletaColores');
    paleta.innerHTML = colores.map(color => `
        <button 
            class="color-btn" 
            style="background-color: ${color.hex};"
            onclick="seleccionarColor('${color.nombre}')"
            title="${color.nombre}"
            ${!juegoActivo || juegoPausado ? 'disabled' : ''}>
            ${color.emoji}
        </button>
    `).join('');
    
    // Mostrar cola de coches
    const colaCochesDiv = document.getElementById('colaCoches');
    if (colaEspera.length === 0) {
        colaCochesDiv.innerHTML = '<p class="empty-message">Esperando coches...</p>';
    } else {
        colaCochesDiv.innerHTML = colaEspera.map((coche, index) => {
            const colorInfo = colores.find(c => c.nombre === coche.colorRequerido);
            return `
                <div class="game-car ${index === 0 ? 'first-car' : ''}" style="animation-delay: ${index * 0.1}s">
                    <div class="car-visual">🚗</div>
                    <div class="car-label" style="background-color: ${colorInfo.hex};">
                        ${colorInfo.emoji} ${colorInfo.nombre.toUpperCase()}
                    </div>
                    ${index === 0 ? '<div class="paint-arrow">⬅️ PINTAR</div>' : ''}
                </div>
            `;
        }).join('');
    }
    
    // Mostrar coches pintados
    const pintadosDiv = document.getElementById('cochesPintadosLista');
    if (cochesPintadosArray.length === 0) {
        pintadosDiv.innerHTML = '<p class="empty-message">Aún no has pintado ningún coche</p>';
    } else {
        pintadosDiv.innerHTML = cochesPintadosArray.map(coche => {
            const colorInfo = colores.find(c => c.nombre === coche.colorRequerido);
            return `
                <div class="painted-car">
                    <span style="font-size: 2rem;">${colorInfo.emoji}</span>
                    <span class="painted-car-id">#${coche.id}</span>
                </div>
            `;
        }).join('');
    }
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', function() {
    actualizarVista();
});
