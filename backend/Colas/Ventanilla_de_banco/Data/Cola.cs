using System;
using System.Collections.Generic;
using VentanillaDeBanco.Models;

namespace VentanillaDeBanco.Data
{
    // Cola circular con capacidad fija y operaciones básicas
    public class Cola
    {
        private readonly Cliente?[] items;
        private int front; // índice del frente
        private int rear;  // índice del siguiente lugar libre después del rear
        private int count;

        public int Count => count;
        public int Capacity { get; }

        public Cola(int capacity = 10)
        {
            if (capacity <= 0) throw new ArgumentOutOfRangeException(nameof(capacity));
            Capacity = capacity;
            items = new Cliente?[capacity];
            front = 0;
            rear = 0;
            count = 0;
        }

        public bool ColaLlena() => count == Capacity;
        public bool ColaVacia() => count == 0;

        public bool InsertaCola(Cliente c)
        {
            if (ColaLlena()) return false;
            items[rear] = c;
            rear = (rear + 1) % Capacity;
            count++;
            return true;
        }

        public Cliente? EliminaCola()
        {
            if (ColaVacia()) return null;
            var c = items[front];
            items[front] = null;
            front = (front + 1) % Capacity;
            count--;
            return c;
        }

        public List<Cliente> GetItems()
        {
            var list = new List<Cliente>();
            for (int i = 0; i < count; i++)
            {
                int idx = (front + i) % Capacity;
                var c = items[idx];
                if (c != null) list.Add(c);
            }
            return list;
        }

        public Cliente? GetFront()
        {
            if (ColaVacia()) return null;
            return items[front];
        }

        public Cliente? GetRear()
        {
            if (ColaVacia()) return null;
            int idx = (rear - 1 + Capacity) % Capacity;
            return items[idx];
        }
    }
}
