# Aplicaciones_Web2_TP1

## Descripción:

API REST desarrollada con Node.js y Express para gestionar:

👤 Usuarios
📚 Productos (libros)
💰 Ventas

---

📁 Estructura del proyecto

```

trabajo_practico2/
│
├── node_modules/
├── src/
│   ├── data/
│   │   ├── users.json
│   │   ├── productos.json
│   │   └── ventas.json
│   │
│   ├── routes/
│   │   ├── users.routes.js
│   │   ├── productos.routes.js
│   │   └── ventas.routes.js
│   │
│   └── index.js
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

```

---

⚙️ Instalación

Clonar repositorio:
```

git clone https://github.com/cristianale09/Aplicaciones_Web2_TP2.git

```

Entrar al proyecto

```

cd trabajo_practico2

```

Instalar dependencias
```

npm install

```

---

▶️ Ejecución

```

npm start

```

Servidor en:

```

http://localhost:3000

```

---


🔗 Endpoints

👤 Usuarios (`/users`):

* GET `/users/username/:username` → Obtener usuario por username
* GET `/users/:id` → Obtener usuario por ID
* POST `/users/login` → Login
* POST `/users` → Crear usuario
* PUT `/users/:id` → Actualizar usuario

📥 Ejemplo crear usuario

```json

POST /users
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "username": "juanperez",
  "contraseña": "123456"
}

```

---

📚 Productos (/productos)
  
* GET `/productos/author/:author` → Buscar por autor
* GET `/productos` → Listar libros
* GET `/productos/:id` → Obtener libro por ID
* POST `/productos/search` → Buscar por categoría
* POST `/productos` → Crear libro
* PUT `/productos/:id` → Actualizar libro

📥 Ejemplo crear producto

```json

POST /productos
{
  "nombre": "El Principito",
  "descripcion": "cuento sobre un pequeño príncipe que deja su asteroide para explorar el universo.",
  "precio": 25.50,  
  "categoria": "Ficción",
  "author": "Antoine de Saint-Exupéry"
}

```

---

💰 Ventas (/ventas)

* GET `/ventas/seller/:vendedor` → Ventas por vendedor
* GET `/ventas/:id` → Obtener venta por ID
* POST `/ventas` → Crear venta
* POST `/ventas/filter` → Filtrar por precio
* PUT `/ventas/:id` → Actualizar venta
* DELETE `/ventas/:id` → Eliminar venta

📥 Ejemplo crear venta

```json

POST /ventas
{
  "id_libro": 1,
  "vendedor": 1,
  "total": 25.50,
  "fecha": "2026-04-01"
}

```

---

🧪 Pruebas

Ejemplo:

```

GET http://localhost:3000/users/1

```

Se recomienda usar:

* Postman
* Insomnia
* Thunder Client

⚠️ Consideraciones
* Los datos se almacenan en archivos JSON
* No hay base de datos
* Los datos se manejan en memoria


👨‍💻 Autor
Cristian Ale
