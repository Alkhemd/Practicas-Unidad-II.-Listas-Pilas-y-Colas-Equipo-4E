using System;
using System.Linq;
using System.Threading.Tasks;
using PintarCoches.Models;

class Program
{
    static async Task<int> Main(string[] args)
    {
        bool autoTest = args.Contains("--auto-test");
        string projectDir = Environment.CurrentDirectory;

        using var game = new PintarCoches.Game(projectDir, autoTest);

        // Mostrar record al iniciar
        var best = game.BestRecord;
        Console.Clear();
        Console.WriteLine("--- Pintar Coches (CLI) ---\n");
        if (best is not null)
        {
            Console.WriteLine($"Record actual: {best.CarsPainted} coches en {best.TimeSeconds:N1}s (guardado: {best.DateSaved:u})\n");
        }

        ShowPalette();
        ShowStatus(game);

        game.Start();

        if (autoTest)
        {
            Console.WriteLine("Modo auto-test activado. Ejecutando pruebas automáticas...\n");
            // Esperar hasta que la cola esté full o hasta que el juego termine
            while (true)
            {
                var status = game.GetStatus();
                if (status.queue.Count >= 5)
                {
                    // dejar que Game termine por su cuenta
                    break;
                }
                await Task.Delay(200);
            }

            // esperar un momento final para que Game procese el fin
            await Task.Delay(500);

            // Mostrar estado final
            ShowStatus(game);
            Console.WriteLine("Auto-test finalizado.");
            return 0;
        }

        // Modo interactivo
        while (true)
        {
            Console.WriteLine("\nEscribe el id del color para pintar, o comando (paleta, status, salir):");

            // Capturar el primer coche actual antes de leer la entrada
            var before = game.GetStatus();
            var expectedFirst = before.first?.Id;

            var input = Console.ReadLine();
            if (input is null) continue;
            input = input.Trim();
            if (string.IsNullOrEmpty(input)) continue;

            if (input.Equals("paleta", StringComparison.OrdinalIgnoreCase))
            {
                ShowPalette();
                continue;
            }
            if (input.Equals("status", StringComparison.OrdinalIgnoreCase))
            {
                ShowStatus(game);
                continue;
            }
            if (input.Equals("salir", StringComparison.OrdinalIgnoreCase) || input.Equals("exit", StringComparison.OrdinalIgnoreCase))
            {
                Console.WriteLine("Saliendo...");
                game.EndGame();
                break;
            }

            // Si es un id de color, intentar pintar
            var color = PintarCoches.ColorsPalette.FindById(input);
            if (color is null)
            {
                Console.WriteLine("Color desconocido. Usa 'paleta' para ver ids.");
                continue;
            }

            // Intentar pintar con el id y comparando el primer coche
            var ok = game.TryPaint(input, out var message, expectedFirst);
            Console.WriteLine(message);

            // Mostrar status tras intento
            ShowStatus(game);

            // Si la cola llegó a 5, terminar
            var s = game.GetStatus();
            if (s.queue.Count >= 5)
            {
                // Game debería terminarse automáticamente, pero forzar mensaje
                game.EndGame();
                break;
            }
        }

        return 0;
    }

    static void ShowPalette()
    {
        Console.WriteLine("Paleta disponible (id - nombre):");
        foreach (var c in PintarCoches.ColorsPalette.Palette)
        {
            Console.WriteLine($"{c.Id} - {c.Name}");
        }
    }

    static void ShowStatus(PintarCoches.Game game)
    {
        Console.Clear();
        Console.WriteLine("--- Estado del juego ---\n");
        var status = game.GetStatus();
        Console.WriteLine($"Tiempo transcurrido: {PintarCoches.Game.FormatTime(status.elapsed)}");
        Console.WriteLine($"Pintados: {status.painted}");
        Console.WriteLine($"En cola: {status.queue.Count}/5");
        if (status.queue.Count > 0)
        {
            Console.WriteLine("Lista (primero -> último):");
            foreach (var car in status.queue)
            {
                Console.WriteLine($" - {car.ColorName} ({car.ColorId}) [{car.Id}]");
            }

            var first = status.first;
            if (first is not null)
            {
                Console.WriteLine($"\nPróximo pedido (primer coche): {first.ColorName} ({first.ColorId})");
            }
        }
        else
        {
            Console.WriteLine("Cola vacía.");
        }
    }
}
