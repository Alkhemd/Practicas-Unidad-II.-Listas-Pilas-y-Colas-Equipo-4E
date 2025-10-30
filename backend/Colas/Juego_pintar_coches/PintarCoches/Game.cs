using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using PintarCoches.Models;

namespace PintarCoches
{
    public record RecordModel(int CarsPainted, double TimeSeconds, DateTime DateSaved);

    public class Game : IDisposable
    {
        private readonly object _lock = new();
        private readonly BoundedQueue<Car> _queue = new(5);
        private readonly Stopwatch _stopwatch = new();
        private Timer? _enqueueTimer;
        private int _carsPainted = 0;
        private double _enqueueIntervalSeconds = 20.0; // inicial
        private readonly double _minIntervalSeconds = 5.0; // límite mínimo
        private readonly double _speedMultiplier = 0.7; // cada 3 pintados
        private bool _running = false;
        private CancellationTokenSource? _cts;
        private readonly string _recordFilePath;
        private RecordModel? _bestRecord;
        private readonly bool _autoTest;

        // Exponer estado legible para CLI
        public int CarsPainted => _carsPainted;
        public TimeSpan Elapsed => _stopwatch.Elapsed;

        public Game(string projectDir, bool autoTest = false)
        {
            _recordFilePath = Path.Combine(projectDir, "record.json");
            _autoTest = autoTest;
            // Si es modo auto-test, usar intervalos rápidos para encolar (0.5s)
            if (_autoTest)
            {
                _enqueueIntervalSeconds = 0.5;
            }
            LoadRecord();
        }

        public RecordModel? BestRecord => _bestRecord;

        private void LoadRecord()
        {
            try
            {
                if (File.Exists(_recordFilePath))
                {
                    var json = File.ReadAllText(_recordFilePath);
                    _bestRecord = JsonSerializer.Deserialize<RecordModel>(json);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"No pude leer el record: {ex.Message}");
            }
        }

        private void SaveRecordIfBetter()
        {
            try
            {
                var current = new RecordModel(_carsPainted, _stopwatch.Elapsed.TotalSeconds, DateTime.UtcNow);
                bool better = false;
                if (_bestRecord is null) better = true;
                else if (current.CarsPainted > _bestRecord.CarsPainted) better = true;
                else if (current.CarsPainted == _bestRecord.CarsPainted && current.TimeSeconds < _bestRecord.TimeSeconds) better = true;

                if (better)
                {
                    _bestRecord = current;
                    var json = JsonSerializer.Serialize(_bestRecord, new JsonSerializerOptions { WriteIndented = true });
                    File.WriteAllText(_recordFilePath, json);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error guardando record: {ex.Message}");
            }
        }

        // Arranca el juego y el timer de encolado
        public void Start()
        {
            lock (_lock)
            {
                if (_running) return;
                _running = true;
                _cts = new CancellationTokenSource();
                _stopwatch.Start();
                // Encolar un coche de inmediato
                EnqueueRandomCar();
                // Crear timer
                var dueTime = TimeSpan.FromSeconds(_enqueueIntervalSeconds);
                _enqueueTimer = new Timer(_ => EnqueueTimerTick(), null, dueTime, TimeSpan.FromSeconds(_enqueueIntervalSeconds));

                if (_autoTest)
                {
                    // Ejecutar simulador en background
                    Task.Run(() => AutoTestLoop(_cts.Token));
                }
            }
        }

        private void EnqueueTimerTick()
        {
            EnqueueRandomCar();
        }

        private void EnqueueRandomCar()
        {
            lock (_lock)
            {
                if (_queue.IsFull)
                {
                    // Si ya está full, nada que encolar
                    return;
                }

                var palette = ColorsPalette.Palette;
                var rand = new Random();
                var entry = palette[rand.Next(palette.Count)];
                var car = new Car { ColorId = entry.Id, ColorName = entry.Name };
                _queue.Enqueue(car);
                Console.WriteLine($"Nuevo coche encolado (pedido: {car.ColorName}). Cola: {_queue.Count}/{_queue.Capacity}");

                // Si la cola alcanzó la capacidad máxima: terminar el juego
                if (_queue.Count >= _queue.Capacity)
                {
                    // detener timers y marcar fin
                    Task.Run(() => EndGame());
                }
            }
        }

        // Intenta pintar el primer coche con colorId; devuelve true si pintado
        public bool TryPaint(string colorId, out string message, Guid? expectedFirstCarId = null)
        {
            lock (_lock)
            {
                var first = _queue.Peek();
                if (first is null)
                {
                    message = "No hay coches en la cola.";
                    return false;
                }

                // Comparar si el primer coche cambió mientras el usuario escribía
                if (expectedFirstCarId.HasValue && expectedFirstCarId.Value != first.Id)
                {
                    message = "El primer coche cambió mientras escribías. Vuelve a intentarlo sobre el coche actual.";
                    return false;
                }

                if (first.ColorId == colorId)
                {
                    // correcto
                    var removed = _queue.Dequeue();
                    _carsPainted++;
                    message = $"¡Correcto! Pintaste un coche ({removed.ColorName}). Total pintados: {_carsPainted}";

                    // cada 3 pintados, acelerar encolado (multiplicar)
                    if (_carsPainted % 3 == 0)
                    {
                        var newInterval = _enqueueIntervalSeconds * _speedMultiplier;
                        if (newInterval < _minIntervalSeconds) newInterval = _minIntervalSeconds;
                        if (newInterval != _enqueueIntervalSeconds)
                        {
                            _enqueueIntervalSeconds = newInterval;
                            // reconfigurar timer
                            _enqueueTimer?.Change(TimeSpan.FromSeconds(_enqueueIntervalSeconds), TimeSpan.FromSeconds(_enqueueIntervalSeconds));
                            Console.WriteLine($"Velocidad de enfilamiento acelerada. Nuevo intervalo: {_enqueueIntervalSeconds:N1}s");
                        }
                    }

                    return true;
                }
                else
                {
                    message = "Color incorrecto.";
                    return false;
                }
            }
        }

        public (TimeSpan elapsed, int painted, List<Car> queue, Car? first) GetStatus()
        {
            lock (_lock)
            {
                var q = _queue.AsEnumerable().ToList();
                var first = _queue.Peek();
                return (_stopwatch.Elapsed, _carsPainted, q, first);
            }
        }

        private async Task AutoTestLoop(CancellationToken token)
        {
            // Modo automático: intervalos rápidos y pintar automáticamente
            while (!token.IsCancellationRequested && _running)
            {
                Car? target = null;
                lock (_lock)
                {
                    target = _queue.Peek();
                }

                if (target is not null)
                {
                    // Simular pequeña demora antes de pintar
                    await Task.Delay(200, token).ContinueWith(_ => { });
                    TryPaint(target.ColorId, out _, target.Id);
                }

                // En modo auto-test, acelerar encolado: encolar cada 0.5s si no full
                await Task.Delay(250, token).ContinueWith(_ => { });

                // pequeña protección para no bloquear forever
                if (_queue.Count >= _queue.Capacity)
                {
                    break;
                }
            }

            // terminar juego
            await Task.Delay(100, token).ContinueWith(_ => { });
            EndGame();
        }

        public void EndGame()
        {
            lock (_lock)
            {
                if (!_running) return;
                _running = false;
                _stopwatch.Stop();
                _enqueueTimer?.Change(Timeout.Infinite, Timeout.Infinite);
                _enqueueTimer?.Dispose();
                _enqueueTimer = null;
                _cts?.Cancel();
                SaveRecordIfBetter();

                Console.WriteLine("\n--- Juego terminado ---");
                Console.WriteLine($"Pintaste: {_carsPainted} coches. Tiempo total: {FormatTime(_stopwatch.Elapsed)}");
                if (_bestRecord is not null)
                {
                    Console.WriteLine($"Record: {_bestRecord.CarsPainted} coches en {_bestRecord.TimeSeconds:N1}s (guardado: {_bestRecord.DateSaved:u})");
                }
            }
        }

        public static string FormatTime(TimeSpan t) => t.ToString("mm\\:ss");

        public void Dispose()
        {
            _enqueueTimer?.Dispose();
            _cts?.Cancel();
            _cts?.Dispose();
        }
    }
}
