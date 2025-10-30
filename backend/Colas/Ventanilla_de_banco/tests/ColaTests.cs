using System;
using VentanillaDeBanco.Data;
using VentanillaDeBanco.Models;
using Xunit;

namespace VentanillaDeBanco.Tests
{
    public class ColaTests
    {
        [Fact]
        public void InsertaHastaCapacidad_Y_OverflowDevuelveFalse()
        {
            var cola = new Cola(3);
            Assert.True(cola.InsertaCola(new Cliente(1, "A", "X", DateTime.Now)));
            Assert.True(cola.InsertaCola(new Cliente(2, "B", "Y", DateTime.Now)));
            Assert.True(cola.InsertaCola(new Cliente(3, "C", "Z", DateTime.Now)));
            // ahora debe estar llena
            Assert.True(cola.ColaLlena());
            // intento adicional debe fallar
            Assert.False(cola.InsertaCola(new Cliente(4, "D", "W", DateTime.Now)));
        }

        [Fact]
        public void InsertaVarios_EliminaRespetaFIFO()
        {
            var cola = new Cola(5);
            var c1 = new Cliente(1, "A", "X", DateTime.Now);
            var c2 = new Cliente(2, "B", "Y", DateTime.Now);
            var c3 = new Cliente(3, "C", "Z", DateTime.Now);

            cola.InsertaCola(c1);
            cola.InsertaCola(c2);
            cola.InsertaCola(c3);

            var e1 = cola.EliminaCola();
            var e2 = cola.EliminaCola();
            var e3 = cola.EliminaCola();

            Assert.Equal(c1.Turno, e1?.Turno);
            Assert.Equal(c2.Turno, e2?.Turno);
            Assert.Equal(c3.Turno, e3?.Turno);
            Assert.True(cola.ColaVacia());
        }
    }
}
