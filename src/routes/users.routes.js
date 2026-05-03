import { Router } from "express";
import { readFile, writeFile } from "fs/promises";

//Creamos un router para manejar las rutas relacionadas con los usuarios
const router = Router();

/*RUTAS DE USUARIOS*/
const fileUsers = await readFile('./src/data/users.json', 'utf-8');
const userdata = JSON.parse(fileUsers);


//Obtener usuario por nombre de usuario
router.get('/username/:username', (req, res) => {
    const username = req.params.username.toLowerCase();

    const result = userdata.find(u =>  
        u.username.toLowerCase() === username
    );

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});


//Obtener usuario por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    const user = userdata.find(e => e.id_usuario === id);

    if (user) {
        return res.status(200).json(user);
    }

    return res.status(404).json({ message: 'Usuario no encontrado' });
});


//Login de usuario
router.post('/login', (req, res) => {
    const { username, contraseña } = req.body;

    if (!username || !contraseña) {
        return res.status(400).json({ message: 'Faltan credenciales' });
    }

    const user = userdata.find(u => 
        u.username === username && u.contraseña === contraseña
    );

    if (user) {
        return res.status(200).json({
            message: 'Login exitoso',
            user
        });
    }

    return res.status(401).json({
        message: 'Credenciales inválidas'
    });
});


//Crear un nuevo usuario
router.post('/', (req, res) => {
    const { nombre, apellido, username, contraseña } = req.body;

    if (!nombre || !apellido || !username || !contraseña) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    const newUser = {
        id_usuario: userdata.length + 1,
        nombre,
        apellido,
        username,
        contraseña
    };

    userdata.push(newUser);

    res.status(201).json({
        message: 'Usuario creado',
        user: newUser
    });
});


//Actualizar información de un usuario
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    const { email } = req.body;

    const userIndex = userdata.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (name) userdata[userIndex].name = name;
    if (email) userdata[userIndex].email = email;

    res.status(200).json({
        message: 'Usuario actualizado',
        user: userdata[userIndex]
    });
});

//exportamos el router para poder usarlo en el index.js
export default router;