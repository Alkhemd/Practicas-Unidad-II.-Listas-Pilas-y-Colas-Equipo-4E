// Ejercicio 2: Juego pintar coches
import readline from 'readline';

class Coche {
    constructor(id, color = 'blanco') {
        this.id = id;
        this.color = color;
        this.fechaEntrada = new Date();
    }
}

class TallerPintura {
    constructor() {
        this.colaEspera = [];
        this.colaPintados = [];
        this.contadorCoches = 1;
        this.coloresDisponibles = [
            'rojo', 'azul', 'verde', 'amarillo', 'negro',
            'blanco', 'gris', 'plateado', 'naranja', 'morado'
        ];
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async ejecutar() {
        // Agregar algunos coches de ejemplo
        this.agregarCocheAutomatico('rojo');
        this.agregarCocheAutomatico('azul');
        this.agregarCocheAutomatico('verde');

        let continuar = true;

        while (continuar) {
            console.clear();
            console.log('====================================');
            console.log('   TALLER DE PINTURA DE COCHES');
            console.log('====================================');
            console.log('1. Agregar coche a la cola');
            console.log('2. Pintar siguiente coche');
            console.log('3. Mostrar cola de espera');
            console.log('4. Mostrar coches pintados');
            console.log('5. Volver al menú principal');
            console.log('====================================');
            console.log(`Coches en espera: ${this.colaEspera.length} | Coches pintados: ${this.colaPintados.length}`);
            console.log('====================================');

            const opcion = await this.pregunta('Selecciona una opción: ');

            switch (opcion) {
                case '1':
                    await this.agregarCoche();
                    break;
                case '2':
                    await this.pintarCoche();
                    break;
                case '3':
                    this.mostrarColaEspera();
                    break;
                case '4':
                    this.mostrarPintados();
                    break;
                case '5':
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

    agregarCocheAutomatico(color = null) {
        const nuevoColor = color || this.coloresDisponibles[Math.floor(Math.random() * this.coloresDisponibles.length)];
        const coche = new Coche(this.contadorCoches++, nuevoColor);
        this.colaEspera.push(coche);
        return coche;
    }

    async agregarCoche() {
        console.log('\nColores disponibles:');
        this.coloresDisponibles.forEach((color, index) => {
            console.log(`${index + 1}. ${color.charAt(0).toUpperCase() + color.slice(1)}`);
        });

        const opcion = await this.pregunta('\nElige un color (número) o presiona Enter para color aleatorio: ');
        let colorElegido = null;

        if (opcion) {
            const num = parseInt(opcion);
            if (num >= 1 && num <= this.coloresDisponibles.length) {
                colorElegido = this.coloresDisponibles[num - 1];
            } else {
                console.log('\n⚠️  Opción no válida. Se asignará un color aleatorio.');
            }
        }

        const coche = this.agregarCocheAutomatico(colorElegido);
        console.log(`\n✅ Coche ${coche.id} agregado a la cola. Color: ${coche.color}`);
    }

    async pintarCoche() {
        if (this.colaEspera.length === 0) {
            console.log('\n⚠️  No hay coches en espera para pintar.');
            return;
        }

        const coche = this.colaEspera.shift();
        coche.fechaPintado = new Date();
        coche.tiempoEspera = (coche.fechaPintado - coche.fechaEntrada) / 1000; // en segundos
        
        // Simular tiempo de pintado (1-5 segundos)
        console.log(`\n🖌️  Pintando coche ${coche.id} de color ${coche.color}...`);
        await this.delay(1000 + Math.random() * 4000);
        
        this.colaPintados.push(coche);
        console.log(`✅ Coche ${coche.id} pintado de ${coche.color} en ${coche.tiempoEspera.toFixed(1)} segundos.`);
    }

    mostrarColaEspera() {
        console.log('\n=== COCHES EN ESPERA ===');
        if (this.colaEspera.length === 0) {
            console.log('No hay coches en espera.');
            return;
        }

        this.colaEspera.forEach((coche, index) => {
            const tiempoEspera = (new Date() - coche.fechaEntrada) / 1000;
            console.log(`${index + 1}. Coche ${coche.id} - Color: ${coche.color} - Espera: ${tiempoEspera.toFixed(1)}s`);
        });
    }

    mostrarPintados() {
        console.log('\n=== COCHES PINTADOS ===');
        if (this.colaPintados.length === 0) {
            console.log('No hay coches pintados aún.');
            return;
        }

        this.colaPintados.forEach((coche, index) => {
            console.log(`${index + 1}. Coche ${coche.id} - Color: ${coche.color} - Tiempo de espera: ${coche.tiempoEspera.toFixed(1)}s`);
        });

        const tiempoPromedio = this.colaPintados.reduce((sum, c) => sum + c.tiempoEspera, 0) / this.colaPintados.length;
        console.log(`\nTiempo promedio de espera: ${tiempoPromedio.toFixed(1)} segundos`);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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

export default async function ejecutarEjercicio2() {
    const taller = new TallerPintura();
    await taller.ejecutar();
}

if (import.meta.url === `file://${process.argv[1]}`) {
    ejecutarEjercicio2();
}
