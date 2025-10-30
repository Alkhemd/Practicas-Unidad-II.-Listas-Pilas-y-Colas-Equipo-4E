# VentanillaDeBanco - Consola (C# / .NET 6)

Este proyecto es una aplicación de consola en C# (.NET 6) que simula la gestión de una cola para una ventanilla de banco.

El objetivo es demostrar una implementación explícita de una cola con arreglo circular (fixed-size) y una interfaz de línea de comandos con modo interactivo y un modo "demo" no interactivo.

Requisitos
- .NET 6 SDK o superior instalado.

Estructura del proyecto (archivos clave)
- `VentanillaDeBanco.csproj` — proyecto principal de consola.
- `Program.cs` — menú interactivo, parsing de argumentos y lógica de demo.
- `Models/Cliente.cs` — definición del modelo Cliente (Turno, Nombre, Movimiento, HoraLlegada).
- `Data/Cola.cs` — implementación de la cola circular con la API solicitada.
- `tests/` — proyecto de pruebas xUnit con tests básicos para FIFO y overflow.

Qué hace la aplicación
- Mantiene una cola fija (por defecto 10) de clientes en espera.
- Permite insertar clientes, atender (eliminar) clientes, mostrar la cola y ver el frente y el final.
- Calcula el tiempo de espera al atender (Now - HoraLlegada) y lo muestra en horas/minutos/segundos.
- Soporta un modo `demo` que inserta clientes con horas simuladas, atiende uno y muestra resultados.

Contrato (resumen para otra IA o usuario)
- Entradas:
	- Interactivo: teclado — nombre (no vacío) y elección numérica de movimiento.
	- No interactivo: argumento de línea de comandos `demo`.
- Salidas: texto por consola (mensajes, tablas simples, datos de atención y tiempo de espera).
- Estados de error:
	- Cola llena (overflow): InsertaCola devuelve false y se muestra mensaje; no se inserta.
	- Cola vacía (underflow): EliminaCola devuelve null y se muestra mensaje; no se atiende.
	- Entradas inválidas: el programa re-pregunta hasta obtener valores válidos (nombre no vacío, opción de movimiento válida).

Comandos básicos (PowerShell) — compilar y ejecutar

Compilar:

```powershell
cd "C:\Users\Lenovo\Ventanilla_de_banco_C#"
dotnet build -c Debug
```

Ejecutar modo interactivo:

```powershell
dotnet run --project . -c Debug
```

Ejecutar demo (no interactivo):

```powershell
dotnet run --project . -c Debug -- demo
```

Ejecutar tests (xUnit):

```powershell
dotnet test -c Debug
# o puntualmente:
dotnet test .\tests\VentanillaDeBanco.Tests.csproj -c Debug
```

Instrucciones y comandos para depurar (objetivo: que otra IA pueda entender cómo ejecutar el depurador)

1) Depuración rápida con Visual Studio Code (recomendado para consola):

- Abrir la carpeta del proyecto en VS Code:

```powershell
cd "C:\Users\Lenovo\Ventanilla_de_banco_C#"
code .
```

- Crear una configuración de lanzamiento para ejecutar y depurar la aplicación. Puedes añadir el siguiente bloque en `.vscode/launch.json` (si no existe, créalo):

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"name": ".NET Launch (console)",
			"type": "coreclr",
			"request": "launch",
			"preLaunchTask": "build",
			"program": "${workspaceFolder}/bin/Debug/net6.0/VentanillaDeBanco.dll",
			"args": [],
			"cwd": "${workspaceFolder}",
			"console": "integratedTerminal"
		}
	]
}
```

- Para depurar en modo `demo`, modifica `args` así:

```json
"args": ["demo"]
```

- También puedes ejecutar la tarea de compilación desde VS Code o usar el siguiente archivo de tareas (`.vscode/tasks.json`) para que `preLaunchTask` haga build automáticamente:

```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"label": "build",
			"command": "dotnet",
			"type": "process",
			"args": ["build", "-c", "Debug"],
			"problemMatcher": "$msCompile"
		}
	]
}
```

- Flujo para depurar en VS Code:
	1. Abrir la carpeta con `code .`.
	2. Asegurarse de que el proyecto está compilado (`dotnet build -c Debug`).
	3. Abrir la vista "Run and Debug" (o presionar F5) y elegir ".NET Launch (console)".
	4. Colocar breakpoints en `Program.cs` o `Data/Cola.cs` y ejecutar.

2) Depurar desde la línea de comandos (attach desde VS Code)

- Ejecuta la aplicación en modo Debug (sin detenerse) para que quede un proceso al que se pueda adjuntar:

```powershell
dotnet run --project . -c Debug
```

- En VS Code elige la configuración "Attach to Process" o usa la paleta de comandos para adjuntar al proceso .NET en ejecución. (Esta opción requiere que tengas la extensión C# instalada.)

3) Depuración en entornos donde no hay VS Code (logs):

- Añade `Console.WriteLine` en los puntos que quieras inspeccionar y ejecuta `dotnet run` para ver la salida.
- Para ejecuciones repetidas con recarga, puedes instalar la herramienta `dotnet-watch` y usar:

```powershell
dotnet tool install --global dotnet-watch
dotnet watch run --project .
```

Consejos para otra IA que lea este README
- Para comprender el flujo: leer `Data/Cola.cs` (implementación del buffer circular), `Models/Cliente.cs` (modelo de datos) y `Program.cs` (interfaz de usuario y demo).
- Para validar automáticamente: ejecutar `dotnet test` y revisar que los tests pasen (FIFO y overflow).

Notas adicionales
- La cola usa un arreglo circular (índices `front` y `rear` y un contador `count`) — revisar `Data/Cola.cs` para ver la lógica de inserción y eliminación.
- Turnos se generan secuencialmente en `Program.cs` (variable `nextTurn`).

Si quieres, puedo generar también el archivo `.vscode/launch.json` y `.vscode/tasks.json` dentro del proyecto para que la depuración sea plug-and-play en VS Code.
