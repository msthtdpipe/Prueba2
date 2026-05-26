# Biblioteca API

API RESTful para la gestión de libros construida con Node.js, Express y MySQL.

## 🚀 Descripción

Esta aplicación expone una API para listar, crear, actualizar y eliminar libros. Incluye:
- Backend en `Node.js` y `Express`
- Base de datos MySQL
- Manejo de sesiones con `express-session`
- Middleware de autenticación con `x-api-key`
- Frontend estático servido desde `public/`

## 📁 Estructura del proyecto

- `server.js` - Punto de entrada de la aplicación
- `routes/` - Definición de rutas de la API
- `controllers/` - Lógica de negocio por endpoint
- `services/` - Validaciones y preparación de datos
- `models/` - Acceso a la base de datos MySQL
- `db/` - Configuración de conexión a MySQL
- `middlewares/` - Autenticación y registro de peticiones
- `public/` - Frontend estático (HTML, CSS, JS)

## 🧩 Tecnologías utilizadas

- Node.js
- Express
- MySQL / mysql2
- dotenv
- cors
- express-session

## ⚙️ Requisitos

- Node.js 18+ instalado
- MySQL instalado y corriendo
- Base de datos configurada con la tabla `libros`

## 🧪 Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=biblioteca_db
SESSION_SECRET=mi_secreto
PORT=3000
```

> Ajusta los valores según tu entorno de MySQL.

## 📦 Instalación

Ejecuta en la raíz del proyecto:

```bash
npm install
```

## ▶️ Ejecución

- En desarrollo:

```bash
npm run dev
```

- En producción:

```bash
npm start
```

La aplicación iniciará en `http://localhost:3000` por defecto.

## 🔌 Endpoints principales

| Método | Endpoint | Descripción | Protegido |
| ------ | -------- | ----------- | --------- |
| POST | `/login` | Inicia sesión como administrador | ❌ |
| POST | `/logout` | Cierra la sesión actual | ❌ |
| GET | `/api/sesion` | Verifica si hay sesión activa | ❌ |
| GET | `/api/libros` | Lista todos los libros | ❌ |
| GET | `/items?nombre=` | Busca libros por nombre | ❌ |
| GET | `/api/libros/:id` | Obtiene un libro por su ID | ❌ |
| POST | `/api/libros` | Crea un libro nuevo | 🔒 |
| PUT | `/api/libros/:id` | Actualiza un libro existente | 🔒 |
| DELETE | `/api/libros/:id` | Elimina un libro | 🔒 |

### Seguridad

#### API Key

Para acceder a los endpoints protegidos, se debe enviar la clave de API en el header `x-api-key`.

- Header: `x-api-key`
- Valor: `eval-s12-2026`
- Protege los endpoints de creación, actualización y eliminación de libros (`POST /api/libros`, `PUT /api/libros/:id`, `DELETE /api/libros/:id`).

Ejemplo en Postman:

1. Selecciona el método HTTP y la URL.
2. En la pestaña `Headers`, añade una nueva fila.
3. En `Key` escribe `x-api-key`.
4. En `Value` escribe `eval-s12-2026`.
5. Envía la petición.

#### HTTPS

HTTPS es el protocolo seguro que cifra la comunicación entre el cliente y el servidor. Protege los datos sensibles, como credenciales y tokens, frente a escuchas y ataques de intermediario (MITM). En producción es necesario porque garantiza la confidencialidad e integridad de la información y evita que la API sea interceptada o modificada en tránsito.

### Autenticación de API protegida

- Clave de API: `eval-s12-2026`
- Debe enviarse en el header `x-api-key` para las rutas `POST`, `PUT` y `DELETE` de libros.

## 🧾 Modelo de datos esperado

La tabla `libros` debe contener al menos estos campos:

- `id` - INT AUTO_INCREMENT PRIMARY KEY
- `titulo` - VARCHAR
- `autor` - VARCHAR
- `anio_publicacion` - INT
- `genero` - VARCHAR
- `disponible` - BOOLEAN / TINYINT(1)

## 📝 Notas importantes

- El frontend ubicado en `public/` sirve una interfaz sencilla para iniciar sesión y administrar libros.
- El middleware `loggerMiddleware` registra cada petición en la consola.
- El archivo `db/conexion.js` verifica la conexión a MySQL al inicio.
- El servicio `libroService` valida y normaliza los datos antes de guardarlos en la base de datos.

## 💡 Uso rápido

1. Configura `.env`
2. Instala dependencias
3. Inicia la aplicación
4. Accede a `http://localhost:3000`
5. Ingresa como `admin` y administra libros desde la interfaz o con la API

## 📌 Dependencias del proyecto

- `cors`
- `dotenv`
- `express`
- `express-session`
- `mysql`
- `mysql2`

## 🧼 Sugerencia

Si quieres proteger mejor el proyecto en producción, actualiza:
- `SESSION_SECRET`
- `secure: true` en la configuración de cookies
- `origin` en CORS
- validación real de usuarios y contraseñas
