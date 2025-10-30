# 📁 Estructura del Proyecto

## Prácticas Unidad II - Listas, Pilas y Colas
**Equipo 4E**

---

## 🏗️ Estructura de Carpetas

```
Practicas-Unidad-II.-Listas-Pilas-y-Colas-Equipo-4E/
│
├── frontend/                          # 🎨 Interfaz web (HTML, CSS, JS)
│   ├── index.html                    # Página principal con menú
│   ├── css/
│   │   └── styles.css                # Estilos modernos
│   ├── js/
│   │   └── main.js                   # JavaScript principal
│   ├── pages/
│   │   ├── listas/                   # Páginas de ejercicios de Listas
│   │   │   ├── menu.html
│   │   │   ├── ejercicio1.html
│   │   │   ├── ejercicio2.html
│   │   │   ├── ejercicio3.html
│   │   │   ├── ejercicio4.html
│   │   │   └── ejercicio5.html
│   │   ├── pilas/                    # Páginas de ejercicios de Pilas
│   │   │   ├── menu.html
│   │   │   ├── ejercicio1.html
│   │   │   ├── ejercicio2.html
│   │   │   ├── ejercicio3.html
│   │   │   └── ejercicio4.html
│   │   └── colas/                    # Páginas de ejercicios de Colas
│   │       ├── menu.html
│   │       ├── ejercicio1.html
│   │       ├── ejercicio2.html
│   │       └── ejercicio3.html
│   └── assets/                       # Imágenes, iconos, etc.
│
├── backend/                           # ⚙️ Lógica del servidor (C#)
│   ├── Program.cs                    # Punto de entrada
│   ├── Practicas-Unidad-II.csproj   # Proyecto C#
│   ├── Controllers/                  # Controladores (si usamos web)
│   ├── Services/                     # Lógica de negocio
│   │   ├── ListasService.cs
│   │   ├── PilasService.cs
│   │   └── ColasService.cs
│   ├── Models/                       # Modelos de datos
│   │   └── Producto.cs
│   ├── Listas/                       # Código de ejercicios de Listas
│   │   ├── Ejercicio1.cs
│   │   ├── Ejercicio2.cs
│   │   ├── Ejercicio3.cs
│   │   ├── Ejercicio4.cs
│   │   └── Ejercicio5.cs
│   ├── Pilas/                        # Código de ejercicios de Pilas
│   │   ├── Ejercicio1.cs
│   │   ├── Ejercicio2.cs
│   │   ├── Ejercicio3.cs
│   │   └── Ejercicio4.cs
│   └── Colas/                        # Código de ejercicios de Colas
│       ├── Ejercicio1.cs
│       ├── Ejercicio2.cs
│       └── Ejercicio3.cs
│
├── samples/                           # 📦 Código original de cada miembro
│   ├── Uziel/                        # Ejercicios de Listas (Uziel)
│   │   └── csharp_solucion/
│   ├── Joel/                         # Ejercicios de Pilas (Joel)
│   │   └── PilasPractica/
│   └── Hector/                       # Ejercicios de Colas (Hector)
│       └── [pendiente]
│
├── .gitignore                        # Archivos ignorados por Git
├── README.md                         # Documentación principal
└── ESTRUCTURA.md                     # Este archivo

```

---

## 🎯 Flujo de Trabajo

### 1. **Frontend (Interfaz Visual)**
- Usuario abre `frontend/index.html` en el navegador
- Ve el menú principal con 3 cards: Listas, Pilas, Colas
- Click en una card → va al menú de esa sección
- Click en un ejercicio → ve la página del ejercicio

### 2. **Backend (Lógica C#)**
- Contiene toda la lógica de los ejercicios
- Puede ejecutarse como:
  - **Opción A**: Servidor web (ASP.NET Core) que sirve el frontend
  - **Opción B**: Aplicación de consola independiente

### 3. **Samples (Referencia)**
- Código original de cada miembro del equipo
- Se mantiene como referencia
- NO se modifica

---

## 🚀 Cómo Ejecutar

### Opción 1: Solo Frontend (HTML estático)
```bash
# Abrir directamente en el navegador
start frontend/index.html
```

### Opción 2: Con servidor local
```bash
# Usar Live Server de VS Code
# O cualquier servidor HTTP local
```

### Opción 3: Backend C# (cuando esté implementado)
```bash
cd backend
dotnet run
```

---

## 📝 Tareas Pendientes

- [ ] Migrar código de Listas (Uziel) a `backend/Listas/`
- [ ] Migrar código de Pilas (Joel) a `backend/Pilas/`
- [ ] Esperar código de Colas (Hector) y migrar a `backend/Colas/`
- [ ] Crear páginas HTML para cada ejercicio
- [ ] Conectar frontend con backend (si se usa servidor)
- [ ] Agregar validaciones y manejo de errores
- [ ] Pruebas finales

---

## 👥 Equipo 4E

- **Uziel**: Listas (5 ejercicios) ✅
- **Joel**: Pilas (4 ejercicios) ✅
- **Hector**: Colas (3 ejercicios) ⏳
- **Líder**: Alkhemd (Integración y coordinación)

---

## 🎨 Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: C# (.NET 8.0)
- **Control de versiones**: Git + GitHub
- **Diseño**: CSS moderno con variables, gradientes, animaciones

---

**Fecha de entrega**: 29 de octubre de 2025
