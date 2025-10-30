# PintarCoches (CLI)

Este repositorio contiene una aplicación de consola en C# (.NET 7) llamada "PintarCoches".
El propósito del proyecto es simular una cola FIFO de coches que llegan con un "pedido" de color para ser pintados.
El jugador (o una IA de prueba) puede intentar pintar siempre el primer coche de la cola introduciendo el id del color pedido.
Si coincide, el coche se considera pintado y se retira; si no, se muestra un aviso. La partida termina si la cola llega a 5 coches.

Este README explica la arquitectura, los contratos internos (para que otra IA pueda entender la estructura), cómo ejecutar y cómo depurar el proyecto desde CLI y desde Visual Studio Code.

## Resumen de comportamiento
- Cola FIFO acotada a 5 coches. Si la cola llega a 5, el juego termina.
- Un coche se encola de inmediato al iniciar la partida y luego cada X segundos (intervalo inicial 20s en modo normal).
- Tras cada 3 coches pintados, el intervalo de encolado se multiplica por 0.7 hasta un mínimo de 5s.
- Solo se puede pintar el primer coche (FIFO). El usuario introduce el `id` del color (ej. `1`, `2`, ...).
- Se guarda el mejor record en `record.json` (mayor número de coches pintados; si hay empate, menor tiempo).
- Modo de prueba automática (`--auto-test`) para ejecutar sin interacción y con intervalos muy cortos para pruebas.

## Contratos y formas de datos (útil para otra IA)

- Modelo `Car` (en `Models/Car.cs`):
	- Id: Guid — identificador único del coche.
	- ColorId: string — id del color pedido (coincide con `Colors.cs`).
	- ColorName: string — nombre legible del color.

- Paleta (`ColorsPalette.Palette` en `Colors.cs`): lista de `ColorEntry(string Id, string Name)`; por ejemplo: `("1","Rojo")`.

- Clase `BoundedQueue<T>` (archivo `Queue.cs`) — operaciones:
	- Enqueue(T item)
	- Dequeue() : T
	- Peek() : T?
	- Count, Capacity, IsFull

- Clase `Game` (archivo `Game.cs`) — API/operaciones públicas relevantes:
	- Constructor `Game(string projectDir, bool autoTest = false)` — carga/sincroniza `record.json`.
	- Start() — inicia timers y encola el primer coche inmediatamente.
	- TryPaint(string colorId, out string message, Guid? expectedFirstCarId = null) : bool — intenta pintar el primer coche; `expectedFirstCarId` se usa para detectar si el primer coche cambió mientras el usuario escribía.
	- GetStatus() : (TimeSpan elapsed, int painted, List<Car> queue, Car? first) — estado legible para la UI.
	- EndGame() — fuerza el fin y guarda record si aplica.
	- FormatTime(TimeSpan) — utilidad para formatear el tiempo en mm:ss.

- `record.json` — formato JSON con el mejor record (estructura serializada de `RecordModel` con campos: CarsPainted, TimeSeconds, DateSaved).

## Estructura de archivos (clave)

- `Program.cs` — CLI y loop principal.
- `Game.cs` — lógica del juego y sincronización.
- `Queue.cs` — cola acotada (BoundedQueue).
- `Models/Car.cs` — modelo `Car`.
- `Colors.cs` — paleta (ids y nombres).
- `record.json` — archivo donde se guarda el record.

## Cómo ejecutar (CLI)

Usa PowerShell (ejemplos):

Compilar (opcional):

```powershell
dotnet build "c:\Users\Lenovo\Juego_pintar_coches_C#\PintarCoches\PintarCoches.csproj"
```

Ejecutar (modo interactivo):

```powershell
dotnet run --project "c:\Users\Lenovo\Juego_pintar_coches_C#\PintarCoches"
```

Ejecutar en modo auto-test (no requiere interacción):

```powershell
dotnet run --project "c:\Users\Lenovo\Juego_pintar_coches_C#\PintarCoches" -- --auto-test
```

El `--` separa los argumentos de `dotnet` de los argumentos del programa.

## Comandos disponibles en la ejecución interactiva

- `paleta` — muestra la lista de colores (id - nombre).
- `status` — refresca el estado y muestra cola, primer pedido y estadísticas.
- `salir` o `exit` — termina la partida.
- `ID` (ej. `1`) — intenta pintar con ese id el primer coche.

## Cómo depurar (instrucciones y comandos para otra IA)

Aquí se agrupan varias formas para depurar: desde la CLI con `dotnet`, con `dotnet watch`, y con Visual Studio Code (`launch.json`). Estas instrucciones ayudan a reproducir, depurar y entender la ejecución.

1) Depuración básica desde CLI

- Ejecutar en modo Debug (configuración por defecto `Debug`):

```powershell
dotnet run --project "c:\Users\Lenovo\Juego_pintar_coches_C#\PintarCoches" --configuration Debug
```

- Compilar con símbolos y luego ejecutar el depurador de tu IDE si lo prefieres:

```powershell
dotnet build -c Debug "c:\Users\Lenovo\Juego_pintar_coches_C#\PintarCoches\PintarCoches.csproj"
```

2) Depuración automática / hot-reload (útil para desarrollo iterativo)

Instalar la herramienta `dotnet-watch` (si no está disponible):

```powershell
dotnet tool install --global dotnet-watch
```

Ejecutar con watch para recompilar y reiniciar automáticamente al guardar:

```powershell
dotnet watch --project "c:\Users\Lenovo\Juego_pintar_coches_C#\PintarCoches" run
```

3) Depurar con Visual Studio Code (configuración de ejemplo)

Si otra IA o un humano quiere reproducir la depuración con VS Code, aquí hay ejemplos de `launch.json` y `tasks.json` que se pueden colocar en `.vscode/`.

`launch.json` (ejemplo para adjuntar y ejecutar):

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"name": "Launch PintarCoches",
			"type": "coreclr",
			"request": "launch",
			"preLaunchTask": "build",
			"program": "${workspaceFolder}/bin/Debug/net7.0/PintarCoches.dll",
			"args": [],
			"cwd": "${workspaceFolder}",
			"console": "integratedTerminal"
		},
		{
			"name": "Launch PintarCoches --auto-test",
			"type": "coreclr",
			"request": "launch",
			"preLaunchTask": "build",
			"program": "${workspaceFolder}/bin/Debug/net7.0/PintarCoches.dll",
			"args": ["--auto-test"],
			"cwd": "${workspaceFolder}",
			"console": "integratedTerminal"
		}
	]
}
```

`tasks.json` (tarea simple de build para VS Code):

```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"label": "build",
			"command": "dotnet",
			"type": "process",
			"args": ["build", "-c", "Debug", "${workspaceFolder}/PintarCoches.csproj"],
			"problemMatcher": "$msCompile"
		}
	]
}
```

Notas para usar VS Code:
- Coloca estos archivos en `.vscode/launch.json` y `.vscode/tasks.json` dentro de la carpeta del proyecto (`PintarCoches`).
- Ejecuta la tarea `build` (o usa el atajo) antes de iniciar el depurador. Selecciona la configuración `Launch PintarCoches` y presiona F5.

4) Puntos de interés para el debugger (lugares recomendados para romper/inspeccionar)
- `Game.Start()` — ver la inicialización del timer y el primer `EnqueueRandomCar()`.
- `Game.EnqueueRandomCar()` — ver la creación de `Car` y el estado de la cola.
- `Game.TryPaint(...)` — validar la lógica de comprobación `expectedFirstCarId` y el ajuste de intervalos.
- `Game.SaveRecordIfBetter()` — revisar la serialización y escritura en `record.json`.

## Modo `--auto-test` (útil para pruebas por IA)

- Ejecuta `dotnet run --project <ruta> -- --auto-test`.
- En este modo, el juego usa intervalos muy cortos y un bucle en background que simula pintar el primer coche automáticamente, lo que permite que otra IA verifique flujos completos sin interacción humana.

## `record.json`

- Estructura: objeto JSON con campos `CarsPainted` (int), `TimeSeconds` (double) y `DateSaved` (ISO UTC timestamp).
- Localización: archivo en la raíz del proyecto (`c:\Users\Lenovo\Juego_pintar_coches_C#\PintarCoches\record.json`).

## Notas para otra IA que consuma este repositorio

- Para comprender el flujo:
	1. Llamar a `new Game(projectDir, autoTest)` para construir el objeto de juego (cargará `record.json`).
	2. Llamar a `Start()` para iniciar el cronómetro y el encolado.
	3. Llamar periódicamente a `GetStatus()` para leer el estado (cola, primer coche, pintados, tiempo).
	4. Para intentar pintar, llamar a `TryPaint(colorId, out message, expectedFirstCarId)` pasando el `Id` del primer coche que se obtuvo previamente de `GetStatus().first.Id`. Comprobar el `message` y el valor booleano devuelto.
	5. Finalizar con `EndGame()` (o esperar a que la cola llegue a 5 y el `Game` termine por sí solo).

- Si se usa la interfaz de consola (`Program.cs`) se puede replicar el mismo comportamiento programáticamente sin interacción humana usando `--auto-test`.

## Preguntas frecuentes rápidas

- ¿Dónde está la paleta de colores? — En `Colors.cs`, variable `ColorsPalette.Palette`.
- ¿Cómo se detecta que el primer coche cambió mientras escribía? — `Program.cs` toma `expectedFirst = game.GetStatus().first?.Id` antes de leer la línea; al llamar `TryPaint` se pasa ese Id y el método verifica si coincide con el primer coche actual.

---

Si quieres, puedo además:
- Crear los archivos `.vscode/launch.json` y `.vscode/tasks.json` automáticamente en el repositorio.
- Añadir ejemplos de integración para que una IA ejecute `Game` directamente como librería (por ejemplo, exponer una pequeña API de pruebas).

Dime qué prefieres y lo implemento.