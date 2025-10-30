using System;

namespace csharp_solucion.Modelos
{
    /// <summary>
    /// Representa un producto en el inventario del supermercado.
    /// </summary>
    public class Producto
    {
        /// <summary>
        /// Nombre del producto (ej. "producto1", "producto2").
        /// </summary>
        public string Nombre { get; set; }

        /// <summary>
        /// Cantidad de unidades de este producto.
        /// </summary>
        public int Cantidad { get; set; }

        /// <summary>
        /// Precio unitario del producto.
        /// </summary>
        public double Precio { get; set; }

        /// <summary>
        /// Constructor para crear una nueva instancia de Producto.
        /// </summary>
        /// <param name="nombre">El nombre del producto.</param>
        /// <param name="cantidad">La cantidad inicial del producto.</param>
        /// <param name="precio">El precio unitario del producto.</param>
        public Producto(string nombre, int cantidad, double precio)
        { 
            Nombre = nombre;
            Cantidad = cantidad;
            Precio = precio;
        }

        /// <summary>
        /// Devuelve una representación en cadena del producto, útil para mostrar en consola.
        /// </summary>
        /// <returns>Una cadena con los detalles del producto.</returns>
        public override string ToString()
        { 
            // Usamos String.Format para crear una cadena bien formateada.
            // {0, -15} significa: alinear a la izquierda en un espacio de 15 caracteres.
            // C2 significa: formato de moneda con 2 decimales.
            return String.Format("{0, -15} | Cantidad: {1, -5} | Precio: {2, -10:C2}", Nombre, Cantidad, Precio);
        }
    }
}
