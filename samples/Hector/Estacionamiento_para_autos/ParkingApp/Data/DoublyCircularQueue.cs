using System;
using System.Collections.Generic;
using ParkingApp.Models;

namespace ParkingApp.Data
{
    public class DoublyCircularQueue
    {
        private CarNode? head; // apunta al frente (el primero en entrar)

        public bool IsEmpty => head == null;

        public void Enqueue(string placas, string propietario)
        {
            var node = new CarNode(placas, propietario);
            if (head == null)
            {
                head = node;
                head.Next = head;
                head.Prev = head;
            }
            else
            {
                var tail = head.Prev!;
                tail.Next = node;
                node.Prev = tail;
                node.Next = head;
                head.Prev = node;
            }
        }

        public CarNode? Dequeue()
        {
            if (head == null) return null;

            var node = head;
            if (node.Next == node)
            {
                // sólo un elemento
                head = null;
            }
            else
            {
                var tail = node.Prev!;
                head = node.Next;
                head.Prev = tail;
                tail.Next = head;
            }

            node.Next = null;
            node.Prev = null;
            return node;
        }

        public CarNode? Peek() => head;

        public IEnumerable<CarNode> Enumerate()
        {
            if (head == null) yield break;
            var current = head;
            do
            {
                yield return current;
                current = current.Next!;
            } while (current != head);
        }

        public int Count()
        {
            if (head == null) return 0;
            int c = 0;
            var current = head;
            do
            {
                c++;
                current = current.Next!;
            } while (current != head);
            return c;
        }
    }
}
