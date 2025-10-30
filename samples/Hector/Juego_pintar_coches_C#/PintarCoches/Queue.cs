using System;
using System.Collections.Generic;

namespace PintarCoches
{
    // Cola acotada simple (FIFO)
    public class BoundedQueue<T>
    {
        private readonly Queue<T> _q = new();
        private readonly int _capacity;

        public BoundedQueue(int capacity)
        {
            if (capacity <= 0) throw new ArgumentException("capacity must be > 0");
            _capacity = capacity;
        }
    public int Count => _q.Count;
    public int Capacity => _capacity;
    public bool IsFull => _q.Count >= _capacity;

    public void Enqueue(T item)
        {
            if (IsFull) throw new InvalidOperationException("Queue is full");
            _q.Enqueue(item);
        }

    public T Dequeue()
        {
            return _q.Dequeue();
        }

    public T? Peek()
        {
            if (_q.Count == 0) return default;
            return _q.Peek();
        }

    public IEnumerable<T> AsEnumerable()
        {
            return _q.ToArray();
        }

    public void Clear() => _q.Clear();
    }
}