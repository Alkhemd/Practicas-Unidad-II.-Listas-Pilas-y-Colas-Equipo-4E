# Estacionamiento (Callejón) - Consola C#

Descripción
-----------
Este proyecto es una aplicación de consola en C# que simula la operativa de un estacionamiento en forma de "callejón" (sin límite de cupo). Cada vehículo se representa como un nodo en una Cola Circular Doblemente Ligada. La aplicación permite registrar la entrada de autos, procesar salidas (FIFO) y calcular el costo del tiempo de estacionamiento.

Propósito
---------
Proveer una implementación simple y didáctica de una cola circular doblemente ligada aplicada a un caso real (estacionamiento). El proyecto está pensado para ejecutarse y depurarse desde la terminal (PowerShell) o desde Visual Studio Code.

Contrato (inputs / outputs)
---------------------------
- Entradas (usuario):
	- Placas (string)
	- Propietario (string)
	- Opciones del menú (1, 2, 3, 4)
- Salidas (consola):
	- Mensajes de confirmación de entrada
	- Ticket de salida con: placas, propietario, hora de entrada, hora de salida, duración y costo
	- Listado de autos actualmente estacionados

Modelo de datos
---------------
- CarNode: contiene `Placas` (string), `Propietario` (string) y `HoraEntrada` (DateTime).
- DoublyCircularQueue: cola circular doblemente ligada que mantiene `CarNode`.

Reglas y decisiones importantes
-------------------------------
- No hay límite de cupo (colas ilimitadas).
- La salida se hace siempre por FIFO (primer auto que entró es el primero en salir).
- Precio: $2.00 pesos por segundo. El tiempo se calcula con DateTime.Now y se redondea hacia arriba al siguiente segundo entero.

Estructura del proyecto
-----------------------
- `ParkingApp.csproj` – archivo del proyecto .NET
- `Program.cs` – menú y lógica de entrada/salida/visualización
- `Models/CarNode.cs` – definición del nodo/vehículo
- `Data/DoublyCircularQueue.cs` – implementación de la cola circular doblemente ligada

Cómo compilar y ejecutar (PowerShell)
-----------------------------------
Abra PowerShell y ejecute los siguientes comandos (ruta absoluta incluida):

```powershell
cd "c:\Users\Lenovo\Estacionamiento_para_autos\ParkingApp"
dotnet build
dotnet run --project .
```

Comandos útiles para desarrollo y depuración
------------------------------------------
- Compilar (ver errores/advertencias):

```powershell
dotnet build
```

- Ejecutar la app de forma interactiva:

```powershell
dotnet run --project .
```

- Ejecutar con recarga automática (requiere `dotnet-watch`, incluido en SDK):

```powershell
dotnet watch run --project .
```

- Forzar salida del proceso en PowerShell: Ctrl+C

Depuración con Visual Studio Code
--------------------------------
1. Abra la carpeta del proyecto en VS Code (`File > Open Folder` -> `c:\Users\Lenovo\Estacionamiento_para_autos\ParkingApp`).
2. Instale la extensión C# (si no está instalada).
3. Cree (o use) la configuración de depuración. Un `launch.json` mínimo para depurar la app de consola podría ser:

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"name": ".NET Core Launch (console)",
			"type": "coreclr",
			"request": "launch",
			"preLaunchTask": "build",
			"program": "${workspaceFolder}/bin/Debug/net7.0/ParkingApp.dll",
			"args": [],
			"cwd": "${workspaceFolder}",
			"console": "integratedTerminal"
		}
	]
}
```

Notas para VS Code:
- Si cambia la versión de TargetFramework en el `.csproj` (por ejemplo a `net8.0`) asegúrese de reconstruir para que la ruta `bin/Debug/<tfm>` exista y coincida con `program`.
- Ponga breakpoints en `Program.cs` (por ejemplo en la función `SalidaAuto`) y pulse F5 para iniciar la sesión de depuración.

Comandos de depuración rápidos (PowerShell)
-----------------------------------------
- Compilar en modo Debug y ejecutar (lo mismo que arriba):

```powershell
dotnet build -c Debug
dotnet run --project .
```

- Ejecutar y abrir en depurador de VS Code: desde VS Code, F5 (asegúrese de haber creado `launch.json`).

Ejemplo de uso básico
---------------------
1. Ejecutar `dotnet run`.
2. Elegir `1` (Entrada de Auto). Ingresar placas y propietario.
3. Elegir `3` para listar autos y confirmar que está en la cola.
4. Elegir `2` para procesar la salida del auto (se mostrará el ticket con costo).

Casos borde y notas de diseño
----------------------------
- Si el usuario deja campos vacíos al ingresar placas o propietario, la operación se cancela.
- El cálculo de segundos utiliza `Math.Ceiling` sobre `TotalSeconds` y fuerza al menos 1 segundo.
- Actualmente no hay persistencia: al cerrar la aplicación, se pierde el estado.

Mejoras sugeridas (si se desea extender)
----------------------------------------
- Añadir opción para buscar y sacar un auto por placas (no solo FIFO).
- Guardar el estado en un archivo (JSON) para persistencia entre ejecuciones.
- Agregar pruebas unitarias (xUnit) para `DoublyCircularQueue`.

Contacto
-------
El código y las instrucciones están diseñadas para que otra IA o desarrollador humano pueda entender la estructura y cómo compilar/depurar en PowerShell o VS Code.

FIN

