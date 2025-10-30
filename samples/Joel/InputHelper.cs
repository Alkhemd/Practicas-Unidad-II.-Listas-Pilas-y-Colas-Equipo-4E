using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace PilasPractica
{
    public static class InputHelper
    {
        public static int LeerEntero(string mensaje, int? min = null, int? max = null)
        {
            while (true)
            {
                Console.Write(mensaje);
                string? s = Console.ReadLine();
                if (int.TryParse(s, out int val))
                {
                    if (min.HasValue && val < min.Value)
                    {
                        Console.WriteLine($"Debe ser >= {min.Value}");
                        continue;
                    }
                    if (max.HasValue && val > max.Value)
                    {
                        Console.WriteLine($"Debe ser <= {max.Value}");
                        continue;
                    }
                    return val;
                }
                Console.WriteLine("Entrada inválida. Intenta de nuevo.");
            }
        }

        public static string LeerNumeroLargo(string mensaje)
        {
            while (true)
            {
                Console.Write(mensaje);
                string s = (Console.ReadLine() ?? "").Trim();
                if (s.Length == 0)
                {
                    Console.WriteLine("No puede estar vacío.");
                    continue;
                }
                // Permitir signo opcional al inicio
                int start = (s[0] == '-' || s[0] == '+') ? 1 : 0;
                if (s.Substring(start).All(char.IsDigit))
                {
                    return s;
                }
                Console.WriteLine("Solo se permiten dígitos (y signo inicial opcional).");
            }
        }
    }
}