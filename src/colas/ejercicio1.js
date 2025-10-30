// Ejercicio 1: Ventanilla de un banco
import readline from 'readline';

class Cliente {
    constructor(turno, nombre, movimiento) {
        this.turno = turno;
        this.nombre = nombre;
        this.movimiento = movimiento;
        this.horaLlegada = new Date();
    }
}

class VentanillaBanco {
    constructor() {
        this.cola = [];
        this.nextTurn = 1;
        this.capacidad = 10;
        this.movimientos = {
            '1': 'Depósito',
            '2': 'Retiro',
            '3': 'Pago',
            '4': 'Consulta'
        };
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async ejecutar() {
        let continuar = true;

        while (continuar) {
            console.clear();
            console.log('=== Ventanilla de Banco ===');
            console.log('1) Agregar cliente a la cola');
            console.log('2) Atender en ventanilla');
            console.log('3) Mostrar cola completa');
            console.log('4) Mostrar frente y final');
            console.log('5) Salir');

            const opcion = await this.pregunta('Seleccione una opción: ');

            switch (opcion) {
                case '1':
                    await this.agregarCliente();
                    break;
                case '2':
                    this.atenderCliente();
                    break;
                case '3':
                    this.mostrarCola();
                    break;
                case '4':
                    this.mostrarFrenteFinal();
                    break;
                case '5':
                    continuar = false;
                    break;
                default:
                    console.log('Opción inválida. Intente de nuevo.');
                    break;
            }

            if (continuar) await this.pausar();
        }

        this.rl.close();
    }

    async agregarCliente() {
        if (this.cola.length >= this.capacidad) {
            console.log('\nNo se puede insertar: la cola está llena (overflow).');
            return;
        }

        const nombre = await this.pregunta('Ingrese el nombre del cliente: ');
        
        console.log('\nSeleccione el tipo de movimiento:');
        Object.entries(this.movimientos).forEach(([key, value]) => {
            console.log(`${key}) ${value}`);
        });
        
        const movOp = await this.pregunta('Opción (número): ');
        const movimientoTexto = this.movimientos[movOp] || 'Otro';

        const cliente = new Cliente(this.nextTurn++, nombre, movimientoTexto);
        this.cola.push(cliente);

        console.log('\nCliente insertado:');
        console.log(`Turno: ${cliente.turno} | Nombre: ${cliente.nombre} | Movimiento: ${cliente.movimiento}`);
        console.log(`Hora llegada: ${cliente.horaLlegada.toLocaleString()}`);
    }

    atenderCliente() {
        if (this.cola.length === 0) {
            console.log('\nNo hay clientes en la cola (underflow).');
            return;
        }

        const cliente = this.cola.shift(); // Dequeue
        const horaAtencion = new Date();
        const espera = horaAtencion - cliente.horaLlegada;
        const segundos = Math.floor(espera / 1000);

        console.log('\nCliente atendido:');
        console.log(`Turno: ${cliente.turno}`);
        console.log(`Nombre: ${cliente.nombre}`);
        console.log(`Movimiento: ${cliente.movimiento}`);
        console.log(`Hora llegada: ${cliente.horaLlegada.toLocaleString()}`);
        console.log(`Hora atención: ${horaAtencion.toLocaleString()}`);
        console.log(`Tiempo de espera: ${segundos} segundos`);
    }

    mostrarCola() {
        if (this.cola.length === 0) {
            console.log('\nLa cola está vacía.');
            return;
        }

        console.log('\nTurno | Nombre                 | Movimiento | Hora llegada');
        console.log('-'.repeat(64));
        this.cola.forEach(c => {
            console.log(`${c.turno.toString().padEnd(5)} | ${c.nombre.padEnd(20)} | ${c.movimiento.padEnd(9)} | ${c.horaLlegada.toLocaleString()}`);
        });
    }

    mostrarFrenteFinal() {
        const frente = this.cola[0];
        const final = this.cola[this.cola.length - 1];

        const frenteStr = frente ? `${frente.turno} - ${frente.nombre}` : '-';
        const finalStr = final ? `${final.turno} - ${final.nombre}` : '-';

        console.log(`\nFrente: ${frenteStr}`);
        console.log(`Final : ${finalStr}`);
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

export default async function ejecutarEjercicio1() {
    const ventanilla = new VentanillaBanco();
    await ventanilla.ejecutar();
}

if (import.meta.url === `file://${process.argv[1]}`) {
    ejecutarEjercicio1();
}
