import readlineSync from 'readline-sync';

function mostrarMenu() {
    console.clear();
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║                    MENÚ: COLAS                         ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log();
    console.log('  1. Ejercicio 1: Ventanilla de un banco');
    console.log('  2. Ejercicio 2: Juego pintar coches');
    console.log('  3. Ejercicio 3: Estacionamiento para autos');
    console.log('  4. ⬅️  Volver al menú principal');
    console.log();
    console.log('════════════════════════════════════════════════════════');
}

async function ejecutarOpcion(opcion) {
    switch(opcion) {
        case '1':
            const { default: ej1 } = await import('./ejercicio1.js');
            await ej1();
            break;
        case '2':
            console.log('\n🔄 Ejercicio 2 en desarrollo...');
            await pausar();
            break;
        case '3':
            console.log('\n🔄 Ejercicio 3 en desarrollo...');
            await pausar();
            break;
        case '4':
            return false;
        default:
            console.log('\n⚠️  Opción no válida.');
            await pausar();
            break;
    }
    return true;
}

function pausar() {
    readlineSync.question('\nPresiona Enter para continuar...');
}

export default async function menuColas() {
    let continuar = true;

    while(continuar) {
        mostrarMenu();
        
        const opcion = readlineSync.question('\nSelecciona una opcion: ');
        
        continuar = await ejecutarOpcion(opcion);
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    await menuColas();
    rl.close();
    process.exit(0);
}
