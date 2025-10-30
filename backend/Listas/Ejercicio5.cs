using System;
using System.Collections.Generic;
using System.Linq;

namespace csharp_solucion
{
    public class ClasificadorPalabras
    {
        private Dictionary<char, List<string>> palabrasPorLetra = new Dictionary<char, List<string>>();

        public void AgregarPalabra(string palabra)
        {
            if (string.IsNullOrWhiteSpace(palabra))
            {
                Console.WriteLine("La palabra no puede estar vacía.");
                return;
            }

            char letraInicial = char.ToUpper(palabra[0]);
            if (!palabrasPorLetra.ContainsKey(letraInicial))
            {
                palabrasPorLetra[letraInicial] = new List<string>();
            }

            palabrasPorLetra[letraInicial].Add(palabra);
            Console.WriteLine($"Palabra '{palabra}' agregada a la lista de la letra '{letraInicial}'.");
        }

        public void MostrarListasPorLetra()
        {
            foreach (var entrada in palabrasPorLetra.OrderBy(e => e.Key))
            {
                Console.WriteLine($"Letra {entrada.Key}:");
                foreach (var palabra in entrada.Value)
                {
                    Console.WriteLine($"  - {palabra}");
                }
            }
        }
    }
}