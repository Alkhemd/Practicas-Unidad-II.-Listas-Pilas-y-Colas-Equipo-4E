// Ejercicio 3: Aprobados y Reprobados

class Alumno {
    constructor(nombre, calificacion) {
        this.nombre = nombre;
        this.calificacion = calificacion;
    }
}

let aprobados = [];
let reprobados = [];
const CALIFICACION_MINIMA = 70;

function agregarAlumno() {
    const nombreInput = document.getElementById('nombreAlumno');
    const calificacionInput = document.getElementById('calificacion');
    
    const nombre = nombreInput.value.trim();
    const calificacion = parseInt(calificacionInput.value);
    
    if (!nombre) {
        alert('⚠️ Por favor ingresa el nombre del alumno');
        return;
    }
    
    if (isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
        alert('⚠️ Por favor ingresa una calificación válida (0-100)');
        return;
    }
    
    const alumno = new Alumno(nombre, calificacion);
    
    if (calificacion >= CALIFICACION_MINIMA) {
        aprobados.push(alumno);
    } else {
        reprobados.push(alumno);
    }
    
    nombreInput.value = '';
    calificacionInput.value = '';
    nombreInput.focus();
    
    actualizarVista();
}

function limpiarListas() {
    if (confirm('¿Estás seguro de que deseas limpiar todas las listas?')) {
        aprobados = [];
        reprobados = [];
        actualizarVista();
    }
}

function actualizarVista() {
    // Actualizar estadísticas
    document.getElementById('totalAprobados').textContent = aprobados.length;
    document.getElementById('totalReprobados').textContent = reprobados.length;
    document.getElementById('totalAlumnos').textContent = aprobados.length + reprobados.length;
    
    // Actualizar lista de aprobados
    const divAprobados = document.getElementById('alumnosAprobados');
    if (aprobados.length === 0) {
        divAprobados.innerHTML = '<p class="empty-message">No hay alumnos aprobados</p>';
    } else {
        divAprobados.innerHTML = aprobados.map((alumno, index) => `
            <div class="student-item approved">
                <div class="student-info">
                    <strong>${alumno.nombre}</strong>
                    <span class="grade approved-grade">${alumno.calificacion}</span>
                </div>
                <button onclick="eliminarAprobado(${index})" class="btn-small btn-danger">🗑️</button>
            </div>
        `).join('');
    }
    
    // Actualizar lista de reprobados
    const divReprobados = document.getElementById('alumnosReprobados');
    if (reprobados.length === 0) {
        divReprobados.innerHTML = '<p class="empty-message">No hay alumnos reprobados</p>';
    } else {
        divReprobados.innerHTML = reprobados.map((alumno, index) => `
            <div class="student-item failed">
                <div class="student-info">
                    <strong>${alumno.nombre}</strong>
                    <span class="grade failed-grade">${alumno.calificacion}</span>
                </div>
                <button onclick="eliminarReprobado(${index})" class="btn-small btn-danger">🗑️</button>
            </div>
        `).join('');
    }
}

function eliminarAprobado(index) {
    aprobados.splice(index, 1);
    actualizarVista();
}

function eliminarReprobado(index) {
    reprobados.splice(index, 1);
    actualizarVista();
}

// Permitir agregar con Enter
document.addEventListener('DOMContentLoaded', function() {
    const nombreInput = document.getElementById('nombreAlumno');
    const calificacionInput = document.getElementById('calificacion');
    
    nombreInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calificacionInput.focus();
        }
    });
    
    calificacionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarAlumno();
        }
    });
    
    actualizarVista();
});
