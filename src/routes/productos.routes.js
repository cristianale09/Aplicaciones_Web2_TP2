import { Router } from "express";
import { readFile } from "fs/promises";

const router = Router();

const fileProducts = await readFile('./src/data/productos.json', 'utf-8');
const books = JSON.parse(fileProducts);

// ✅ Obtener por autor
router.get('/author/:author', (req, res) => {
    const author = req.params.author.toLowerCase();

    const result = books.filter(b =>
        b.author.toLowerCase() === author
    );

    if (result.length > 0) return res.json(result);

    return res.status(404).json({ message: 'No se encontraron libros de ese autor' });
});

// ✅ Obtener por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    const book = books.find(b => b.id_libro === id);

    if (book) return res.json(book);

    return res.status(404).json({ message: 'Libro no encontrado' });
});

// ✅ Listar todos
router.get('/', (req, res) => {
    res.json(books);
});

// ✅ Buscar por categoría
router.post('/search', (req, res) => {
    const { categoria } = req.body;

    if (!categoria) {
        return res.status(400).json({ message: 'Falta la categoría' });
    }

    const result = books.filter(b =>
        b.categoria.toLowerCase() === categoria.toLowerCase()
    );

    res.json(result);
});

// ✅ Crear producto
router.post('/', (req, res) => {
    const { nombre, descripcion, precio, categoria, author } = req.body;

    if (!nombre || !descripcion || !precio || !categoria || !author) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    const newBook = {
        id_libro: books.length + 1,
        nombre,
        descripcion,
        precio,
        categoria,
        author
    };

    books.push(newBook);

    res.status(201).json({
        message: 'Producto creado',
        book: newBook
    });
});

// ✅ Actualizar
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    const index = books.findIndex(b => b.id_libro === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }

    const { nombre, descripcion, precio, categoria, author } = req.body;

    if (nombre) books[index].nombre = nombre;
    if (descripcion) books[index].descripcion = descripcion;
    if (precio) books[index].precio = precio;
    if (categoria) books[index].categoria = categoria;
    if (author) books[index].author = author;

    res.json({
        message: 'Producto actualizado',
        book: books[index]
    });
});

export default router;