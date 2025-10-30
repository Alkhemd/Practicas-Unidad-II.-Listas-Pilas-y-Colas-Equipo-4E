using System;
using System.Collections.Generic;
using VentanillaDeBanco.Data;
using VentanillaDeBanco.Models;

namespace VentanillaDeBanco
{
    internal class Program
    {
        static int nextTurn = 1;

        static readonly Dictionary<int, string> movimientos = new()
        {
            {1, "Depósito"},
            {2, "Retiro"},
            {3, "Pago"},
            {4, "Consulta"}
        };

        static void Main(string[] args)
        {
            // Capacidad por defecto 10
            int capacidad = 10;
            var cola = new Cola(capacidad);

            if (args.Length > 0 && args[0].Equals("demo", StringComparison.OrdinalIgnoreCase))
            {
                RunDemo(cola);
                return;
            }

            while (true)
            {
                Console.WriteLine();
                Console.WriteLine("=== Ventanilla de Banco ===");
                Console.WriteLine("1) Agregar cliente a la cola");
                Console.WriteLine("2) Atender en ventanilla");
                Console.WriteLine("3) Mostrar cola completa");
                Console.WriteLine("4) Mostrar frente y final");
                Console.WriteLine("5) Salir");
                Console.Write("Seleccione una opción: ");

                var key = Console.ReadLine();
                Console.WriteLine();
                switch (key)
                {
                    case "1":
                        AgregarCliente(cola);
                        break;
                    case "2":
                        AtenderCliente(cola);
                        break;
                    case "3":
                        MostrarCola(cola);
                        break;
                    case "4":
                        MostrarFrenteFinal(cola);
                        break;
                    case "5":
                        Console.WriteLine("Saliendo...");
                        return;
                    default:
                        Console.WriteLine("Opción inválida. Intente de nuevo.");
                        break;
                }
            }
        }

        static void AgregarCliente(Cola cola)
        {
            if (cola.ColaLlena())
            {
                Console.WriteLine("No se puede insertar: la cola está llena (overflow).");
                return;
            }

            string nombre = ReadNonEmptyString("Ingrese el nombre del cliente: ");

            int movimiento = ReadMovimientoChoice();
            string movimientoTexto = movimientos.ContainsKey(movimiento) ? movimientos[movimiento] : "Otro";

            var cliente = new Cliente(nextTurn++, nombre, movimientoTexto, DateTime.Now);
            bool ok = cola.InsertaCola(cliente);
            if (ok)
            {
                Console.WriteLine("Cliente insertado:");
                Console.WriteLine($"Turno: {cliente.Turno} | Nombre: {cliente.Nombre} | Movimiento: {cliente.Movimiento} | Hora llegada: {cliente.HoraLlegada:yyyy-MM-dd HH:mm:ss}");
            }
            else
            {
                Console.WriteLine("Error al insertar cliente.");
            }
        }

        static void AtenderCliente(Cola cola)
        {
            if (cola.ColaVacia())
            {
                Console.WriteLine("No hay clientes en la cola (underflow).");
                return;
            }

            var cliente = cola.EliminaCola();
            if (cliente is null)
            {
                Console.WriteLine("Error al atender cliente.");
                return;
            }

            var horaAtencion = DateTime.Now;
            var espera = horaAtencion - cliente.HoraLlegada;

            Console.WriteLine("Cliente atendido:");
            Console.WriteLine($"Turno: {cliente.Turno}");
            Console.WriteLine($"Nombre: {cliente.Nombre}");
            Console.WriteLine($"Movimiento: {cliente.Movimiento}");
            Console.WriteLine($"Hora llegada: {cliente.HoraLlegada:yyyy-MM-dd HH:mm:ss}");
            Console.WriteLine($"Hora atención: {horaAtencion:yyyy-MM-dd HH:mm:ss}");
            Console.WriteLine($"Tiempo de espera: {FormatTimeSpan(espera)}");
        }

        static void MostrarCola(Cola cola)
        {
            var items = cola.GetItems();
            if (items.Count == 0)
            {
                Console.WriteLine("La cola está vacía.");
                return;
            }

            Console.WriteLine("Turno | Nombre                 | Movimiento | Hora llegada");
            Console.WriteLine(new string('-', 64));
            foreach (var c in items)
            {
                Console.WriteLine($"{c.Turno,-5} | {Truncate(c.Nombre,20),-20} | {Truncate(c.Movimiento,9),-9} | {c.HoraLlegada:yyyy-MM-dd HH:mm:ss}");
            }
        }

        static void MostrarFrenteFinal(Cola cola)
        {
            var front = cola.GetFront();
            var rear = cola.GetRear();

            string frente = front is null ? "-" : $"{front.Turno} - {front.Nombre}";
            string final = rear is null ? "-" : $"{rear.Turno} - {rear.Nombre}";

            Console.WriteLine($"Frente: {frente}");
            Console.WriteLine($"Final : {final}");
        }

        static string ReadNonEmptyString(string prompt)
        {
            while (true)
            {
                Console.Write(prompt);
                var s = Console.ReadLine();
                if (!string.IsNullOrWhiteSpace(s)) return s.Trim();
                Console.WriteLine("El nombre no puede estar vacío. Intente nuevamente.");
            }
        }

        static int ReadMovimientoChoice()
        {
            while (true)
            {
                Console.WriteLine("Seleccione el tipo de movimiento:");
                foreach (var kv in movimientos)
                {
                    Console.WriteLine($"{kv.Key}) {kv.Value}");
                }
                Console.Write("Opción (número): ");
                var input = Console.ReadLine();
                if (int.TryParse(input, out int num) && movimientos.ContainsKey(num)) return num;
                Console.WriteLine("Opción inválida. Intente de nuevo.");
            }
        }

        static string Truncate(string s, int maxLength)
        {
            if (string.IsNullOrEmpty(s)) return s ?? string.Empty;
            return s.Length <= maxLength ? s : s.Substring(0, maxLength - 3) + "...";
        }

        static string FormatTimeSpan(TimeSpan t)
        {
            return string.Format("{0}h {1}m {2}s", (int)t.TotalHours, t.Minutes, t.Seconds);
        }

        static void RunDemo(Cola cola)
        {
            Console.WriteLine("Modo demo: insertando 3 clientes con horas simuladas...");

            // Crear clientes con horas de llegada simuladas
            var now = DateTime.Now;
            var c1 = new Cliente(nextTurn++, "Ana Pérez", "Depósito", now.AddMinutes(-5));
            var c2 = new Cliente(nextTurn++, "Luis Gómez", "Retiro", now.AddMinutes(-2));
            var c3 = new Cliente(nextTurn++, "María Ruiz", "Consulta", now.AddSeconds(-30));

            cola.InsertaCola(c1);
            cola.InsertaCola(c2);
            cola.InsertaCola(c3);

            Console.WriteLine();
            MostrarCola(cola);

            Console.WriteLine();
            Console.WriteLine("Atendiendo primer cliente...");
            var atendido = cola.EliminaCola();
            if (atendido != null)
            {
                var tiempoEspera = DateTime.Now - atendido.HoraLlegada;
                Console.WriteLine($"Atendido: {atendido.Turno} - {atendido.Nombre}");
                Console.WriteLine($"Tiempo de espera calculado: {FormatTimeSpan(tiempoEspera)}");
            }

            Console.WriteLine();
            Console.WriteLine("Cola resultante:");
            MostrarCola(cola);
            Console.WriteLine("Demo finalizada.");
        }
    }
}
