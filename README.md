# Aplicaciones_Web2_TP1

## Descripción:

  API REST desarrollada con Node.js y Express para gestionar usuarios, productos (libros) y ventas.

---

## Instalación:

```bash
npm install
```

---

## Ejecución:

```bash
node src/index.js
```

Servidor en:

```
http://localhost:3000
```

---

## Endpoints:

### Usuarios (`/users`):

* GET `/users/byId/:id` → Obtener usuario por ID
* GET `/users/byUsername/:username` → Obtener usuario por username
* POST `/users` → Crear usuario
* POST `/users/login` → Login
* PUT `/users/:id` → Actualizar usuario

#### Ejemplo POST /users

```json
{
  "name": "Juan",
  "email": "juan@email.com"
}
```

---

###: Productos (libros) (`/productos`)

⚠️ Nota: las rutas incluyen `/books`

* GET `/productos/books` → Listar libros
* GET `/productos/books/:id` → Obtener libro por ID
* GET `/productos/books/author/:author` → Buscar por autor
* POST `/productos/books` → Crear libro
* POST `/productos/books/search` → Buscar por categoría
* PUT `/productos/books/:id` → Actualizar libro

#### Ejemplo POST /productos/books

```json
{
  "title": "El Principito",
  "author": "Saint-Exupéry",
  "category": "Ficción"
}
```

---

###: Ventas (`/ventas`)

Nota: las rutas incluyen `/sales`

* GET `/ventas/sales/:id` → Obtener venta por ID
* GET `/ventas/sales/seller/:seller` → Ventas por vendedor
* POST `/ventas/sales` → Crear venta
* POST `/ventas/sales/filter` → Filtrar por precio
* PUT `/ventas/sales/:id` → Actualizar venta
* DELETE `/ventas/sales/:id` → Eliminar venta

#### Ejemplo POST /ventas/sales

```json
{
  "product": "Libro A",
  "seller": "Juan",
  "price": 1000,
  "date": "2024-05-01"
}
```

---

## Pruebas:

Ejemplo:

```
GET http://localhost:3000/users/byId/1
```

Se recomienda usar:

* Postman
* Insomnia
* Thunder Client
