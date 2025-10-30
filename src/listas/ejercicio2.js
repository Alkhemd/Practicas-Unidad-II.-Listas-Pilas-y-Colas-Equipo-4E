// Ejercicio 2: Pares e Impares
import readlineSync from 'readline-sync';

class ParesImpares {
    constructor() {
        this.numerosPares = [];
        this.numerosImpares = [];
    }

    async ejecutar() {
        let continuar = true;

        while (continuar) {
            console.clear();
            console.log('====================================');
            console.log('   Ejercicio 2: Pares e Impares');
            console.log('====================================');
            console.log('1. Generar números aleatorios');
            console.log('2. Mostrar listas');
            console.log('3. Limpiar listas');
            console.log('4. Volver al menú principal');
            console.log('====================================');

            const opcion = await this.pregunta('Selecciona una opción: ');

            switch (opcion) {
                case '1':
                    await this.generarNumeros();
                    break;
                case '2':
                    this.mostrarListas();
                    break;
                case '3':
                    this.limpiarListas();
                    break;
                case '4':
                    continuar = false;
                    break;
                default:
                    console.log('\nOpción no válida.');
                    break;
            }

            if (continuar) this.pausar();
        }
    }

    async generarNumeros() {
        const cantidad = await this.pregunta('\n¿Cuántos números deseas generar? ');
        const num = parseInt(cantidad);

        if (isNaN(num) || num <= 0) {
            console.log('\nPor favor ingresa un número válido mayor a 0.');
            return;
        }

        for (let i = 0; i < num; i++) {
            const numero = Math.floor(Math.random() * 100) + 1;
            if (numero % 2 === 0) {
                this.numerosPares.push(numero);
            } else {
                this.numerosImpares.push(numero);
            }
        }

        console.log(`\n✅ Se generaron ${num} números y se clasificaron correctamente.`);
    }

    mostrarListas() {
        console.log('\n--- Números Pares ---');
        if (this.numerosPares.length > 0) {
            console.log(this.numerosPares.join(', '));
            console.log(`Total: ${this.numerosPares.length} números`);
        } else {
            console.log('(No hay números pares)');
        }

        console.log('\n--- Números Impares ---');
        if (this.numerosImpares.length > 0) {
            console.log(this.numerosImpares.join(', '));
            console.log(`Total: ${this.numerosImpares.length} números`);
        } else {
            console.log('(No hay números impares)');
        }
    }

    limpiarListas() {
        this.numerosPares = [];
        this.numerosImpares = [];
        console.log('\n✅ Listas limpiadas correctamente.');
    }

    pregunta(texto) {
        return readlineSync.question(texto);
    }

    pausar() {
        readlineSync.question('\nPresiona Enter para continuar...');
    }
}

export default async function ejecutarEjercicio2() {
    const paresImpares = new ParesImpares();
    await paresImpares.ejecutar();
}

if (import.meta.url === `file://${process.argv[1]}`) {
    ejecutarEjercicio2();
}
