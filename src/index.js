import readlineSync from 'readline-sync';

function mostrarMenuPrincipal() {
    console.clear();
    console.log('════════════════════════════════════════════════════════');
    console.log('   PRÁCTICAS UNIDAD II - ESTRUCTURAS DE DATOS');
    console.log('   Listas, Pilas y Colas');
    console.log('   Equipo 4E');
    console.log('════════════════════════════════════════════════════════\n');
    console.log('           MENÚ PRINCIPAL - ESTRUCTURAS DE DATOS\n');
    console.log('  1. 📋 LISTAS (5 ejercicios) - Uziel');
    console.log('  2. 📚 PILAS (4 ejercicios) - Joel');
    console.log('  3. 🔄 COLAS (3 ejercicios) - Hector');
    console.log('  4. ❌ Salir\n');
    console.log('════════════════════════════════════════════════════════');
}

async function ejecutarOpcion(opcion) {
    switch(opcion) {
        case '1':
            console.log('\n📋 Ejecutando menú de LISTAS...');
            const { default: menuListas } = await import('./listas/menu.js');
            await menuListas();
            break;
        case '2':
            console.log('\n📚 Ejecutando menú de PILAS...');
            const { default: menuPilas } = await import('./pilas/menu.js');
            await menuPilas();
            break;
        case '3':
            console.log('\n🔄 Ejecutando menú de COLAS...');
            const { default: menuColas } = await import('./colas/menu.js');
            await menuColas();
            break;
        case '4':
            console.log('\n¡Gracias por usar el programa! 👋\n');
            process.exit(0);
            break;
        default:
            console.log('\n⚠️  Opción no válida. Intenta de nuevo.');
            readlineSync.question('\nPresiona Enter para continuar...');
            break;
    }
}

async function main() {
    let continuar = true;
    
    while(continuar) {
        mostrarMenuPrincipal();
        
        const opcion = readlineSync.question('\nSelecciona una opcion: ');
        
        await ejecutarOpcion(opcion);
    }
}

main();
