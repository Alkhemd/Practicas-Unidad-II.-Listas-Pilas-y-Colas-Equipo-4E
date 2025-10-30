// Usamos 'using' para importar los namespaces necesarios.
using System;

// Definimos un namespace para organizar nuestro código.
namespace csharp_solucion
{
    // La clase principal de nuestra aplicación.
    class Program
    {
        // El punto de entrada de la aplicación.
        static void Main(string[] args)
        {
            // Variable para mantener el programa en ejecución hasta que el usuario decida salir.
            bool continuar = true;

            // Bucle principal del menú.
            while (continuar)
            {
                // Limpiamos la consola para una presentación limpia del menú.
                Console.Clear();
                Console.WriteLine("=============================================");
                Console.WriteLine("  Menú Principal de Ejercicios (Listas)    ");
                Console.WriteLine("=============================================");
                Console.WriteLine("1. Ejercicio 1: Supermercado");
                Console.WriteLine("2. Ejercicio 2: Pares e Impares");
                Console.WriteLine("3. Ejercicio 3: Aprobados y Reprobados");
                Console.WriteLine("4. Ejercicio 4: Eliminar y ordenar productos");
                Console.WriteLine("5. Ejercicio 5: Listar palabras por letra");
                Console.WriteLine("6. Salir");
                Console.WriteLine("=============================================");
                Console.Write("Selecciona una opción: ");

                // Leemos la opción del usuario.
                string opcion = Console.ReadLine() ?? "";

                // Estructura switch para manejar la opción seleccionada.
                switch (opcion)
                {
                    case "1":
                        // Crea una instancia de la clase Ejercicio1 y llama a su método principal.
                        Ejercicio1 ejercicio1 = new Ejercicio1();
                        ejercicio1.Ejecutar();
                        break;
                    case "2":
                        EjecutarEjercicio2();
                        break;
                    case "3":
                        EjecutarEjercicio3();
                        break;
                    case "4":
                        EjecutarEjercicio4();
                        break;
                    case "5":
                        EjecutarEjercicio5();
                        break;
                    case "6":
                        // Si el usuario elige salir, cambiamos la variable para terminar el bucle.
                        continuar = false;
                        Console.WriteLine("Saliendo del programa...");
                        break;
                    default:
                        // Manejo de opciones no válidas.
                        Console.WriteLine("Opción no válida. Por favor, intenta de nuevo.");
                        PresionarParaContinuar();
                        break;
                }
            }
        }

        // Método de utilidad para pausar la ejecución y esperar al usuario.
        static void PresionarParaContinuar()
        {
            Console.WriteLine("Presiona cualquier tecla para continuar...");
            Console.ReadKey();
        }

        static void EjecutarEjercicio2()
        {
            ParesEImpares paresEImpares = new ParesEImpares();
            Console.Write("Ingrese la cantidad de números a generar: ");
            int cantidad;
            string? entrada = Console.ReadLine();
            while (!int.TryParse(entrada, out cantidad) || cantidad <= 0)
            {
                Console.Write("Entrada inválida. Ingrese un número entero positivo: ");
                entrada = Console.ReadLine();
            }
            paresEImpares.GenerarNumerosAleatorios(cantidad);

            Console.WriteLine("\nNúmeros pares:");
            paresEImpares.MostrarNumerosPares();

            Console.WriteLine("\nNúmeros impares:");
            paresEImpares.MostrarNumerosImpares();
        }

        static void EjecutarEjercicio3()
        {
            Calificaciones calificaciones = new Calificaciones();
            bool continuar = true;

            while (continuar)
            {
                Console.Clear();
                Console.WriteLine("Ejercicio 3 - Aprobados y Reprobados");
                Console.WriteLine("1. Agregar alumno");
                Console.WriteLine("2. Mostrar aprobados");
                Console.WriteLine("3. Mostrar reprobados");
                Console.WriteLine("4. Volver al menú principal");
                Console.Write("Seleccione una opción: ");

                string? opcion = Console.ReadLine() ?? "";

                switch (opcion)
                {
                    case "1":
                        Console.Write("Ingrese el nombre del alumno: ");
                        string? nombre = Console.ReadLine();
                        if (string.IsNullOrWhiteSpace(nombre))
                        {
                            Console.WriteLine("Nombre inválido.");
                            break;
                        }
                        Console.Write("Ingrese la calificación del alumno: ");
                        string? entradaCalif = Console.ReadLine();
                        if (!double.TryParse(entradaCalif, out double calificacion) || calificacion < 0)
                        {
                            Console.WriteLine("Calificación inválida.");
                            break;
                        }
                        calificaciones.AgregarAlumno(nombre, calificacion);
                        break;
                    case "2":
                        calificaciones.MostrarAprobados();
                        break;
                    case "3":
                        calificaciones.MostrarReprobados();
                        break;
                    case "4":
                        continuar = false;
                        break;
                    default:
                        Console.WriteLine("Opción no válida. Intente de nuevo.");
                        break;
                }

                if (continuar)
                {
                    Console.WriteLine("Presione cualquier tecla para continuar...");
                    Console.ReadKey();
                }
            }
        }

        static void EjecutarEjercicio4()
        {
            GestionProductos gestionProductos = new GestionProductos();
            bool continuar = true;

            while (continuar)
            {
                Console.Clear();
                Console.WriteLine("Ejercicio 4 - Eliminar y ordenar productos");
                Console.WriteLine("1. Agregar producto");
                Console.WriteLine("2. Eliminar producto");
                Console.WriteLine("3. Mostrar productos ordenados");
                Console.WriteLine("4. Mostrar costo total");
                Console.WriteLine("5. Volver al menú principal");
                Console.Write("Seleccione una opción: ");

                string? opcion = Console.ReadLine() ?? "";

                switch (opcion)
                {
                    case "1":
                        Console.Write("Ingrese el nombre del producto: ");
                        string? nombre = Console.ReadLine();
                        if (string.IsNullOrWhiteSpace(nombre))
                        {
                            Console.WriteLine("Nombre inválido.");
                            break;
                        }
                        Console.Write("Ingrese el precio del producto: ");
                        string? entradaPrecio = Console.ReadLine();
                        if (!decimal.TryParse(entradaPrecio, out decimal precio) || precio < 0)
                        {
                            Console.WriteLine("Precio inválido.");
                            break;
                        }
                        gestionProductos.AgregarProducto(nombre, precio);
                        break;
                    case "2":
                        Console.Write("Ingrese el nombre del producto a eliminar: ");
                        string? nombreEliminar = Console.ReadLine();
                        if (string.IsNullOrWhiteSpace(nombreEliminar))
                        {
                            Console.WriteLine("Nombre inválido.");
                        }
                        else
                        {
                            gestionProductos.EliminarProducto(nombreEliminar);
                        }
                        break;
                    case "3":
                        gestionProductos.MostrarProductosOrdenados();
                        break;
                    case "4":
                        gestionProductos.MostrarCostoTotal();
                        break;
                    case "5":
                        continuar = false;
                        break;
                    default:
                        Console.WriteLine("Opción no válida. Intente de nuevo.");
                        break;
                }

                if (continuar)
                {
                    Console.WriteLine("Presione cualquier tecla para continuar...");
                    Console.ReadKey();
                }
            }
        }

        static void EjecutarEjercicio5()
        {
            ClasificadorPalabras clasificador = new ClasificadorPalabras();
            bool continuar = true;

            while (continuar)
            {
                Console.Clear();
                Console.WriteLine("Ejercicio 5 - Listar palabras por letra");
                Console.WriteLine("1. Agregar palabra");
                Console.WriteLine("2. Mostrar listas por letra");
                Console.WriteLine("3. Volver al menú principal");
                Console.Write("Seleccione una opción: ");

                string? opcion = Console.ReadLine() ?? "";

                switch (opcion)
                {
                    case "1":
                        Console.Write("Ingrese una palabra: ");
                        string? palabra = Console.ReadLine();
                        if (string.IsNullOrWhiteSpace(palabra))
                        {
                            Console.WriteLine("Palabra inválida.");
                        }
                        else
                        {
                            clasificador.AgregarPalabra(palabra);
                        }
                        break;
                    case "2":
                        clasificador.MostrarListasPorLetra();
                        break;
                    case "3":
                        continuar = false;
                        break;
                    default:
                        Console.WriteLine("Opción no válida. Intente de nuevo.");
                        break;
                }

                if (continuar)
                {
                    Console.WriteLine("Presione cualquier tecla para continuar...");
                    Console.ReadKey();
                }
            }
        }
    }
}
