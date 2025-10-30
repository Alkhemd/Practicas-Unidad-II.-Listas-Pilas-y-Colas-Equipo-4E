using System;

namespace PintarCoches.Models
{
    // Modelo de coche con Id y ColorId (referencia a la paleta)
    public class Car
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string ColorId { get; set; } = string.Empty; // ej. "1", "red"
    public string ColorName { get; set; } = string.Empty; // nombre legible

    public override string ToString()
        {
            return $"{ColorName} ({ColorId})";
        }
    }
}