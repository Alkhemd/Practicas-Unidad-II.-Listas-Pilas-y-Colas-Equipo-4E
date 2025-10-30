// Ejercicio 1: Supermercado - Productos disponibles y retirados

class Producto {
    constructor(nombre, cantidad, precio) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}

let productosDisponibles = [];
let productosRetirados = [];
let contadorProductos = 1;

function agregarProducto() {
    const nombreInput = document.getElementById('productName');
    const nombre = nombreInput.value.trim();
    
    if (!nombre) {
        alert('⚠️ Por favor ingresa un nombre para el producto');
        return;
    }
    
    // Generar cantidad y precio aleatorios
    const cantidad = Math.floor(Math.random() * 10) + 1;
    const precio = Math.round((5 + Math.random() * 145) * 100) / 100;
    
    const producto = new Producto(nombre, cantidad, precio);
    productosDisponibles.push(producto);
    
    nombreInput.value = '';
    nombreInput.focus();
    
    actualizarVista();
}

function retirarProducto(index) {
    const producto = productosDisponibles.splice(index, 1)[0];
    productosRetirados.push(producto);
    actualizarVista();
}

function devolverProducto(index) {
    const producto = productosRetirados.splice(index, 1)[0];
    productosDisponibles.push(producto);
    actualizarVista();
}

function limpiarListas() {
    if (confirm('¿Estás seguro de que deseas limpiar todas las listas?')) {
        productosDisponibles = [];
        productosRetirados = [];
        actualizarVista();
    }
}

function actualizarVista() {
    // Actualizar productos disponibles
    const divDisponibles = document.getElementById('productosDisponibles');
    if (productosDisponibles.length === 0) {
        divDisponibles.innerHTML = '<p class="empty-message">No hay productos disponibles</p>';
    } else {
        divDisponibles.innerHTML = productosDisponibles.map((p, index) => `
            <div class="product-item">
                <div class="product-info">
                    <strong>${p.nombre}</strong>
                    <span>Cantidad: ${p.cantidad} | Precio: $${p.precio.toFixed(2)}</span>
                </div>
                <button onclick="retirarProducto(${index})" class="btn-small btn-danger">❌ Retirar</button>
            </div>
        `).join('');
    }
    
    // Actualizar productos retirados
    const divRetirados = document.getElementById('productosRetirados');
    if (productosRetirados.length === 0) {
        divRetirados.innerHTML = '<p class="empty-message">No hay productos retirados</p>';
    } else {
        divRetirados.innerHTML = productosRetirados.map((p, index) => `
            <div class="product-item retired">
                <div class="product-info">
                    <strong>${p.nombre}</strong>
                    <span>Cantidad: ${p.cantidad} | Precio: $${p.precio.toFixed(2)}</span>
                </div>
                <button onclick="devolverProducto(${index})" class="btn-small btn-success">↩️ Devolver</button>
            </div>
        `).join('');
    }
}

// Permitir agregar con Enter
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('productName');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarProducto();
        }
    });
    
    actualizarVista();
});
