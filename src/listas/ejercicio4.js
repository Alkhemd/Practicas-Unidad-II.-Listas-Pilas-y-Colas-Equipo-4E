// Ejercicio 4: Eliminar y ordenar productos
import readline from 'readline';

class Producto {
    constructor(codigo, nombre, precio) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
    }
}

class GestorProductos {
    constructor() {
        this.productos = [];
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async ejecutar() {
        // Agregar algunos productos de ejemplo
        this.agregarProductoAutomatico('P001', 'Laptop', 15000);
        this.agregarProductoAutomatico('P002', 'Mouse', 250);
        this.agregarProductoAutomatico('P003', 'Teclado', 500);
        this.agregarProductoAutomatico('P004', 'Monitor', 3500);
        this.agregarProductoAutomatico('P005', 'Impresora', 2800);

        let continuar = true;

        while (continuar) {
            console.clear();
            console.log('====================================');
            console.log('   Ejercicio 4: Gestión de Productos');
            console.log('====================================');
            console.log('1. Mostrar productos');
            console.log('2. Agregar producto');
            console.log('3. Eliminar producto por código');
            console.log('4. Ordenar por nombre (A-Z)');
            console.log('5. Ordenar por precio (menor a mayor)');
            console.log('6. Volver al menú principal');
            console.log('====================================');

            const opcion = await this.pregunta('Selecciona una opción: ');

            switch (opcion) {
                case '1':
                    this.mostrarProductos();
                    break;
                case '2':
                    await this.agregarProducto();
                    break;
                case '3':
                    await this.eliminarProducto();
                    break;
                case '4':
                    this.ordenarPorNombre();
                    console.log('\n✅ Productos ordenados por nombre (A-Z)');
                    break;
                case '5':
                    this.ordenarPorPrecio();
                    console.log('\n✅ Productos ordenados por precio (menor a mayor)');
                    break;
                case '6':
                    continuar = false;
                    break;
                default:
                    console.log('\nOpción no válida.');
                    break;
            }

            if (continuar) await this.pausar();
        }

        this.rl.close();
    }

    agregarProductoAutomatico(codigo, nombre, precio) {
        this.productos.push(new Producto(codigo, nombre, precio));
    }

    async agregarProducto() {
        const codigo = await this.pregunta('\nCódigo del producto (ej: P001): ');
        const nombre = await this.pregunta('Nombre: ');
        const precioStr = await this.pregunta('Precio: ');
        const precio = parseFloat(precioStr);

        if (isNaN(precio) || precio <= 0) {
            console.log('\n⚠️  Precio no válido. Debe ser un número mayor a 0.');
            return;
        }

        this.productos.push(new Producto(codigo, nombre, precio));
        console.log(`\n✅ Producto '${nombre}' agregado correctamente.`);
    }

    async eliminarProducto() {
        if (this.productos.length === 0) {
            console.log('\n⚠️  No hay productos para eliminar.');
            return;
        }

        this.mostrarProductos();
        const codigo = await this.pregunta('\nIngresa el código del producto a eliminar: ');
        
        const indice = this.productos.findIndex(p => p.codigo === codigo);
        
        if (indice === -1) {
            console.log('\n⚠️  No se encontró un producto con ese código.');
            return;
        }

        const productoEliminado = this.productos.splice(indice, 1)[0];
        console.log(`\n✅ Producto '${productoEliminado.nombre}' eliminado correctamente.`);
    }

    ordenarPorNombre() {
        this.productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    ordenarPorPrecio() {
        this.productos.sort((a, b) => a.precio - b.precio);
    }

    mostrarProductos() {
        console.log('\n=== LISTA DE PRODUCTOS ===');
        if (this.productos.length === 0) {
            console.log('(No hay productos registrados)');
            return;
        }

        console.log('CÓDIGO | NOMBRE'.padEnd(20) + ' | PRECIO');
        console.log('-'.repeat(40));
        
        this.productos.forEach(producto => {
            console.log(
                `${producto.codigo.padEnd(7)} | ${producto.nombre.padEnd(15)} | $${producto.precio.toFixed(2)}`
            );
        });

        const total = this.productos.reduce((sum, p) => sum + p.precio, 0);
        console.log('\nTotal de productos:', this.productos.length);
        console.log('Valor total del inventario: $' + total.toFixed(2));
    }

    pregunta(texto) {
        return new Promise(resolve => {
            this.rl.question(texto, resolve);
        });
    }

    pausar() {
        return new Promise(resolve => {
            this.rl.question('\nPresiona Enter para continuar...', resolve);
        });
    }
}

export default async function ejecutarEjercicio4() {
    const gestor = new GestorProductos();
    await gestor.ejecutar();
}

if (import.meta.url === `file://${process.argv[1]}`) {
    ejecutarEjercicio4();
}
