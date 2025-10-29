using System;
using System.Collections.Generic;

namespace csharp_solucion
{
    public class Alumno
    {
        public string Nombre { get; set; }
        public double Calificacion { get; set; }

        public Alumno(string nombre, double calificacion)
        {
            Nombre = nombre;
            Calificacion = calificacion;
        }

        public override string ToString()
        {
            return $"Nombre: {Nombre}, Calificación: {Calificacion}";
        }
    }

    public class Calificaciones
    {
        private List<Alumno> aprobados = new List<Alumno>();
        private List<Alumno> reprobados = new List<Alumno>();

        public void AgregarAlumno(string nombre, double calificacion)
        {
            Alumno alumno = new Alumno(nombre, calificacion);
            if (calificacion >= 7)
            {
                aprobados.Add(alumno);
            }
            else
            {
                reprobados.Add(alumno);
            }
        }

        public void MostrarAprobados()
        {
            Console.WriteLine("Alumnos aprobados:");
            foreach (var alumno in aprobados)
            {
                Console.WriteLine(alumno);
            }
        }

        public void MostrarReprobados()
        {
            Console.WriteLine("Alumnos reprobados:");
            foreach (var alumno in reprobados)
            {
                Console.WriteLine(alumno);
            }
        }
    }
}