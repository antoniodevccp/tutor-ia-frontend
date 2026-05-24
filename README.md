
Tutor IA – Frontend MVP

Frontend del sistema Tutor IA, desarrollado en React, que permite a los usuarios interactuar con una plataforma de evaluación educativa basada en inteligencia artificial.

⸻

Tecnologías

* React 19
* TypeScript
* Vite
* React Router DOM
* TanStack Query (React Query)
* Axios
* React Hook Form + Zod
* Material UI (MUI)
* Day.js

⸻

Requisitos del sistema

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* Node.js ≥ 18 (recomendado: 20 o superior)
* npm ≥ 9
* Git

Verificar versiones:

node -v
npm -v

⸻

Instalación

Clonar el repositorio:

git clone https://github.com/antoniodevccp/tutor-ia-frontend.git
cd tutor-ia-frontend

Instalar dependencias:

npm install

⸻

Ejecución en desarrollo

npm run dev

Por defecto, la aplicación se levanta en:

http://localhost:5173

(Si el puerto está ocupado, Vite usará otro automáticamente)

⸻

Scripts disponibles

npm run dev       # Levanta servidor de desarrollo
npm run build     # Compila el proyecto para producción
npm run preview   # Preview del build
npm run lint      # Ejecuta eslint

⸻

Configuración de API

El cliente HTTP está configurado en:

src/shared/api/http.ts

Por defecto:

baseURL: "http://localhost:5000/api"

Asegúrate de que el backend esté corriendo en esa URL.

⸻

Autenticación

El sistema utiliza autenticación basada en JWT:

* Endpoint: /api/Auth/login
* El token se guarda en localStorage
* Se envía automáticamente en cada request mediante interceptor Axios

⸻

Estructura del proyecto

src/
  app/            # Configuración global (router, query client)
  features/       # Módulos por funcionalidad
    auth/
    catalog/
    attempts/
    admin/
  shared/         # Componentes reutilizables y utilidades
    api/
    ui/
    hooks/
    layouts/
    types/

Arquitectura basada en features → escalable y mantenible.

⸻

Flujo de ramas (Git)

Se utiliza una estrategia basada en:

* main → producción
* develop → integración
* feature/* → nuevas funcionalidades
* docs/* → documentación

Ejemplo:

git checkout develop
git pull
git checkout -b feature/login

⸻

Estado actual del proyecto

*  Setup base
*  Routing
*  Login UI
*  Autenticación con JWT
*  Integración completa con API en progreso

⸻

Autor

Antonio Montecinos
Ingeniero en Informática – Android Senior Developer
:::