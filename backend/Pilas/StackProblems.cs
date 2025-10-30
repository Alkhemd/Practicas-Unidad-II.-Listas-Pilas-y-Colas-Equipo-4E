using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PilasPractica
{
    /// <summary>
    /// Implementaciones de ejercicios usando Pilas.
    /// </summary>
    public static class StackProblems
    {
        /// <summary>
        /// Ejercicio 1: Invertir palabra usando una pila de caracteres.
        /// </summary>
        public static string InvertirPalabra(string palabra)
        {
            var st = new Stack<char>();
            foreach (char c in palabra)
                st.Push(c);

            var sb = new StringBuilder(palabra.Length);
            while (st.Count > 0)
                sb.Append(st.Pop());

            return sb.ToString();
        }

        /// <summary>
        /// Ejercicio 2: Determinar si una palabra es palíndromo usando pilas.
        /// Ignora mayúsculas/minúsculas y espacios.
        /// </summary>
        public static bool EsPalindromo(string palabra)
        {
            string limpia = new string(palabra
                .Where(char.IsLetterOrDigit)
                .Select(char.ToLowerInvariant)
                .ToArray());

            var izquierda = new Stack<char>();
            var derecha = new Stack<char>();

            int n = limpia.Length;
            for (int i = 0; i < n; i++)
            {
                if (i < n / 2) izquierda.Push(limpia[i]);
                else if (n % 2 == 0 || i > n / 2) derecha.Push(limpia[i]);
            }

            while (izquierda.Count > 0 && derecha.Count > 0)
            {
                if (izquierda.Pop() != derecha.Pop()) return false;
            }
            return izquierda.Count == 0 && derecha.Count == 0;
        }

        /// <summary>
        /// Ejercicio 3: Suma de enteros grandes representados como strings usando pilas.
        /// Soporta signo inicial (+/-). Retorna la suma exacta como string.
        /// </summary>
        public static string SumarEnterosGrandes(string a, string b)
        {
            // Manejo de signos: (+/-)X (+/-)Y
            bool negA = a.StartsWith("-");
            bool negB = b.StartsWith("-");
            a = TrimSign(a);
            b = TrimSign(b);

            if (negA == negB)
            {
                // misma señal -> suma magnitudes y aplica signo si eran negativas
                string mag = SumarMagnitudes(a, b);
                return negA ? AgregarSignoNegativoSiNoCero(mag) : mag;
            }
            else
            {
                // signos distintos -> resta magnitudes
                int cmp = CompararMagnitudes(a, b);
                if (cmp == 0) return "0";
                if (cmp > 0) // |a| > |b|
                {
                    string mag = RestarMagnitudes(a, b); // a - b
                    return negA ? AgregarSignoNegativoSiNoCero(mag) : mag;
                }
                else
                {
                    string mag = RestarMagnitudes(b, a); // b - a
                    return negB ? AgregarSignoNegativoSiNoCero(mag) : mag;
                }
            }
        }

        private static string TrimSign(string s) => (s.StartsWith("+") || s.StartsWith("-")) ? s[1..] : s;

        private static string AgregarSignoNegativoSiNoCero(string s) => s == "0" ? "0" : "-" + s;

        private static int CompararMagnitudes(string a, string b)
        {
            a = QuitarCerosIzquierda(a);
            b = QuitarCerosIzquierda(b);
            if (a.Length != b.Length) return a.Length.CompareTo(b.Length);
            return string.CompareOrdinal(a, b);
        }

        private static string QuitarCerosIzquierda(string s)
        {
            int i = 0;
            while (i < s.Length - 1 && s[i] == '0') i++;
            return s[i..];
        }

        private static string SumarMagnitudes(string a, string b)
        {
            var sa = new Stack<int>();
            var sb = new Stack<int>();
            foreach (var ch in a) sa.Push(ch - '0');
            foreach (var ch in b) sb.Push(ch - '0');

            int carry = 0;
            var sr = new Stack<int>();

            while (sa.Count > 0 || sb.Count > 0 || carry != 0)
            {
                int da = sa.Count > 0 ? sa.Pop() : 0;
                int db = sb.Count > 0 ? sb.Pop() : 0;
                int s = da + db + carry;
                sr.Push(s % 10);
                carry = s / 10;
            }

            var sbRes = new StringBuilder();
            while (sr.Count > 0) sbRes.Append(sr.Pop());
            return QuitarCerosIzquierda(sbRes.ToString());
        }

        private static string RestarMagnitudes(string a, string b)
        {
            // asume |a| >= |b|
            var sa = new Stack<int>();
            var sb = new Stack<int>();
            foreach (var ch in a) sa.Push(ch - '0');
            foreach (var ch in b) sb.Push(ch - '0');

            int prestamo = 0;
            var sr = new Stack<int>();

            while (sa.Count > 0 || sb.Count > 0)
            {
                int da = sa.Count > 0 ? sa.Pop() : 0;
                int db = sb.Count > 0 ? sb.Pop() : 0;
                int diff = da - prestamo - db;
                if (diff < 0)
                {
                    diff += 10;
                    prestamo = 1;
                }
                else prestamo = 0;
                sr.Push(diff);
            }

            // quitar ceros a la izquierda
            var sbRes = new StringBuilder();
            bool leading = true;
            var list = sr.ToList();
            list.Reverse(); // ahora de más significativo a menos
            foreach (var d in list)
            {
                if (leading && d == 0) continue;
                leading = false;
                sbRes.Append(d);
            }
            string r = sbRes.Length == 0 ? "0" : sbRes.ToString();
            return r;
        }

        /// <summary>
        /// Ejercicio 4: Reemplazar "viejo" por "nuevo" en toda la pila (in-place).
        /// </summary>
        public static void ReemplazarValor(Stack<int> pila, int nuevo, int viejo)
        {
            var aux = new Stack<int>();
            while (pila.Count > 0)
            {
                int x = pila.Pop();
                if (x == viejo) x = nuevo;
                aux.Push(x);
            }
            // restaurar el orden original (cima se mantiene conceptualmente)
            while (aux.Count > 0) pila.Push(aux.Pop());
        }
    }
}