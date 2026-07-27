# 🎵 Catálogo de Música - Frontend

## 📌 Descripción

Aplicación web frontend desarrollada en React para gestionar un catálogo de artistas musicales y sus álbumes. Consume la API REST del backend desarrollado en Django, autenticándose mediante OAuth 2.0.

Este proyecto fue realizado para la asignatura de Aplicaciones Web Full-Stack.

## 👥 Integrantes

| Integrante | Responsabilidad |
|---|---|
| Joan Tenorio | Desarrollo del frontend con React e integración con la API |
| Alan Pilco | Desarrollo del backend con Django REST Framework |

## 🛠️ Tecnologías utilizadas

- React (Vite)
- Material UI (MUI)
- Axios
- React Router DOM
- Git y GitHub

## 📂 Estructura del proyecto
```
frontend/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── logo.png
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AlbumFormDialog.jsx
│   │   ├── ArtistFormDialog.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── EmptyCoverArt.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── hooks/
│   ├── pages/
│   │   ├── AlbumDetail.jsx
│   │   ├── Albums.jsx
│   │   ├── ArtistDetail.jsx
│   │   ├── Artists.jsx
│   │   └── Login.jsx
│   ├── services/
│   │   ├── albumsService.js
│   │   ├── api.js
│   │   ├── artistsService.js
│   │   └── authService.js
│   ├── theme/
│   │   └── theme.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## 🔐 Autenticación

La aplicación utiliza OAuth 2.0 (grant type `password`) contra el backend Django. El usuario inicia sesión con su usuario y contraseña, el frontend obtiene un `access_token` y lo guarda en `localStorage`. Cada petición a un endpoint protegido incluye automáticamente el token en el header `Authorization: Bearer <token>` mediante un interceptor de Axios.

## ✅ Funcionalidades implementadas

- Login con OAuth 2.0
- Rutas protegidas (solo accesibles con sesión iniciada)
- CRUD completo de Artistas (crear, listar, editar, eliminar)
- CRUD completo de Álbumes (crear, listar, editar, eliminar)
- Relación Artista → Álbumes (un artista tiene varios álbumes)
- Subida de imágenes (foto de artista y portada de álbum)
- Interfaz con Material UI (Cards, Dialogs, Snackbars)
- Manejo de estado con hooks (useState, useEffect)
- Cierre de sesión

## 🚀 Instalación

### 1. Clonar el repositorio

\`\`\`bash
git clone URL_DEL_REPOSITORIO
cd frontend
\`\`\`

### 2. Instalar dependencias

\`\`\`bash
npm install
\`\`\`

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto (mismo nivel que `package.json`), basándote en `.env.example`:

\`\`\`env
VITE_API_URL=http://127.0.0.1:8000
VITE_CLIENT_ID=tu_client_id
VITE_CLIENT_SECRET=tu_client_secret
\`\`\`

> ⚠️ El `client_id` y `client_secret` se obtienen registrando una aplicación OAuth en el Django Admin del backend (`/admin/` → Django OAuth Toolkit → Applications → Add application), con **Client type: Confidential** y **Authorization grant type: Resource owner password-based**.

### 4. Asegurarse de que el backend esté corriendo

Este frontend depende del backend Django (repositorio separado). Debe estar corriendo en `http://127.0.0.1:8000/` con CORS habilitado para `http://localhost:5173`.

### 5. Ejecutar el proyecto

\`\`\`bash
npm run dev
\`\`\`

La aplicación queda disponible en `http://localhost:5173/`.

## 📄 Información académica

- **Asignatura:** Aplicaciones Web Full-Stack
- **Carrera:** Ingeniería en Informática
- **Universidad:** Universidad Internacional SEK
- **Año:** 2026