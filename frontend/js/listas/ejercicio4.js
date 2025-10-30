// Ejercicio 4: Eliminar y ordenar productos

class Producto {
    constructor(codigo, nombre, precio) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
    }
}

let productos = [];

// Agregar productos de ejemplo al inicio
function inicializarProductos() {
    productos = [
        new Producto('P001', 'Laptop', 15000),
        new Producto('P002', 'Mouse', 250),
        new Producto('P003', 'Teclado', 500),
        new Producto('P004', 'Monitor', 3500),
        new Producto('P005', 'Impresora', 2800)
    ];
    actualizarVista();
}

function agregarProducto() {
    const codigoInput = document.getElementById('codigoProducto');
    const nombreInput = document.getElementById('nombreProducto');
    const precioInput = document.getElementById('precioProducto');
    
    const codigo = codigoInput.value.trim();
    const nombre = nombreInput.value.trim();
    const precio = parseFloat(precioInput.value);
    
    if (!codigo) {
        alert('⚠️ Por favor ingresa el código del producto');
        return;
    }
    
    if (!nombre) {
        alert('⚠️ Por favor ingresa el nombre del producto');
        return;
    }
    
    if (isNaN(precio) || precio <= 0) {
        alert('⚠️ Por favor ingresa un precio válido');
        return;
    }
    
    // Verificar si el código ya existe
    if (productos.some(p => p.codigo === codigo)) {
        alert('⚠️ Ya existe un producto con ese código');
        return;
    }
    
    const producto = new Producto(codigo, nombre, precio);
    productos.push(producto);
    
    codigoInput.value = '';
    nombreInput.value = '';
    precioInput.value = '';
    codigoInput.focus();
    
    actualizarVista();
}

function eliminarProducto(codigo) {
    if (confirm(`¿Estás seguro de eliminar el producto ${codigo}?`)) {
        productos = productos.filter(p => p.codigo !== codigo);
        actualizarVista();
    }
}

function ordenarPorNombre() {
    productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    actualizarVista();
}

function ordenarPorPrecio() {
    productos.sort((a, b) => a.precio - b.precio);
    actualizarVista();
}

function limpiarProductos() {
    if (confirm('¿Estás seguro de eliminar todos los productos?')) {
        productos = [];
        actualizarVista();
    }
}

function actualizarVista() {
    const tabla = document.getElementById('tablaProductos');
    
    if (productos.length === 0) {
        tabla.innerHTML = '<p class="empty-message">No hay productos registrados</p>';
        return;
    }
    
    tabla.innerHTML = `
        <table class="products-table-grid">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${productos.map(p => `
                    <tr>
                        <td><span class="code-badge">${p.codigo}</span></td>
                        <td><strong>${p.nombre}</strong></td>
                        <td><span class="price-badge">$${p.precio.toFixed(2)}</span></td>
                        <td>
                            <button onclick="eliminarProducto('${p.codigo}')" class="btn-small btn-danger">
                                🗑️ Eliminar
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    inicializarProductos();
    
    // Permitir agregar con Enter
    const inputs = [
        document.getElementById('codigoProducto'),
        document.getElementById('nombreProducto'),
        document.getElementById('precioProducto')
    ];
    
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    agregarProducto();
                }
            }
        });
    });
});
