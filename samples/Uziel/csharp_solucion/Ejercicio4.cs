using System;
using System.Collections.Generic;
using System.Linq;

namespace csharp_solucion
{
    public class ProductoOrdenado
    {
        public string Nombre { get; set; }
        public decimal Precio { get; set; }

        public ProductoOrdenado(string nombre, decimal precio)
        {
            Nombre = nombre;
            Precio = precio;
        }

        public override string ToString()
        {
            return $"Nombre: {Nombre}, Precio: {Precio:C}";
        }
    }

    public class GestionProductos
    {
        private List<ProductoOrdenado> productos = new List<ProductoOrdenado>();

        public void AgregarProducto(string nombre, decimal precio)
        {
            if (string.IsNullOrWhiteSpace(nombre))
            {
                Console.WriteLine("Nombre de producto inválido.");
                return;
            }
            productos.Add(new ProductoOrdenado(nombre, precio));
            Console.WriteLine("Producto agregado: " + nombre);
        }

        public void EliminarProducto(string nombre)
        {
            if (string.IsNullOrWhiteSpace(nombre))
            {
                Console.WriteLine("Nombre inválido.");
                return;
            }
            ProductoOrdenado? producto = productos.FirstOrDefault(p => p.Nombre == nombre!);
            if (producto != null)
            {
                productos.Remove(producto);
                Console.WriteLine("Producto eliminado: " + nombre);
            }
            else
            {
                Console.WriteLine("Producto no encontrado.");
            }
        }

        public void MostrarProductosOrdenados()
        {
            var productosOrdenados = productos.OrderBy(p => p.Nombre).ToList();
            Console.WriteLine("Productos ordenados por nombre:");
            foreach (var producto in productosOrdenados)
            {
                Console.WriteLine(producto);
            }
        }

        public void MostrarCostoTotal()
        {
            decimal costoTotal = productos.Sum(p => p.Precio);
            Console.WriteLine($"Costo total de los productos: {costoTotal:C}");
        }
    }
}