// Ejercicio 3: Estacionamiento para autos
import readline from 'readline';

class Auto {
    constructor(placa, propietario) {
        this.placa = placa;
        this.propietario = propietario;
        this.horaEntrada = new Date();
        this.horaSalida = null;
        this.espacio = null;
    }

    calcularTiempo() {
        const ahora = this.horaSalida || new Date();
        const diffMs = ahora - this.horaEntrada;
        const diffMins = Math.ceil(diffMs / (1000 * 60)); // Redondear hacia arriba
        return diffMins;
    }

    calcularCosto() {
        const minutos = this.calcularTiempo();
        const horas = Math.ceil(minutos / 60); // Redondear horas hacia arriba
        const tarifaPorHora = 20; // $20 MXN por hora
        return horas * tarifaPorHora;
    }
}

class Estacionamiento {
    constructor(capacidad = 10) {
        this.capacidad = capacidad;
        this.espacios = new Array(capacidad).fill(null);
        this.colaEspera = [];
        this.registro = [];
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async ejecutar() {
        let continuar = true;

        while (continuar) {
            console.clear();
            console.log('====================================');
            console.log('   SISTEMA DE ESTACIONAMIENTO');
            console.log('====================================');
            console.log('1. Registrar entrada de auto');
            console.log('2. Registrar salida de auto');
            console.log('3. Mostrar estado del estacionamiento');
            console.log('4. Mostrar cola de espera');
            console.log('5. Mostrar registro de movimientos');
            console.log('6. Volver al menú principal');
            console.log('====================================');
            console.log(`Espacios ocupados: ${this.contarOcupados()}/${this.capacidad}`);
            console.log(`Autos en espera: ${this.colaEspera.length}`);
            console.log('====================================');

            const opcion = await this.pregunta('Selecciona una opción: ');

            switch (opcion) {
                case '1':
                    await this.registrarEntrada();
                    break;
                case '2':
                    await this.registrarSalida();
                    break;
                case '3':
                    this.mostrarEstado();
                    break;
                case '4':
                    this.mostrarColaEspera();
                    break;
                case '5':
                    this.mostrarRegistro();
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

    contarOcupados() {
        return this.espacios.filter(espacio => espacio !== null).length;
    }

    async registrarEntrada() {
        if (this.contarOcupados() >= this.capacidad) {
            console.log('\n⚠️  El estacionamiento está lleno. El auto se agregará a la cola de espera.');
            const placa = await this.pregunta('Placa del auto: ');
            const propietario = await this.pregunta('Nombre del propietario: ');
            const auto = new Auto(placa, propietario);
            this.colaEspera.push(auto);
            console.log(`\n✅ Auto ${placa} agregado a la cola de espera. Posición: ${this.colaEspera.length}`);
            return;
        }

        const placa = await this.pregunta('\nPlaca del auto: ');
        
        // Verificar si ya está estacionado
        const espacioOcupado = this.espacios.findIndex(auto => auto && auto.placa === placa);
        if (espacioOcupado !== -1) {
            console.log(`\n⚠️  Ya hay un auto con la placa ${placa} en el espacio ${espacioOcupado + 1}.`);
            return;
        }

        const propietario = await this.pregunta('Nombre del propietario: ');
        const auto = new Auto(placa, propietario);
        
        // Encontrar primer espacio disponible
        const espacioLibre = this.espacios.findIndex(espacio => espacio === null);
        
        if (espacioLibre !== -1) {
            auto.espacio = espacioLibre + 1; // Los espacios se muestran desde 1
            this.espacios[espacioLibre] = auto;
            this.registro.push(`ENTRADA - ${placa} - ${new Date().toLocaleString()}`);
            console.log(`\n✅ Auto estacionado en el espacio ${espacioLibre + 1}`);
        }
    }

    async registrarSalida() {
        const placa = await this.pregunta('\nPlaca del auto que sale: ');
        
        // Buscar en espacios ocupados
        const espacioOcupado = this.espacios.findIndex(auto => auto && auto.placa === placa);
        
        if (espacioOcupado === -1) {
            console.log(`\n⚠️  No se encontró un auto con la placa ${placa} en el estacionamiento.`);
            return;
        }

        const auto = this.espacios[espacioOcupado];
        auto.horaSalida = new Date();
        
        const minutos = auto.calcularTiempo();
        const horas = Math.ceil(minutos / 60);
        const costo = auto.calcularCosto();
        
        console.log('\n=== TICKET DE SALIDA ===');
        console.log(`Placa: ${auto.placa}`);
        console.log(`Propietario: ${auto.propietario}`);
        console.log(`Hora de entrada: ${auto.horaEntrada.toLocaleString()}`);
        console.log(`Hora de salida: ${auto.horaSalida.toLocaleString()}`);
        console.log(`Tiempo estacionado: ${minutos} minutos (${horas} horas)`);
        console.log(`Cobro: $${costo}.00 MXN`);
        console.log('==========================');
        
        // Liberar espacio
        this.espacios[espacioOcupado] = null;
        this.registro.push(`SALIDA  - ${placa} - ${new Date().toLocaleString()} - Estuvo: ${minutos} min - Cobro: $${costo}`);
        
        // Si hay autos en espera, estacionar el siguiente
        if (this.colaEspera.length > 0) {
            const siguienteAuto = this.colaEspera.shift();
            const nuevoEspacio = this.espacios.findIndex(espacio => espacio === null);
            
            if (nuevoEspacio !== -1) {
                siguienteAuto.espacio = nuevoEspacio + 1;
                siguienteAuto.horaEntrada = new Date(); // Reiniciar hora de entrada
                this.espacios[nuevoEspacio] = siguienteAuto;
                this.registro.push(`ENTRADA - ${siguienteAuto.placa} - ${new Date().toLocaleString()} (desde cola de espera)`);
                console.log(`\n🚗 Auto ${siguienteAuto.placa} ha sido estacionado desde la cola de espera en el espacio ${nuevoEspacio + 1}`);
            }
        }
    }

    mostrarEstado() {
        console.log('\n=== ESTADO DEL ESTACIONAMIENTO ===');
        console.log(`Capacidad: ${this.capacidad} | Ocupados: ${this.contarOcupados()} | Libres: ${this.capacidad - this.contarOcupados()}`);
        console.log('\nEspacio | Placa     | Propietario    | Hora de entrada');
        console.log('-' + '-'.repeat(50));
        
        this.espacios.forEach((espacio, index) => {
            if (espacio) {
                console.log(`   ${(index + 1).toString().padEnd(4)} | ${espacio.placa.padEnd(9)} | ${espacio.propietario.padEnd(14)} | ${espacio.horaEntrada.toLocaleTimeString()}`);
            } else {
                console.log(`   ${(index + 1).toString().padEnd(4)} | LIBRE     |                |`);
            }
        });
    }

    mostrarColaEspera() {
        console.log('\n=== COLA DE ESPERA ===');
        if (this.colaEspera.length === 0) {
            console.log('No hay autos en espera.');
            return;
        }

        console.log(`Autos en espera: ${this.colaEspera.length}\n`);
        this.colaEspera.forEach((auto, index) => {
            const tiempoEspera = Math.ceil((new Date() - auto.horaEntrada) / (1000 * 60)); // en minutos
            console.log(`${index + 1}. ${auto.placa} - ${auto.propietario} (Esperando: ${tiempoEspera} min)`);
        });
    }

    mostrarRegistro() {
        console.log('\n=== REGISTRO DE MOVIMIENTOS ===');
        if (this.registro.length === 0) {
            console.log('No hay movimientos registrados.');
            return;
        }

        this.registro.forEach((movimiento, index) => {
            console.log(`${index + 1}. ${movimiento}`);
        });
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
    const estacionamiento = new Estacionamiento(5); // Capacidad de 5 para pruebas
    await estacionamiento.ejecutar();
}

if (import.meta.url === `file://${process.argv[1]}`) {
    ejecutarEjercicio3();
}
