using System;

namespace ParkingApp.Models
{
    // Cada auto es un nodo en la cola circular doblemente ligada
    public class CarNode
    {
        public string Placas { get; set; }
        public string Propietario { get; set; }
        public DateTime HoraEntrada { get; set; }

        // Punteros para la lista doblemente ligada circular
        public CarNode? Next { get; set; }
        public CarNode? Prev { get; set; }

        public CarNode(string placas, string propietario)
        {
            Placas = placas;
            Propietario = propietario;
            HoraEntrada = DateTime.Now;
            Next = null;
            Prev = null;
        }
    }
}
