// Ejercicio 4: Reemplazar valor en pila
import readline from 'readline';

class Pila {
    constructor() {
        this.items = [];
    }

    push(elemento) {
        this.items.push(elemento);
    }

    pop() {
        if (this.estaVacia()) {
            return null;
        }
        return this.items.pop();
    }

    peek() {
        if (this.estaVacia()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    estaVacia() {
        return this.items.length === 0;
    }

    tamano() {
        return this.items.length;
    }

    limpiar() {
        this.items = [];
    }

    reemplazar(valorViejo, valorNuevo) {
        const pilaAuxiliar = new Pila();
        let encontrado = false;

        // Sacar elementos hasta encontrar el valor a reemplazar
        while (!this.estaVacia()) {
            const elemento = this.pop();
            if (elemento === valorViejo && !encontrado) {
                pilaAuxiliar.push(valorNuevo);
                encontrado = true;
            } else {
                pilaAuxiliar.push(elemento);
            }
        }

        // Volver a meter los elementos en la pila original
        while (!pilaAuxiliar.estaVacia()) {
            this.push(pilaAuxiliar.pop());
        }

        return encontrado;
    }

    toString() {
        if (this.estaVacia()) {
            return "Pila vacía";
        }
        return `[${this.items.join(", ")}]`;
    }
}

class ReemplazoPila {
    constructor() {
        this.pila = new Pila();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async ejecutar() {
        // Agregar algunos valores de ejemplo
        this.pila.push(10);
        this.pila.push(20);
        this.pila.push(30);
        this.pila.push(20);
        this.pila.push(40);

        let continuar = true;

        while (continuar) {
            console.clear();
            console.log('====================================');
            console.log('   Ejercicio 4: Reemplazar en Pila');
            console.log('====================================');
            console.log('Pila actual:', this.pila.toString());
            console.log('------------------------------------');
            console.log('1. Agregar número a la pila');
            console.log('2. Reemplazar primer ocurrencia');
            console.log('3. Mostrar tope de la pila');
            console.log('4. Vaciar pila');
            console.log('5. Volver al menú principal');
            console.log('====================================');

            const opcion = await this.pregunta('Selecciona una opción: ');

            switch (opcion) {
                case '1':
                    await this.agregarNumero();
                    break;
                case '2':
                    await this.reemplazarValor();
                    break;
                case '3':
                    this.mostrarTope();
                    break;
                case '4':
                    this.pila.limpiar();
                    console.log('\n✅ Pila vaciada correctamente.');
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

    async agregarNumero() {
        const valor = await this.pregunta('\nIngresa un número entero: ');
        const numero = parseInt(valor);

        if (isNaN(numero)) {
            console.log('\n⚠️  Por favor ingresa un número válido.');
            return;
        }

        this.pila.push(numero);
        console.log(`\n✅ Número ${numero} agregado a la pila.`);
    }

    async reemplazarValor() {
        if (this.pila.estaVacia()) {
            console.log('\n⚠️  La pila está vacía.');
            return;
        }

        const viejoValor = await this.pregunta('\nValor a reemplazar: ');
        const nuevoValor = await this.pregunta('Nuevo valor: ');

        const numViejo = parseInt(viejoValor);
        const numNuevo = parseInt(nuevoValor);

        if (isNaN(numViejo) || isNaN(numNuevo)) {
            console.log('\n⚠️  Por favor ingresa valores numéricos válidos.');
            return;
        }

        const resultado = this.pila.reemplazar(numViejo, numNuevo);

        if (resultado) {
            console.log(`\n✅ Se reemplazó la primera ocurrencia de ${numViejo} por ${numNuevo}.`);
        } else {
            console.log(`\n⚠️  No se encontró el valor ${numViejo} en la pila.`);
        }
    }

    mostrarTope() {
        const tope = this.pila.peek();
        if (tope === null) {
            console.log('\nLa pila está vacía.');
        } else {
            console.log(`\nTope de la pila: ${tope}`);
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

export default async function ejecutarEjercicio4() {
    const app = new ReemplazoPila();
    await app.ejecutar();
}

if (import.meta.url === `file://${process.argv[1]}`) {
    ejecutarEjercicio4();
}
