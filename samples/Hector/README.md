# Ejercicios de Hector

## 📋 INSTRUCCIONES PARA HECTOR

### **PASO 1: Aceptar la invitación**
1. Revisa tu email o ve a: `https://github.com/Alkhemd/Practicas-Unidad-II.-Listas-Pilas-y-Colas-Equipo-4E`
2. Acepta la invitación al repositorio

---

### **PASO 2: Clonar el repositorio**

Abre tu terminal (PowerShell, CMD o Git Bash) y ejecuta:

```bash
# Clonar el repositorio
git clone https://github.com/Alkhemd/Practicas-Unidad-II.-Listas-Pilas-y-Colas-Equipo-4E.git

# Entrar a la carpeta
cd Practicas-Unidad-II.-Listas-Pilas-y-Colas-Equipo-4E
```

---

### **PASO 3: Cambiarte a tu rama**

```bash
git checkout Hector
```

**Verificar que estás en tu rama:**
```bash
git branch
```
Debe aparecer un asterisco (*) en **Hector**.

---

### **PASO 4: Agregar tus archivos**

1. **Abre la carpeta en VS Code o tu editor**
2. **Ve a la carpeta `samples/Hector/`**
3. **Agrega tus archivos de código aquí dentro**
4. **NO MODIFIQUES archivos fuera de esta carpeta**

Ejemplo:
```
samples/
  └── Hector/          ← Solo trabaja aquí
      ├── README.md
      ├── ejercicio1.cs
      └── ejercicio2.cs
```

---

### **PASO 5: Guardar tus cambios**

```bash
# Ver qué archivos cambiaste
git status

# Agregar todos tus cambios
git add .

# Hacer commit
git commit -m "Agregados ejercicios de Hector"

# Subir a GitHub
git push origin Hector
```

---

### **PASO 6: Crear Pull Request**

1. Ve a: `https://github.com/Alkhemd/Practicas-Unidad-II.-Listas-Pilas-y-Colas-Equipo-4E`
2. Verás un mensaje amarillo **"Compare & pull request"** → Click ahí
3. O ve a **"Pull requests"** → **"New pull request"**
4. Selecciona:
   - **base:** `main`
   - **compare:** `Hector`
5. Agrega un título: "Ejercicios de Hector"
6. Click en **"Create pull request"**
7. **NO HAGAS MERGE** - Espera a que el líder lo revise

---

### **⚠️ REGLAS IMPORTANTES:**

✅ **SÍ puedes:**
- Trabajar en la carpeta `samples/Hector/`
- Hacer commits en tu rama `Hector`
- Hacer push a tu rama
- Crear Pull Requests

❌ **NO hagas:**
- NO trabajes en la rama `main`
- NO modifiques archivos fuera de tu carpeta
- NO hagas merge de tu Pull Request
- NO borres archivos de otros
