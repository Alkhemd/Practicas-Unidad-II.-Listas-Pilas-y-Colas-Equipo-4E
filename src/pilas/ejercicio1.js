// Ejercicio 1: Invertir palabra usando pila
import readline from 'readline';

class InvertirPalabra {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    invertir(palabra) {
        const pila = [];
        
        // Push: agregar cada carácter a la pila
        for (let char of palabra) {
            pila.push(char);
        }
        
        // Pop: sacar caracteres en orden inverso
        let resultado = '';
        while (pila.length > 0) {
            resultado += pila.pop();
        }
        
        return resultado;
    }

    async ejecutar() {
        let continuar = true;

        while (continuar) {
            console.clear();
            console.log('====================================');
            console.log('   Ejercicio 1: Invertir Palabra');
            console.log('====================================');
            console.log('1. Invertir una palabra');
            console.log('2. Volver al menú principal');
            console.log('====================================');

            const opcion = await this.pregunta('Selecciona una opción: ');

            switch (opcion) {
                case '1':
                    await this.procesarInversion();
                    break;
                case '2':
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

    async procesarInversion() {
        const palabra = await this.pregunta('\nIngresa una palabra: ');
        
        if (!palabra || palabra.trim() === '') {
            console.log('\n⚠️  Por favor ingresa una palabra válida.');
            return;
        }

        const invertida = this.invertir(palabra);
        console.log(`\n✅ Palabra original: ${palabra}`);
        console.log(`✅ Palabra invertida: ${invertida}`);
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
    const invertir = new InvertirPalabra();
    await invertir.ejecutar();
}

if (import.meta.url === `file://${process.argv[1]}`) {
    ejecutarEjercicio1();
}
