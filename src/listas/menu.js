import readlineSync from 'readline-sync';

function mostrarMenu() {
    console.clear();
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║                    MENÚ: LISTAS                        ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log();
    console.log('  1. Ejercicio 1: Productos disponibles y retirados');
    console.log('  2. Ejercicio 2: Pares e Impares');
    console.log('  3. Ejercicio 3: Aprobados y Reprobados');
    console.log('  4. Ejercicio 4: Eliminar y ordenar productos');
    console.log('  5. Ejercicio 5: Listar palabras por letra');
    console.log('  6. ⬅️  Volver al menú principal');
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
            const { default: ej2 } = await import('./ejercicio2.js');
            await ej2();
            break;
        case '3':
            console.log('\n📋 Ejercicio 3 en desarrollo...');
            await pausar();
            break;
        case '4':
            console.log('\n📋 Ejercicio 4 en desarrollo...');
            await pausar();
            break;
        case '5':
            console.log('\n📋 Ejercicio 5 en desarrollo...');
            await pausar();
            break;
        case '6':
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

export default async function menuListas() {
    let continuar = true;

    while(continuar) {
        mostrarMenu();
        
        const opcion = readlineSync.question('\nSelecciona una opcion: ');
        
        continuar = await ejecutarOpcion(opcion);
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    await menuListas();
    process.exit(0);
}
