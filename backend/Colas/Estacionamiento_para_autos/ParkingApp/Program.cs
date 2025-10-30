using System;
using ParkingApp.Data;

namespace ParkingApp
{
    class Program
    {
        // Precio por segundo
        const decimal PrecioPorSegundo = 2.00m;

        static void Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            var cola = new DoublyCircularQueue();
            while (true)
            {
                MostrarMenu();
                Console.Write("Seleccione una opción: ");
                var opcion = Console.ReadLine()?.Trim();
                Console.WriteLine();

                switch (opcion)
                {
                    case "1":
                        EntradaAuto(cola);
                        break;
                    case "2":
                        SalidaAuto(cola);
                        break;
                    case "3":
                        MostrarAutos(cola);
                        break;
                    case "4":
                        Console.WriteLine("Saliendo... Hasta luego.");
                        return;
                    default:
                        Console.WriteLine("Opción inválida. Intente otra vez.\n");
                        break;
                }
            }
        }

        static void MostrarMenu()
        {
            Console.WriteLine("=== Estacionamiento (Callejón) ===");
            Console.WriteLine("1. Entrada de Auto");
            Console.WriteLine("2. Salida de Auto");
            Console.WriteLine("3. Mostrar autos en estacionamiento");
            Console.WriteLine("4. Salir");
        }

        static void EntradaAuto(DoublyCircularQueue cola)
        {
            Console.Write("Placas: ");
            var placas = Console.ReadLine()?.Trim() ?? string.Empty;
            if (string.IsNullOrWhiteSpace(placas))
            {
                Console.WriteLine("Placas vacías. Operación cancelada.\n");
                return;
            }

            Console.Write("Propietario: ");
            var propietario = Console.ReadLine()?.Trim() ?? string.Empty;
            if (string.IsNullOrWhiteSpace(propietario))
            {
                Console.WriteLine("Nombre del propietario vacío. Operación cancelada.\n");
                return;
            }

            cola.Enqueue(placas, propietario);
            var head = cola.Peek();
            Console.WriteLine($"Auto con placas {placas} ingresó a las {head?.HoraEntrada:dd/MM/yyyy HH:mm:ss}.\n");
        }

        static void SalidaAuto(DoublyCircularQueue cola)
        {
            if (cola.IsEmpty)
            {
                Console.WriteLine("El estacionamiento está vacío. No hay autos para salir.\n");
                return;
            }

            var node = cola.Dequeue();
            if (node == null)
            {
                Console.WriteLine("Error al procesar la salida.\n");
                return;
            }

            var horaSalida = DateTime.Now;
            var tiempo = horaSalida - node.HoraEntrada;
            var segundos = Math.Max(1, (int)Math.Ceiling(tiempo.TotalSeconds));
            var costo = segundos * PrecioPorSegundo;

            Console.WriteLine("--- Ticket de salida ---");
            Console.WriteLine($"Placas: {node.Placas}");
            Console.WriteLine($"Propietario: {node.Propietario}");
            Console.WriteLine($"Hora de entrada: {node.HoraEntrada:dd/MM/yyyy HH:mm:ss}");
            Console.WriteLine($"Hora de salida : {horaSalida:dd/MM/yyyy HH:mm:ss}");
            Console.WriteLine($"Duración: {tiempo.Days} días {tiempo.Hours} h {tiempo.Minutes} m {tiempo.Seconds} s ({segundos} segundos redondeados)");
            Console.WriteLine($"Costo: ${costo:F2} pesos (a ${PrecioPorSegundo:F2}/segundo)\n");
        }

        static void MostrarAutos(DoublyCircularQueue cola)
        {
            if (cola.IsEmpty)
            {
                Console.WriteLine("El estacionamiento está vacío.\n");
                return;
            }

            Console.WriteLine("Autos en el estacionamiento (orden FIFO, el primero en entrar está al frente):");
            int i = 1;
            foreach (var car in cola.Enumerate())
            {
                Console.WriteLine($"{i}. Placas: {car.Placas} | Propietario: {car.Propietario} | Hora entrada: {car.HoraEntrada:dd/MM/yyyy HH:mm:ss}");
                i++;
            }
            Console.WriteLine();
        }
    }
}
