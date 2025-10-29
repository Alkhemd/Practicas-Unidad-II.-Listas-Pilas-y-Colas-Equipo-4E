using System;
using System.Collections.Generic;
using System.Linq; // Usaremos LINQ para buscar productos fácilmente.

namespace csharp_solucion
{
    /// <summary>
    /// Encapsula toda la lógica para el Ejercicio 1: Supermercado.
    /// </summary>
    public class Ejercicio1
    {
        // --- Atributos ---

        // Lista para almacenar los productos disponibles (escaneados).
        private List<Producto> productosDisponibles = new List<Producto>();

        // Lista para almacenar los productos que se retiran de la compra.
        private List<Producto> productosRetirados = new List<Producto>();

        // Generador de números aleatorios para la cantidad y el precio.
        private Random random = new Random();

        // Contador para generar nombres de producto únicos (producto1, producto2, etc.).
        private int contadorProductos = 1;

        // --- Métodos Públicos ---

        /// <summary>
        /// Punto de entrada para ejecutar el menú y la lógica del Ejercicio 1.
        /// </summary>
        public void Ejecutar()
        {
            bool continuar = true;
            while (continuar)
            {
                Console.Clear();
                Console.WriteLine("====================================");
                Console.WriteLine("   Ejercicio 1: Supermercado");
                Console.WriteLine("====================================");
                Console.WriteLine("1. Escanear (Agregar) nuevo producto");
                Console.WriteLine("2. Retirar producto de la compra");
                Console.WriteLine("3. Mostrar productos");
                Console.WriteLine("4. Volver al menú principal");
                Console.WriteLine("====================================");
                Console.Write("Selecciona una opción: ");

                string opcion = Console.ReadLine() ?? "";

                switch (opcion)
                {
                    case "1":
                        AgregarProducto();
                        break;
                    case "2":
                        RetirarProducto();
                        break;
                    case "3":
                        MostrarProductos();
                        break;
                    case "4":
                        continuar = false;
                        break;
                    default:
                        Console.WriteLine("\nOpción no válida.");
                        break;
                }
                // Pausa antes de volver a mostrar el menú (excepto al salir).
                if (continuar) PresionarParaContinuar();
            }
        }

        // --- Métodos Privados ---

        /// <summary>
        /// Crea un nuevo producto con datos aleatorios y lo agrega a la lista de disponibles.
        /// </summary>
        private void AgregarProducto()
        {
            // Genera un nombre de producto secuencial.
            string nombre = "producto" + contadorProductos++;
            // Cantidad aleatoria entre 1 y 10.
            int cantidad = random.Next(1, 11);
            // Precio aleatorio entre 5.00 y 150.00 (como decimal, redondeado a 2 decimales).
            decimal precio = Math.Round((decimal)(5.0 + random.NextDouble() * 145.0), 2);

            // Crea el nuevo producto.
            Producto nuevoProducto = new Producto(nombre, cantidad, precio);
            
            // Lo añade a la lista de productos disponibles.
            productosDisponibles.Add(nuevoProducto);

            Console.WriteLine($"\nProducto agregado: {nuevoProducto.Nombre}");
        }

        /// <summary>
        /// Mueve un producto de la lista de disponibles a la de retirados.
        /// </summary>
        private void RetirarProducto()
        {
            Console.Write("\nIntroduce el nombre del producto a retirar (ej. producto1): ");
            string nombre = Console.ReadLine() ?? "";

            // Busca el producto en la lista de disponibles usando LINQ (FirstOrDefault).
            Producto? productoARetirar = productosDisponibles.FirstOrDefault(p => p.Nombre.Equals(nombre, StringComparison.OrdinalIgnoreCase));

            if (productoARetirar != null)
            {
                // Si se encuentra, lo elimina de disponibles y lo añade a retirados.
                productosDisponibles.Remove(productoARetirar);
                productosRetirados.Add(productoARetirar);
                Console.WriteLine($"\nEl producto '{productoARetirar.Nombre}' ha sido retirado.");
            }
            else
            {
                // Si no se encuentra, informa al usuario.
                Console.WriteLine($"\nNo se encontró un producto con el nombre '{nombre}' en la lista de disponibles.");
            }
        }

        /// <summary>
        /// Muestra el contenido de ambas listas: disponibles y retirados.
        /// </summary>
        private void MostrarProductos()
        {
            Console.WriteLine("\n--- Productos Disponibles en el Carrito ---");
            if (productosDisponibles.Any()) // .Any() es una forma eficiente de ver si la lista tiene elementos.
            {
                // Itera sobre la lista y muestra cada producto.
                foreach (var producto in productosDisponibles)
                {
                    Console.WriteLine(producto.ToString());
                }
            }
            else
            {
                Console.WriteLine("(No hay productos en el carrito)");
            }

            Console.WriteLine("\n--- Productos Retirados de la Compra ---");
            if (productosRetirados.Any())
            {
                foreach (var producto in productosRetirados)
                {
                    Console.WriteLine(producto.ToString());
                }
            }
            else
            {
                Console.WriteLine("(No se han retirado productos)");
            }
        }

        // Método de utilidad para pausar la ejecución.
        private void PresionarParaContinuar()
        {
            Console.WriteLine("\nPresiona cualquier tecla para continuar...");
            Console.ReadKey();
        }
    }

    public class Producto
    {
        public string Nombre { get; set; }
        public int Cantidad { get; set; }
        public decimal Precio { get; set; }

        public Producto(string nombre, int cantidad, decimal precio)
        {
            Nombre = nombre;
            Cantidad = cantidad;
            Precio = precio;
        }

        public override string ToString()
        {
            return $"Nombre: {Nombre}, Cantidad: {Cantidad}, Precio: {Precio:C}";
        }
    }

    public class AlmacenProductos
    {
        private List<Producto> productosDisponibles = new List<Producto>();
        private List<Producto> productosRetirados = new List<Producto>();

        public void AgregarProducto(string nombre)
        {
            if (string.IsNullOrWhiteSpace(nombre))
            {
                Console.WriteLine("Nombre inválido.");
                return;
            }
            Random random = new Random();
            int cantidad = random.Next(1, 100);
            decimal precio = (decimal)(random.NextDouble() * 100);
            Producto producto = new Producto(nombre, cantidad, precio);
            productosDisponibles.Add(producto);
            Console.WriteLine("Producto agregado: " + producto);
        }

        public void RetirarProducto(string nombre)
        {
            if (string.IsNullOrWhiteSpace(nombre))
            {
                Console.WriteLine("Nombre inválido.");
                return;
            }
            Producto? producto = productosDisponibles.Find(p => p.Nombre == nombre);
            if (producto != null)
            {
                productosDisponibles.Remove(producto);
                productosRetirados.Add(producto);
                Console.WriteLine("Producto retirado: " + producto);
            }
            else
            {
                Console.WriteLine("Producto no encontrado.");
            }
        }

        public void MostrarProductosDisponibles()
        {
            Console.WriteLine("Productos disponibles:");
            foreach (var producto in productosDisponibles)
            {
                Console.WriteLine(producto);
            }
        }

        public void MostrarProductosRetirados()
        {
            Console.WriteLine("Productos retirados:");
            foreach (var producto in productosRetirados)
            {
                Console.WriteLine(producto);
            }
        }
    }
}
