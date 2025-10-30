// Ejercicio 3: Aprobados y Reprobados
import readline from 'readline';

class Alumno {
    constructor(nombre, calificacion) {
        this.nombre = nombre;
        this.calificacion = calificacion;
    }
}

class ControlEscolar {
    constructor() {
        this.aprobados = [];
        this.reprobados = [];
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
            console.log('   Ejercicio 3: Aprobados y Reprobados');
            console.log('====================================');
            console.log('1. Agregar alumno');
            console.log('2. Mostrar listas');
            console.log('3. Estadísticas');
            console.log('4. Volver al menú principal');
            console.log('====================================');

            const opcion = await this.pregunta('Selecciona una opción: ');

            switch (opcion) {
                case '1':
                    await this.agregarAlumno();
                    break;
                case '2':
                    this.mostrarListas();
                    break;
                case '3':
                    this.mostrarEstadisticas();
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

    async agregarAlumno() {
        const nombre = await this.pregunta('\nNombre del alumno: ');
        const califStr = await this.pregunta('Calificación (0-100): ');
        const calificacion = parseFloat(califStr);

        if (isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
            console.log('\n⚠️  Calificación no válida. Debe ser un número entre 0 y 100.');
            return;
        }

        const alumno = new Alumno(nombre, calificacion);
        
        if (calificacion >= 70) {
            this.aprobados.push(alumno);
            console.log(`\n✅ ${nombre} ha sido agregado a la lista de APROBADOS.`);
        } else {
            this.reprobados.push(alumno);
            console.log(`\n❌ ${nombre} ha sido agregado a la lista de REPROBADOS.`);
        }
    }

    mostrarListas() {
        console.log('\n=== ALUMNOS APROBADOS ===');
        if (this.aprobados.length > 0) {
            this.aprobados.forEach((alumno, index) => {
                console.log(`${index + 1}. ${alumno.nombre} - ${alumno.calificacion}`);
            });
        } else {
            console.log('(No hay alumnos aprobados)');
        }

        console.log('\n=== ALUMNOS REPROBADOS ===');
        if (this.reprobados.length > 0) {
            this.reprobados.forEach((alumno, index) => {
                console.log(`${index + 1}. ${alumno.nombre} - ${alumno.calificacion}`);
            });
        } else {
            console.log('(No hay alumnos reprobados)');
        }
    }

    mostrarEstadisticas() {
        const total = this.aprobados.length + this.reprobados.length;
        
        if (total === 0) {
            console.log('\nNo hay alumnos registrados.');
            return;
        }

        const porcentajeAprobados = (this.aprobados.length / total) * 100;
        const porcentajeReprobados = (this.reprobados.length / total) * 100;

        console.log('\n=== ESTADÍSTICAS ===');
        console.log(`Total de alumnos: ${total}`);
        console.log(`Aprobados: ${this.aprobados.length} (${porcentajeAprobados.toFixed(1)}%)`);
        console.log(`Reprobados: ${this.reprobados.length} (${porcentajeReprobados.toFixed(1)}%)`);
        
        if (this.aprobados.length > 0) {
            const mejor = this.aprobados.reduce((prev, current) => 
                (prev.calificacion > current.calificacion) ? prev : current);
            console.log(`\nMejor calificación: ${mejor.nombre} con ${mejor.calificacion}`);
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
    const control = new ControlEscolar();
    await control.ejecutar();
}

if (import.meta.url === `file://${process.argv[1]}`) {
    ejecutarEjercicio3();
}
