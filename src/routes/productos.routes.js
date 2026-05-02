import { Router } from "express";
import { readFile, writeFile } from "fs/promises";

//Creamos un router para manejar las rutas relacionadas con los usuarios
const router = Router();

/*RUTAS DE USUARIOS*/
const fileUsers = await readFile('./src/data/users.json', 'utf-8');
const userdata = JSON.parse(fileUsers);

//listar todos los libros
router.get('/books', (req, res) => {
    res.status(200).json(books);
});

//Obtener libro por ID
router.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    const book = books.find(b => b.id === id);

    if (book) {
        return res.status(200).json(book);
    } else {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }
});

//Obtener libro por autor
router.get('/books/author/:author', (req, res) => {
    const author = req.params.author.toLowerCase();

    const result = books.filter(b => 
        b.author.toLowerCase() === author
    );

    if (result.length > 0) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json({ message: 'No se encontraron libros de ese autor' });
    }
});

//crear un nuevo libro
router.post('/books', (req, res) => {
    const { title, author, category } = req.body;

    if (!title || !author || !category) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author,
        category
    };

    books.push(newBook);

    res.status(201).json({
        message: 'Libro creado',
        book: newBook
    });
});

//buscar libro por categoria
router.post('/books/search', (req, res) => {
    const { category } = req.body;

    if (!category) {
        return res.status(400).json({ message: 'Falta la categoría' });
    }

    const result = books.filter(b =>
        b.category.toLowerCase() === category.toLowerCase()
    );

    res.status(200).json(result);
});

//actualizar libro por ID
router.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, author, category } = req.body;

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }

    if (title) books[index].title = title;
    if (author) books[index].author = author;
    if (category) books[index].category = category;

    res.status(200).json({
        message: 'Libro actualizado',
        book: books[index]
    });
});

//exportamos el router para poder usarlo en el index.js
export default router;