using System;

namespace VentanillaDeBanco.Models
{
    public class Cliente
    {
        public int Turno { get; }
        public string Nombre { get; }
        public string Movimiento { get; }
        public DateTime HoraLlegada { get; }

        public Cliente(int turno, string nombre, string movimiento, DateTime horaLlegada)
        {
            Turno = turno;
            Nombre = nombre ?? throw new ArgumentNullException(nameof(nombre));
            Movimiento = movimiento ?? string.Empty;
            HoraLlegada = horaLlegada;
        }
    }
}
