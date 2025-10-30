using System;
using System.Collections.Generic;
using System.Globalization;

namespace PilasPractica
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            while (true)
            {
                Console.WriteLine("=== PRÁCTICA: PILAS ===");
                Console.WriteLine("1) Invertir palabra");
                Console.WriteLine("2) Palíndromo");
                Console.WriteLine("3) Suma de números grandes");
                Console.WriteLine("4) Reemplazar valor en pila");
                Console.WriteLine("5) Salir");
                Console.Write("Elige una opción: ");
                var op = Console.ReadLine();

                try
                {
                    switch (op)
                    {
                        case "1":
                            MenuInvertir();
                            break;
                        case "2":
                            MenuPalindromo();
                            break;
                        case "3":
                            MenuSumaGrandes();
                            break;
                        case "4":
                            MenuReemplazar();
                            break;
                        case "5":
                            Console.WriteLine("¡Hasta luego!");
                            return;
                        default:
                            Console.WriteLine("Opción no válida.\n");
                            break;
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"⚠️ Ocurrió un error: {ex.Message}\n");
                }

                Console.WriteLine("\nPresiona ENTER para continuar...");
                Console.ReadLine();
                Console.Clear();
            }
        }

        static void MenuInvertir()
        {
            Console.Write("Ingresa una palabra: ");
            string? palabra = Console.ReadLine() ?? string.Empty;
            string invertida = StackProblems.InvertirPalabra(palabra);
            Console.WriteLine($"Invertida: {invertida}");
        }

        static void MenuPalindromo()
        {
            Console.Write("Ingresa una palabra: ");
            string? palabra = Console.ReadLine() ?? string.Empty;
            bool es = StackProblems.EsPalindromo(palabra);
            Console.WriteLine(es ? "Es palíndromo." : "No es palíndromo.");
        }

        static void MenuSumaGrandes()
        {
            string a = InputHelper.LeerNumeroLargo("Ingresa el primer número entero grande: ");
            string b = InputHelper.LeerNumeroLargo("Ingresa el segundo número entero grande: ");
            string suma = StackProblems.SumarEnterosGrandes(a, b);
            Console.WriteLine($"{a} + {b} = {suma}");
        }

        static void MenuReemplazar()
        {
            int n = InputHelper.LeerEntero("¿Cuántos elementos tendrá la pila? (n>0): ", min:1);
            var pila = new Stack<int>();
            for (int i = 0; i < n; i++)
            {
                int val = InputHelper.LeerEntero($"Elemento #{i+1}: ");
                pila.Push(val);
            }

            int viejo = InputHelper.LeerEntero("Valor a reemplazar (viejo): ");
            int nuevo = InputHelper.LeerEntero("Nuevo valor: ");

            StackProblems.ReemplazarValor(pila, nuevo, viejo);

            Console.WriteLine("Pila resultante (de cima a base):");
            foreach (var x in pila)
                Console.Write($"{x} ");
            Console.WriteLine();
        }
    }
}