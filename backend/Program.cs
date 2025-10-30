using System;

namespace PracticasUnidadII
{
    /// <summary>
    /// Programa principal - Prácticas de Estructuras de Datos
    /// Unidad II: Listas, Pilas y Colas
    /// Equipo 4E
    /// </summary>
    class ProgramaPrincipal
    {
        static void Main(string[] args)
        {
            bool continuar = true;

            while (continuar)
            {
                Console.Clear();
                MostrarBanner();
                Console.WriteLine("╔════════════════════════════════════════════════════════╗");
                Console.WriteLine("║         MENÚ PRINCIPAL - ESTRUCTURAS DE DATOS          ║");
                Console.WriteLine("╚════════════════════════════════════════════════════════╝");
                Console.WriteLine();
                Console.WriteLine("  1. 📋 LISTAS (5 ejercicios) - Uziel");
                Console.WriteLine("  2. 📚 PILAS (4 ejercicios) - Joel");
                Console.WriteLine("  3. 🔄 COLAS (3 ejercicios) - Hector");
                Console.WriteLine("  4. ❌ Salir");
                Console.WriteLine();
                Console.WriteLine("════════════════════════════════════════════════════════");
                Console.Write("Selecciona una opción: ");

                string? opcion = Console.ReadLine();

                switch (opcion)
                {
                    case "1":
                        Console.WriteLine("\n📋 LISTAS - Ejercicios de Uziel");
                        Console.WriteLine("Para ejecutar los ejercicios de Listas, ve a:");
                        Console.WriteLine("cd Listas");
                        Console.WriteLine("dotnet run --project ../Practicas-Unidad-II.csproj");
                        Console.WriteLine("\nO ejecuta directamente desde samples:");
                        Console.WriteLine("cd ../samples/Uziel/csharp_solucion");
                        Console.WriteLine("dotnet run");
                        PausarContinuar();
                        break;
                    case "2":
                        Console.WriteLine("\n📚 PILAS - Ejercicios de Joel");
                        Console.WriteLine("Para ejecutar los ejercicios de Pilas, ve a:");
                        Console.WriteLine("cd ../samples/Joel");
                        Console.WriteLine("dotnet run");
                        PausarContinuar();
                        break;
                    case "3":
                        MenuColas();
                        break;
                    case "4":
                        continuar = false;
                        Console.WriteLine("\n¡Gracias por usar el programa! 👋");
                        break;
                    default:
                        Console.WriteLine("\n⚠️  Opción no válida. Intenta de nuevo.");
                        PausarContinuar();
                        break;
                }
            }
        }

        static void MostrarBanner()
        {
            Console.WriteLine("════════════════════════════════════════════════════════");
            Console.WriteLine("    PRÁCTICAS UNIDAD II - ESTRUCTURAS DE DATOS");
            Console.WriteLine("    Listas, Pilas y Colas");
            Console.WriteLine("    Equipo 4E");
            Console.WriteLine("════════════════════════════════════════════════════════");
            Console.WriteLine();
        }

        static void MenuColas()
        {
            bool continuar = true;

            while (continuar)
            {
                Console.Clear();
                Console.WriteLine("╔════════════════════════════════════════════════════════╗");
                Console.WriteLine("║                    MENÚ: COLAS                         ║");
                Console.WriteLine("╚════════════════════════════════════════════════════════╝");
                Console.WriteLine();
                Console.WriteLine("  1. Ejercicio 1: Ventanilla de un banco");
                Console.WriteLine("  2. Ejercicio 2: Juego pintar coches");
                Console.WriteLine("  3. Ejercicio 3: Estacionamiento para autos");
                Console.WriteLine("  4. ⬅️  Volver al menú principal");
                Console.WriteLine();
                Console.WriteLine("════════════════════════════════════════════════════════");
                Console.Write("Selecciona una opción: ");

                string? opcion = Console.ReadLine();

                switch (opcion)
                {
                    case "1":
                        Console.WriteLine("\n📋 Ejercicio 1: Ventanilla de un banco");
                        Console.WriteLine("Para ejecutar este ejercicio, ve a:");
                        Console.WriteLine("cd Colas/Ventanilla_de_banco");
                        Console.WriteLine("dotnet run");
                        PausarContinuar();
                        break;
                    case "2":
                        Console.WriteLine("\n📋 Ejercicio 2: Juego pintar coches");
                        Console.WriteLine("Para ejecutar este ejercicio, ve a:");
                        Console.WriteLine("cd Colas/Juego_pintar_coches/PintarCoches");
                        Console.WriteLine("dotnet run");
                        PausarContinuar();
                        break;
                    case "3":
                        Console.WriteLine("\n📋 Ejercicio 3: Estacionamiento para autos");
                        Console.WriteLine("Para ejecutar este ejercicio, ve a:");
                        Console.WriteLine("cd Colas/Estacionamiento_para_autos/ParkingApp");
                        Console.WriteLine("dotnet run");
                        PausarContinuar();
                        break;
                    case "4":
                        continuar = false;
                        break;
                    default:
                        Console.WriteLine("\n⚠️  Opción no válida.");
                        PausarContinuar();
                        break;
                }
            }
        }

        static void PausarContinuar()
        {
            Console.WriteLine("\nPresiona cualquier tecla para continuar...");
            Console.ReadKey();
        }
    }
}
