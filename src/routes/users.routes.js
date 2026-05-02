import { Router } from "express";
import { readFile, writeFile } from "fs/promises";

/*RUTAS DE USUARIOS*/
const fileUsers = await readFile('../data/users.json', 'utf-8');
const userdata = JSON.parse(fileUsers);


//Obtener usuario por ID
app.get('/byId/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    const user = userdata.find(e => e.id === id);

    if (user) {
        return res.status(200).json(user);
    }

    return res.status(404).json({ message: 'Usuario no encontrado' });
});


//Obtener usuario por nombre de usuario
app.get('/byUsername/:username', (req, res) => {
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

//Crear un nuevo usuario
app.post('/users', (req, res) => {
    const { name } = req.body;     
    const { email } = req.body;

    if (!name || !email) { //si falta alguno de los campos necesarios para crear un usuario, se devuelve un error 400 indicando que faltan datos.
        return res.status(400).json({ message: 'Faltan datos' }); 
    }

    const newUser = { //se crea un nuevo objeto de usuario con un ID generado automáticamente (basado en la longitud actual del array de usuarios), el nombre y el correo electrónico proporcionados en el cuerpo de la solicitud.
        id: userdata.length + 1,
        name,
        email
    };

    userdata.push(newUser);

    res.status(201).json({
        message: 'Usuario creado',
        user: newUser
    });
});

//Login de usuario
app.post('/login', (req, res) => {
    const { name } = req.body;    
    const { email } = req.body;

    if (!email || !name) {
        return res.status(400).json({ message: 'Faltan credenciales' });
    }

    const user = userdata.find(u => 
        u.email === email && u.name === name
    );

    if (user) {
        return res.status(200).json({
            message: 'Login exitoso',
            user
        });
    } else {
        return res.status(401).json({
            message: 'Credenciales inválidas'
        });
    }
});

//Actualizar información de un usuario
app.put('/users/:id', (req, res) => {
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