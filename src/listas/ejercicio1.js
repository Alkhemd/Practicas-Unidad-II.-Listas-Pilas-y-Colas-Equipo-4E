// Ejercicio 1: Supermercado - Productos disponibles y retirados
import readlineSync from 'readline-sync';

class Producto {
    constructor(nombre, cantidad, precio) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }

    toString() {
        return `${this.nombre} | Cantidad: ${this.cantidad} | Precio: $${this.precio.toFixed(2)}`;
    }
}

class Supermercado {
    constructor() {
        this.productosDisponibles = [];
        this.productosRetirados = [];
        this.contadorProductos = 1;
    }

    async ejecutar() {
        let continuar = true;

        while (continuar) {
            console.clear();
            console.log('====================================');
            console.log('   Ejercicio 1: Supermercado');
            console.log('====================================');
            console.log('1. Escanear (Agregar) nuevo producto');
            console.log('2. Retirar producto de la compra');
            console.log('3. Mostrar productos');
            console.log('4. Volver al menú principal');
            console.log('====================================');

            const opcion = await this.pregunta('Selecciona una opción: ');

            switch (opcion) {
                case '1':
                    this.agregarProducto();
                    break;
                case '2':
                    await this.retirarProducto();
                    break;
                case '3':
                    this.mostrarProductos();
                    break;
                case '4':
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

    agregarProducto() {
        const nombre = `producto${this.contadorProductos++}`;
        const cantidad = Math.floor(Math.random() * 10) + 1;
        const precio = Math.round((5 + Math.random() * 145) * 100) / 100;

        const nuevoProducto = new Producto(nombre, cantidad, precio);
        this.productosDisponibles.push(nuevoProducto);

        console.log(`\nProducto agregado: ${nuevoProducto.nombre}`);
    }

    async retirarProducto() {
        const nombre = await this.pregunta('\nIntroduce el nombre del producto a retirar (ej. producto1): ');
        
        const index = this.productosDisponibles.findIndex(
            p => p.nombre.toLowerCase() === nombre.toLowerCase()
        );

        if (index !== -1) {
            const productoRetirado = this.productosDisponibles.splice(index, 1)[0];
            this.productosRetirados.push(productoRetirado);
            console.log(`\nEl producto '${productoRetirado.nombre}' ha sido retirado.`);
        } else {
            console.log(`\nNo se encontró un producto con el nombre '${nombre}' en la lista de disponibles.`);
        }
    }

    mostrarProductos() {
        console.log('\n--- Productos Disponibles en el Carrito ---');
        if (this.productosDisponibles.length > 0) {
            this.productosDisponibles.forEach(p => console.log(p.toString()));
        } else {
            console.log('(No hay productos en el carrito)');
        }

        console.log('\n--- Productos Retirados de la Compra ---');
        if (this.productosRetirados.length > 0) {
            this.productosRetirados.forEach(p => console.log(p.toString()));
        } else {
            console.log('(No se han retirado productos)');
        }
    }

    pregunta(texto) {
        return readlineSync.question(texto);
    }

    pausar() {
        readlineSync.question('\nPresiona Enter para continuar...');
    }
}

export default async function ejecutarEjercicio1() {
    const supermercado = new Supermercado();
    await supermercado.ejecutar();
}

// Si se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    ejecutarEjercicio1();
}
