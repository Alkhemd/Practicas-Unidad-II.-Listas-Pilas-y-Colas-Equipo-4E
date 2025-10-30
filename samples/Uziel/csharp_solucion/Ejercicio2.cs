using System;
using System.Collections.Generic;

namespace csharp_solucion
{
    public class ParesEImpares
    {
        private List<int> numerosPares = new List<int>();
        private List<int> numerosImpares = new List<int>();

        public void GenerarNumerosAleatorios(int cantidad)
        {
            Random random = new Random();
            for (int i = 0; i < cantidad; i++)
            {
                int numero = random.Next(1, 101); // Números entre 1 y 100
                if (numero % 2 == 0)
                {
                    numerosPares.Add(numero);
                }
                else
                {
                    numerosImpares.Add(numero);
                }
            }
        }

        public void MostrarNumerosPares()
        {
            Console.WriteLine("Números pares:");
            foreach (var numero in numerosPares)
            {
                Console.WriteLine(numero);
            }
        }

        public void MostrarNumerosImpares()
        {
            Console.WriteLine("Números impares:");
            foreach (var numero in numerosImpares)
            {
                Console.WriteLine(numero);
            }
        }
    }
}