using System.Collections.Generic;

namespace PintarCoches
{
    // Definición simple de la paleta (id, nombre)
    public record ColorEntry(string Id, string Name);

    public static class ColorsPalette
    {
        // Al menos 8 colores
        public static readonly List<ColorEntry> Palette = new()
        {
            new ColorEntry("1", "Rojo"),
            new ColorEntry("2", "Azul"),
            new ColorEntry("3", "Verde"),
            new ColorEntry("4", "Amarillo"),
            new ColorEntry("5", "Naranja"),
            new ColorEntry("6", "Morado"),
            new ColorEntry("7", "Turquesa"),
            new ColorEntry("8", "Negro"),
            new ColorEntry("9", "Blanco"),
        };

        public static ColorEntry? FindById(string id)
        {
            return Palette.Find(c => c.Id == id);
        }
    }
}