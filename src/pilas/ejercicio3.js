// Ejercicio 3: Suma de números grandes usando pilas
import readline from 'readline';

class SumaGrandes {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    sumarGrandes(num1, num2) {
        // Convertir cadenas a arrays de dígitos y revertir para facilitar el procesamiento
        const pila1 = num1.split('').map(Number).reverse();
        const pila2 = num2.split('').map(Number).reverse();
        const resultado = [];
        
        let acarreo = 0;
        const maxLength = Math.max(pila1.length, pila2.length);
        
        for (let i = 0; i < maxLength || acarreo > 0; i++) {
            const digito1 = pila1[i] || 0;
            const digito2 = pila2[i] || 0;
            
            const suma = digito1 + digito2 + acarreo;
            resultado.push(suma % 10);
            acarreo = Math.floor(suma / 10);
        }
        
        return resultado.reverse().join('');
    }

    validarNumero(numero) {
        return /^\d+$/.test(numero);
    }

    async ejecutar() {
        let continuar = true;

        while (continuar) {
            console.clear();
            console.log('====================================');
            console.log('   Ejercicio 3: Suma de Números Grandes');
            console.log('====================================');
            console.log('1. Sumar dos números grandes');
            console.log('2. Volver al menú principal');
            console.log('====================================');

            const opcion = await this.pregunta('Selecciona una opción: ');

            switch (opcion) {
                case '1':
                    await this.procesarSuma();
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

    async procesarSuma() {
        console.log('\nIngresa dos números enteros positivos grandes:');
        const num1 = await this.pregunta('Primer número: ');
        const num2 = await this.pregunta('Segundo número: ');

        if (!this.validarNumero(num1) || !this.validarNumero(num2)) {
            console.log('\n⚠️  Error: Solo se permiten números enteros positivos.');
            return;
        }

        const resultado = this.sumarGrandes(num1, num2);
        
        console.log('\n=== RESULTADO ===');
        console.log(`${num1}
+ ${num2}
${'-'.repeat(Math.max(num1.length, num2.length) + 2)}
${resultado}`);
        
        // Verificación con BigInt (solo para validar)
        try {
            const bigIntResult = (BigInt(num1) + BigInt(num2)).toString();
            console.log(`\nVerificación (BigInt): ${bigIntResult}`);
        } catch (e) {
            // Si hay algún error con BigInt, lo ignoramos
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

export default async function ejecutarEjercicio3() {
    const suma = new SumaGrandes();
    await suma.ejecutar();
}

if (import.meta.url === `file://${process.argv[1]}`) {
    ejecutarEjercicio3();
}
