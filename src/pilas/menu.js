import readlineSync from 'readline-sync';

function mostrarMenu() {
    console.clear();
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║                    MENÚ: PILAS                         ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log();
    console.log('  1. Ejercicio 1: Invertir palabra');
    console.log('  2. Ejercicio 2: Palíndromo');
    console.log('  3. Ejercicio 3: Suma de números grandes');
    console.log('  4. Ejercicio 4: Reemplazar valor en pila');
    console.log('  5. ⬅️  Volver al menú principal');
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
            console.log('\n📚 Ejercicio 3 en desarrollo...');
            await pausar();
            break;
        case '4':
            console.log('\n📚 Ejercicio 4 en desarrollo...');
            await pausar();
            break;
        case '5':
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

export default async function menuPilas() {
    let continuar = true;

    while(continuar) {
        mostrarMenu();
        
        const opcion = readlineSync.question('\nSelecciona una opcion: ');
        
        continuar = await ejecutarOpcion(opcion);
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    await menuPilas();
    rl.close();
    process.exit(0);
}
