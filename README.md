# 🚛 FleetApp

Aplicación desarrollada con React + Firebase para la gestión de flotas de camiones, control de mantenimiento y seguimiento de fallas mecánicas.

La aplicación permite:

- Gestión de vehículos
- Actualización de kilometraje
- Control de mantenimiento
- Registro de fallas
- Historial de reparaciones
- Login seguro con Firebase Authentication

---

# ⚙️ Tecnologías utilizadas

- React
- Vite
- Firebase
- Firestore Database
- Firebase Authentication
- React Router DOM
- Bootstrap 5

---

# 📦 Instalación

Clonar repositorio:

```bash
git clone URL_REPOSITORIO
```

Entrar al proyecto:

```bash
cd FleetApp
```

Instalar dependencias:

```bash
npm install
```

Ejecutar proyecto:

```bash
npm run dev
```

---

# 🔥 Configuración Firebase

Crear archivo:

```bash
src/services/firebase.js
```

Agregar configuración Firebase:

```javascript
import { initializeApp } from "firebase/app";

import { getFirestore }
from "firebase/firestore";

import { getAuth }
from "firebase/auth";

const firebaseConfig = {

    apiKey: "TU_API_KEY",

    authDomain: "TU_AUTH_DOMAIN",

    projectId: "TU_PROJECT_ID",

    storageBucket: "TU_STORAGE_BUCKET",

    messagingSenderId: "TU_MESSAGING_ID",

    appId: "TU_APP_ID",

};

const app =
    initializeApp(firebaseConfig);

export const db =
    getFirestore(app);

export const auth =
    getAuth(app);
```

---

# 🔐 Firebase Authentication

Habilitar:

```text
Authentication
→ Sign-in Method
→ Email/Password
```

Crear usuario:

```text
Authentication
→ Users
→ Add User
```

---

# 🗄️ Estructura Firestore

## Colección vehículos

```text
vehiculos
```

Documento ejemplo:

```json
{
  "vehiculo": "Volvo FH16",
  "patente": "AB-CD-12",
  "kmActual": 145000,
  "kmMantenimiento": 145500,
  "conductor": "Juan Pérez"
}
```

---

## Colección fallas

```text
fallas
```

Documento ejemplo:

```json
{
  "patente": "AB-CD-12",
  "vehiculo": "Volvo FH16",
  "fallo": "Fuga hidráulica",
  "fecha": "17/05/2026",
  "observacion": "Fuga lado izquierdo",
  "estado": "PENDIENTE"
}
```

---

## Subcolección historial

```text
fallas/{fallaId}/historial
```

Documento ejemplo:

```json
{
  "fecha": "18/05/2026",
  "estado": "EN REPARACION",
  "comentario": "Ingreso a taller"
}
```

---

# 📂 Funcionalidades

## 🚚 Vehículos

- Registrar vehículos
- Visualizar flota
- Actualizar KM
- Control mantenimiento

---

## 🚨 Fallas

- Registrar fallas
- Actualizar estado
- Historial técnico
- Seguimiento reparación

---

## 🔒 Seguridad

- Login obligatorio
- Rutas protegidas
- Firebase Authentication

---

# 📱 Futuras mejoras

- APK Android
- PWA
- Notificaciones Push
- GPS
- Dashboard estadísticas
- Exportar PDF/Excel
- Roles Admin/Técnico
- Alertas mantenimiento

---

# 👨‍💻 Autor

Desarrollado por Alejandro Castro.