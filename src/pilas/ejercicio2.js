// Ejercicio 2: Verificar si una palabra es palíndromo
import readline from 'readline';

class Palindromo {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    esPalindromo(palabra) {
        // Limpiar: solo letras y números, en minúsculas
        const limpia = palabra.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        const pilaIzquierda = [];
        const pilaDerecha = [];
        
        const n = limpia.length;
        const mitad = Math.floor(n / 2);
        
        // Llenar pilas
        for (let i = 0; i < n; i++) {
            if (i < mitad) {
                pilaIzquierda.push(limpia[i]);
            } else if (n % 2 === 0 || i > mitad) {
                pilaDerecha.push(limpia[i]);
            }
        }
        
        // Comparar
        while (pilaIzquierda.length > 0 && pilaDerecha.length > 0) {
            if (pilaIzquierda.pop() !== pilaDerecha.pop()) {
                return false;
            }
        }
        
        return pilaIzquierda.length === 0 && pilaDerecha.length === 0;
    }

    async ejecutar() {
        let continuar = true;

        while (continuar) {
            console.clear();
            console.log('====================================');
            console.log('   Ejercicio 2: Palíndromo');
            console.log('====================================');
            console.log('1. Verificar si es palíndromo');
            console.log('2. Volver al menú principal');
            console.log('====================================');

            const opcion = await this.pregunta('Selecciona una opción: ');

            switch (opcion) {
                case '1':
                    await this.verificarPalindromo();
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

    async verificarPalindromo() {
        const palabra = await this.pregunta('\nIngresa una palabra o frase: ');
        
        if (!palabra || palabra.trim() === '') {
            console.log('\n⚠️  Por favor ingresa una palabra válida.');
            return;
        }

        const resultado = this.esPalindromo(palabra);
        
        console.log(`\n📝 Texto: "${palabra}"`);
        if (resultado) {
            console.log('✅ ¡ES un palíndromo!');
        } else {
            console.log('❌ NO es un palíndromo.');
        }
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
    const palindromo = new Palindromo();
    await palindromo.ejecutar();
}

if (import.meta.url === `file://${process.argv[1]}`) {
    ejecutarEjercicio2();
}
